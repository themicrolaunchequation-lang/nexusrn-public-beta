(function(){
  'use strict';
  var VERSION='v243A-accessibility-keyboard-gate-phase-4-of-8';
  var state={applied:0,lastError:null};
  function $(sel,ctx){try{return (ctx||document).querySelector(sel);}catch(e){state.lastError=e.message;return null;}}
  function $$(sel,ctx){try{return Array.prototype.slice.call((ctx||document).querySelectorAll(sel));}catch(e){state.lastError=e.message;return [];}}
  function text(el){return el?String(el.textContent||'').replace(/\s+/g,' ').trim():'';}
  function stableId(prefix,idx){return prefix+'-'+String(idx+1).padStart(2,'0');}
  function setIf(el,k,v){if(el && v!==undefined && v!==null && !el.hasAttribute(k)) el.setAttribute(k,String(v));}
  function updateTabA11y(){
    $$('#chartTabs button').forEach(function(btn,i){
      var id=btn.id||stableId('ws-chart-tab',i); btn.id=id;
      btn.setAttribute('role','tab');
      btn.setAttribute('tabindex',btn.classList.contains('active')?'0':'-1');
      btn.setAttribute('aria-selected',btn.classList.contains('active')?'true':'false');
      btn.setAttribute('aria-controls','chartContent');
    });
    $$('#patientRail button').forEach(function(btn,i){
      btn.setAttribute('type','button');
      btn.setAttribute('role','tab');
      btn.setAttribute('aria-label','Open '+text(btn)+' chart tab');
      btn.setAttribute('tabindex',btn.classList.contains('active')?'0':'-1');
      btn.setAttribute('aria-selected',btn.classList.contains('active')?'true':'false');
      btn.setAttribute('aria-controls','chartContent');
    });
    var panel=$('#chartContent');
    if(panel){panel.setAttribute('role','tabpanel'); panel.setAttribute('tabindex','0'); var active=$('#chartTabs button.active'); if(active) panel.setAttribute('aria-labelledby',active.id||'');}
  }
  function updateChoiceA11y(){
    var qr=$('#questionRenderer'); if(!qr) return;
    qr.setAttribute('role','group'); qr.setAttribute('aria-labelledby','itemTitle');
    $$('.ws-option',qr).forEach(function(label,i){
      var input=$('input',label); var id=label.id||stableId('ws-choice',i); label.id=id;
      label.setAttribute('role','presentation');
      if(input){
        input.id=input.id||id+'-input';
        input.setAttribute('aria-label',text(label).replace(/^[A-Z0-9]+\s*/,''));
        input.setAttribute('aria-describedby','wsKeyboardHint');
      }
    });
    $$('.ws-bow-option',qr).forEach(function(label,i){
      var input=$('input',label); var id=label.id||stableId('ws-bow-choice',i); label.id=id;
      if(input){input.id=input.id||id+'-input'; input.setAttribute('aria-label',text(label)); input.setAttribute('aria-describedby','wsKeyboardHint');}
    });
    $$('.ws-highlight-seg',qr).forEach(function(btn,i){
      btn.setAttribute('role','button'); btn.setAttribute('tabindex','0'); btn.setAttribute('aria-pressed',btn.classList.contains('selected')?'true':'false'); btn.setAttribute('aria-label','Select clinical cue '+(i+1)+': '+text(btn));
    });
    $$('.ws-hotspot',qr).forEach(function(btn,i){
      btn.setAttribute('role','button'); btn.setAttribute('tabindex','0'); btn.setAttribute('aria-pressed',btn.classList.contains('selected')?'true':'false'); btn.setAttribute('aria-label','Select region '+(i+1)+': '+(btn.getAttribute('title')||'Target area'));
    });
    $$('#orderList .ws-option',qr).forEach(function(row,i){
      row.setAttribute('tabindex','0'); row.setAttribute('aria-label','Ordered response row '+(i+1)+': '+text(row));
      $$('[data-move]',row).forEach(function(b){b.setAttribute('aria-label',(b.dataset.move==='up'?'Move up ':'Move down ')+text(row));});
    });
    // Accessibility hint card removed per user request
  }
  function addLiveA11yPanel(){
    // Panel disabled
  }
  function wireKeyboard(){
    if(document.documentElement.dataset.v243aKeyboardWired==='1') return;
    document.documentElement.dataset.v243aKeyboardWired='1';
    document.addEventListener('keydown',function(e){
      var tabBtn=e.target.closest && e.target.closest('#chartTabs button,#patientRail button');
      if(tabBtn && ['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].indexOf(e.key)>-1){
        var group=tabBtn.closest('#chartTabs') ? $$('#chartTabs button') : $$('#patientRail button');
        var idx=group.indexOf(tabBtn); if(idx<0) return;
        e.preventDefault();
        if(e.key==='Home') idx=0; else if(e.key==='End') idx=group.length-1; else idx = (e.key==='ArrowRight'||e.key==='ArrowDown') ? (idx+1)%group.length : (idx-1+group.length)%group.length;
        group[idx].focus(); group[idx].click(); setTimeout(apply,0);
      }
      var h=e.target.closest && e.target.closest('.ws-highlight-seg, .ws-hotspot');
      if(h && (e.key===' '||e.key==='Enter')){e.preventDefault(); h.click(); h.setAttribute('aria-pressed',h.classList.contains('selected')?'true':'false');}
      var row=e.target.closest && e.target.closest('#orderList .ws-option');
      if(row && (e.altKey||e.ctrlKey) && (e.key==='ArrowUp'||e.key==='ArrowDown')){
        e.preventDefault(); var btn=$('[data-move="'+(e.key==='ArrowUp'?'up':'down')+'"]',row); if(btn) btn.click(); setTimeout(apply,0);
      }
      if((e.ctrlKey||e.altKey) && e.key.toLowerCase()==='s'){var c=$('#checkBtn'); if(c){e.preventDefault(); c.click(); setTimeout(function(){var p=$('#scorePanel'); if(p){p.hidden=false; p.focus&&p.focus();}},50);}}
      if((e.ctrlKey||e.altKey) && e.key.toLowerCase()==='r'){var r=$('#resetBtn'); if(r){e.preventDefault(); r.click(); setTimeout(apply,0);}}
    },true);
    document.addEventListener('click',function(e){if(e.target.closest && (e.target.closest('#chartTabs button,#patientRail button,.ws-highlight-seg,.ws-option,.ws-bow-option,[data-move]'))){setTimeout(apply,0);}},true);
  }
  function apply(){
    try{addLiveA11yPanel(); updateTabA11y(); updateChoiceA11y(); wireKeyboard(); state.applied++;}
    catch(e){state.lastError=e.message; console.warn('[v243A accessibility gate]',e);}
  }
  function audit(){
    apply();
    var chartTabs=$$('#chartTabs button');
    var chartTabRoles=chartTabs.filter(function(b){return b.getAttribute('role')==='tab'&&b.hasAttribute('aria-selected')&&b.hasAttribute('aria-controls');}).length;
    var railTabs=$$('#patientRail button');
    var question=$('#questionRenderer');
    var inputs=$$('#questionRenderer input');
    var unlabeledInputs=inputs.filter(function(i){return !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby');}).length;
    var score=$('#scorePanel');
    var focusVisibleCSS=(function(){try{return Array.from(document.styleSheets).some(function(ss){try{return Array.from(ss.cssRules||[]).some(function(r){return String(r.selectorText||'').indexOf(':focus-visible')>-1;});}catch(e){return false;}});}catch(e){return false;}})();
    var result={version:VERSION,phase:{current:4,total:8,name:'Accessibility + keyboard gate'},route:'workstation-pro/index.html',previousPhaseRequired:'v242Z production renderer pass Public Demo',nativePracticeTouched:false,imageAudioHotspotHeld:true,highlightHeld:true,chartTabs:chartTabs.length,chartTabsWithA11y:chartTabRoles,railTabs:railTabs.length,questionGroupPresent:!!question&&question.getAttribute('role')==='group',scorePanelLiveRegion:!!score&&score.getAttribute('role')==='status'&&!!score.getAttribute('aria-live'),keyboardHintPresent:!!$('#wsKeyboardHint'),skipLinks:$$('.ws-skip-link').length,focusVisibleCSS:focusVisibleCSS,unlabeledInputs:unlabeledInputs,lastError:state.lastError,appliedCount:state.applied};
    result.acceptance=(chartTabs.length>=6 && chartTabRoles===chartTabs.length && result.questionGroupPresent && result.scorePanelLiveRegion && result.keyboardHintPresent && result.skipLinks>=2 && focusVisibleCSS && unlabeledInputs===0 && !state.lastError)?'PASS_V243A_ACCESSIBILITY_KEYBOARD_GATE_PHASE_4_OF_8':'CHECK_V243A_ACCESSIBILITY_KEYBOARD_GATE_PHASE_4_OF_8';
    return result;
  }
  window.NEXUS_V243A_ACCESSIBILITY_KEYBOARD_AUDIT=audit;
  window.NEXUS_PHASE_STATUS=function(){return {current:4,total:8,label:'v243A accessibility + keyboard gate',previous:'v242Z production renderer pass',next:'v243B performance + mobile gate'};};
  document.addEventListener('DOMContentLoaded',function(){setTimeout(apply,100);});
  var mo=new MutationObserver(function(){clearTimeout(mo._t); mo._t=setTimeout(apply,40);});
  document.addEventListener('DOMContentLoaded',function(){var root=document.getElementById('wsRoot'); if(root) mo.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden','aria-selected','aria-pressed']});});
})();
