// NexusRN v121c Master Audit + Release-Aligned Diagnostics
(function(){
  'use strict';
  var VERSION = 'v121c-master-audit-release-aligned-cache-safe';
  var SOURCE = 'v121b-release-candidate-audit-aligned';
  function now(){ return new Date().toISOString(); }
  function scripts(){ return Array.prototype.slice.call(document.querySelectorAll('script[src]')).map(function(s){return s.getAttribute('src')||'';}); }
  function countDomainScripts(srcs){ return srcs.filter(function(s){return /nexus-(preflight|app-runtime|runtime-scaffold|package-audit)\.pkg\.js/.test(s);}).length; }
  function has(srcs, name){ return srcs.some(function(s){ return s.indexOf(name) !== -1; }); }
  function quietCall(fn){
    if (typeof fn !== 'function') return null;
    var originalLog = console.log;
    try {
      console.log = function(){};
      return fn();
    } catch (e) {
      if (!window.NEXUS_RUNTIME_ERRORS) window.NEXUS_RUNTIME_ERRORS = [];
      window.NEXUS_RUNTIME_ERRORS.push({at: now(), source:'v121b-master-audit', message:e && e.message ? e.message : String(e)});
      return {error:true, message:e && e.message ? e.message : String(e)};
    } finally {
      console.log = originalLog;
    }
  }
  function firstMetric(bundle, key, fallback){
    var order=['v119','v118','v117','p3','v116','v115'];
    for (var i=0;i<order.length;i++){
      var o=bundle[order[i]];
      if (o && Object.prototype.hasOwnProperty.call(o,key)) return o[key];
      if (o && o.releaseGateChecks && Object.prototype.hasOwnProperty.call(o.releaseGateChecks,key)) return o.releaseGateChecks[key];
    }
    return fallback;
  }
  function collectAudits(){
    return {
      v115: quietCall(window.NEXUS_V115_RUNTIME_AUDIT || window.NEXUS_V115_FINAL_QA_AUDIT),
      v116: quietCall(window.NEXUS_V116_RUNTIME_AUDIT),
      p3: quietCall(window.NEXUS_V116_PACKAGED_P3_AUDIT),
      v117: quietCall(window.NEXUS_V117_GOVERNANCE_AUDIT),
      v118: quietCall(window.NEXUS_V118_OBSERVABILITY_AUDIT),
      v119: quietCall(window.NEXUS_V119_EDUCATOR_GOVERNANCE_AUDIT)
    };
  }
  function buildGate(bundle, srcs){
    var q=firstMetric(bundle,'standaloneQuestions',0);
    var c=firstMetric(bundle,'caseSets',0);
    var ideal=firstMetric(bundle,'importedIdealCases',0);
    var p0=firstMetric(bundle,'p0StillPracticeReady',0);
    var unsafe=firstMetric(bundle,'unsafeScoringDefectsRemaining',0);
    var errors=(window.NEXUS_RUNTIME_ERRORS||[]).length;
    var checks={
      scriptCountIsNine: srcs.length===9,
      domainScriptsAreFour: countDomainScripts(srcs)===4,
      governanceLoaded: has(srcs,'nexus-governance.pkg.js'),
      observabilityLoaded: has(srcs,'nexus-observability.pkg.js'),
      educatorGovernanceLoaded: has(srcs,'nexus-educator-governance.pkg.js'),
      masterAuditLoaded: (has(srcs,'nexus-master-audit.pkg.js') || has(srcs,'nexus-master-audit-v121c.pkg.js')),
      standaloneQuestionsStable: q===10744,
      caseSetsStable: c===448,
      idealCasesStable: ideal===51,
      noP0PracticeReady: p0===0,
      noUnsafeScoringDefects: unsafe===0,
      runtimeErrorsZero: errors===0
    };
    return {pass:Object.keys(checks).every(function(k){return checks[k]===true;}), checks:checks, metrics:{standaloneQuestions:q,caseSets:c,importedIdealCases:ideal,p0StillPracticeReady:p0,unsafeScoringDefectsRemaining:unsafe,runtimeErrorCount:errors}};
  }
  function audit(){
    var srcs=scripts();
    var bundle=collectAudits();
    var gate=buildGate(bundle, srcs);
    var result={
      version: VERSION,
      sourceCheckpoint: SOURCE,
      activeScriptTags: srcs.length,
      expectedScriptTags: 9,
      domainPackageScripts: countDomainScripts(srcs),
      quietAuditMode: true,
      masterAuditLoaded: true,
      governanceScriptLoaded: has(srcs,'nexus-governance.pkg.js'),
      observabilityScriptLoaded: has(srcs,'nexus-observability.pkg.js'),
      educatorGovernanceLoaded: has(srcs,'nexus-educator-governance.pkg.js'),
      releaseGatePass: gate.pass,
      releaseGateChecks: gate.checks,
      releaseGateMetrics: gate.metrics,
      standaloneQuestions: gate.metrics.standaloneQuestions,
      caseSets: gate.metrics.caseSets,
      importedIdealCases: gate.metrics.importedIdealCases,
      p0StillPracticeReady: gate.metrics.p0StillPracticeReady,
      unsafeScoringDefectsRemaining: gate.metrics.unsafeScoringDefectsRemaining,
      runtimeErrorCount: gate.metrics.runtimeErrorCount,
      performanceMarkCount: (window.NEXUS_PERFORMANCE_MARKS||[]).length,
      healthEventCount: (window.NEXUS_HEALTH_EVENTS||[]).length,
      educatorReviewEventCount: (window.NEXUS_EDUCATOR_REVIEW_EVENTS||[]).length,
      questionDbMutated: false,
      underlyingAuditsAvailable: {
        v115: !!bundle.v115 && !bundle.v115.error,
        v116: !!bundle.v116 && !bundle.v116.error,
        p3: !!bundle.p3 && !bundle.p3.error,
        v117: !!bundle.v117 && !bundle.v117.error,
        v118: !!bundle.v118 && !bundle.v118.error,
        v119: !!bundle.v119 && !bundle.v119.error
      },
      scriptSources: srcs,
      notes: [
        'v121c uses a renamed master-audit file to avoid browser cache and aligns NEXUS_AUDIT with the 9-script release-candidate deploy.',
        'No question DB mutation.',
        'No runtime-domain merge attempted.'
      ]
    };
    console.log(result);
    return result;
  }
  function ensurePanel(){
    if (document.getElementById('nexus-master-audit-style')) return;
    var css=document.createElement('style');
    css.id='nexus-master-audit-style';
    css.textContent='#nexus-master-audit-btn{position:fixed;left:18px;bottom:18px;z-index:99998;border:1px solid rgba(37,99,235,.35);background:#1d4ed8;color:#fff;border-radius:999px;padding:10px 14px;font:700 12px system-ui;letter-spacing:.08em;box-shadow:0 10px 30px rgba(29,78,216,.22);cursor:pointer}#nexus-master-audit-panel{position:fixed;left:18px;bottom:70px;width:min(560px,calc(100vw - 36px));max-height:72vh;overflow:auto;z-index:99999;background:rgba(255,255,255,.98);border:1px solid rgba(37,99,235,.25);border-radius:20px;box-shadow:0 18px 60px rgba(2,6,23,.18);padding:16px;color:#0f172a;font:14px system-ui;display:none}#nexus-master-audit-panel.open{display:block}#nexus-master-audit-panel h2{margin:0 0 8px;font-size:18px}#nexus-master-audit-panel .muted{color:#64748b;font-size:12px}#nexus-master-audit-panel pre{background:#0f172a;color:#e2e8f0;border-radius:14px;padding:10px;white-space:pre-wrap;font-size:11px;max-height:320px;overflow:auto}';
    document.head.appendChild(css);
  }
  function openPanel(){
    ensurePanel();
    var p=document.getElementById('nexus-master-audit-panel');
    if(!p){ p=document.createElement('div'); p.id='nexus-master-audit-panel'; document.body.appendChild(p); }
    var a=audit();
    p.innerHTML='<h2>NexusRN Master Audit</h2><div class="muted">One command for release-gate, runtime, governance, observability, and educator-console health.</div><pre>'+escapeHtml(JSON.stringify(a,null,2))+'</pre>';
    p.classList.add('open');
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function addButton(){
    ensurePanel();
    if(document.getElementById('nexus-master-audit-btn')) return;
    var b=document.createElement('button'); b.id='nexus-master-audit-btn'; b.textContent='Master Audit'; b.onclick=openPanel; document.body.appendChild(b);
  }
  window.NEXUS_V120_MASTER_AUDIT=audit;
  window.NEXUS_V121B_MASTER_AUDIT=audit;
  window.NEXUS_V121C_MASTER_AUDIT=audit;
  window.NEXUS_AUDIT=audit;
  window.NEXUS_OPEN_MASTER_AUDIT=openPanel;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', addButton); else addButton();
  if(!window.NEXUS_HEALTH_EVENTS) window.NEXUS_HEALTH_EVENTS=[];
  window.NEXUS_HEALTH_EVENTS.push({at:now(), type:'v121c-loaded', version:VERSION});
  console.log('[v121c] master audit release-aligned cache-safe loaded');
})();
