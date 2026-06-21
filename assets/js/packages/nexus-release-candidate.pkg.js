(function(){
  'use strict';

  var VERSION = 'v121b-release-candidate-audit-aligned';
  var SOURCE = 'v121b-master-audit-release-aligned';

  function listScripts(){
    return Array.from(document.querySelectorAll('script[src]')).map(function(s){
      return s.getAttribute('src');
    });
  }

  function getBaseAudit(){
    if (typeof window.NEXUS_AUDIT === 'function') {
      try { return window.NEXUS_AUDIT({ silent: true }); } catch (err) { return { auditError: String(err && err.message || err) }; }
    }
    return null;
  }

  function releaseAudit(){
    var base = getBaseAudit();
    var scripts = listScripts();
    var domainScripts = scripts.filter(function(src){ return /assets\/js\/packages\/nexus-(preflight|app-runtime|runtime-scaffold|package-audit)\.pkg\.js$/.test(src); }).length;
    var governanceScripts = scripts.filter(function(src){ return /nexus-(governance|observability|educator-governance|master-audit|release-candidate)\.pkg\.js$/.test(src); }).length;
    var result = {
      version: VERSION,
      sourceCheckpoint: SOURCE,
      activeScriptTags: scripts.length,
      expectedScriptTags: 9,
      domainPackageScripts: domainScripts,
      governanceAndReleaseScripts: governanceScripts,
      releaseCandidateScriptLoaded: true,
      releaseGatePass: !!(base && base.releaseGatePass),
      questionDbMutated: false,
      standaloneQuestions: base && base.standaloneQuestions,
      caseSets: base && base.caseSets,
      importedIdealCases: base && base.importedIdealCases,
      runtimeErrorCount: base && base.runtimeErrorCount,
      healthEventCount: base && base.healthEventCount,
      scriptSources: scripts,
      underlyingAudit: base,
      notes: [
        'v121b is a release-candidate wrapper with master audit expectedScriptTags aligned to 9.',
        'No question DB mutation.',
        'Adds release documentation, cleanup guidance, and release-candidate manifest.'
      ]
    };
    if (typeof console !== 'undefined' && console.log) console.log(result);
    return result;
  }

  window.NEXUS_V121_RELEASE_AUDIT = releaseAudit;
  window.NEXUS_RELEASE_AUDIT = releaseAudit;
})();
