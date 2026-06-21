(function(){
  'use strict';
  window.NEXUS_V242Y_SCORING_PARITY_AUDIT = async function(){
    const r = await fetch('../data-governance/NexusRN-v242Y-scoring-parity-harness-results.json', {cache:'no-store'});
    if(!r.ok) throw new Error('v242Y parity result file not found: HTTP '+r.status);
    const data = await r.json();
    return data.summary || data;
  };
})();
