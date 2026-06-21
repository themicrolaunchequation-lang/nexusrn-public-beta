(function(){
  'use strict';
  var VERSION = 'v119-educator-governance-console';
  var SOURCE = 'v118b-observability-loader-fix';

  window.NEXUS_EDUCATOR_REVIEW_EVENTS = window.NEXUS_EDUCATOR_REVIEW_EVENTS || [];
  window.NEXUS_RELEASE_DECISIONS = window.NEXUS_RELEASE_DECISIONS || [];

  function now(){ return new Date().toISOString(); }
  function safeCall(fnName){
    try {
      if (typeof window[fnName] === 'function') return window[fnName]();
    } catch (err) {
      window.NEXUS_EDUCATOR_REVIEW_EVENTS.push({at: now(), type:'audit-call-error', fn: fnName, message: String(err && err.message || err)});
    }
    return null;
  }
  function scriptSources(){ return Array.prototype.slice.call(document.querySelectorAll('script[src]')).map(function(s){ return s.getAttribute('src') || ''; }); }
  function countDomainScripts(srcs){ return srcs.filter(function(s){ return /assets\/js\/packages\/nexus-(preflight|app-runtime|runtime-scaffold|package-audit)\.pkg\.js/.test(s); }).length; }
  function hasScript(srcs, name){ return srcs.some(function(s){ return s.indexOf(name) !== -1; }); }
  function latestAuditBundle(){
    var v118 = safeCall('NEXUS_V118_OBSERVABILITY_AUDIT');
    var v117 = safeCall('NEXUS_V117_GOVERNANCE_AUDIT');
    var p3 = safeCall('NEXUS_V116_PACKAGED_P3_AUDIT');
    var v116 = safeCall('NEXUS_V116_RUNTIME_AUDIT');
    var v115 = safeCall('NEXUS_V115_RUNTIME_AUDIT') || safeCall('NEXUS_V115_FINAL_QA_AUDIT');
    return {v118:v118, v117:v117, p3:p3, v116:v116, v115:v115};
  }
  function metric(bundle, key, fallback){
    var order = ['v118','v117','p3','v116','v115'];
    for (var i=0;i<order.length;i++){
      var obj = bundle[order[i]];
      if (obj && Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
    }
    return fallback;
  }
  function buildReleaseGate(bundle){
    var unsafe = metric(bundle,'unsafeScoringDefectsRemaining',0);
    var p0 = metric(bundle,'p0StillPracticeReady',0);
    var qdb = metric(bundle,'questionDbMutated',false);
    var standalone = metric(bundle,'standaloneQuestions',0);
    var cases = metric(bundle,'caseSets',0);
    var ideal = metric(bundle,'importedIdealCases',0);
    return {
      pass: unsafe === 0 && p0 === 0 && qdb === false && standalone === 10744 && cases === 448 && ideal === 51,
      checks: {
        unsafeScoringDefectsRemaining: unsafe,
        p0StillPracticeReady: p0,
        questionDbMutated: qdb,
        standaloneQuestions: standalone,
        caseSets: cases,
        importedIdealCases: ideal
      }
    };
  }

  function audit(){
    var srcs = scriptSources();
    var bundle = latestAuditBundle();
    var gate = buildReleaseGate(bundle);
    var result = {
      version: VERSION,
      sourceCheckpoint: SOURCE,
      activeScriptTags: srcs.length,
      expectedScriptTags: 7,
      domainPackageScripts: countDomainScripts(srcs),
      governanceScriptLoaded: hasScript(srcs,'nexus-governance.pkg.js'),
      observabilityScriptLoaded: hasScript(srcs,'nexus-observability.pkg.js'),
      educatorGovernanceLoaded: true,
      releaseGatePass: gate.pass,
      releaseGateChecks: gate.checks,
      runtimeErrorCount: (window.NEXUS_RUNTIME_ERRORS || []).length,
      educatorReviewEventCount: window.NEXUS_EDUCATOR_REVIEW_EVENTS.length,
      releaseDecisionCount: window.NEXUS_RELEASE_DECISIONS.length,
      remainingGenericStyleFlags: metric(bundle,'remainingGenericStyleFlags',612),
      p0QuarantinedItems: metric(bundle,'p0QuarantinedItems',270),
      matrixAuthenticityItemsNormalized: metric(bundle,'matrixAuthenticityItemsNormalized',186),
      underlyingAuditsAvailable: {
        v118: !!bundle.v118,
        v117: !!bundle.v117,
        p3: !!bundle.p3,
        v116: !!bundle.v116,
        v115: !!bundle.v115
      },
      scriptSources: srcs,
      notes: [
        'v119 adds an educator governance console and release-decision audit layer.',
        'No question DB mutation.',
        'No runtime-domain merge attempted.'
      ]
    };
    console.log(result);
    return result;
  }

  function ensureStyles(){
    if (document.getElementById('nexus-educator-governance-style')) return;
    var css = document.createElement('style');
    css.id = 'nexus-educator-governance-style';
    css.textContent = [
      '#nexus-educator-console-btn{position:fixed;right:18px;bottom:18px;z-index:99998;border:1px solid rgba(20,184,166,.35);background:#0f766e;color:white;border-radius:999px;padding:10px 14px;font:700 12px system-ui;letter-spacing:.08em;box-shadow:0 10px 30px rgba(15,118,110,.22);cursor:pointer}',
      '#nexus-educator-console{position:fixed;right:18px;bottom:70px;width:min(520px,calc(100vw - 36px));max-height:72vh;overflow:auto;z-index:99999;background:rgba(255,255,255,.98);border:1px solid rgba(15,118,110,.25);border-radius:20px;box-shadow:0 18px 60px rgba(2,6,23,.18);padding:16px;color:#0f172a;font:14px system-ui;display:none}',
      '#nexus-educator-console.open{display:block}',
      '#nexus-educator-console h2{margin:0 0 8px;font-size:18px}',
      '#nexus-educator-console .muted{color:#64748b;font-size:12px;line-height:1.45}',
      '#nexus-educator-console .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}',
      '#nexus-educator-console .card{border:1px solid #dbeafe;border-radius:14px;padding:10px;background:#f8fafc}',
      '#nexus-educator-console .label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}',
      '#nexus-educator-console .value{font-size:18px;font-weight:800;margin-top:3px}',
      '#nexus-educator-console button{border:1px solid #99f6e4;background:#ecfeff;border-radius:12px;padding:9px 10px;margin:4px;cursor:pointer;font-weight:700;color:#0f766e}',
      '#nexus-educator-console pre{background:#0f172a;color:#e2e8f0;border-radius:14px;padding:10px;white-space:pre-wrap;font-size:11px;max-height:220px;overflow:auto}'
    ].join('\n');
    document.head.appendChild(css);
  }

  function renderConsole(){
    ensureStyles();
    var existing = document.getElementById('nexus-educator-console');
    if (!existing) {
      var panel = document.createElement('div');
      panel.id = 'nexus-educator-console';
      document.body.appendChild(panel);
      var btn = document.createElement('button');
      btn.id = 'nexus-educator-console-btn';
      btn.textContent = 'Educator Console';
      btn.onclick = function(){
        panel.classList.toggle('open');
        updatePanel(panel);
      };
      document.body.appendChild(btn);
    } else {
      updatePanel(existing);
    }
  }

  function updatePanel(panel){
    var a = audit();
    var checks = a.releaseGateChecks || {};
    panel.innerHTML = ''+
      '<h2>Educator Governance Console</h2>'+
      '<div class="muted">v119 foundation: release gate, review queues, runtime health, and audit visibility. This is a governance overlay only; it does not edit the question database.</div>'+
      '<div class="grid">'+
      card('Release Gate', a.releaseGatePass ? 'PASS' : 'HOLD')+
      card('Scripts', a.activeScriptTags + ' / ' + a.expectedScriptTags)+
      card('Questions', checks.standaloneQuestions || 0)+
      card('Cases', checks.caseSets || 0)+
      card('Ideal Cases', checks.importedIdealCases || 0)+
      card('Runtime Errors', a.runtimeErrorCount)+
      card('P0 Practice Ready', checks.p0StillPracticeReady)+
      card('Generic Style Flags', a.remainingGenericStyleFlags)+
      '</div>'+
      '<button id="nexus-run-v119-audit">Run Audit</button>'+
      '<button id="nexus-copy-v119-audit">Copy Audit JSON</button>'+
      '<button id="nexus-record-review-event">Record Review Checkpoint</button>'+
      '<pre id="nexus-v119-audit-output"></pre>';
    panel.querySelector('#nexus-v119-audit-output').textContent = JSON.stringify(a,null,2);
    panel.querySelector('#nexus-run-v119-audit').onclick = function(){ updatePanel(panel); };
    panel.querySelector('#nexus-copy-v119-audit').onclick = function(){
      var text = JSON.stringify(a,null,2);
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
    };
    panel.querySelector('#nexus-record-review-event').onclick = function(){
      window.NEXUS_EDUCATOR_REVIEW_EVENTS.push({at: now(), type:'manual-review-checkpoint', releaseGatePass:a.releaseGatePass, checks:a.releaseGateChecks});
      updatePanel(panel);
    };
  }
  function card(label, value){ return '<div class="card"><div class="label">'+escapeHtml(label)+'</div><div class="value">'+escapeHtml(String(value))+'</div></div>'; }
  function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c];}); }

  window.NEXUS_V119_EDUCATOR_GOVERNANCE_AUDIT = audit;
  window.NEXUS_OPEN_EDUCATOR_CONSOLE = function(){ renderConsole(); var p=document.getElementById('nexus-educator-console'); if(p) p.classList.add('open'); };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderConsole);
  else renderConsole();

  window.NEXUS_EDUCATOR_REVIEW_EVENTS.push({at: now(), type:'v119-loaded', version:VERSION});
  console.log('[v119] educator governance console loaded');
})();
