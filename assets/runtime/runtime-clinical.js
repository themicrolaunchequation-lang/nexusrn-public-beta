(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.clinical = {};

  window.NexusRN.clinical.loaded = true;

  console.log("[v116] runtime-clinical loaded");
})();(function(){
  'use strict';
  window.NEXUS_V242Y_SCORING_PARITY_AUDIT = async function(){
    const r = await fetch('../data-governance/NexusRN-v242Y-scoring-parity-harness-results.json', {cache:'no-store'});
    if(!r.ok) throw new Error('v242Y parity result file not found: HTTP '+r.status);
    const data = await r.json();
    return data.summary || data;
  };
})();
(function(){
  'use strict';
  window.NEXUS_V242Z_PRODUCTION_PASS_RESULTS = async function(){
    const r = await fetch('../data-governance/NexusRN-v242Z-production-renderer-pass-results.json', {cache:'no-store'});
    if(!r.ok) throw new Error('v242Z production renderer result file not found: HTTP '+r.status);
    const data = await r.json();
    return data.summary || data;
  };
})();
