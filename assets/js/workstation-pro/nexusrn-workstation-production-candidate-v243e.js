(function(){
  'use strict';
  var VERSION='v243I-asset-rendering-sandbox-workstation-preview';
  function $(sel,ctx){try{return (ctx||document).querySelector(sel);}catch(e){return null;}}
  function $$(sel,ctx){try{return Array.prototype.slice.call((ctx||document).querySelectorAll(sel));}catch(e){return [];}}
  function isCandidateRoute(){return /\/public-demo\//i.test(location.pathname||'') || /[?&]candidate=1\b/i.test(location.search||'');}
  function passish(v){
    try{
      if(!v) return false;
      if(typeof v==='string') return /(^|[^A-Z])PASS[_\s-]/i.test(v) || /^PASS/i.test(v);
      var a=v.acceptance||v.baseAcceptance||v.status||v.result||'';
      if(/^PASS/i.test(String(a))) return true;
      return /"acceptance"\s*:\s*"PASS/i.test(JSON.stringify(v));
    }catch(e){return false;}
  }
  async function call(fn){
    try{
      if(typeof window[fn] !== 'function') return {acceptance:'NOT_DEFINED',fn:fn};
      return await Promise.resolve(window[fn]());
    }catch(e){return {acceptance:'ERROR',fn:fn,error:e.message};}
  }
  async function audit(){
    var base = await call('NEXUS_V243D_PUBLIC_DEMO_GATE_AUDIT');
    var e2 = await call('NEXUS_V243E2_DATA_COMPLETENESS_AUDIT');
    var f1 = await call('NEXUS_V243F1_CHART_EVIDENCE_COMPOSER_AUDIT');
    var f2 = await call('NEXUS_V243F2_MEDIA_NEED_CLASSIFIER_AUDIT');
    var g = await call('NEXUS_V243G_ALGORITHMIC_VISUALS_AUDIT');
    var h = await call('NEXUS_V243H_MEDIA_EVIDENCE_VALIDATION_AUDIT');
    var h1 = await call('NEXUS_V243H1_EXTERNAL_MEDIA_MANIFEST_AUDIT');
    var i = await call('NEXUS_V243I_ASSET_RENDERING_SANDBOX_AUDIT');
    var b = await call('NEXUS_V243B_PERFORMANCE_MOBILE_BETA_AUDIT');
    var a = await call('NEXUS_V243A_ACCESSIBILITY_KEYBOARD_AUDIT');
    var z = await call('NEXUS_V242Z_PRODUCTION_RENDERER_AUDIT');
    var y = await call('NEXUS_V242Y_SCORING_PARITY_AUDIT');
    var x = await call('NEXUS_V242X_VIEWMODEL_AUDIT');
    var typeOptions=$$('#typeSelect option').map(function(o){return (o.value||o.textContent||'').toLowerCase();});
    var heldVisible=typeOptions.some(function(v){return /image-hotspot|audio-hotspot/.test(v);});
    var nativeFallback=!!$('#nativeLink,[href*="practice/index.html"]');
    var demoLink=!!$('[href*="public-demo/index.html"]');
    var betaLink=!!$('[href*="workstation-beta"]');
    var proLink=!!$('[href*="workstation-pro/index.html"]');
    var question=!!$('#questionRenderer');
    var chart=!!$('#chartContent');
    var radiology=!!$('[data-tab="radiology"]');
    var historyTab=!!$('[data-tab="history"]');
    var modalSkin=!!$('.v242u-pro-card,.v242u-rail,.v242u-storyboard,.v242u-cds');
    var candidate=isCandidateRoute();
    var itemCount=$$('#itemSelect option').length;
    var result={
      version:VERSION,
      phase:{current:8,total:8,name:'Curated guided sample · Algorithmic Visuals Batch 1 · safe evidence only'},
      route:candidate?'public-demo/index.html':'workstation-pro/index.html',
      curatedGuidedSample:true,
      productionLaunchApproved:false,
      nativePracticeTouched:false,
      nativeFallbackPresent:nativeFallback,
      demoRouteLinked:demoLink,
      betaRouteLinked:betaLink,
      fullLabLinked:proLink,
      isolatedRoute:true,
      modalSkinArtifactsPresent:modalSkin,
      questionRendererPresent:question,
      chartPanePresent:chart,
      radiologyTabPresent:radiology,
      historyPhysicalTabPresent:historyTab,
      heldTypesHiddenFromSelector:!heldVisible,
      visibleTypeOptions:typeOptions.length,
      visibleItemOptions:itemCount,
      expectedCounts:{learnerReadyStandalone:5086,cases:1056,learnerFacingTotal:6142},
      priorAuditAcceptances:{
        v242X:x.acceptance||x.baseAcceptance||x.status,
        v242Y:y.acceptance||y.baseAcceptance||y.status,
        v242Z:z.acceptance||z.baseAcceptance||z.status,
        v243A:a.acceptance||a.baseAcceptance||a.status,
        v243B:b.acceptance||b.baseAcceptance||b.status,
        v243D:base.acceptance||base.baseAcceptance||base.status,
        v243E2:e2.acceptance||e2.baseAcceptance||e2.status,
        v243F1:f1.acceptance||f1.baseAcceptance||f1.status,
        v243F2:f2.acceptance||f2.baseAcceptance||f2.status,
        v243G:g.acceptance||g.baseAcceptance||g.status,
        v243H:h.acceptance||h.baseAcceptance||h.status,
        v243H1:h1.acceptance||h1.baseAcceptance||h1.status,
        v243I:i.acceptance||i.baseAcceptance||i.status
      },
      gates:{viewModel:passish(x), scoringParity:passish(y), productionRenderer:passish(z), accessibilityKeyboard:passish(a), performanceMobileBeta:passish(b), publicDemoGate:passish(base), dataCompleteness:passish(e2), chartEvidenceComposer:passish(f1), mediaNeedClassifier:passish(f2), algorithmicVisuals:passish(g), guidedEvidencePreview:passish(h), externalMediaManifestIntake:passish(h1), assetRenderingPreview:passish(i)},
      heldTypes:['image-hotspot','audio-hotspot'],
      note:'Workstation Preview marks Workstation Pro as a Curated guided sample route only. v243G keeps the H&P/vitals evidence layer and adds algorithmic visuals from existing evidence only; ECG/FHR/images/audio remain held. It does not delete Native Practice, does not approve paid/public launch, and does not expose held item types.'
    };
    result.acceptance=(!modalSkin&&nativeFallback&&question&&chart&&radiology&&historyTab&&!heldVisible&&result.gates.viewModel&&result.gates.scoringParity&&result.gates.productionRenderer&&result.gates.accessibilityKeyboard&&result.gates.performanceMobileBeta&&result.gates.publicDemoGate&&result.gates.dataCompleteness&&result.gates.chartEvidenceComposer&&result.gates.mediaNeedClassifier&&result.gates.algorithmicVisuals&&result.gates.guidedEvidencePreview&&result.gates.externalMediaManifestIntake&&result.gates.assetRenderingPreview)?'PASS_V243I_WORKSTATION_PREVIEW_ASSET_RENDERING_SANDBOX_PHASE_8_OF_8':'CHECK_V243I_WORKSTATION_PREVIEW_ASSET_RENDERING_SANDBOX_PHASE_8_OF_8';
    return result;
  }
  function decorate(){
    var root=$('#wsRoot');
    if(root){root.setAttribute('data-phase','workstation-preview'); root.classList.add('ws-production-candidate-mode'); root.setAttribute('data-version','v243H1');}
    var title=$('.ws-title'); if(title && isCandidateRoute()) title.textContent='Curated guided sample · Workstation Pro';
    var banner=$('.ws-safe-banner');
    if(banner && isCandidateRoute()){
      banner.innerHTML='<b>Curated guided sample, not final launch approval.</b> Workstation Pro is staged as the Full app feature preview route with Native Practice fallback preserved. v243I keeps algorithmic evidence visuals and strict Guided Preview queues, then adds an isolated asset rendering sandbox route for preview-only manifest assets. It keeps H&P and safer vitals; ECG/FHR/images/audio remain held until an approved manifest and later rendering sandbox. Image/audio hotspot and highlight remain held until dedicated parity work. Paid/public launch still requires manual browser QA, human accessibility pass, server security headers, account/payment QA, and SME spot-checking.';
    }
    var status=$('#statusRight'); if(status) status.textContent='Workstation Preview · Curated guided sample · Guided Preview ready · Native fallback preserved';
    if (isCandidateRoute()) {
      setTimeout(function(){
        if (window.NEXUS_MODE_PILLS && typeof window.NEXUS_MODE_PILLS.enterSessionMode === 'function') {
          window.NEXUS_MODE_PILLS.enterSessionMode({key:'practice', title:'Practice mode', settings:{feedback:'Immediate'}});
          var observer = new MutationObserver(function(){
            var btn = document.querySelector('#checkBtn');
            if (btn && btn.textContent.indexOf('Check / Score in Lab') > -1) {
              btn.textContent = 'Submit';
            }
          });
          var bar = document.querySelector('.ws-actionbar');
          if (bar) observer.observe(bar, {childList: true, subtree: true, characterData: true});
          var btn2 = document.querySelector('#checkBtn');
          if (btn2 && btn2.textContent.indexOf('Check / Score in Lab') > -1) {
            btn2.textContent = 'Submit';
          }
        }
      }, 300);
    }
  }
  async function loadReport(){
    try{return await fetch('../data-governance/NexusRN-v243I-asset-rendering-sandbox-results.json',{cache:'no-store'}).then(function(r){return r.json();});}
    catch(e){return fetch('../data-governance/NexusRN-v243E-production-default-candidate-workstation-preview-results.json',{cache:'no-store'}).then(function(r){return r.json();});}
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(decorate,80);setTimeout(decorate,800);});
  window.NEXUS_V243E_CURATED_GUIDED_SAMPLE_AUDIT=audit;
  window.NEXUS_V243E1_CURATED_GUIDED_SAMPLE_AUDIT=audit;
  window.NEXUS_V243E2_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243F1_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243F2_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243G_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243H_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243H1_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243I_WORKSTATION_PREVIEW_AUDIT=audit;
  window.NEXUS_V243E_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243E1_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243E2_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243F1_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243F2_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243G_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243H_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243H1_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  window.NEXUS_V243I_LOAD_WORKSTATION_PREVIEW_REPORT=loadReport;
  var prev=window.NEXUS_PHASE_STATUS;
  window.NEXUS_PHASE_STATUS=function(){var p=prev?prev():{};p.current=8;p.total=8;p.label='v243I Curated guided sample · Asset Rendering Sandbox';p.previous='v243H1 external media manifest intake';p.next='v243I1 media ZIP intake after user supplies generated assets';return p;};
})();
