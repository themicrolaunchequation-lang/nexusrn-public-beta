import Stripe from "https://esm.sh/stripe@18.0.0?target=deno";

const ALLOWED_ORIGIN = "https://healthqualityleader.com";

const EXPECTED_AMOUNT_TOTAL = 3000;
const EXPECTED_CURRENCY = "usd";
const EXPECTED_MODE = "payment";
const EXPECTED_LIVEMODE = true;

const GOOGLE_ADS_VALUE = 112.50;
const GOOGLE_ADS_CURRENCY = "SAR";

const SESSION_ID_PATTERN = /^cs_(?:live|test)_[A-Za-z0-9]+$/;

const responseHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "Vary": "Origin",
  "X-Content-Type-Options": "nosniff",
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

async function createTransactionId(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (request: Request): Promise<Response> => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    if (origin !== ALLOWED_ORIGIN) {
      return jsonResponse({ verified: false }, 403);
    }

    return new Response(null, {
      status: 204,
      headers: responseHeaders,
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ verified: false }, 405);
  }

  if (origin !== ALLOWED_ORIGIN) {
    return jsonResponse({ verified: false }, 403);
  }

  const contentType =
    request.headers.get("content-type")?.toLowerCase() ?? "";

  if (!contentType.includes("application/json")) {
    return jsonResponse({ verified: false }, 415);
  }

  const rawBody = await request.text();

  if (rawBody.length === 0 || rawBody.length > 2048) {
    return jsonResponse({ verified: false }, 400);
  }

  let payload: { session_id?: unknown };

  try {
    payload = JSON.parse(rawBody) as { session_id?: unknown };
  } catch {
    return jsonResponse({ verified: false }, 400);
  }

  const sessionId =
    typeof payload.session_id === "string"
      ? payload.session_id.trim()
      : "";

  if (
    sessionId.length > 255 ||
    !SESSION_ID_PATTERN.test(sessionId)
  ) {
    return jsonResponse({ verified: false }, 400);
  }

  const stripeSecretKey =
    Deno.env.get("STRIPE_SECRET_KEY")?.trim();

  const expectedPaymentLinkId =
    Deno.env.get("STRIPE_PAYMENT_LINK_ID")?.trim();

  if (!stripeSecretKey || !expectedPaymentLinkId) {
    console.error(
      "Stripe purchase verification configuration is incomplete.",
    );

    return jsonResponse({ verified: false }, 503);
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-03-31.basil",
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    const paymentLinkId =
      typeof session.payment_link === "string"
        ? session.payment_link
        : session.payment_link?.id ?? null;

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    const paymentIntent = paymentIntentId
      ? await stripe.paymentIntents.retrieve(paymentIntentId, {
          expand: ["latest_charge"],
        })
      : null;

    const latestCharge =
      paymentIntent &&
      typeof paymentIntent.latest_charge !== "string"
        ? paymentIntent.latest_charge
        : null;

    const refunds = latestCharge
      ? await stripe.refunds.list({
          charge: latestCharge.id,
          limit: 100,
        })
      : null;

    const hasBlockingRefund =
      refunds === null ||
      refunds.has_more === true ||
      refunds.data.some(
        (refund: { status: string | null }) =>
          refund.status !== "failed" &&
          refund.status !== "canceled",
      );

    const verified =
      session.livemode === EXPECTED_LIVEMODE &&
      session.mode === EXPECTED_MODE &&
      session.status === "complete" &&
      session.payment_status === "paid" &&
      session.amount_total === EXPECTED_AMOUNT_TOTAL &&
      session.currency?.toLowerCase() === EXPECTED_CURRENCY &&
      paymentLinkId === expectedPaymentLinkId &&
      paymentIntent !== null &&
      paymentIntent.livemode === EXPECTED_LIVEMODE &&
      paymentIntent.status === "succeeded" &&
      paymentIntent.amount === EXPECTED_AMOUNT_TOTAL &&
      paymentIntent.amount_received === EXPECTED_AMOUNT_TOTAL &&
      paymentIntent.currency.toLowerCase() === EXPECTED_CURRENCY &&
      latestCharge !== null &&
      latestCharge.livemode === EXPECTED_LIVEMODE &&
      latestCharge.status === "succeeded" &&
      latestCharge.paid === true &&
      latestCharge.captured === true &&
      latestCharge.disputed === false &&
      latestCharge.amount === EXPECTED_AMOUNT_TOTAL &&
      latestCharge.amount_captured === EXPECTED_AMOUNT_TOTAL &&
      latestCharge.amount_refunded === 0 &&
      latestCharge.refunded === false &&
      latestCharge.currency.toLowerCase() === EXPECTED_CURRENCY &&
      hasBlockingRefund === false;

    if (!verified) {
      return jsonResponse({ verified: false });
    }

    const transactionId =
      await createTransactionId(session.id);

    return jsonResponse({
      verified: true,
      transaction_id: transactionId,
      value: GOOGLE_ADS_VALUE,
      currency: GOOGLE_ADS_CURRENCY,
    });
  } catch (error) {
    console.error(
      "Stripe Checkout Session verification failed.",
      error instanceof Error ? error.name : "UnknownError",
    );

    return jsonResponse({ verified: false }, 502);
  }
});