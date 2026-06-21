(function(){
  'use strict';
  var VERSION='v243D-public-demo-gated-route-guided-preview';
  function $(sel,ctx){try{return (ctx||document).querySelector(sel);}catch(e){return null;}}
  function $$(sel,ctx){try{return Array.prototype.slice.call((ctx||document).querySelectorAll(sel));}catch(e){return [];}}
  async function fetchOk(path){try{var r=await fetch(path,{cache:'no-store'});return r.ok;}catch(e){return false;}}
  function audit(){
    var base=null;
    try{base=window.NEXUS_V243D_PUBLIC_DEMO_GATE_AUDIT?window.NEXUS_V243D_PUBLIC_DEMO_GATE_AUDIT():null;}catch(e){base={acceptance:'CHECK_BASE_WORKSTATION_AUDIT_ERROR',error:e.message};}
    var onDemo=/\/public-demo\//i.test(location.pathname||'');
    var typeOptions=$$('#typeSelect option').map(function(o){return o.value;});
    var heldVisible=typeOptions.some(function(t){return /image-hotspot|audio-hotspot/i.test(t);});
    var itemOptions=$$('#itemSelect option');
    var fallback=!!$('#nativeLink,[href*="practice/index.html"]');
    var banner=/public demo|fixed demo|gated/i.test(document.body?document.body.textContent:'');
    var result={version:VERSION,phase:{current:7,total:8,name:'Public demo Workstation Pro gated route'},route:onDemo?'public-demo/index.html':'workstation-pro/index.html',onDemoRoute:onDemo,baseAcceptance:base&&base.acceptance,publicDemoExposedStandalone:base&&base.publicDemoExposedStandalone,visibleTypeOptions:typeOptions.length,visibleItemOptions:itemOptions.length,heldTypesHidden:!heldVisible,nativeFallbackPresent:fallback,publicDemoBannerPresent:banner,fullBankSelectorHidden:onDemo?(itemOptions.length<=12):true,nativePracticeTouched:false,autoMutationObserverSkin:false,imageAudioHotspotHeld:true,highlightHeld:false,counts:{learnerReadyStandalone:5086,cases:1056,learnerFacingTotal:6142},next:'Workstation Preview of 8 — v243E Curated guided sample, only after manual beta/demo testing'};
    result.acceptance=(String(result.baseAcceptance||'').indexOf('PASS_')===0 && (!onDemo || (result.publicDemoExposedStandalone>0 && result.publicDemoExposedStandalone<=12 && result.heldTypesHidden && result.nativeFallbackPresent && result.publicDemoBannerPresent && result.fullBankSelectorHidden)))?'PASS_V243D_PUBLIC_DEMO_GATE_PHASE_7_OF_8':'CHECK_V243D_PUBLIC_DEMO_GATE_PHASE_7_OF_8';
    return result;
  }
  async function loadReport(){return fetch('../data-governance/NexusRN-v243D-public-demo-gated-route-guided-preview-results.json',{cache:'no-store'}).then(function(r){return r.json();});}
  function decorate(){
    var root=$('#wsRoot'); if(root){root.setAttribute('data-phase','guided-preview'); if(/public-demo/i.test(location.pathname)) root.classList.add('ws-public-demo-mode');}
    if(/public-demo/i.test(location.pathname)){
      var btn=$('#randomBtn'); if(btn) btn.textContent='Random demo item';
      var title=$('.ws-title'); if(title) title.textContent='Public demo · fixed Workstation Pro showcase';
      var status=$('#statusRight'); if(status) status.textContent='Public demo gate · native fallback preserved · full bank not exposed in selector';
    }
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(decorate,80);setTimeout(decorate,700);});
  window.NEXUS_V243D_PUBLIC_DEMO_ROUTE_AUDIT=audit;
  window.NEXUS_V243D_LOAD_PUBLIC_DEMO_REPORT=loadReport;
  var prev=window.NEXUS_PHASE_STATUS;
  window.NEXUS_PHASE_STATUS=function(){var p=prev?prev():{};p.current=7;p.total=8;p.label='v243D public-demo Workstation Pro gated route';p.previous='v243B performance/mobile/beta route';p.next='v243E Curated guided sample after manual testing';return p;};
})();