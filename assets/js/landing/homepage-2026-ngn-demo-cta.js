(function(){
  var VERSION = "nexusrn-2026-ngn-demo-cta-v1";
  var LABEL = "Free 2026 NCLEX NGN Practice Demo";
  var URL = "workspace-pro-curated/index.html";

  function txt(el){
    return (el && el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function install(){
    if (document.getElementById("nexusrn-2026-ngn-demo-cta")) return;

    var start = Array.from(document.querySelectorAll("a,button")).find(function(el){
      return /^Start Practicing Now$/i.test(txt(el));
    });

    if (!start || !start.parentElement) return;

    var a = document.createElement("a");
    a.id = "nexusrn-2026-ngn-demo-cta";
    a.href = URL;
    a.textContent = LABEL;
    a.setAttribute("aria-label", "Launch the free 2026 NCLEX NGN practice demo with curated sample items");
    a.setAttribute("data-nexus-demo-cta", "2026-nclex-ngn");
    a.style.cssText = [
      "display:inline-flex",
      "align-items:center",
      "justify-content:center",
      "gap:8px",
      "padding:16px 24px",
      "border-radius:12px",
      "border:1px solid rgba(45,212,191,.55)",
      "background:rgba(20,184,166,.10)",
      "color:inherit",
      "font-weight:900",
      "text-decoration:none",
      "min-height:56px",
      "box-shadow:0 14px 34px rgba(20,184,166,.12)"
    ].join(";");

    start.parentElement.insertBefore(a, start.nextSibling);
    document.documentElement.setAttribute("data-nexus-2026-ngn-demo-cta", "installed");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }

  setTimeout(install, 500);
  setTimeout(install, 1500);
  setTimeout(install, 3000);

  window.NEXUS_2026_NGN_DEMO_CTA_AUDIT = function(){
    var a = document.getElementById("nexusrn-2026-ngn-demo-cta");
    return {
      version: VERSION,
      exists: !!a,
      text: a ? txt(a) : null,
      href: a ? a.getAttribute("href") : null,
      visible: !!a && getComputedStyle(a).display !== "none" && getComputedStyle(a).visibility !== "hidden"
    };
  };
})();
