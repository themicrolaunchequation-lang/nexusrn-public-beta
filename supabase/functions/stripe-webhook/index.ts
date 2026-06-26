import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";

type EntitlementStatus = "active" | "expired" | "cancelled" | "refunded" | "manual_hold";

function firstStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  for (const item of Object.values(value as Record<string, unknown>)) {
    const found = firstStringValue(item);
    if (found) return found;
  }

  return "";
}

function readSupabaseSecretKey(): string {
  const legacyServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const singularSecret = Deno.env.get("SUPABASE_SECRET_KEY") ?? "";
  const pluralSecrets = Deno.env.get("SUPABASE_SECRET_KEYS") ?? "";

  if (legacyServiceRole) return legacyServiceRole;
  if (singularSecret) return singularSecret;

  if (!pluralSecrets) return "";

  try {
    const parsed = JSON.parse(pluralSecrets);
    return firstStringValue(parsed);
  } catch {
    return pluralSecrets;
  }
}

const supabaseSecretKey = readSupabaseSecretKey();

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

function errorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function stringId(value: unknown): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : "";
  }

  return "";
}

function dedupeRows(rows: unknown[]) {
  const seen = new Set<string>();
  const out: unknown[] = [];

  for (const row of rows) {
    const id =
      row && typeof row === "object" && "id" in row
        ? String((row as { id?: unknown }).id ?? "")
        : "";

    const key = id || JSON.stringify(row);

    if (!seen.has(key)) {
      seen.add(key);
      out.push(row);
    }
  }

  return out;
}

function entitlementPatch(status: EntitlementStatus) {
  const now = new Date().toISOString();

  return {
    status,
    expires_at: now,
    updated_at: now,
  };
}

async function patchEntitlementsByFilter(
  column: "stripe_checkout_session_id" | "stripe_payment_intent_id",
  value: string,
  status: EntitlementStatus,
) {
  if (!value) return [];

  const res = await fetch(
    `${supabaseUrl}/rest/v1/nexusrn_entitlements?${column}=eq.${encodeURIComponent(value)}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        apikey: supabaseSecretKey,
        authorization: `Bearer ${supabaseSecretKey}`,
        prefer: "return=representation",
      },
      body: JSON.stringify(entitlementPatch(status)),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Supabase entitlement patch failed for ${column}: ${res.status} ${text}`,
    );
  }

  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

async function revokeEntitlementByStripeIds(params: {
  status: EntitlementStatus;
  reason: string;
  checkoutSessionId?: string;
  paymentIntentId?: string;
}) {
  const allRows: unknown[] = [];
  const attempted: string[] = [];

  if (params.checkoutSessionId) {
    attempted.push(`stripe_checkout_session_id=${params.checkoutSessionId}`);
    allRows.push(
      ...await patchEntitlementsByFilter(
        "stripe_checkout_session_id",
        params.checkoutSessionId,
        params.status,
      ),
    );
  }

  if (params.paymentIntentId) {
    attempted.push(`stripe_payment_intent_id=${params.paymentIntentId}`);
    allRows.push(
      ...await patchEntitlementsByFilter(
        "stripe_payment_intent_id",
        params.paymentIntentId,
        params.status,
      ),
    );
  }

  const entitlement = dedupeRows(allRows);

  return {
    ok: true,
    action: "entitlement_lifecycle_update",
    reason: params.reason,
    target_status: params.status,
    attempted,
    updated_count: entitlement.length,
    entitlement,
  };
}

async function retrieveCharge(chargeId: string): Promise<Stripe.Charge | null> {
  if (!chargeId) return null;

  const charge = await stripe.charges.retrieve(chargeId);

  if ((charge as unknown as { deleted?: boolean }).deleted) {
    return null;
  }

  return charge as Stripe.Charge;
}

function refundStatusForCharge(charge: Stripe.Charge): EntitlementStatus {
  const amount = typeof charge.amount === "number" ? charge.amount : 0;
  const amountRefunded =
    typeof charge.amount_refunded === "number" ? charge.amount_refunded : 0;

  if (amount > 0 && amountRefunded > 0 && amountRefunded < amount) {
    return "manual_hold";
  }

  return "refunded";
}

async function upsertEntitlement(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    "";

  if (!email) {
    throw new Error("Checkout session has no customer email.");
  }

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + 3);

  const payload = {
    email,
    status: "active",
    plan_code: "beta_3_months",
    source: "stripe",
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    starts_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    updated_at: now.toISOString(),
  };

  const res = await fetch(
    `${supabaseUrl}/rest/v1/nexusrn_entitlements?on_conflict=stripe_checkout_session_id`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: supabaseSecretKey,
        authorization: `Bearer ${supabaseSecretKey}`,
        prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase entitlement upsert failed: ${res.status} ${text}`);
  }

  return await res.json();
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return {
      ok: true,
      ignored: true,
      event: event.type,
      reason: `payment_status=${session.payment_status}`,
    };
  }

  const entitlement = await upsertEntitlement(session);

  return {
    ok: true,
    event: event.type,
    checkout_session_id: session.id,
    entitlement,
  };
}

async function handleCheckoutSessionExpired(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  return await revokeEntitlementByStripeIds({
    status: "cancelled",
    reason: "checkout.session.expired",
    checkoutSessionId: session.id,
    paymentIntentId: stringId(session.payment_intent),
  });
}

async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  return await revokeEntitlementByStripeIds({
    status: "cancelled",
    reason: "payment_intent.payment_failed",
    paymentIntentId: paymentIntent.id,
  });
}

async function handleChargeRefunded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge;
  const amountRefunded =
    typeof charge.amount_refunded === "number" ? charge.amount_refunded : 0;

  if (amountRefunded <= 0) {
    return {
      ok: true,
      ignored: true,
      event: event.type,
      reason: "charge.amount_refunded is zero",
    };
  }

  const paymentIntentId = stringId(charge.payment_intent);

  return await revokeEntitlementByStripeIds({
    status: refundStatusForCharge(charge),
    reason: "charge.refunded",
    paymentIntentId,
  });
}

async function handleRefundEvent(event: Stripe.Event) {
  const refund = event.data.object as Stripe.Refund;
  const refundStatus = typeof refund.status === "string" ? refund.status : "";

  if (refundStatus && refundStatus !== "succeeded") {
    return {
      ok: true,
      ignored: true,
      event: event.type,
      reason: `refund.status=${refundStatus}`,
    };
  }

  let paymentIntentId = stringId(
    (refund as unknown as { payment_intent?: unknown }).payment_intent,
  );

  let status: EntitlementStatus = "refunded";

  if (!paymentIntentId) {
    const chargeId = stringId(refund.charge);
    const charge = await retrieveCharge(chargeId);
    paymentIntentId = charge ? stringId(charge.payment_intent) : "";

    if (charge) {
      status = refundStatusForCharge(charge);
    }
  }

  return await revokeEntitlementByStripeIds({
    status,
    reason: event.type,
    paymentIntentId,
  });
}

async function handleChargeDisputeCreated(event: Stripe.Event) {
  const dispute = event.data.object as Stripe.Dispute;
  const chargeId = stringId(dispute.charge);
  const charge = await retrieveCharge(chargeId);
  const paymentIntentId = charge ? stringId(charge.payment_intent) : "";

  return await revokeEntitlementByStripeIds({
    status: "manual_hold",
    reason: "charge.dispute.created",
    paymentIntentId,
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  if (!stripeSecretKey || !stripeWebhookSecret || !supabaseUrl || !supabaseSecretKey) {
    return json({
      ok: false,
      error: "Missing required environment secrets.",
    }, 500);
  }

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return json({ ok: false, error: "Missing Stripe signature." }, 400);
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      stripeWebhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (err) {
    return json({
      ok: false,
      error: `Webhook signature verification failed: ${errorMessage(err)}`,
    }, 400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        return json(await handleCheckoutSessionCompleted(event));

      case "checkout.session.expired":
        return json(await handleCheckoutSessionExpired(event));

      case "payment_intent.payment_failed":
        return json(await handlePaymentIntentFailed(event));

      case "charge.refunded":
        return json(await handleChargeRefunded(event));

      case "refund.created":
      case "refund.updated":
        return json(await handleRefundEvent(event));

      case "charge.dispute.created":
        return json(await handleChargeDisputeCreated(event));

      default:
        return json({
          ok: true,
          ignored: true,
          event: event.type,
        });
    }
  } catch (err) {
    return json({
      ok: false,
      event: event.type,
      error: errorMessage(err),
    }, 500);
  }
});