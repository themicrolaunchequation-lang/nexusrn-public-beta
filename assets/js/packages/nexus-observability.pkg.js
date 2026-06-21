(function(){
  'use strict';
  var VERSION = 'v118-observability-foundation';
  var START = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  window.NEXUS_RUNTIME_ERRORS = window.NEXUS_RUNTIME_ERRORS || [];
  window.NEXUS_PERFORMANCE_MARKS = window.NEXUS_PERFORMANCE_MARKS || [];
  window.NEXUS_HEALTH_EVENTS = window.NEXUS_HEALTH_EVENTS || [];

  function now(){ return (typeof performance !== 'undefined' && performance.now) ? Math.round(performance.now()*100)/100 : Date.now(); }
  function pushLimited(arr, item, max){ arr.push(item); while(arr.length > max) arr.shift(); return item; }
  function captureError(type, payload){
    return pushLimited(window.NEXUS_RUNTIME_ERRORS, Object.assign({ type:type, ts: now(), version: VERSION }, payload || {}), 200);
  }
  function mark(name, data){
    return pushLimited(window.NEXUS_PERFORMANCE_MARKS, { name:name, ts:now(), data:data || null }, 500);
  }
  function event(name, data){
    return pushLimited(window.NEXUS_HEALTH_EVENTS, { name:name, ts:now(), data:data || null }, 500);
  }

  if (!window.__NEXUS_V118_ERROR_HOOKS_INSTALLED__) {
    window.__NEXUS_V118_ERROR_HOOKS_INSTALLED__ = true;
    window.addEventListener('error', function(e){
      captureError('window.error', {
        message: e && e.message || null,
        source: e && e.filename || null,
        line: e && e.lineno || null,
        col: e && e.colno || null,
        error: e && e.error && (e.error.stack || e.error.message) || null
      });
    });
    window.addEventListener('unhandledrejection', function(e){
      captureError('unhandledrejection', { reason: e && e.reason && (e.reason.stack || e.reason.message || String(e.reason)) || null });
    });
  }

  function scriptSources(){ return Array.from(document.querySelectorAll('script[src]')).map(function(s){ return s.getAttribute('src'); }); }
  function safeCall(name){
    try { return (typeof window[name] === 'function') ? window[name]() : null; }
    catch(err){ return { error: String(err && err.message || err), functionName:name }; }
  }
  function navTiming(){
    try {
      var nav = performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (!nav) return null;
      return {
        domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
        loadCompleteMs: Math.round(nav.loadEventEnd),
        transferSize: nav.transferSize || null,
        encodedBodySize: nav.encodedBodySize || null,
        decodedBodySize: nav.decodedBodySize || null
      };
    } catch(e){ return null; }
  }
  function resourceSummary(){
    try {
      var entries = performance && performance.getEntriesByType ? performance.getEntriesByType('resource') : [];
      var scripts = entries.filter(function(e){ return /\.js(\?|$)/.test(e.name); });
      var data = entries.filter(function(e){ return /\/data\//.test(e.name); });
      return {
        resourceCount: entries.length,
        scriptResourceCount: scripts.length,
        dataResourceCount: data.length,
        slowResources: entries.filter(function(e){ return e.duration > 500; }).map(function(e){ return { name:e.name.split('/').slice(-2).join('/'), durationMs:Math.round(e.duration) }; }).slice(0,20)
      };
    } catch(e){ return null; }
  }

  mark('v118-observability-loaded', { scripts: scriptSources().length });
  event('v118-observability-ready', { version: VERSION });

  window.NEXUS_MARK = mark;
  window.NEXUS_HEALTH_EVENT = event;
  window.NEXUS_CAPTURE_ERROR = captureError;

  window.NEXUS_V118_OBSERVABILITY_AUDIT = function(){
    var v117 = safeCall('NEXUS_V117_GOVERNANCE_AUDIT');
    var v115 = safeCall('NEXUS_V115_RUNTIME_AUDIT') || safeCall('NEXUS_V115_FINAL_QA_AUDIT');
    var v116 = safeCall('NEXUS_V116_RUNTIME_AUDIT');
    var sources = scriptSources();
    var obsLoaded = sources.some(function(s){ return /assets\/js\/packages\/nexus-observability\.pkg\.js$/.test(s); });
    var result = {
      version: VERSION,
      sourceCheckpoint: 'v117-governance-foundation',
      activeScriptTags: sources.length,
      expectedScriptTags: 6,
      domainPackageScripts: sources.filter(function(s){ return /assets\/js\/packages\/nexus-(preflight|app-runtime|runtime-scaffold|package-audit)\.pkg\.js$/.test(s); }).length,
      governanceScriptLoaded: sources.some(function(s){ return /assets\/js\/packages\/nexus-governance\.pkg\.js$/.test(s); }),
      observabilityScriptLoaded: obsLoaded,
      runtimeErrorCount: window.NEXUS_RUNTIME_ERRORS.length,
      performanceMarkCount: window.NEXUS_PERFORMANCE_MARKS.length,
      healthEventCount: window.NEXUS_HEALTH_EVENTS.length,
      navigationTiming: navTiming(),
      resourceSummary: resourceSummary(),
      v117AuditAvailable: !!v117,
      v115AuditAvailable: !!v115,
      v116AuditAvailable: !!v116,
      standaloneQuestions: (v117 && v117.standaloneQuestions) || (v115 && v115.standaloneQuestions) || null,
      caseSets: (v117 && v117.caseSets) || (v115 && v115.caseSets) || null,
      importedIdealCases: (v117 && v117.importedIdealCases) || (v115 && v115.importedIdealCases) || null,
      questionDbMutated: false,
      releaseGatePass: false,
      notes: [
        'v118 adds observability only: runtime error capture, performance marks, and health events.',
        'No question DB mutation.',
        'No runtime-domain merge attempted.'
      ],
      underlyingAudits: { v117:v117, v115:v115, v116:v116 },
      scriptSources: sources
    };
    result.releaseGatePass = (
      result.activeScriptTags === 6 &&
      result.domainPackageScripts === 4 &&
      result.governanceScriptLoaded === true &&
      result.observabilityScriptLoaded === true &&
      result.v117AuditAvailable === true &&
      result.v115AuditAvailable === true &&
      result.v116AuditAvailable === true &&
      result.standaloneQuestions === 10744 &&
      result.caseSets === 448 &&
      result.importedIdealCases === 51 &&
      result.questionDbMutated === false
    );
    return result;
  };
})();
