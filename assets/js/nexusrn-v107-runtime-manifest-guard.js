(function(){
  'use strict';
  var CANONICAL_DB = 'data/questions-current.json';
  var DB_PATTERN = /(?:^|\/)(questions(?:-[^?#]+)?\.json)(?:[?#].*)?$/i;
  window.NEXUS_MANIFEST = window.NEXUS_MANIFEST || {version:'v107-runtime-manifest', canonicalDb: CANONICAL_DB};
  window.NEXUS_CURRENT_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V107_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V106_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V101_CANONICAL_DB = CANONICAL_DB;

  window.NEXUS_V100_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V99_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V98_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V97_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V96_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V95_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V94_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V93_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V92_CANONICAL_DB = CANONICAL_DB;

  window.NEXUS_V97_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V96_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V95_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V94_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V93_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V92_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V101_FETCH_AUDIT = { canonicalDb: CANONICAL_DB, redirectedDbFetches: 0, passthroughFetches: 0, dbRequests: [] };

  window.NEXUS_V100_FETCH_AUDIT = window.NEXUS_V101_FETCH_AUDIT;
  window.NEXUS_V99_FETCH_AUDIT = window.NEXUS_V101_FETCH_AUDIT;
  window.NEXUS_V98_FETCH_AUDIT = window.NEXUS_V101_FETCH_AUDIT;
  window.NEXUS_V97_FETCH_AUDIT = window.NEXUS_V101_FETCH_AUDIT;
  window.NEXUS_V97_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V96_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V95_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V94_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V93_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V92_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  if (typeof window.fetch === 'function') {
    var nativeFetch = window.fetch.bind(window);
    var cachedDbTextPromise = null;
    function normalizeInput(input){
      if (typeof input === 'string') return input;
      if (input && typeof input.url === 'string') return input.url;
      return String(input || '');
    }
    function responseFromText(text){
      return new Response(text, { status: 200, headers: { 'Content-Type': 'application/json', 'X-NexusRN-DB': 'v107-runtime-manifest' } });
    }
    window.fetch = function(input, init){
      var url = normalizeInput(input);
      var clean = url.split('?')[0].split('#')[0];
      var canonicalClean = CANONICAL_DB.split('?')[0].split('#')[0];
      var isCanonicalRequest = clean === canonicalClean || clean.endsWith('/' + canonicalClean);
      if (DB_PATTERN.test(clean) && !isCanonicalRequest) {
        window.NEXUS_V101_FETCH_AUDIT.redirectedDbFetches++;
        window.NEXUS_V101_FETCH_AUDIT.dbRequests.push({ requested: url, served: CANONICAL_DB, at: new Date().toISOString() });
        if (!cachedDbTextPromise) {
          cachedDbTextPromise = nativeFetch(CANONICAL_DB, { cache: 'no-store' }).then(function(r){
            if (!r.ok) throw new Error('Canonical v105 DB failed: ' + r.status);
            return r.text();
          });
        }
        return cachedDbTextPromise.then(responseFromText);
      }
      window.NEXUS_V101_FETCH_AUDIT.passthroughFetches++;
      return nativeFetch(input, init);
    };
  }
  function runtimeAudit(){
    try { if (typeof window.NEXUS_EXPOSE_RUNTIME_STATE === 'function') window.NEXUS_EXPOSE_RUNTIME_STATE('runtime-audit'); } catch(e) {}
    var cases = [];
    var q = [];
    try { if (Array.isArray(window.CASESETS)) cases = window.CASESETS; } catch(e) {}
    try { if (!cases.length && typeof CASESETS !== 'undefined' && Array.isArray(CASESETS)) cases = CASESETS; } catch(e) {}
    try { if (Array.isArray(window.Q)) q = window.Q; } catch(e) {}
    try { if (!q.length && typeof Q !== 'undefined' && Array.isArray(Q)) q = Q; } catch(e) {}
    var ideal = cases.filter(function(c){ return String(c && c.caseId || '').indexOf('v84-ideal6q-') === 0; });
    var decisionTabs = Array.prototype.slice.call(document.querySelectorAll('.n101-tool, .n99-tab, [data-v91-tab], .v91-dl-tab, .v91-tab')).map(function(el){return (el.textContent||'').trim();}).filter(Boolean);
    return {
      version: 'v107-runtime-manifest',
      canonicalDb: CANONICAL_DB,
      dbFetchAudit: window.NEXUS_V101_FETCH_AUDIT,
      standaloneQuestions: q.length,
      caseSets: cases.length,
      importedIdealCases: ideal.length,
      expectedCaseSets: 448,
      browsePagerVisible: !!document.querySelector('.v90-pager,.v91-pager,.v92-pager,#nexusV90Pager,#nexusV91Pager'),
      decisionLabTabs: decisionTabs,
      inlineScriptsRemaining: document.querySelectorAll('script:not([src])').length,
      inlineStylesRemaining: document.querySelectorAll('style').length,
      localScriptTags: document.querySelectorAll('script[src^="assets/"]').length,
      note: 'v106 repairs the 16 single-best-answer multiple-key defects by converting them to Extended Multiple Response / Select N and holding them for educator review.'
    };
  }
  window.NEXUS_V101_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V100_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V99_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V98_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V97_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V96_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V95_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V94_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V93_RUNTIME_AUDIT = runtimeAudit;
  window.NEXUS_V92_RUNTIME_AUDIT = runtimeAudit;

try {
  window.NEXUS_V97_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V96_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V95_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V94_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V93_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V92_CANONICAL_DB = window.NEXUS_V98_CANONICAL_DB;
  window.NEXUS_V96_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V95_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V94_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V93_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V92_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
} catch(e) {}


try {
  window.NEXUS_V97_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V96_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V95_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V94_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V93_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V92_CANONICAL_DB = CANONICAL_DB;
  window.NEXUS_V97_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V96_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V95_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V94_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V93_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
  window.NEXUS_V92_FETCH_AUDIT = window.NEXUS_V98_FETCH_AUDIT;
} catch(e) {}

})();
try { window.NEXUS_V107_RUNTIME_AUDIT = window.NEXUS_V101_RUNTIME_AUDIT; } catch(e) {}
