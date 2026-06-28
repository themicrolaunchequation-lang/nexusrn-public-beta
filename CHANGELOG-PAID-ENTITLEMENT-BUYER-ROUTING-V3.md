# NexusRN — v3 SEO foundation hotfix (on top of v2 routing/SEO-file fixes)

Scope: domain-identity + crawlability fixes only. No changes to data-bank,
question content, answer keys, scoring, EHR data, demographics, or NCLEX items.
Routing (v2 protectedPaths/fixLinks) and sitemap.xml/robots.txt (v2) are unchanged.

## Changed files
- index.html
- vercel.json
- og-image.jpg  (NEW)

## index.html
1. Canonical fixed: <link rel=canonical> now https://healthqualityleader.com/
   (was https://nexusrn.com/ — the homepage was self-canonicalizing to a
   different, empty domain, contradicting the corrected sitemap).
2. og:url, og:image, twitter:url, twitter:image -> healthqualityleader.com.
3. JSON-LD Organization + WebApplication @id and url -> healthqualityleader.com.
   (All 9 nexusrn.com references removed; grep now returns 0.)
4. <title> changed to "NCLEX NGN Practice & Unfolding Case Studies | NexusRN"
   (removed weak "Public Preview" prefix).
5. meta description + twitter:description rewritten for keyword/CTR focus and to
   drop "public preview" framing.
6. Crawlable content fallback added INSIDE <div id="root">. React
   (createRoot().render()) replaces #root on mount, so JS users see no change,
   while non-JS crawlers now receive a real H1, value copy, NGN item-type list,
   the six CJMM steps, an illustrative sample, internal links, and the NCSBN
   non-affiliation/educational disclaimer — instead of an empty shell.
   The legacy trust strip remains but is now secondary in DOM order.

## vercel.json
- Added host-based 301 redirects to consolidate onto healthqualityleader.com:
  nexusrn.com, www.nexusrn.com, nexusrn.healthqualityleader.com,
  www.healthqualityleader.com  ->  https://healthqualityleader.com/:path*
  NOTE: these only fire if those hostnames are attached to THIS Vercel project.
  Also set healthqualityleader.com as the project's Primary domain so Vercel
  enforces the canonical host.

## og-image.jpg
- 1200x630 brand-consistent placeholder so the (previously missing) social card
  URL returns 200. Replace with a designed asset when available.

## Still requires source-repo work (cannot be done correctly on build output)
- True pre-render/SSG so the React hero matches the crawlable fallback exactly.
- Homepage H1/hero copy lives in the minified React bundle; the #root fallback
  is an interim crawlability fix, not a substitute for prerendering from source.
- E-E-A-T trust pages (/about, /methodology, /editorial-policy, /content-review).

## Post-deploy verification
- grep -c "nexusrn.com" index.html            -> 0
- curl -sI https://healthqualityleader.com/og-image.jpg | head -1   -> 200
- curl -sI https://nexusrn.com/ | grep -i location  -> healthqualityleader.com
- GSC URL Inspection -> Test live URL -> rendered HTML shows the H1 + canonical.
