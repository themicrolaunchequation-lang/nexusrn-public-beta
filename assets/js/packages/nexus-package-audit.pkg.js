/* NexusRN v116 packaged-runtime-p2: nexus-package-audit.pkg.js
   Generated from p1 packages in exact p1 load order. Originals retained. */

;/* ---- BEGIN pkg-99-package-audit.js ---- */
(function(){
  'use strict';
  window.NEXUS_V116_PACKAGED_RUNTIME = {
    version: 'v116-packaged-runtime-p1',
    originalScriptTags: 63,
    packagedScriptTags: 8,
    packageCount: 7,
    originalsRetained: true,
    questionDbMutated: false,
    note: 'Classic scripts were concatenated in exact original load order into seven package files. Original files remain in place for rollback.'
  };
  window.NEXUS_V116_PACKAGED_AUDIT = function(){
    var v116 = typeof window.NEXUS_V116_RUNTIME_AUDIT === 'function' ? window.NEXUS_V116_RUNTIME_AUDIT() : {};
    return Object.assign({}, window.NEXUS_V116_PACKAGED_RUNTIME, {
      currentScriptTags: document.scripts.length,
      v116AuditAvailable: typeof window.NEXUS_V116_RUNTIME_AUDIT === 'function',
      v115AuditAvailable: typeof window.NEXUS_V115_RUNTIME_AUDIT === 'function',
      standaloneQuestions: Array.isArray(window.Q) ? window.Q.length : 0,
      caseSets: Array.isArray(window.CASESETS) ? window.CASESETS.length : 0,
      importedIdealCases: Array.isArray(window.CASESETS) ? window.CASESETS.filter(function(c){return String(c.caseId || c.id || '').indexOf('v84-ideal6q') >= 0;}).length : 0,
      v116: v116
    });
  };
  console.log('[v116-package] packaged runtime loaded', window.NEXUS_V116_PACKAGED_RUNTIME);
})();

;/* ---- END pkg-99-package-audit.js ---- */

;/* ---- BEGIN v116 p3b clean deploy audit alias ---- */
(function(){
  'use strict';
  window.NEXUS_V116_PACKAGED_P3_AUDIT = function(){
    var scripts = Array.from(document.scripts || []);
    var p3DomainScripts = scripts.filter(function(s){ return s.src && /assets\/js\/packages\/nexus-.*\.pkg\.js/.test(s.src); }).length;
    var p1PackageScripts = scripts.filter(function(s){ return s.src && /assets\/js\/packages\/pkg-\d+.*\.js/.test(s.src); }).length;
    var p2 = typeof window.NEXUS_V116_PACKAGED_P2_AUDIT === 'function' ? window.NEXUS_V116_PACKAGED_P2_AUDIT() : null;
    var v115 = typeof window.NEXUS_V115_RUNTIME_AUDIT === 'function' ? window.NEXUS_V115_RUNTIME_AUDIT() : (typeof window.NEXUS_V115_FINAL_QA_AUDIT === 'function' ? window.NEXUS_V115_FINAL_QA_AUDIT() : null);
    var v116 = typeof window.NEXUS_V116_RUNTIME_AUDIT === 'function' ? window.NEXUS_V116_RUNTIME_AUDIT() : null;
    var q = window.NEXUS_QUESTIONS || window.questions || window.questionBank || window.__NEXUS_QUESTIONS__ || [];
    return {
      version: 'v116-packaged-runtime-p3b-clean-deploy-audit-fix',
      priorCheckpoint: 'v116-packaged-runtime-p2b-audit-fix',
      activeDomainScriptTags: p3DomainScripts,
      packageCount: 4,
      p1PackageScriptsStillLoaded: p1PackageScripts,
      originalModuleFilesRetainedInDeploy: false,
      p1IntermediatePackageFilesRetainedInDeploy: false,
      originalScriptTagsBeforePackaging: 63,
      questionDbMutated: false,
      standaloneQuestions: (p2 && p2.standaloneQuestions) || (Array.isArray(q) ? q.length : null) || (v116 && v116.standaloneQuestions) || null,
      caseSets: (p2 && p2.caseSets) || (v116 && v116.caseSets) || null,
      importedIdealCases: (p2 && p2.importedIdealCases) || (v116 && v116.importedIdealCases) || null,
      v115AuditAvailable: !!v115,
      v116AuditAvailable: !!v116,
      p2AuditAvailable: !!p2,
      v115: v115,
      v116: v116,
      p2: p2,
      note: 'P3b keeps p3 clean deploy and defines the p3 audit inside nexus-package-audit.pkg.js so it cannot be lost if inline footer scripts are stripped or cached.'
    };
  };
  window.NEXUS_V116_PACKAGED_P3B_AUDIT = window.NEXUS_V116_PACKAGED_P3_AUDIT;
})();
;/* ---- END v116 p3b clean deploy audit alias ---- */
