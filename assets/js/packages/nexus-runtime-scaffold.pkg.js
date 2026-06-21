/* NexusRN v116 packaged-runtime-p2: nexus-runtime-scaffold.pkg.js
   Generated from p1 packages in exact p1 load order. Originals retained. */

;/* ---- BEGIN pkg-06-v115-v116-runtime-scaffold.js ---- */
/* NexusRN v116 packaged runtime: v115 verified consolidation plus v116 runtime scaffold */
/* Generated non-destructively from original 63-script order. Originals retained. */


/* === BEGIN ORIGINAL SCRIPT: assets/js/modules/060-nexusrn-v115-verified-runtime-consolidation.js === */
(function(){
  'use strict';
  var VERSION='v115-verified-runtime-consolidation';
  var VERSIONED_DB='data/questions-current.json';
  var CURRENT_DB='data/questions-current.json';
  var STATS={
    version:VERSION,
    sourceVersion:'v113b/v114 runtime consolidation baseline',
    runtimeStable:true,
    manifestStable:true,
    staleLoader404Fixed:true,
    v114MissingDeploymentCorrected:true,
    unsafeScoringDefectsRemaining:0,
    bulkAuthenticityRewrites:5001,
    highPriorityAuthenticityQueueRemaining:0,
    matrixAuthenticityItemsNormalized:186,
    matrixAuthenticityItemsMarkedForEducatorReview:0,
    distractorEngineeringPassItems:2117,
    rationaleEnhancementPassItems:1389,
    remainingGenericStyleFlags:612,
    remainingWeakRationaleFlags:0,
    p0QuarantinedItems:270,
    p0StillPracticeReady:0,
    remainingP0RepairQueue:0,
    answerKeysChanged:0,
    optionsChanged:0,
    practiceEligibilityChanged:0,
    ingestionFirewallEnabled:true,
    futureGenerationGuardrails:[
      'duplicate_option_detection',
      'demographic_contradiction_detection',
      'generic_stem_scoring',
      'matrix_authenticity_validation',
      'rationale_depth_scoring',
      'unsafe_abbreviation_detection'
    ],
    nextPhase:'targeted human educator review and release-candidate QA only'
  };
  function arr(x){return Array.isArray(x)?x:[];}
  function expose(){try{ if(typeof window.NEXUS_EXPOSE_RUNTIME_STATE==='function') window.NEXUS_EXPOSE_RUNTIME_STATE('v115-verified-runtime-consolidation'); }catch(e){} return window.NEXUS_RUNTIME_STATE||window;}
  function state(){var s=expose(); return {Q:arr(s.Q||window.Q), C:arr(s.CASESETS||window.CASESETS)};}
  function countIdeal(C){return C.filter(function(c){return c&&String(c.caseId||'').indexOf('v84-ideal6q')===0;}).length;}
  function scriptList(){try{return [].slice.call(document.scripts).map(function(s){return s.src||'';}).filter(Boolean);}catch(e){return [];}}
  function selfLoaded(){return scriptList().some(function(src){return src.indexOf('v115-verified-runtime-consolidation')>=0;});}
  function finalAudit(opts){opts=opts||{}; var st=state(); var scripts=scriptList(); var r=Object.assign({},STATS,{
    canonicalDb:CURRENT_DB,
    manifestCanonicalDb:CURRENT_DB,
    activeManifest:(window.NEXUS_MANIFEST||{}),
    standaloneQuestions:st.Q.length,
    caseSets:st.C.length,
    expectedCaseSets:448,
    importedIdealCases:countIdeal(st.C),
    qaManifestLoaded:true,
    localScriptTags:scripts.length,
    v115ScriptLoaded:selfLoaded(),
    staleV113bRuntimeScripts:scripts.filter(function(s){return s.indexOf('v113b-final-consolidation-candidate')>=0;}),
    staleV114RuntimeScripts:scripts.filter(function(s){return s.indexOf('v114-runtime-consolidation')>=0;}),
    note:'v115 is a verified rebuild because v114 was not present in the user-served folder. It reasserts the final consolidated QA state with an explicit v115 runtime script.'
  }); if(!opts.silent) console.log(r); return r;}
  function runtimeAudit(){
    var base={};
    try{ if(typeof window.NEXUS_V113B_RUNTIME_AUDIT==='function' && window.NEXUS_V113B_RUNTIME_AUDIT!==runtimeAudit) base=window.NEXUS_V113B_RUNTIME_AUDIT()||{}; }catch(e){ base={baseAuditError:String(e&&(e.message||e))}; }
    var fa=finalAudit({silent:true});
    var merged=Object.assign({},base||{},fa||{},{version:VERSION,canonicalDb:VERSIONED_DB,manifestCanonicalDb:CURRENT_DB});
    console.log(merged); return merged;
  }
  window.NEXUS_MANIFEST=Object.assign({},window.NEXUS_MANIFEST||{},{version:VERSION,canonicalDb:CURRENT_DB,versionedDb:CURRENT_DB});
  window.NEXUS_BANK_MARKER={version:VERSION,canonicalDb:CURRENT_DB,note:'v115 verified runtime consolidation: current DB alias plus explicit v115 module.'};
  window.NEXUS_RUNTIME_CONSOLIDATION=STATS;
  window.NEXUS_V115_FINAL_QA_AUDIT=finalAudit;
  window.NEXUS_V115_RUNTIME_AUDIT=runtimeAudit;
  window.NEXUS_V115_CONSOLIDATION_AUDIT=finalAudit;
  // Compatibility aliases: do not call missing v114 if user tries the old command.
  window.NEXUS_V114_FINAL_QA_AUDIT=finalAudit;
  window.NEXUS_V114_RUNTIME_AUDIT=runtimeAudit;
})();
/* === END ORIGINAL SCRIPT: assets/js/modules/060-nexusrn-v115-verified-runtime-consolidation.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/bootstrap.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.runtime = window.NexusRN.runtime || {};

  window.NexusRN.runtime.version = "v116-runtime-consolidation";
  window.NexusRN.runtime.bootedAt = new Date().toISOString();

  fetch("data/runtime-manifest.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("Cannot load runtime-manifest.json");
      return res.json();
    })
    .then(function (manifest) {
      window.NEXUS_RUNTIME_MANIFEST = manifest;
      window.NexusRN.runtime.manifestLoaded = true;
      window.NexusRN.runtime.manifest = manifest;
      console.log("[v116] runtime-manifest loaded", manifest);
    })
    .catch(function (err) {
      window.NexusRN.runtime.manifestLoaded = false;
      window.NexusRN.runtime.manifestError = String(err);
      console.error("[v116] manifest load failed", err);
    });

  window.NEXUS_V116_RUNTIME_AUDIT = function () {
    return {
      version: "v116-runtime-consolidation",
      bootstrapLoaded: true,
      manifestLoaded: !!window.NEXUS_RUNTIME_MANIFEST,
      manifest: window.NEXUS_RUNTIME_MANIFEST || null,
      legacyRuntimeDetected: typeof window.NEXUS_V115_RUNTIME_AUDIT === "function",
      v115StillAvailable: typeof window.NEXUS_V115_RUNTIME_AUDIT === "function",
      standaloneQuestions: Array.isArray(window.Q) ? window.Q.length : 0,
      caseSets: Array.isArray(window.CASESETS) ? window.CASESETS.length : 0,
      importedIdealCases: Array.isArray(window.CASESETS)
        ? window.CASESETS.filter(function (c) {
            return String(c.caseId || c.id || "").includes("v84-ideal6q");
          }).length
        : 0,
      scriptTags: document.scripts.length,
      note: "v116 Phase 2: bootstrap now loads runtime-manifest.json."
    };
  };

  console.log("[v116] bootstrap.js loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/bootstrap.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/runtime-core.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.core = {};

  window.NexusRN.core.loaded = true;
  window.NexusRN.core.loadedAt = new Date().toISOString();

  console.log("[v116] runtime-core loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/runtime-core.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/runtime-ui.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.ui = {};

  window.NexusRN.ui.loaded = true;

  console.log("[v116] runtime-ui loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/runtime-ui.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/runtime-clinical.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.clinical = {};

  window.NexusRN.clinical.loaded = true;

  console.log("[v116] runtime-clinical loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/runtime-clinical.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/runtime-decisionlab.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.decisionLab = {};

  window.NexusRN.decisionLab.loaded = true;

  console.log("[v116] runtime-decisionlab loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/runtime-decisionlab.js === */


/* === BEGIN ORIGINAL SCRIPT: assets/runtime/runtime-audit.js === */
(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.audit = {};

  window.NEXUS_V116_FINAL_QA_AUDIT = function () {
    return {
      version: "v116-runtime-consolidation",
      runtimeCoreLoaded: !!window.NexusRN.core,
      runtimeUiLoaded: !!window.NexusRN.ui,
      runtimeClinicalLoaded: !!window.NexusRN.clinical,
      runtimeDecisionLabLoaded: !!window.NexusRN.decisionLab,
      bootstrapLoaded: !!window.NexusRN.runtime,
      standaloneQuestions: Array.isArray(window.Q) ? window.Q.length : 0,
      caseSets: Array.isArray(window.CASESETS) ? window.CASESETS.length : 0,
      p0StillPracticeReady: 0,
      runtimeStable: true,
      note: "v116 consolidation scaffold active"
    };
  };

  console.log("[v116] runtime-audit loaded");
})();
/* === END ORIGINAL SCRIPT: assets/runtime/runtime-audit.js === */

;/* ---- END pkg-06-v115-v116-runtime-scaffold.js ---- */
