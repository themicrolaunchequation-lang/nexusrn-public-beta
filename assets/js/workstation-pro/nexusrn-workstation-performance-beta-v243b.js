(function(){
  'use strict';
  var VERSION='v243B-performance-mobile-beta-route-performance-mobile-beta';
  var STATIC_BYTES={workstationJsBeforeV243B:61438,css:23527};
  function $(sel,ctx){try{return (ctx||document).querySelector(sel);}catch(e){return null;}}
  function $$(sel,ctx){try{return Array.prototype.slice.call((ctx||document).querySelectorAll(sel));}catch(e){return [];}}
  function cssHas(pattern){
    try{return Array.from(document.styleSheets).some(function(ss){try{return Array.from(ss.cssRules||[]).some(function(r){return pattern.test((r.cssText||r.selectorText||''));});}catch(e){return false;}});}catch(e){return false;}
  }
  async function fetchOk(path){try{var r=await fetch(path,{cache:'no-store'}); return r.ok;}catch(e){return false;}}
  async function audit(){
    var prev=null;
    try{prev=window.NEXUS_V243A_ACCESSIBILITY_KEYBOARD_AUDIT?window.NEXUS_V243A_ACCESSIBILITY_KEYBOARD_AUDIT():null;}catch(e){prev={acceptance:'CHECK_PREVIOUS_A11Y_AUDIT_ERROR',error:e.message};}
    var betaOk=await fetchOk('../workstation-beta/index.html');
    var viewport=!!$('meta[name="viewport"]');
    var responsive=cssHas(/max-width:\s*760px|max-width:\s*900px/);
    var containment=cssHas(/content-visibility|contain:/);
    var stickyAction=cssHas(/\.ws-actionbar[\s\S]*position:\s*sticky/);
    var fallback=!!$('#nativeLink,[href*="practice/index.html"]');
    var betaNav=!!$('[href*="workstation-beta"]');
    var noAutoSkin=!/MutationObserver modal skin|autoMutationObserverSkin:\s*true/i.test(document.documentElement.innerHTML);
    var result={version:VERSION,phase:{current:'5-6',total:8,name:'Merged performance + mobile gate and beta route'},mergedPhases:[5,6],previousPhaseRequired:'v243A accessibility + keyboard gate Accessibility Preview',previousPhaseAcceptance:prev&&prev.acceptance,route:'workstation-pro/index.html',nativePracticeTouched:false,imageAudioHotspotHeld:true,highlightHeld:true,betaRoutePresent:betaOk,betaNavPresent:betaNav,nativeFallbackPresent:fallback,viewportMetaPresent:viewport,responsiveCssPresent:responsive,containmentCssPresent:containment,stickyActionbarPresent:stickyAction,noAutoMutationObserverSkin:noAutoSkin,staticBytes:STATIC_BYTES,counts:{learnerReadyStandalone:5086,cases:1056,learnerFacingTotal:6142},next:'Guided Preview public-demo Workstation Pro route'};
    result.acceptance=(String(result.previousPhaseAcceptance||'').indexOf('PASS_')===0 && betaOk && fallback && viewport && responsive && containment && stickyAction && noAutoSkin)?'PASS_V243B_PERFORMANCE_MOBILE_BETA_ROUTE_PHASE_5_6_OF_8':'CHECK_V243B_PERFORMANCE_MOBILE_BETA_ROUTE_PHASE_5_6_OF_8';
    return result;
  }
  window.NEXUS_V243B_PERFORMANCE_MOBILE_BETA_AUDIT=audit;
  var prev=window.NEXUS_PHASE_STATUS;
  window.NEXUS_PHASE_STATUS=function(){var p=prev?prev():{}; p.current='5-6'; p.total=8; p.label='v243B performance + mobile + beta route'; p.mergedPhases=[5,6]; p.previous='v243A accessibility + keyboard gate'; p.next='v243D public demo Workstation Pro'; return p;};
})();
