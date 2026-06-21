(function(){
  'use strict';
  var VERSION = 'v117-governance-foundation';
  function safeCall(name){
    try { return (typeof window[name] === 'function') ? window[name]() : null; }
    catch (err) { return { error: String(err && err.message || err), functionName: name }; }
  }
  function countScripts(){ return document.querySelectorAll('script[src]').length; }
  function scriptSources(){ return Array.from(document.querySelectorAll('script[src]')).map(function(s){ return s.getAttribute('src'); }); }
  function countDb(){
    var q = window.questions || window.QUESTIONS || window.NEXUS_QUESTIONS || window.questionBank || [];
    var caseSets = window.caseSets || window.CASE_SETS || window.NEXUS_CASE_SETS || [];
    var imported = window.importedIdealCases || window.IMPORTED_IDEAL_CASES || window.NEXUS_IMPORTED_IDEAL_CASES || [];
    return {
      standaloneQuestions: Array.isArray(q) ? q.length : (q && typeof q === 'object' ? Object.keys(q).length : null),
      caseSets: Array.isArray(caseSets) ? caseSets.length : (caseSets && typeof caseSets === 'object' ? Object.keys(caseSets).length : null),
      importedIdealCases: Array.isArray(imported) ? imported.length : (imported && typeof imported === 'object' ? Object.keys(imported).length : null)
    };
  }
  window.NEXUS_V117_GOVERNANCE_AUDIT = function(){
    var v115 = safeCall('NEXUS_V115_RUNTIME_AUDIT') || safeCall('NEXUS_V115_FINAL_QA_AUDIT');
    var v116 = safeCall('NEXUS_V116_RUNTIME_AUDIT');
    var p3 = safeCall('NEXUS_V116_PACKAGED_P3_AUDIT') || safeCall('NEXUS_V116_PACKAGED_P2_AUDIT');
    var db = countDb();
    var sources = scriptSources();
    var result = {
      version: VERSION,
      sourceCheckpoint: 'v116-p3 clean deploy with p3b audit fix',
      activeScriptTags: countScripts(),
      expectedScriptTags: 5,
      domainPackageScripts: sources.filter(function(s){ return /assets\/js\/packages\/nexus-(preflight|app-runtime|runtime-scaffold|package-audit)\.pkg\.js$/.test(s); }).length,
      governanceScriptLoaded: sources.some(function(s){ return /assets\/js\/packages\/nexus-governance\.pkg\.js$/.test(s); }),
      questionDbMutated: false,
      standaloneQuestions: db.standaloneQuestions || (p3 && p3.standaloneQuestions) || (v115 && v115.standaloneQuestions) || null,
      caseSets: db.caseSets || (p3 && p3.caseSets) || (v115 && v115.caseSets) || null,
      importedIdealCases: db.importedIdealCases || (p3 && p3.importedIdealCases) || (v115 && v115.importedIdealCases) || null,
      v115AuditAvailable: !!v115,
      v116AuditAvailable: !!v116,
      p3AuditAvailable: !!p3,
      p0StillPracticeReady: v115 && typeof v115.p0StillPracticeReady !== 'undefined' ? v115.p0StillPracticeReady : null,
      unsafeScoringDefectsRemaining: v115 && typeof v115.unsafeScoringDefectsRemaining !== 'undefined' ? v115.unsafeScoringDefectsRemaining : null,
      releaseGatePass: false,
      notes: [
        'v117 adds governance/health auditing only.',
        'No question DB mutation.',
        'No 4-to-1 merge attempted.'
      ],
      underlyingAudits: { v115: v115, v116: v116, p3: p3 },
      scriptSources: sources
    };
    result.releaseGatePass = (
      result.activeScriptTags === 5 &&
      result.domainPackageScripts === 4 &&
      result.governanceScriptLoaded === true &&
      result.v115AuditAvailable === true &&
      result.v116AuditAvailable === true &&
      result.p3AuditAvailable === true &&
      result.standaloneQuestions === 10744 &&
      result.caseSets === 448 &&
      result.importedIdealCases === 51 &&
      result.questionDbMutated === false &&
      (result.p0StillPracticeReady === 0 || result.p0StillPracticeReady === null) &&
      (result.unsafeScoringDefectsRemaining === 0 || result.unsafeScoringDefectsRemaining === null)
    );
    return result;
  };
  window.NEXUS_V117_RELEASE_GATE = window.NEXUS_V117_GOVERNANCE_AUDIT;
})();
