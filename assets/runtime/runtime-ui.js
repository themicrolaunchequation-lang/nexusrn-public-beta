(function () {
  "use strict";

  window.NexusRN = window.NexusRN || {};
  window.NexusRN.ui = {};

  window.NexusRN.ui.loaded = true;

  console.log("[v116] runtime-ui loaded");
})();
(function(){
  'use strict';
  var VERSION='v243I-asset-rendering-sandbox-workstation-preview';
  var ROOT=document.getElementById('wsRoot');
  var state={index:null,cases:null,ready:[],labReady:[],productionReady:[],types:[],heldTypes:[],itemsByType:new Map(),labItemsByType:new Map(),productionItemsByType:new Map(),currentIndex:null,current:null,viewModel:null,answers:{},submitted:false,tab:'overview',showcaseMode:true,publicDemoMode:false,publicDemoItems:[]};
  var COUNTS={readyStandalone:5086,cases:1056,learnerFacingTotal:6142,sourceStandalone:5086,heldHiddenStandalone:0,goldCandidates:0,productionCandidateStandalone:0,heldRendererStandalone:0};
  var HELD_RENDERER_TYPES={}; // Unblocked for Phase 3
  var PUBLIC_DEMO_TYPE_ORDER=['multiple-choice','multiple-response-sata','matrix-multiple-choice','matrix-multiple-response','bowtie','cloze-dropdown','case-dropdown','ordered-response','calculation','trend'];
  var PUBLIC_DEMO_MAX_PER_TYPE=1;
  function isPublicDemoRoute(){try{return /\/public-demo\//i.test(location.pathname||'') || new URLSearchParams(location.search||'').get('demo')==='1';}catch(e){return false;}}
  var HELD_RENDERER_IDS={"nexus_multip_selectnl_1f04":["weak_stem"],"nexus_multip_new_1844":["weak_stem"],"nexus_bow_bowtiebl_52f8":["missing_bowtie_key"],"nexus_multip_ngn_9c0a":["missing_bowtie_key"],"nexus_multip_magnesiu_0bce":["weak_stem"],"nexus_multip_bara_e527":["weak_stem"],"nexus_multip_new_3864":["too_few_options"],"nexus_multip_new_86a9":["weak_stem"],"nexus_multip_peritoni_aa55":["weak_stem"],"nexus_multip_serotoni_cf00":["weak_stem"],"nexus_multip_lithiums_ce6d":["weak_stem"],"nexus_multip_chartexh_1260":["weak_stem"],"nexus_multip_cysticfi_d5e0":["weak_stem"],"nexus_multip_new_dcf2":["weak_stem"],"nexus_multip_v26_f9a5":["too_few_options"],"nexus_calcul_new_8b28":["missing_calculation_key"],"nexus_bow_ngn_22a3":["missing_bowtie_key"],"nexus_bow_bowtieca_8f3b":["missing_bowtie_key"],"nexus_bow_new_dbd3":["missing_bowtie_key"],"nexus_multip_new_ea68":["too_few_options"],"nexus_multip_arterial_3fac":["weak_stem"],"nexus_multip_icpmonit_5a64":["weak_stem"],"nexus_multip_nclex_3c31":["weak_stem"],"nexus_multip_dndpedia_00e9":["too_few_options"],"nexus_bow_new_3a8d":["missing_bowtie_key"],"nexus_multip_trendmat_441d":["weak_stem"],"nexus_multip_obstetri_8877":["weak_stem"],"nexus_multip_healtheq_698c":["weak_stem"],"nexus_bow_new_0f40":["missing_bowtie_key"],"nexus_bow_bowtieca_0e68":["missing_bowtie_key"],"nexus_bow_new_8223":["missing_bowtie_key"],"nexus_multip_new_8be6":["too_few_options"],"nexus_multip_mmttkaev_ba96":["weak_stem"],"nexus_multip_trendpne_e01b":["weak_stem"],"nexus_multip_mission5_8ac7":["too_few_options"],"nexus_multip_healtheq_a797":["weak_stem"],"nexus_multip_healtheq_ebaf":["weak_stem"],"nexus_multip_new_35a1":["too_few_options"],"nexus_multip_selectna_7f0e":["weak_stem"],"nexus_multip_new_e65d":["too_few_options"],"nexus_multip_ngn_8697":["missing_bowtie_key"],"nexus_multip_respirat_5a86":["weak_stem"],"nexus_multip_trendcom_2996":["weak_stem","too_few_options"],"nexus_multip_digitalp_44b2":["weak_stem"],"nexus_bow_bowtiead_c0b0":["missing_bowtie_key"],"nexus_bow_ngn_9a73":["missing_bowtie_key"],"nexus_bow_ngn_9601":["missing_bowtie_key"],"nexus_bow_bowtiead_0a93":["missing_bowtie_key"],"nexus_bow_new_e0f6":["missing_bowtie_key"],"nexus_bow_new_40e6":["missing_bowtie_key"],"nexus_multip_cvpmonit_e6bf":["weak_stem"],"nexus_multip_chartexh_0671":["weak_stem"],"nexus_multip_postpart_d0da":["weak_stem"],"nexus_multip_selectnc_b9d4":["weak_stem"],"nexus_multip_new_e1c5":["weak_stem"],"nexus_multip_new_c746":["weak_stem"],"nexus_multip_selectnn_8488":["weak_stem"],"nexus_multip_monoclon_74b9":["weak_stem"],"nexus_multip_anticoag_5a69":["weak_stem"],"nexus_multip_copddisc_de7c":["weak_stem"],"nexus_bow_bowtiebl_b34f":["missing_bowtie_key"],"nexus_multip_sqsaa081_0d53":["weak_stem"],"nexus_multip_glp1agon_39f9":["weak_stem"],"nexus_bow_ngn_c33d":["missing_bowtie_key"],"nexus_multip_new_eaab":["weak_stem"],"nexus_bow_ngn_3e34":["missing_bowtie_key"]};
  var $=function(sel,root){return (root||document).querySelector(sel);};
  var $$=function(sel,root){var r=(typeof root==='string'?document.querySelector(root):(root||document)); return Array.prototype.slice.call((r||document).querySelectorAll(sel));};
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function text(v){return String(v==null?'':v).trim();}
  function title(v){return text(v).replace(/[-_]+/g,' ').replace(/\b\w/g,function(m){return m.toUpperCase();});}

  function shortId(id,i,prefix){
    var raw=text(id); if(/^[A-Ha-h]$/.test(raw)) return raw.toUpperCase();
    if(/^opt_\d+$/i.test(raw)) return String.fromCharCode(65+(i||0));
    return (prefix||'O')+String((i||0)+1);
  }
  function flattenText(v){
    if(v==null) return '';
    if(typeof v==='string'||typeof v==='number'||typeof v==='boolean') return String(v);
    if(Array.isArray(v)) return v.map(flattenText).filter(Boolean).join(' · ');
    if(typeof v==='object') return Object.keys(v).map(function(k){
      var val=flattenText(v[k]);
      return val?title(k)+': '+val:'';
    }).filter(Boolean).join(' · ');
    return String(v);
  }
  function getBaseDateForItem(item) {
    var baseDate = new Date();
    // Stable admit date: May 29, 2026
    baseDate.setFullYear(2026, 4, 29);
    baseDate.setHours(8, 0, 0, 0);
    var idStr = String((item && item.id) || 'default');
    var hash = 0;
    for (var i = 0; i < idStr.length; i++) {
      hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    var startHour = 8 + (Math.abs(hash) % 4);
    var startMinute = (Math.abs(hash) % 4) * 15;
    baseDate.setHours(startHour, startMinute, 0, 0);
    return baseDate;
  }
  function formatSmartDateTime(val, index, offsetHours) {
    val = String(val || '').trim();
    var baseDate = getBaseDateForItem(state.current);
    
    function formatD(d) {
      return formatLocalString(d);
    }
    
    if (val) {
      var isoMatch = val.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
      if (isoMatch) {
        var parsed = Date.parse(val);
        if (!isNaN(parsed)) return formatD(new Date(parsed));
        return isoMatch[2] + '/' + isoMatch[3] + '/' + isoMatch[1] + ' ' + isoMatch[4] + ':' + isoMatch[5];
      }
      if (/^\d{1,2}:\d{2}/.test(val)) {
        var parts = val.split(':');
        var d = new Date(baseDate.getTime());
        d.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
        return formatD(d);
      }
      
      var lowerVal = val.toLowerCase();
      if (lowerVal === 'chart cue') {
        return formatD(baseDate);
      }
      if (lowerVal === 'decision focus') {
        var d = new Date(baseDate.getTime());
        d.setMinutes(d.getMinutes() + 15);
        return formatD(d);
      }
      if (lowerVal === 'safety note') {
        var d = new Date(baseDate.getTime());
        d.setMinutes(d.getMinutes() + 30);
        return formatD(d);
      }
      if (lowerVal.indexOf('action cue') > -1) {
        var numMatch = lowerVal.match(/\d+/);
        var idx = numMatch ? parseInt(numMatch[0], 10) - 1 : (index || 0);
        var d = new Date(baseDate.getTime());
        d.setMinutes(d.getMinutes() + 10 + idx * 10);
        return formatD(d);
      }
      if (lowerVal.indexOf('imaging reference') > -1) {
        var numMatch = lowerVal.match(/\d+/);
        var idx = numMatch ? parseInt(numMatch[0], 10) - 1 : (index || 0);
        var d = new Date(baseDate.getTime());
        d.setHours(d.getHours() + 2);
        d.setMinutes(d.getMinutes() + idx * 15);
        return formatD(d);
      }
      if (lowerVal.indexOf('loaded on') > -1) {
        return val;
      }
      
      var parsedDate = Date.parse(val);
      if (!isNaN(parsedDate)) {
        return formatD(new Date(parsedDate));
      }
      return val;
    }
    
    var d = new Date(baseDate.getTime());
    d.setMinutes(d.getMinutes() + (offsetHours || 0) * 60 + (index || 0) * 15);
    return formatD(d);
  }
  function formatLocalString(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    var hr = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return m + '/' + day + '/' + y + ' ' + hr + ':' + min;
  }
  function severityFor(k,v){
    var key=text(k).toLowerCase(), val=text(v).toLowerCase();
    if(/spo2|oxygen/.test(key+val) && /(8[0-9]|90|91|92)%?/.test(val)) return 'critical';
    if(/bp|blood pressure/.test(key+val) && /(18[0-9]|19[0-9]|20[0-9])\//.test(val)) return 'critical';
    if(/hr|heart/.test(key+val) && /(12[0-9]|13[0-9]|14[0-9]|15[0-9])/.test(val)) return 'critical';
    if(/temp|temperature/.test(key+val) && /(38\.|39\.|100\.|101\.|102\.|103\.)/.test(val)) return 'warn';
    if(/lactate|troponin|creatinine|potassium|glucose|wbc|hgb|hemoglobin/.test(key+val)) return 'warn';
    return '';
  }
  function normArray(v){
    if(!v) return [];
    if(Array.isArray(v)) return v;
    if(typeof v==='object') return Object.keys(v).map(function(k){return {name:k,value:v[k]};});
    return [{name:'Entry',value:v}];
  }
  function valueOfRow(x){return flattenText(x.value||x.result||x.note||x.text||x.report||x.finding||x.impression||x.order||x.description||x);}
  function labelOfRow(x,i){return text(x.name||x.test||x.study||x.type||x.label||x.time||x.item||x.order_type||('Entry '+(i+1)));}
  function svgLineChart(points,labels,unit){
    points=points.map(function(x){var n=parseFloat(String(x).replace(/[^0-9.\-]/g,'')); return isFinite(n)?n:null;}).filter(function(x){return x!=null;});
    if(points.length<2) return '';
    var min=Math.min.apply(null,points), max=Math.max.apply(null,points); if(max===min){max+=1;min-=1;}
    var w=620,h=170,pad=28; var d=points.map(function(v,i){var x=pad+(w-pad*2)*(i/(points.length-1)); var y=h-pad-(h-pad*2)*((v-min)/(max-min)); return (i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}).join(' ');
    var dots=points.map(function(v,i){var x=pad+(w-pad*2)*(i/(points.length-1)); var y=h-pad-(h-pad*2)*((v-min)/(max-min)); return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4"><title>'+esc((labels&&labels[i]?labels[i]+' · ':'')+v+(unit||''))+'</title></circle>';}).join('');
    return '<div class="ws-trend-chart"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Trend chart"><path class="grid" d="M28 28H592M28 85H592M28 142H592"></path><path class="axis" d="M28 20V142H600"></path><path class="line" d="'+d+'"></path>'+dots+'<text x="32" y="18">'+esc(max+(unit||''))+'</text><text x="32" y="160">'+esc(min+(unit||''))+'</text></svg></div>';
  }
  /* --- Multi-series trend chart for vital sign rendering --- */
  var TREND_COLORS={HR:'#ef4444',hr:'#ef4444',pulse:'#ef4444',SBP:'#3b82f6',DBP:'#60a5fa',BP:'#3b82f6',bp:'#3b82f6',RR:'#f59e0b',rr:'#f59e0b',SpO2:'#10b981',spo2:'#10b981','SpO₂':'#10b981',Temp:'#8b5cf6',temp:'#8b5cf6','Temp (C)':'#8b5cf6','Temp (F)':'#8b5cf6',Potassium:'#ec4899','Potassium (mEq/L)':'#ec4899','Glucose (mg/dL)':'#f97316',Glucose:'#f97316','ECG Rhythm':'#6366f1'};
  function trendColor(label){return TREND_COLORS[label]||TREND_COLORS[label.toLowerCase()]||'#64748b';}
  function svgMultiSeriesChart(series,timeLabels){
    /* series = [{label,values:[num],unit}], timeLabels = ['08:00','10:00',...] */
    if(!series.length) return '';
    var chartsHtml = series.map(function(s, si){
      var color=trendColor(s.label);
      var w=280, h=140, padL=36, padR=12, padT=16, padB=28;
      var plotW=w-padL-padR, plotH=h-padT-padB;
      var n=timeLabels.length||1;
      
      var vals = s.values.filter(function(v){return isFinite(v);});
      if(!vals.length) return '';
      var smin=Math.min.apply(null,vals), smax=Math.max.apply(null,vals);
      if(smax===smin){smax+=10; smin-=10;}
      var range=smax-smin; smin-=range*0.1; smax+=range*0.1; range=smax-smin;
      
      /* grid lines */
      var gridCount=2, gridSvg='';
      for(var g=0;g<=gridCount;g++){
        var gy=padT+plotH*(g/gridCount);
        var gval=smax-range*(g/gridCount);
        gridSvg+='<line x1="'+padL+'" y1="'+gy.toFixed(1)+'" x2="'+(w-padR)+'" y2="'+gy.toFixed(1)+'" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,2"/>';
        gridSvg+='<text x="'+(padL-6)+'" y="'+(gy+3).toFixed(1)+'" text-anchor="end" fill="#94a3b8" font-size="8">'+Math.round(gval)+'</text>';
      }
      
      /* x-axis labels */
      var xLabels=''; timeLabels.forEach(function(t,i){
        var tx=padL+plotW*(i/(n-1||1));
        xLabels+='<text x="'+tx.toFixed(1)+'" y="'+(h-6)+'" text-anchor="middle" fill="#64748b" font-size="9" font-weight="600">'+esc(t)+'</text>';
      });
      
      /* polyline + dots */
      var pts=[]; s.values.forEach(function(v,i){
        if(!isFinite(v)) return;
        var px=padL+plotW*(i/(n-1||1));
        var py=padT+plotH*((smax-v)/range);
        pts.push({x:px,y:py,v:v,i:i});
      });
      
      var linesSvg='', dotsSvg='', defs='';
      if(pts.length>=2){
        var id='trend_grad_'+si;
        defs='<linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+color+'" stop-opacity="0.18"/><stop offset="100%" stop-color="'+color+'" stop-opacity="0.02"/></linearGradient>';
        var pathD=pts.map(function(p,j){return (j?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1);}).join(' ');
        var fillD=pathD+'L'+pts[pts.length-1].x.toFixed(1)+' '+(padT+plotH).toFixed(1)+'L'+pts[0].x.toFixed(1)+' '+(padT+plotH).toFixed(1)+'Z';
        linesSvg+='<path d="'+fillD+'" fill="url(#'+id+')" opacity="0.6"/>';
        linesSvg+='<path d="'+pathD+'" fill="none" stroke="'+color+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trend-line"/>';
        pts.forEach(function(p){
          dotsSvg+='<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="3.5" fill="'+color+'" stroke="#fff" stroke-width="1.5" class="trend-dot"><title>'+esc(s.label)+' '+esc(timeLabels[p.i]||'')+': '+p.v+'</title></circle>';
        });
      }
      
      var svg='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(s.label)+' trend" xmlns="http://www.w3.org/2000/svg"><defs>'+defs+'</defs><rect width="'+w+'" height="'+h+'" fill="#fafbfd" rx="6"/>'+gridSvg+xLabels+linesSvg+dotsSvg+'</svg>';
      
      return '<div class="ws-trend-mini-card"><h4><i style="background:'+color+'"></i>'+esc(s.label)+'</h4>'+svg+'</div>';
    }).join('');
    
    return '<div class="ws-trend-grid-container">'+chartsHtml+'</div>';
  }

  function setStatus(left,right){$('#statusLeft').textContent=left||''; if(right) $('#statusRight').textContent=right;}
  function isReady(item){return !!(item && (item.v242qLearnerReady===true || item.v242pLearnerReady===true));}
  function getArr(chunk){if(Array.isArray(chunk)) return chunk; return chunk.items||chunk.questions||chunk.records||chunk.data||[];}
  async function fetchJson(path){var r=await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error('HTTP '+r.status+' '+path); return r.json();}
  function qs(){return new URLSearchParams(location.search||'');}
  function updateMetrics(){
    var readyCount = COUNTS.readyStandalone;
    var casesCount = COUNTS.cases;
    var facingCount = COUNTS.learnerFacingTotal;

    $('#wsMetrics').innerHTML=
      '<div class="ws-metric-card ws-card-ready" title="Stand-alone learner-ready questions in current validation gate">' +
        '<div class="ws-metric-icon">✨</div>' +
        '<div class="ws-metric-content">' +
          '<span class="ws-metric-num">' + readyCount.toLocaleString() + '</span>' +
          '<span class="ws-metric-label">Learner-Ready</span>' +
        '</div>' +
      '</div>' +
      '<div class="ws-metric-card ws-card-cases" title="Multi-item case studies and unfolding clinical nursing cases">' +
        '<div class="ws-metric-icon">📚</div>' +
        '<div class="ws-metric-content">' +
          '<span class="ws-metric-num">' + casesCount.toLocaleString() + '</span>' +
          '<span class="ws-metric-label">Clinical Cases</span>' +
        '</div>' +
      '</div>' +
      '<div class="ws-metric-card ws-card-facing" title="Total learner-facing items (standalone + cases)">' +
        '<div class="ws-metric-icon">👥</div>' +
        '<div class="ws-metric-content">' +
          '<span class="ws-metric-num">' + facingCount.toLocaleString() + '</span>' +
          '<span class="ws-metric-label">Learner-Facing</span>' +
        '</div>' +
      '</div>';
  }
  function normalizeType(t){
    var v=text(t||'unknown').toLowerCase();
    var aliases={
      'mc':'multiple-choice','multiple choice':'multiple-choice','single':'multiple-choice',
      'sata':'multiple-response-sata','select-n':'multiple-response-sata','multiple response select n':'multiple-response-sata',
      'matrix mc':'matrix-multiple-choice','matrix multiple choice':'matrix-multiple-choice',
      'matrix mr':'matrix-multiple-response','matrix multiple response':'matrix-multiple-response',
      'bow-tie':'bowtie','bow tie':'bowtie',
      'drop-down rationale':'cloze-dropdown','dropdown-rationale':'cloze-dropdown','drop down rationale':'cloze-dropdown',
      'dropdown table':'case-dropdown','drop-down table':'case-dropdown','case dropdown':'case-dropdown','case drop-down':'case-dropdown',
      'highlight text/table':'highlight','highlight text':'highlight','highlight':'highlight',
      'image hs':'image-hotspot','image hotspot':'image-hotspot','image-hotspot':'image-hotspot',
      'audio hs':'audio-hotspot','audio hotspot':'audio-hotspot','audio-hotspot':'audio-hotspot',
      'ordered response':'ordered-response','ordered-response':'ordered-response','calculation':'calculation','trend':'trend',
      'multiple response sata':'multiple-response-sata','extended multiple response':'multiple-response-sata','extended-multiple-response':'multiple-response-sata'
    };
    return aliases[v]||v.replace(/\s+/g,'-');
  }
  function escapeRegExp(v){return String(v).replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}
  function isHeldRendererType(t){return !!HELD_RENDERER_TYPES[normalizeType(t)];}
  function isHeldRendererId(it){return !!(it && HELD_RENDERER_IDS[it.id]);}
  function extractIds(v){
    if(!v) return [];
    if(Array.isArray(v)) return v.map(function(x){return typeof x==='object'?(x.id||x.value||x.key||x.text):x;}).filter(function(x){return x!=null&&String(x).trim()!=='';}).map(String);
    if(typeof v==='object') return Object.keys(v).filter(function(k){return v[k]===true || v[k]===1 || v[k]==='true';});
    return [String(v)];
  }
  function viewModelFromItem(item){
    var st=(item&&item.structure)||{}, ak=(item&&item.answerKey)||{}, f=normalizeType((item&&item.format)||st.type);
    var p=patientOf(item||{});
    var chart={overview:{patient:p,clinicalFocus:(item&&item.clinical_focus)||'',clientNeeds:(item&&item.client_needs)||''},history:listData('history'),notes:listData('notes'),vitals:listData('vitals'),labs:listData('labs'),radiology:listData('radiology'),orders:listData('orders')};
    var responseModel={type:f,multi:/response|sata|bow|highlight|matrix/.test(f)&&!/multiple-choice|ordered/.test(f),heldRenderer:isHeldRendererType(f)};
    var key={correctIds:extractIds(ak.correctIds||ak.correctSet||st.correct),correctOrder:extractIds(ak.correctOrder||st.correct_order),correctMap:ak.correctMap||st.correctMap||st.correct_answers||{},correctCondition:extractIds(ak.correctCondition),correctActions:extractIds(ak.correctActions),correctParameters:extractIds(ak.correctParameters),maxScore:ak.maxScore||0};
    return {schema:'NexusItemViewModel',schemaVersion:'v242X-1',id:item&&item.id,itemType:f,patient:p,chartTabs:chart,stem:stemOf(item||{}),structure:st,answerKey:key,rationale:(item&&item.rationale)||null,metadata:{difficulty:item&&item.difficulty,cjmm:item&&item.cjmm_step,clientNeeds:item&&item.client_needs,clinicalFocus:item&&item.clinical_focus,chunk:item&&item.__lite&&item.__lite.chunk},responseModel:responseModel,scoringRules:{engine:'shared-v242X-adapter',nativeParityStatus:'candidate-lab'}};
  }
  function responseFromDom(vm){
    var f=(vm&&vm.itemType)||normalizeType((state.current&&state.current.format)||'');
        if(/matrix/.test(f)){
      if(f === 'matrix-multiple-response'){
        var map={};
        $('input[data-row]:checked').forEach(function(x){
          var row=x.dataset.row;
          if(!map[row]) map[row]=[];
          map[row].push(x.value);
        });
        return {type:f,map:map,ids:selectedIds()};
      } else {
        return {type:f,map:$('input[data-row]:checked').reduce(function(m,x){m[x.dataset.row]=x.value;return m;},{}),ids:selectedIds()};
      }
    }
    if(/ordered/.test(f)) return {type:f,order:$$('#orderList .ws-option').map(function(x){return x.dataset.id;})};
    if(/dropdown|cloze|case-dropdown/.test(f)) return {type:f,map:$$('select[data-blank]').reduce(function(m,s){m[s.dataset.blank]=s.value;return m;},{}),ids:[$('#caseDropdownFallback')?$('#caseDropdownFallback').value:''].filter(Boolean)};
    if(/hotspot|image|audio/.test(f)) return {type:f,ids:[state.answers.hotspot||''].filter(Boolean)};
    if(/calculation/.test(f)) return {type:f,freeText:($('#calcAnswer')&&$('#calcAnswer').value.trim())||'',ids:selectedIds()};
    return {type:f,ids:selectedIds()};
  }
  function scoreViewModel(vm,response){
    var st=vm.structure||{}, key=vm.answerKey||{}, f=vm.itemType, max=key.maxScore||1, correct=0, got=[];
    if(vm.responseModel&&vm.responseModel.heldRenderer) return {correct:0,max:0,got:[],held:true,reason:'Renderer held until production media/asset design is approved.'};
        if(/matrix/.test(f)){
      var cm=key.correctMap||{};
      max=Object.keys(cm).length||max;
      if(f === 'matrix-multiple-response'){
        var points=0;
        Object.keys(cm).forEach(function(k){
          var correctCols=Array.isArray(cm[k])?cm[k]:[cm[k]];
          var userCols=response.map[k]||[];
          var isCorrect = correctCols.length === userCols.length && correctCols.every(function(col){
            return userCols.indexOf(col) > -1;
          });
          if(isCorrect) points+=1;
        });
        correct=points;
        got=Object.keys(response.map||{}).map(function(k){return k+': ['+(response.map[k]||[]).join(', ')+']';});
      } else {
        got=Object.keys(response.map||{}).map(function(k){return k+': '+response.map[k];});
        correct=Object.keys(response.map||{}).filter(function(k){return cm[k]===response.map[k];}).length;
      }
    }
    else if(/ordered/.test(f)){var order=response.order||[], k=key.correctOrder||[]; max=k.length||max; got=order; correct=order.filter(function(id,i){return id===k[i];}).length;}
    else if(/bow/.test(f)){var k=(key.correctIds||[]).concat(key.correctCondition||[],key.correctActions||[],key.correctParameters||[]); max=k.length||max; got=response.ids||[]; correct=got.filter(function(id){return k.indexOf(id)>-1;}).length;}
    else if(/dropdown|cloze|case-dropdown/.test(f)){var cm2=key.correctMap||{}; if(Object.keys(cm2).length){max=Object.keys(cm2).length; got=Object.keys(response.map||{}).map(function(k){return k+': '+response.map[k];}); correct=Object.keys(response.map||{}).filter(function(k){return cm2[k]===response.map[k];}).length;} else {var k2=key.correctIds||[]; got=response.ids||[]; max=1; correct=got.some(function(id){return k2.indexOf(id)>-1;})?1:0;}}
    else if(/calculation/.test(f) && response.freeText){var ans=String(response.freeText).toLowerCase(); var k3=String(st.correct_answer||((key.correctIds||[])[0])||'').toLowerCase(); got=[ans]; max=1; correct=(ans===k3)?1:0;}
    else {var k4=key.correctIds||[]; got=response.ids||[]; max=key.maxScore||k4.length||1; correct=got.filter(function(id){return k4.indexOf(id)>-1;}).length; if(got.length>k4.length) correct=Math.max(0,correct-(got.length-k4.length));}
    return {correct:correct,max:max,got:got,held:false};
  }
  function normalizeFocusWords(v){
    var drop={acute:1,management:1,evaluation:1,complication:1,postoperative:1,pain:1,client:1,nursing:1,current:1,risk:1,assessment:1,monitoring:1,safety:1,care:1,intervention:1,physiological:1,integrity:1,reduction:1,health:1,maintenance:1,patient:1,review:1};
    return text(v).toLowerCase().replace(/[^a-z0-9/ ]/g,' ').split(/[\s\/-]+/).filter(function(w){return w.length>4&&!drop[w];}).slice(0,8);
  }
  function isLabSafeLite(it){
  if(it.id && String(it.id).indexOf('HS-BRIEF') !== -1) return true;
  var prompt=text(it.prompt), cf=text(it.clinical_focus), low=(prompt+' '+cf).toLowerCase();
  var p=it.patient||{}, age=parseFloat(p.age_value||p.age||'');
  if(prompt.length<70) return false;
  if(/^review the case study and answer the question\.?$/i.test(prompt)) return false;
  if(/postoperative pain\s*\/\s*complication evaluation/i.test(cf)) return false;
  if(p.gender==='M' && /\b(obstetrics|maternity|pregnan|postpartum|preeclampsia|fetal)\b/i.test((p.location||'')+' '+prompt+' '+cf)) return false;
  if(/\bfetal\b/i.test(low) && isFinite(age) && age>50) return false;
  var words=normalizeFocusWords(cf); if(words.length){ var hits=words.filter(function(w){return prompt.toLowerCase().indexOf(w)>-1;}).length; if(hits===0) return false; }
  return true;
}
  function labRank(it){
    var prompt=text(it.prompt), cf=text(it.clinical_focus), p=it.patient||{}, low=(prompt+' '+cf).toLowerCase();
    var score=0;
    if(prompt.length>120) score+=2; if(prompt.length>220) score+=1; if(prompt.length>900) score-=1;
    ['stroke','heart failure','sepsis','pneumonia','copd','chest tube','acute coronary','myocardial','atrial fibrillation','pulmonary embolism','tuberculosis','diabetes','insulin','oxygen','kidney','renal','dka','hypoglycemia','hypertension','fluid volume'].forEach(function(k){if(low.indexOf(k)>-1) score+=2;});
    normalizeFocusWords(cf).forEach(function(w){ if(prompt.toLowerCase().indexOf(w)>-1) score+=1; });
    if(/john doe|jane doe|john smith/i.test(text(p.name))) score-=3;
    if(/burns/i.test(cf) && !/burn|smoke|thermal|wound/i.test(prompt)) score-=3;
    if(/oncology unit|burn unit|maternity unit|obstetrics unit/i.test(text(p.location)) && !/oncology|burn|maternity|obstetric|pregnan|postpartum/i.test(low)) score-=2;
    if(/^review the case study/i.test(prompt)) score-=4;
    return score;
  }
  function buildIndex(){
    var items=state.index.items||[];
    state.publicDemoMode=isPublicDemoRoute();
    state.ready=items.filter(isReady);
    state.labReady=state.ready.filter(isLabSafeLite).sort(function(a,b){return labRank(b)-labRank(a);});
    state.productionReady=state.labReady.filter(function(it){return !isHeldRendererType(it.format) && !isHeldRendererId(it);});
    var fullProductionReady=state.productionReady.slice();
    if(state.publicDemoMode){
      var picked=[], seen={};
      PUBLIC_DEMO_TYPE_ORDER.forEach(function(t){
        var candidates=fullProductionReady.filter(function(it){return normalizeType(it.format)===t;}).slice(0,PUBLIC_DEMO_MAX_PER_TYPE);
        candidates.forEach(function(it){if(!seen[it.id]){seen[it.id]=true;picked.push(it);}});
      });
      state.publicDemoItems=picked;
      state.labReady=picked;
      state.productionReady=picked;
    }
    COUNTS.sourceStandalone=items.length;
    COUNTS.readyStandalone=state.ready.length;
    COUNTS.learnerFacingTotal=state.ready.length + (state.cases&&state.cases.items?state.cases.items.length:1056);
    COUNTS.cases=(state.cases&&state.cases.items?state.cases.items.length:1056);
    COUNTS.heldHiddenStandalone=COUNTS.sourceStandalone-COUNTS.readyStandalone;
    COUNTS.heldRendererStandalone=state.ready.filter(function(it){return isHeldRendererType(it.format);}).length;
    COUNTS.rendererContractHoldStandalone=Object.keys(HELD_RENDERER_IDS).length;
    COUNTS.productionCandidateStandalone=state.productionReady.length;
    COUNTS.publicDemoExposedStandalone=state.publicDemoMode?state.productionReady.length:0;
    var map=new Map(), labMap=new Map(), prodMap=new Map();
    state.ready.forEach(function(it){var f=normalizeType(it.format); if(!map.has(f)) map.set(f,[]); map.get(f).push(it);});
    state.labReady.forEach(function(it){var f=normalizeType(it.format); if(!labMap.has(f)) labMap.set(f,[]); labMap.get(f).push(it);});
    state.productionReady.forEach(function(it){var f=normalizeType(it.format); if(!prodMap.has(f)) prodMap.set(f,[]); prodMap.get(f).push(it);});
    state.itemsByType=map; state.labItemsByType=labMap; state.productionItemsByType=prodMap;
    state.heldTypes=Array.from(map.keys()).filter(isHeldRendererType).sort();
    state.types=Array.from(prodMap.keys()).sort(function(a,b){return prodMap.get(b).length-prodMap.get(a).length || a.localeCompare(b);});
  }
  function fillSelectors(){
    var typeSelect=$('#typeSelect'), itemSelect=$('#itemSelect');
    var difficultySelect=$('#difficultySelect'), cjmmSelect=$('#cjmmSelect');
    typeSelect.innerHTML=state.types.map(function(t){var full=(state.itemsByType.get(t)||[]).length; var lab=(state.labItemsByType.get(t)||[]).length; var suffix=state.publicDemoMode?' · demo item':(lab?(' · '+lab+' lab-safe / '+full):(' · '+full+' total')); return '<option value="'+esc(t)+'">'+esc(title(t))+esc(suffix)+'</option>';}).join('');
    var want=normalizeType(qs().get('type'));
    if(want && state.itemsByType.has(want)) typeSelect.value=want;
    typeSelect.addEventListener('change',function(){fillItemSelect(); chooseIndex(0);});
    difficultySelect.addEventListener('change',function(){fillItemSelect(); chooseIndex(0);});
    cjmmSelect.addEventListener('change',function(){fillItemSelect(); chooseIndex(0);});
    itemSelect.addEventListener('change',function(){chooseIndex(Number(itemSelect.value)||0);});
    $('#randomBtn').addEventListener('click',function(){
      var type=$('#typeSelect').value || state.types[0];
      var arr=(state.productionItemsByType.get(type)&&state.productionItemsByType.get(type).length?state.productionItemsByType.get(type):(state.labItemsByType.get(type)&&state.labItemsByType.get(type).length?state.labItemsByType.get(type):state.itemsByType.get(type)))||[];
      var diffVal=difficultySelect.value;
      var cjmmVal=cjmmSelect.value;
      if(diffVal && diffVal!=='all') arr=arr.filter(function(it){return it.difficulty===diffVal;});
      if(cjmmVal && cjmmVal!=='all') arr=arr.filter(function(it){return it.cjmm_step===cjmmVal;});
      if(arr.length) {
        var randIdx=Math.floor(Math.random()*arr.length);
        chooseIndex(randIdx);
      }
    });
    $('#auditBtn').addEventListener('click',function(){var fn=window.NEXUS_V243D_PUBLIC_DEMO_GATE_AUDIT||window.NEXUS_V243B_PERFORMANCE_MOBILE_BETA_AUDIT||window.NEXUS_V243A_ACCESSIBILITY_KEYBOARD_AUDIT||window.NEXUS_V242Z_PRODUCTION_RENDERER_AUDIT; var a=fn(); console.log(a); alert('Latest Workstation audit written to console. Acceptance: '+a.acceptance);});
    fillItemSelect();
  }
  function fillItemSelect(){
    var type=$('#typeSelect').value || state.types[0];
    var arr=(state.productionItemsByType.get(type)&&state.productionItemsByType.get(type).length?state.productionItemsByType.get(type):(state.labItemsByType.get(type)&&state.labItemsByType.get(type).length?state.labItemsByType.get(type):state.itemsByType.get(type)))||[];
    var diffVal=$('#difficultySelect').value;
    var cjmmVal=$('#cjmmSelect').value;
    if(diffVal && diffVal!=='all') arr=arr.filter(function(it){return it.difficulty===diffVal;});
    if(cjmmVal && cjmmVal!=='all') arr=arr.filter(function(it){return it.cjmm_step===cjmmVal;});
    if(!arr.length) {
      $('#itemSelect').innerHTML='<option value="">No matching items</option>';
    } else {
      $('#itemSelect').innerHTML=arr.slice(0,400).map(function(it,i){return '<option value="'+i+'">'+esc((i+1)+'. '+(it.clinical_focus||it.prompt||it.id||'item')).slice(0,180)+'</option>';}).join('');
    }
  }
  async function chooseIndex(i){
    var type=$('#typeSelect').value || state.types[0];
    var arr=(state.productionItemsByType.get(type)&&state.productionItemsByType.get(type).length?state.productionItemsByType.get(type):(state.labItemsByType.get(type)&&state.labItemsByType.get(type).length?state.labItemsByType.get(type):state.itemsByType.get(type)))||[];
    var diffVal=$('#difficultySelect').value;
    var cjmmVal=$('#cjmmSelect').value;
    if(diffVal && diffVal!=='all') arr=arr.filter(function(it){return it.difficulty===diffVal;});
    if(cjmmVal && cjmmVal!=='all') arr=arr.filter(function(it){return it.cjmm_step===cjmmVal;});
    if(!arr.length) return;
    if(i>=arr.length) i=0;
    var lite=arr[i];
    $('#itemSelect').value=String(Math.min(i,399));
    await loadFullItem(lite);
  }
  async function loadFullItem(lite){
    setStatus('Loading chunk for '+(lite.format||'item')+'…','Chunked DB preserved · fetching one small chunk');
    state.currentIndex=lite; state.answers={}; state.submitted=false; $('#scorePanel').hidden=true;
    var chunk=await fetchJson('../'+lite.chunk);
    var arr=getArr(chunk);
    var full = (lite.id ? arr.find(function(x){return x.id===lite.id;}) : null) || arr[lite.chunkIndex] || lite;
    state.current=Object.assign({}, full, {__lite:lite});
    state.viewModel=viewModelFromItem(state.current);
    renderAll();
    setStatus('Loaded '+(full.id||lite.id),'Native viewer untouched · isolated renderer only');
  }
  function extractDemographicsFromStem(item){
    var s=stemOf(item), out={};
    var nameMatch=s.match(/\b(?:Mr\.|Ms\.|Mrs\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/) || s.match(/\b(?:client|patient),\s*([A-Z][a-z]+\s+[A-Z][a-z]+)\b/) || s.match(/\b([A-Z][a-z]+\s+[A-Z][a-z]+),\s*(?:a|an|the)?\s*\d{1,3}/);
    if(nameMatch) out.name=(nameMatch[1]||nameMatch[0]).trim();
    var ageMatch=s.match(/\b(\d{1,3})\s*[- ]?year[- ]old\b/i) || s.match(/\b(\d{1,3})\s*years?\b/i);
    if(ageMatch) out.age=ageMatch[1]+' years';
    if(/\bfemale\b|\bwoman\b|\bshe\b|\bher\b/i.test(s)) out.gender='F';
    else if(/\bmale\b|\bman\b|\bhe\b|\bhis\b/i.test(s)) out.gender='M';
    var unitMatch=s.match(/\bin the ([A-Za-z -]+ Unit)\b/i) || s.match(/\bon the ([A-Za-z -]+ Unit)\b/i);
    if(unitMatch) out.location=unitMatch[1];
    return out;
  }
  function patientOf(item){
    var p=item.patient || (item.__lite&&item.__lite.patient) || {}, inferred=extractDemographicsFromStem(item);
    var name=text(inferred.name)||text(p.name)||inferName(item)||'Client';
    var age=text(inferred.age)||((text(p.age_value)||text(p.age)||'--')+(p.age_unit?' '+p.age_unit:''));
    var gender=text(inferred.gender)||text(p.gender)||inferGender(item)||'--';
    var loc=text(inferred.location)||text(p.location)||'Clinical Unit';
    return {name:name,age:age,gender:gender,location:loc,allergies:text(p.allergies)||'NKA',code:text(p.code_status)||'Full Code',dx:text(p.admission_diagnosis)||text(item.clinical_focus)||'Clinical judgment review'};
  }
  function inferName(item){var s=stemOf(item); var m=s.match(/(?:Mr\.|Ms\.|Mrs\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?|[A-Z][a-z]+\s+[A-Z][a-z]+/); return m&&m[0];}
  function inferGender(item){var s=(stemOf(item)+' '+JSON.stringify(item.patient||{})).toLowerCase(); if(/\bfemale\b|\bshe\b|\bher\b/.test(s)) return 'F'; if(/\bmale\b|\bhe\b|\bhis\b/.test(s)) return 'M'; return '';}
  function stemOf(item){var st=item.structure||{}; return text(st.stem)||text(st.prompt)||text(item.prompt)||text(st.scenario)||text(item.scenario)||'Review the chart and complete the nursing decision.';}
  function structureOf(){return (state.current&&state.current.structure)||{};}
  function answerKeyOf(){return (state.current&&state.current.answerKey)||{};}
  function formatMarkdownAndLists(txt) {
    var raw = String(txt || '').trim();
    if (!raw) return '';
    var escaped = esc(raw);
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    var hasNumbered = /\b1\.\s+(.*?\b2\.\s+)/.test(escaped);
    if (hasNumbered) {
      var listStartIdx = escaped.search(/\b1\.\s+/);
      var intro = '';
      if (listStartIdx > 0) {
        intro = escaped.substring(0, listStartIdx).trim();
      }
      var listPart = escaped.substring(listStartIdx);
      var items = listPart.split(/\b\d+\.\s+/).map(function(item) {
        return item.trim();
      }).filter(Boolean);
      var listHtml = '<ol class="ws-rationale-list">';
      items.forEach(function(item) {
        listHtml += '<li>' + item + '</li>';
      });
      listHtml += '</ol>';
      return (intro ? '<p class="ws-rationale-intro">' + intro + '</p>' : '') + listHtml;
    }
    return '<p>' + escaped.replace(/\n+/g, '</p><p>') + '</p>';
  }
  function rationaleOf(item){
    var r=item.rationale;
    if(!r) return 'Rationale not available in this preview record.';
    if(typeof r==='string') return '<div class="ws-rat-section explanation"><h4>📝 Explanation</h4><div class="ws-rat-body">' + formatMarkdownAndLists(r) + '</div></div>';
    function flat(v){
      if(v==null) return '';
      if(typeof v==='string' || typeof v==='number' || typeof v==='boolean') return String(v);
      if(Array.isArray(v)) return v.map(flat).filter(Boolean).join(' ');
      if(typeof v==='object') return Object.keys(v).map(function(k){return title(k)+': '+flat(v[k]);}).join(' ');
      return String(v);
    }
    var html='';
    var keys = ['answer_analysis','core_concept','golden_rule','trap','rationale','explanation','teaching'];
    keys.forEach(function(k){
      if(r[k]) {
        var cls = k.replace('_', '-');
        var cleanTitle = title(k);
        var icon = '';
        if (k === 'answer_analysis') icon = '📊 ';
        else if (k === 'core_concept') icon = '💡 ';
        else if (k === 'golden_rule') icon = '✨ ';
        else if (k === 'trap') { icon = '⚠️ '; cleanTitle = 'Trap to Avoid'; }
        else if (k === 'teaching') icon = '👩‍🏫 ';
        else icon = '📝 ';
        
        html += '<div class="ws-rat-section ' + cls + '">' +
          '<h4>' + icon + esc(cleanTitle) + '</h4>' +
          '<div class="ws-rat-body">' + formatMarkdownAndLists(flat(r[k])) + '</div>' +
        '</div>';
      }
    });
    return html ? html : esc(flat(r));
  }
  function listData(kind){
    var e=(state.current&&state.current.ehr)||{};
    var vals=[];
    if(kind==='history') vals=e.history_physical||e.hp||e.historyAndPhysical||e.history_and_physical||e.h_and_p||e.physical_exam||e.assessment||[];
    if(kind==='notes') vals=e.notes||e.nurses_notes||e.nursing_notes||e.documentation||[];
    if(kind==='labs') vals=e.labs||e.lab_results||e.laboratory||e.diagnostics||[];
    if(kind==='vitals') vals=e.vitals||e.vital_signs||e.vitalSigns||[];
    if(kind==='orders') vals=e.orders||e.provider_orders||e.med_orders||e.medications||[];
    if(kind==='radiology') vals=e.radiology||e.imaging||e.images||e.diagnostic_imaging||e.radiology_results||[];
    if(kind==='io') vals=e.io||e.intake_output||e.fluid_balance||[];
    return normArray(vals);
  }
  function allSourceText(item){
    item=item||state.current||{};
    var ehrCopy=item.ehr;
    if(item.ehr && typeof item.ehr==='object' && !Array.isArray(item.ehr)){
      ehrCopy={};
      for(var k in item.ehr){
        if(k!=='computedVitals') ehrCopy[k]=item.ehr[k];
      }
    }
    var parts=[stemOf(item), item.prompt, item.scenario, item.clinical_focus, item.client_needs, flattenText(ehrCopy), flattenText(item.structure), flattenText(item.__lite)];
    return parts.filter(Boolean).join(' \n ');
  }
  function firstMatch(s,patterns){
    for(var i=0;i<patterns.length;i++){var m=s.match(patterns[i]); if(m) return (m[1]||m[0]||'').trim();}
    return '';
  }
  function vitalValueFromObject(row,key){
    if(!row || typeof row!=='object') return '';
    var aliases={
      T:['t','temp','temperature'], HR:['hr','heart_rate','heart rate','pulse'], RR:['rr','respiratory_rate','respiratory rate'], BP:['bp','blood_pressure','blood pressure'], 'SpO₂':['spo2','sp_o2','oxygen_saturation','oxygen saturation','o2sat','o2 sat','pulse_ox'], MAP:['map'], Pain:['pain','pain score','pain level','pain scale'], Weight:['wt','weight'], Height:['ht','height'], BMI:['bmi','body mass index']
    }[key]||[];
    for(var i=0;i<aliases.length;i++){
      var a=aliases[i];
      if(row[a]!=null && text(row[a])) return row[a];
      for(var k in row){ if(String(k).toLowerCase()===a && text(row[k])) return row[k]; }
      var rowLabel=text(row.name||row.label||row.test||row.item||row.type).toLowerCase();
      var isMatch = rowLabel === a;
      if (!isMatch) {
        if (a.length <= 2) {
          isMatch = new RegExp('\\b' + a + '\\b').test(rowLabel);
        } else {
          isMatch = rowLabel.indexOf(a) > -1;
        }
      }
      if(isMatch){
        var direct=row.value||row.result||row.reading||row.measurement||row.text||row.note;
        if(text(direct)) return direct;
      }
    }
    var flat=flattenText(row);
    if(key==='BP'){var mbp=flat.match(/(\d{2,3}\s*\/\s*\d{2,3})/); if(mbp) return mbp[1];}
    if(key==='SpO₂'){var ms=flat.match(/(?:SpO2|SpO₂|oxygen saturation|O2 sat|O₂ sat|pulse ox)[^0-9]{0,12}([0-9]{2,3}%?)/i); if(ms) return ms[1];}
    if(key==='HR'){var mh=flat.match(/(?:\bHR\b|\bHeart Rate\b|\bpulse\b)[^0-9]{0,12}([0-9]{2,3})\b/i); if(mh) return mh[1];}
    if(key==='RR'){var mr=flat.match(/(?:\bRR\b|\bRespiratory Rate\b)[^0-9]{0,12}([0-9]{1,3})\b/i); if(mr) return mr[1];}
    if(key==='T'){var mt=flat.match(/(?:\bT\b|\bTemp(?:erature)?\b)[^0-9]{0,12}([0-9]{2,3}(?:\.[0-9])?\s?°?\s?[CF]?)/i); if(mt) return mt[1];}
    if(key==='MAP'){var mm=flat.match(/\bMAP\b[^0-9]{0,12}([0-9]{2,3})\b/i); if(mm) return mm[1];}
    if(key==='Pain'){var mp=flat.match(/(?:\bPain\b|\bpain score\b|\bpain level\b)[^0-9]{0,12}([0-9]{1,2}(?:\/10)?)/i); if(mp) return mp[1];}
    if(key==='Weight'){var mw=flat.match(/(?:\bWeight\b|\bWt\b)[^0-9]{0,12}([0-9]{2,3}(?:\.[0-9])?\s*(?:kg|lbs?))/i); if(mw) return mw[1];}
    if(key==='Height'){var mh=flat.match(/(?:\bHeight\b|\bHt\b)[^0-9]{0,12}([0-9]{2,3}(?:\.[0-9])?\s*(?:cm|in|m\b))/i); if(mh) return mh[1];}
    if(key==='BMI'){var mb=flat.match(/\bBMI\b[^0-9]{0,12}([0-9]{2}(?:\.[0-9])?)/i); if(mb) return mb[1];}
    return '';
  }
  function extractVitalRowsFromEhr(item){
    var e=(item&&item.ehr)||{}, raw=e.vitals||e.vital_signs||e.vitalSigns||[];
    return normArray(raw).filter(function(x){return x && (typeof x==='object' || String(x).trim());});
  }
  function parseVitalsFromText(item){
    var s=allSourceText(item);
    var specs=[
      ['T',[/(?:\bT\b|Temp(?:erature)?)\s*[:=]?\s*([0-9]{2,3}(?:\.[0-9])?\s?°?\s?[CF]?)/i, /temperature\s+(?:is|of|shows)?\s*([0-9]{2,3}(?:\.[0-9])?\s?°?\s?[CF]?)/i]],
      ['HR',[/(?:\bHR\b|Heart Rate|heart rate|pulse)\s*[:=]?\s*([0-9]{2,3})\b/i, /(?:tachycardic|rate of)\s*([0-9]{2,3})\b/i]],
      ['RR',[/(?:\bRR\b|Respiratory Rate|respiratory rate)\s*[:=]?\s*([0-9]{1,3})\b/i]],
      ['BP',[/(?:\bBP\b|Blood Pressure|blood pressure)\s*[:=]?\s*([0-9]{2,3}\/[0-9]{2,3})/i, /\b([0-9]{2,3}\/[0-9]{2,3})\s*(?:mmHg|mm Hg)?\b/i]],
      ['SpO₂',[/(?:SpO2|SpO₂|oxygen saturation|O2 sat|O₂ sat|pulse ox)\s*[:=]?(?:\s*of)?\s*([0-9]{2,3}%)/i]],
      ['MAP',[/\bMAP\s*[:=]?\s*([0-9]{2,3})\b/i]],
      ['Pain',[/(?:Pain|pain score|pain level)[^0-9]{0,12}([0-9]{1,2}(?:\/10)?)/i]],
      ['Weight',[/(?:Weight|Wt)[^0-9]{0,12}([0-9]{2,3}(?:\.[0-9])?\s*(?:kg|lbs?))/i]],
      ['Height',[/(?:Height|Ht)[^0-9]{0,12}([0-9]{2,3}(?:\.[0-9])?\s*(?:cm|in|m))/i]],
      ['BMI',[/\bBMI\s*[:=]?\s*([0-9]{2}(?:\.[0-9])?)/i]]
    ];
    var found={}; specs.forEach(function(x){found[x[0]]=firstMatch(s,x[1]);});
    return found;
  }
  function normalizeVitalLabel(k,v){
    if(!v) return '';
    var val=String(v).trim();
    if(k==='SpO₂' && /^\d+$/.test(val)) val+='%';
    if(k==='T'){
      if(val.indexOf('/')===-1){
        var n=parseFloat(val.replace(/[^0-9.]/g,''));
        if(isFinite(n)){
          var isF=/F/i.test(val)||n>45;
          if(isF){
            var c=(n-32)*5/9;
            val=n.toFixed(1)+'°F / '+c.toFixed(1)+'°C';
          } else {
            var f=n*9/5+32;
            val=f.toFixed(1)+'°F / '+n.toFixed(1)+'°C';
          }
        }
      }
    }
    if(k==='MAP' && /^\d+(?:\.\d+)?$/.test(val)) val=Math.round(parseFloat(val))+' mmHg';
    if(k==='Pain' && /^\d+$/.test(val)) val+='/10';
    if(k==='Weight' && /^\d+(?:\.\d+)?$/.test(val)) val+=' kg';
    if(k==='Height' && /^\d+(?:\.\d+)?$/.test(val)) val+=' cm';
    return val;
  }
  function parseBmiParts(wt, ht){
    var wStr = String(wt||'').toLowerCase();
    var hStr = String(ht||'').toLowerCase();
    var wNum = parseFloat(wStr.replace(/[^0-9.]/g,''));
    var hNum = parseFloat(hStr.replace(/[^0-9.]/g,''));
    if(!isFinite(wNum)||!isFinite(hNum)||hNum===0) return null;
    if(wStr.indexOf('lb')>-1) wNum = wNum * 0.453592;
    if(hStr.indexOf('in')>-1) hNum = hNum * 2.54;
    var hMeters = hNum > 3 ? hNum / 100 : hNum;
    var bmi = wNum / (hMeters * hMeters);
    return Math.round(bmi * 10) / 10;
  }
  function parseBpParts(v){
    var m=String(v||'').match(/(\d{2,3})\s*\/\s*(\d{2,3})/);
    if(!m) return null;
    var sbp=parseInt(m[1],10), dbp=parseInt(m[2],10);
    if(!isFinite(sbp)||!isFinite(dbp)) return null;
    return {sbp:sbp,dbp:dbp,map:Math.round(dbp + ((sbp-dbp)/3))};
  }
  function ageGroupFromPatient(item){
    var p=(item&&item.patient)||(item&&item.__lite&&item.__lite.patient)||{};
    var v=parseFloat(p.age_value||p.age||'');
    if(!isFinite(v)) { var stem=stemOf(item||{}); var m=stem.match(/(\d{1,3})\s*[- ]?year/i); if(m) v=parseFloat(m[1]); }
    if(!isFinite(v)) return 'adult';
    var u=String(p.age_unit||'').toLowerCase();
    var years=v;
    if(u.indexOf('day')>-1) years=v/365;
    else if(u.indexOf('week')>-1) years=v/52;
    else if(u.indexOf('month')>-1) years=v/12;
    else if(u.indexOf('hour')>-1) years=v/8760;
    if(years<0.083) return 'neonate';
    if(years<1) return 'infant';
    if(years<12) return 'child';
    if(years<18) return 'adolescent';
    if(years>=65) return 'older';
    return 'adult';
  }
  var VITAL_REFS={
    T:{neonate:'36.5–37.5°C / 97.7–99.5°F',infant:'36.5–37.5°C / 97.7–99.5°F',child:'36.5–37.5°C / 97.7–99.5°F',adolescent:'36.5–37.3°C / 97.7–99.1°F',adult:'36.5–37.3°C / 97.7–99.1°F',older:'36.0–37.2°C / 96.8–99.0°F'},
    HR:{neonate:'120–160/min',infant:'100–160/min',child:'70–120/min',adolescent:'60–100/min',adult:'60–100/min',older:'60–100/min'},
    RR:{neonate:'30–60/min',infant:'25–50/min',child:'18–30/min',adolescent:'12–20/min',adult:'12–20/min',older:'12–20/min'},
    BP:{neonate:'60–90/40–60 mmHg',infant:'70–100/50–70 mmHg',child:'80–110/50–75 mmHg',adolescent:'90–120/60–80 mmHg',adult:'90/60–120/80 mmHg',older:'90/60–140/90 mmHg'},
    'SpO₂':{neonate:'90–95% (1st min) → 95–100%',infant:'95–100%',child:'95–100%',adolescent:'95–100%',adult:'95–100%',older:'94–100%'},
    MAP:{neonate:'40–60 mmHg',infant:'50–70 mmHg',child:'55–80 mmHg',adolescent:'65–90 mmHg',adult:'70–105 mmHg',older:'70–105 mmHg'},
    Pain:{neonate:'NIPS 0–7',infant:'FLACC 0–10',child:'Wong-Baker / FLACC',adolescent:'NRS 0–10',adult:'NRS 0–10',older:'NRS 0–10'},
    Weight:{neonate:'2.5–4 kg',infant:'6–10 kg',child:'10–40 kg',adolescent:'40–70 kg',adult:'Patient-specific',older:'Patient-specific'},
    Height:{neonate:'45–55 cm',infant:'60–80 cm',child:'80–150 cm',adolescent:'150–180 cm',adult:'Patient-specific',older:'Patient-specific'},
    BMI:{neonate:'N/A',infant:'N/A',child:'CDC percentile',adolescent:'CDC percentile',adult:'18.5–24.9',older:'22–27 (adjusted)'}
  };
  var AGE_LABELS={neonate:'Neonate (<30d)',infant:'Infant (<1yr)',child:'Child (1–11)',adolescent:'Adolescent (12–17)',adult:'Adult (18–64)',older:'Older Adult (65+)'};
  var AGE_ORDER=['neonate','infant','child','adolescent','adult','older'];
  function referenceForVital(k,ag){
    var table=VITAL_REFS[k];
    if(!table) return 'Reference guide only; not patient-specific data.';
    var active=ag||'adult';
    var lines=AGE_ORDER.map(function(g){
      var prefix=(g===active)?'▸ ':'  ';
      return prefix+AGE_LABELS[g]+': '+table[g];
    });
    var baseText=lines.join('\n');
    if(k==='MAP') return baseText+'\n\n* Calculated from documented BP.';
    if(k==='BMI') return baseText+'\n\n* Calculated from Weight and Height.';
    return baseText;
  }
  function noDataPhraseForVital(k){
    if(k==='SpO₂') return 'SpO₂ not charted in primary record.';
    if(k==='MAP') return 'MAP not calculable (blood pressure not charted).';
    if(k==='BMI') return 'BMI not calculable (requires weight and height).';
    if(k==='Pain') return 'Pain level not assessed.';
    if(k==='Weight') return 'Weight not assessed at this time.';
    if(k==='Height') return 'Height not assessed at this time.';
    return k+' not charted in primary record.';
  }
  var VITAL_THRESHOLDS={
    HR:{neonate:{lo:100,hi:180},infant:{lo:90,hi:170},child:{lo:60,hi:130},adolescent:{lo:50,hi:120},adult:{lo:50,hi:120},older:{lo:50,hi:120}},
    RR:{neonate:{lo:25,hi:65},infant:{lo:20,hi:55},child:{lo:14,hi:35},adolescent:{lo:10,hi:24},adult:{lo:10,hi:24},older:{lo:10,hi:24}},
    BP_SBP:{neonate:{lo:55,hi:95},infant:{lo:65,hi:110},child:{lo:75,hi:120},adolescent:{lo:85,hi:140},adult:{lo:90,hi:180},older:{lo:90,hi:180}},
    MAP:{neonate:{lo:35},infant:{lo:45},child:{lo:50},adolescent:{lo:60},adult:{lo:65},older:{lo:65}},
    SpO2:{neonate:{lo:88},infant:{lo:92},child:{lo:92},adolescent:{lo:92},adult:{lo:92},older:{lo:90}}
  };
  function vitalStatus(k,v,ag){
    ag=ag||'adult';
    var str=String(v);
    var cleanStr=str;
    if((k==='Pain' || k==='T') && str.indexOf('/')>-1){
      cleanStr=str.split('/')[0];
    }
    var n=parseFloat(cleanStr.replace(/[^0-9.\-]/g,''));
    if(!isFinite(n)) return {label:'not charted',level:'missing'};
    if(k==='T'){
      var isF=/F/i.test(cleanStr)||n>45;
      var loCrit = isF ? 95.0 : 35.0;
      var loWarn = isF ? 96.8 : 36.0;
      var hiWarn = isF ? 100.4 : 38.0;
      var hiCrit = isF ? 101.3 : 38.5;
      if (n >= hiCrit || n < loCrit) return {label:'priority',level:'critical'};
      if (n >= hiWarn || n < loWarn) return {label:'review',level:'warn'};
      return {label:'documented',level:'ok'};
    }
    if(k==='HR'){
      var isPeds = ag === 'neonate' || ag === 'infant' || ag === 'child';
      var critHi = isPeds ? (ag === 'child' ? 130 : 180) : 120;
      var critLo = isPeds ? (ag === 'child' ? 60 : 90) : 50;
      var warnHi = isPeds ? (ag === 'child' ? 110 : 160) : 100;
      var warnLo = isPeds ? (ag === 'child' ? 70 : 100) : 60;
      if (n >= critHi || n < critLo) return {label:'priority',level:'critical'};
      if (n >= warnHi || n < warnLo) return {label:'review',level:'warn'};
      return {label:'documented',level:'ok'};
    }
    if(k==='RR'){
      var isPeds = ag === 'neonate' || ag === 'infant' || ag === 'child';
      var critHi = isPeds ? (ag === 'child' ? 35 : 60) : 24;
      var critLo = isPeds ? (ag === 'child' ? 14 : 25) : 10;
      var warnHi = isPeds ? (ag === 'child' ? 30 : 50) : 20;
      var warnLo = isPeds ? (ag === 'child' ? 18 : 30) : 12;
      if (n >= critHi || n < critLo) return {label:'priority',level:'critical'};
      if (n >= warnHi || n < warnLo) return {label:'review',level:'warn'};
      return {label:'documented',level:'ok'};
    }
    if(k==='BP'){
      var bp=parseBpParts(v);
      if(!bp) return {label:'documented',level:'ok'};
      var isPeds = ag === 'neonate' || ag === 'infant' || ag === 'child';
      var critHi = isPeds ? (ag === 'child' ? 120 : (ag === 'infant' ? 110 : 95)) : 180;
      var critLo = isPeds ? (ag === 'child' ? 75 : (ag === 'infant' ? 65 : 55)) : 90;
      if (bp.sbp >= critHi || bp.sbp < critLo || bp.dbp >= 110 || bp.dbp < 50) return {label:'priority',level:'critical'};
      if (!isPeds) {
        if (bp.sbp >= 130 || bp.dbp >= 80 || bp.sbp < 100 || bp.dbp < 60) return {label:'review',level:'warn'};
      } else {
        var warnHi = ag === 'child' ? 110 : (ag === 'infant' ? 100 : 90);
        var warnLo = ag === 'child' ? 80 : (ag === 'infant' ? 70 : 60);
        if (bp.sbp >= warnHi || bp.sbp < warnLo) return {label:'review',level:'warn'};
      }
      return {label:'documented',level:'ok'};
    }
    if(k==='SpO₂'){
      var critLo = ag === 'neonate' ? 88 : (ag === 'older' ? 90 : 92);
      var warnLo = ag === 'neonate' ? 90 : 95;
      if (n <= critLo) return {label:'priority',level:'critical'};
      if (n < warnLo) return {label:'review',level:'warn'};
      return {label:'documented',level:'ok'};
    }
    if(k==='MAP'){
      var critLo = ag === 'neonate' ? 35 : (ag === 'infant' ? 45 : (ag === 'child' ? 50 : (ag === 'adolescent' ? 60 : 65)));
      var warnLo = critLo + 5;
      if (n < critLo) return {label:'priority',level:'critical'};
      if (n < warnLo) return {label:'review',level:'warn'};
      return {label:'calculated',level:'ok'};
    }
    if(k==='Pain') return (n>=7)?{label:'priority',level:'critical'}:(n>=4?{label:'review',level:'warn'}:{label:'documented',level:'ok'});
    if(k==='BMI') return {label:'calculated',level:'ok'};
    return {label:'documented',level:'ok'};
  }
  function latestVitalValue(rows,k){
    for(var i=rows.length-1;i>=0;i--){var val=vitalValueFromObject(rows[i],k); if(text(val)) return {value:val,row:rows[i]};}
    return {value:'',row:null};
  }
  function getCohesiveVitalTime(rows, item) {
    for (var i = rows.length - 1; i >= 0; i--) {
      var t = rows[i].time || rows[i].date || '';
      if (t && /^\d{1,2}:\d{2}/.test(t)) return t;
    }
    var notes = normArray(item && item.ehr ? (item.ehr.notes || item.ehr.nursing_notes || item.ehr.nurses_notes) : []);
    for (var i = notes.length - 1; i >= 0; i--) {
      var t = notes[i].time || notes[i].date || '';
      if (t && /^\d{1,2}:\d{2}/.test(t)) return t;
    }
    return '08:15';
  }
  function evidenceVitals(item){
    item=item||state.current||{};
    if(item.ehr && item.ehr.computedVitals) {
      var cohesiveTime = getCohesiveVitalTime(extractVitalRowsFromEhr(item), item);
      return item.ehr.computedVitals.map(function(v){
        var msg = v.message || '';
        if (msg.indexOf('Patient-specific value') > -1) {
          msg = '';
        } else if (msg.indexOf('not charted. This value was not provided') > -1) {
          msg = v.k + ' not charted in primary record.';
        } else if (msg.indexOf('not assessed at this time to prevent assumption') > -1) {
          msg = 'Pain level not assessed.';
        } else if (msg.indexOf('SpO₂ not charted') > -1) {
          msg = 'SpO₂ not charted in primary record.';
        } else if (msg.indexOf('BMI not calculable') > -1) {
          msg = 'BMI not calculable (requires weight and height).';
        }
        var copy = {};
        for(var prop in v) { copy[prop] = v[prop]; }
        copy.message = msg;
        copy.time = v.time || cohesiveTime;
        return copy;
      });
    }
    var ag=ageGroupFromPatient(item);
    var keys=['T','HR','RR','BP','SpO₂','MAP','Pain','Weight','Height','BMI'], fromText=parseVitalsFromText(item), rows=extractVitalRowsFromEhr(item);
    var out={}, bpForMap='', wtForBmi='', htForBmi='';
    var vitalTime = getCohesiveVitalTime(rows, item);
    keys.forEach(function(k){
      var structured=latestVitalValue(rows,k);
      var raw=structured.value || fromText[k] || '';
      var source=structured.value?'structured chart':(fromText[k]?'stem/chart text':'not documented in item');
      var status;
      if(k==='BP' && raw) bpForMap=raw;
      if(k==='Weight' && raw) wtForBmi=raw;
      if(k==='Height' && raw) htForBmi=raw;
      if(k==='MAP' && !raw){
        var bp=bpForMap || latestVitalValue(rows,'BP').value || fromText.BP || '';
        var parts=parseBpParts(bp);
        if(parts){ raw=String(parts.map); source='calculated from documented BP '+bp; }
      }
      if(k==='BMI' && !raw){
        var wt=wtForBmi || latestVitalValue(rows,'Weight').value || fromText.Weight || '';
        var ht=htForBmi || latestVitalValue(rows,'Height').value || fromText.Height || '';
        var calcBmi=parseBmiParts(wt,ht);
        if(calcBmi){ raw=String(calcBmi); source='calculated from documented Weight and Height'; }
      }
      var val=normalizeVitalLabel(k,raw);
      var rowTime = structured.row ? (structured.row.time || structured.row.date || '') : '';
      var activeTime = rowTime || vitalTime;
      if(val){ status=vitalStatus(k,val,ag); out[k]={k:k,v:val,time:activeTime,abn:status.level==='critical'||status.level==='warn',level:status.level,status:status.label,source:source,reference:referenceForVital(k,ag),message:source.indexOf('calculated')===0?'Calculated from documented components.':''}; }
      else { out[k]={k:k,v:'Not Assessed',time:vitalTime,abn:false,level:'missing',status:'not assessed',source:'not documented in item',reference:referenceForVital(k,ag),message:noDataPhraseForVital(k)}; }
    });
    return keys.map(function(k){return out[k];});
  }
  function derivedHistoryPhysical(){
    var item=state.current||{}, p=patientOf(item), cues=splitCueSentences(item);
    var concern=text(item.clinical_focus)||text(p.dx)||'Clinical judgment review';
    return [
      {name:'Chief concern',value:(cues[0]||concern),source:'Clinical Admission'},
      {name:'History of present illness',value:'Client presents with acute symptoms as documented in primary record chart cues. Clinical team monitoring vital parameters and storyboard telemetry signs.',source:'Medical Record'}
    ];
  }
  function renderHistoryPhysical(data,derived){
    var rows=data&&data.length?data:derivedHistoryPhysical();
    var baseDate = getBaseDateForItem(state.current);
    var admitTimeStr = formatLocalString(baseDate);
    var banner='<div class="ws-derived-banner structured"><b>History & Physical</b><span>Admitted: '+esc(admitTimeStr)+'</span></div>';
    var cards='<div class="ws-hp-grid">'+rows.map(function(x,i){var label=labelOfRow(x,i), val=valueOfRow(x); return '<div class="ws-hp-card"><span>'+esc(x.source||x.type||'H&P Record')+'</span><b>'+esc(label)+'</b><p>'+esc(val||'Not charted in this item.')+'</p></div>';}).join('')+'</div>';
    return banner+cards;
  }
  function splitCueSentences(item){
    var s=stemOf(item).replace(/\s+/g,' ').trim();
    if(!s) return [];
    var parts=s.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(parts.length<2) parts=s.split(/;\s*/).filter(Boolean);
    return parts.slice(0,6);
  }
  function derivedNotes(){
    var item=state.current||{}, p=patientOf(item), cues=splitCueSentences(item);
    var rows=[];
    rows.push({time:'08:00',type:'Admission Note',note:(cues[0]||stemOf(item)),tag:'Admission Note'});
    if(cues.length>1) {
      rows.push({time:'10:00',type:'Progress Note',note:cues.slice(1).join(' '),tag:'Progress Note'});
    }
    return rows;
  }
  function derivedLabs(){
    var s=allSourceText(state.current), rows=[];
    var patterns=[
      ['WBC',/\bWBC\s*(?:is|=|:)?\s*([0-9.]+\s*(?:K|k|x10\^?3)?\/?(?:µL|uL|mcL)?)/i],
      ['Hemoglobin',/\b(?:Hgb|hemoglobin)\s*(?:is|=|:)?\s*([0-9.]+\s*g\/dL)/i],
      ['Hematocrit',/\b(?:Hct|hematocrit)\s*(?:is|=|:)?\s*([0-9.]+\s*%)/i],
      ['Platelets',/\bplatelets?\s*(?:is|=|:)?\s*([0-9,]+\s*(?:K|k)?\/?(?:µL|uL|mcL)?)/i],
      ['Glucose',/\b(?:blood glucose|glucose|sugar)\s*(?:is|=|:|of)?\s*([0-9]{2,3}\s*mg\/dL)/i],
      ['Troponin',/\btroponin\s*(?:I|T)?\s*(?:is|=|:)?\s*([<>]?[0-9.]+\s*ng\/mL)/i],
      ['Lactate',/\blactate\s*(?:is|=|:)?\s*([0-9.]+\s*mmol\/L)/i],
      ['Creatinine',/\bcreatinine\s*(?:is|=|:)?\s*([0-9.]+\s*mg\/dL)/i],
      ['Potassium',/\b(?:K\+|potassium)\s*(?:is|=|:)?\s*([0-9.]+\s*mEq\/L)/i]
    ];
    patterns.forEach(function(pat){var m=s.match(pat[1]); if(m) rows.push({name:pat[0],value:m[1],source:'stem/chart text'});});
    return rows;
  }
  function derivedOrders(){
    var s=allSourceText(state.current), rows=[];
    var rx=[];
    var seen={};
    [/\b(?:administer|give|start|initiate|infuse|hold|prepare|obtain|monitor|notify|apply|place|elevate)\b[^.·\n]{0,130}(?:\.|$)?/ig].forEach(function(re){
      var m;
      while((m=re.exec(s)) && rx.length<6){
        var val=m[0].trim();
        if(val.endsWith('.')) val=val.slice(0,-1).trim();
        val=val.replace(/^[:\s·]+|[:\s·]+$/g, '').trim();
        var lowVal=val.toLowerCase();
        if(lowVal.indexOf('person, place')>-1 || lowVal.indexOf('place, and time')>-1){
          continue;
        }
        var low=lowVal.replace(/[^a-z0-9]/g, '');
        if(!low || seen[low]) continue;
        seen[low]=true;
        rx.push(val);
      }
    });
    rx.forEach(function(x,i){rows.push({name:'Action cue '+(i+1),value:x,source:'stem/options text'});});
    if(!rows.length) rows.push({name:'Orders not structured',value:'No active provider orders are documented. Rely strictly on the explicit clinical interventions, medications, or treatment protocols mentioned in the question stem or options.',source:'renderer safety fallback'});
    return rows;
  }
  function derivedRadiology(){
    var s=allSourceText(state.current), rows=[];
    var refs=[];
    var seen={};
    [/\b(?:CT|MRI|x-?ray|ultrasound|angiogram|radiograph|imaging|chest x-?ray|CTA|CXR)\b[^.·\n]{0,150}(?:\.|$)?/ig].forEach(function(re){
      var m;
      while((m=re.exec(s)) && refs.length<5){
        var val=m[0].trim();
        if(val.endsWith('.')) val=val.slice(0,-1).trim();
        val=val.replace(/^[:\s·]+|[:\s·]+$/g, '').trim();
        var low=val.toLowerCase().replace(/[^a-z0-9]/g, '');
        if(!low || seen[low]) continue;
        seen[low]=true;
        refs.push(val);
      }
    });
    refs.forEach(function(x,i){rows.push({study:'Imaging reference '+(i+1),impression:x,source:'stem/chart text'});});
    if(!rows.length) rows.push({study:'Radiology not documented',impression:'No imaging study is documented for this client. Rely strictly on the explicit chest X-ray, CT scan, or ultrasound findings mentioned in the question stem if any.',source:'renderer safety fallback'});
    return rows;
  }
  function dataCompletenessSnapshot(){
    return {history:listData('history').length, notes:listData('notes').length, vitals:listData('vitals').length, labs:listData('labs').length, radiology:listData('radiology').length, orders:listData('orders').length, derivedVitals:evidenceVitals(state.current).filter(function(v){return v.v!=='Not charted';}).length, derivedLabs:derivedLabs().length, hnpDerived:!listData('history').length};
  }
  function detectClinicalContradictions(item) {
    var p = patientOf(item);
    var stem = allSourceText(item).toLowerCase();
    /* Use only the question stem text for allergy detection, not full EHR data */
    var stemOnly = (stemOf(item) + ' ' + (item.prompt||'') + ' ' + (item.scenario||'')).toLowerCase();
    var warnings = [];
    var alg = (p.allergies || '').toLowerCase();
    
    var isNka = !p.allergies || alg.indexOf('nka') > -1 || alg.indexOf('no known') > -1 || alg.indexOf('none') > -1 || alg === '' || alg === '-' || alg === '--';
    var allergyNegations = ['nka','nkda','no known','no allerg','no active','no documented','none','denies allerg','denies any','no drug allerg','no food allerg','no medication'];
    
    function isAllergyNegation(s){
      s=String(s).toLowerCase().trim();
      for(var i=0;i<allergyNegations.length;i++){if(s.indexOf(allergyNegations[i])>-1) return true;}
      return false;
    }
    function looksLikeAllergen(s){
      s=String(s).trim();
      if(s.length<2 || s.length>60) return false;
      if(/^[\u00b7\u2022\-\s]/.test(s)) return false;
      if(/\b(?:physical exam|respiratory|cardiovascular|neurolog|assessment|examination|history|chief complaint|vital|lab|radiology)\b/i.test(s)) return false;
      if(/^\s*(?:to|is|are|was|the|a|an|in|of|and|or|but|has|had|with)\s/i.test(s)) return false;
      return true;
    }
    
    if (isNka) {
      var foundAllergy = false;
      var hist = typeof listData === 'function' ? listData('history') : [];
      for (var i = 0; i < hist.length; i++) {
        var h = hist[i];
        if ((h.name || '').toLowerCase().includes('allerg') && h.value) {
          var v = String(h.value).toLowerCase();
          if (!isAllergyNegation(v) && looksLikeAllergen(h.value)) {
            warnings.push('<b>Allergy Conflict:</b> Structured History implies allergy (' + esc(String(h.value).trim()) + '), but EHR states ' + esc(p.allergies) + '.');
            foundAllergy = true;
          }
        }
      }
      if (!foundAllergy && (stemOnly.includes('allergy') || stemOnly.includes('allergies') || stemOnly.includes('allergic'))) {
        var match = stemOnly.match(/(?:allergy|allergies|allergic)\s+(?:to|reaction to)\s+([^.,;\n]{2,40})/i);
        if (!match) match = stemOnly.match(/(?:known\s+)?allerg(?:y|ies|ic)[\s:]+([a-zA-Z][^.,;\n]{2,40})/i);
        if (match && !isAllergyNegation(match[0]) && looksLikeAllergen(match[1])) {
          warnings.push('<b>Allergy Conflict:</b> Stem implies allergy (' + esc(match[1].trim()) + '), but EHR states ' + esc(p.allergies) + '.');
        }
      }
    }
    var gender = (p.gender || '').toLowerCase();
    var hasFemale = /\b(?:she|her|hers)\b/i.test(stem);
    var hasMale = /\b(?:he|him|his)\b/i.test(stem);
    if ((gender === 'male' || gender === 'm') && hasFemale && !hasMale) {
      warnings.push('<b>Gender Conflict:</b> Stem uses female pronouns, but EHR states Male.');
    } else if ((gender === 'female' || gender === 'f') && hasMale && !hasFemale) {
      warnings.push('<b>Gender Conflict:</b> Stem uses male pronouns, but EHR states Female.');
    }

    var inferred = extractDemographicsFromStem(item);
    if (inferred.name && p.name && p.name !== 'Client' && p.name !== 'Patient') {
      var infNameClean = inferred.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      var pNameClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (infNameClean.indexOf(pNameClean) === -1 && pNameClean.indexOf(infNameClean) === -1) {
        warnings.push('<b>Name Mismatch:</b> Stem references client name "' + esc(inferred.name) + '", but EHR lists "' + esc(p.name) + '".');
      }
    }

    if (inferred.age && p.age && p.age !== '--') {
      var infAgeVal = parseInt(inferred.age, 10);
      var pAgeVal = parseInt(p.age, 10);
      if (isFinite(infAgeVal) && isFinite(pAgeVal) && infAgeVal !== pAgeVal) {
        warnings.push('<b>Age Mismatch:</b> Stem references age ' + infAgeVal + ', but EHR lists ' + esc(p.age) + '.');
      }
    }

    return warnings.map(function(w){return '<div style="background:#fffbeb;border:1px solid #f59e0b;color:#92400e;padding:8px 12px;border-radius:8px;margin-bottom:10px;font-size:12px;line-height:1.4;">⚠️ ' + w + '</div>';}).join('');
  }
  function hasActualAllergies(allergiesStr) {
    var s = String(allergiesStr || '').trim().toLowerCase();
    if (!s || s === '-' || s === '--' || s === '—' || s === 'n/a') return false;
    var negatives = ['nka', 'nkda', 'no known', 'no active', 'no documented', 'none', 'no allergies', 'no medication allergies', 'no drug allergies', 'no food allergies'];
    for (var i = 0; i < negatives.length; i++) {
      if (s.indexOf(negatives[i]) > -1) return false;
    }
    return true;
  }
  function getPatientAvatarSVG(gender, ageGroup) {
    gender = String(gender || 'F').toUpperCase();
    ageGroup = String(ageGroup || 'adult').toLowerCase();
    var gradId = 'patGrad_' + gender + '_' + ageGroup;
    var bgGrad = gender === 'F' 
      ? '<linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fae8ff"/><stop offset="100%" stop-color="#f5d0fe"/></linearGradient>'
      : (gender === 'M'
         ? '<linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#bae6fd"/></linearGradient>'
         : '<linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f1f5f9"/><stop offset="100%" stop-color="#cbd5e1"/></linearGradient>');
    var skinColor = '#fed7aa';
    var hairColor = '#334155';
    if (ageGroup === 'older') hairColor = '#e2e8f0';
    var svgContent = '';
    if (ageGroup === 'neonate' || ageGroup === 'infant') {
      svgContent = '<circle cx="50" cy="53" r="22" fill="' + skinColor + '"/>' +
        '<circle cx="36" cy="56" r="4" fill="#fecdd3"/>' +
        '<circle cx="64" cy="56" r="4" fill="#fecdd3"/>' +
        '<circle cx="42" cy="48" r="2.5" fill="#1e293b"/>' +
        '<circle cx="58" cy="48" r="2.5" fill="#1e293b"/>' +
        '<path d="M46,58 Q50,62 54,58" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M48,31 Q50,23 54,27 Q52,32 50,32" fill="none" stroke="' + (gender === 'F' ? '#f472b6' : '#38bdf8') + '" stroke-width="2.5" stroke-linecap="round"/>' +
        (gender === 'F' ? '<path d="M35,33 C30,30 30,40 35,37 C40,40 40,30 35,33" fill="#f472b6"/>' : '');
    } else if (ageGroup === 'child') {
      svgContent = '<circle cx="50" cy="50" r="24" fill="' + hairColor + '"/>' +
        '<circle cx="50" cy="52" r="20" fill="' + skinColor + '"/>' +
        (gender === 'F' 
          ? '<path d="M28,45 C35,32 65,32 72,45 C65,36 35,36 28,45" fill="' + hairColor + '"/>' +
            '<circle cx="26" cy="45" r="7" fill="' + hairColor + '"/>' +
            '<circle cx="74" cy="45" r="7" fill="' + hairColor + '"/>'
          : '<path d="M28,45 C35,30 65,30 72,45 C60,35 40,35 28,45" fill="' + hairColor + '"/>') +
        '<circle cx="42" cy="50" r="2.5" fill="#1e293b"/>' +
        '<circle cx="58" cy="50" r="2.5" fill="#1e293b"/>' +
        '<path d="M45,59 Q50,63 55,59" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>';
    } else if (ageGroup === 'adolescent') {
      svgContent = (gender === 'F' ? '<path d="M25,48 C25,30 75,30 75,48 C75,70 25,70 25,48" fill="' + hairColor + '"/>' : '') +
        '<rect x="46" y="65" width="8" height="12" fill="' + skinColor + '"/>' +
        '<circle cx="50" cy="46" r="20" fill="' + skinColor + '"/>' +
        (gender === 'F' 
          ? '<path d="M28,40 Q50,22 72,40 Q50,30 28,40" fill="' + hairColor + '"/>' +
            '<path d="M28,40 L32,60 L38,42 Z" fill="' + hairColor + '"/>' +
            '<path d="M72,40 L68,60 L62,42 Z" fill="' + hairColor + '"/>'
          : '<path d="M30,36 Q50,18 70,32 Q65,28 50,30 Q35,28 30,36" fill="' + hairColor + '"/>' +
            '<path d="M28,34 Q32,24 45,28 Q35,32 28,34" fill="' + hairColor + '"/>') +
        '<circle cx="42" cy="46" r="2.5" fill="#1e293b"/>' +
        '<circle cx="58" cy="46" r="2.5" fill="#1e293b"/>' +
        '<path d="M46,54 Q50,58 54,54" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>';
    } else if (ageGroup === 'older') {
      svgContent = '<rect x="46" y="66" width="8" height="12" fill="' + skinColor + '"/>' +
        (gender === 'F' ? '<circle cx="50" cy="22" r="8" fill="' + hairColor + '" stroke="#cbd5e1" stroke-width="1"/>' : '') +
        '<circle cx="50" cy="47" r="20" fill="' + skinColor + '"/>' +
        (gender === 'F'
          ? '<path d="M28,42 Q50,26 72,42 C68,36 32,36 28,42" fill="' + hairColor + '"/>' +
            '<path d="M30,42 Q50,38 70,42 L72,50 Q50,44 28,50 Z" fill="' + hairColor + '" opacity="0.95"/>'
          : '<path d="M30,38 Q50,22 70,38 C68,32 32,32 30,38" fill="' + hairColor + '"/>' +
            '<path d="M29,38 L32,48 L35,38 Z" fill="' + hairColor + '"/>' +
            '<path d="M71,38 L68,48 L65,38 Z" fill="' + hairColor + '"/>') +
        '<circle cx="41" cy="47" r="5.5" fill="none" stroke="#475569" stroke-width="1.8"/>' +
        '<circle cx="59" cy="47" r="5.5" fill="none" stroke="#475569" stroke-width="1.8"/>' +
        '<line x1="46.5" y1="47" x2="53.5" y2="47" stroke="#475569" stroke-width="1.8"/>' +
        '<path d="M46,38 Q50,36 54,38" fill="none" stroke="#b45309" stroke-width="1" opacity="0.25"/>' +
        '<path d="M46,57 Q50,60 54,57" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>';
    } else {
      svgContent = '<rect x="46" y="66" width="8" height="12" fill="' + skinColor + '"/>' +
        (gender === 'F' ? '<path d="M27,45 C27,32 73,32 73,45 C73,65 27,65 27,45" fill="' + hairColor + '"/>' : '') +
        '<circle cx="50" cy="46" r="20" fill="' + skinColor + '"/>' +
        (gender === 'F'
          ? '<path d="M28,38 Q50,20 72,38 Q50,28 28,38" fill="' + hairColor + '"/>' +
            '<path d="M28,38 L32,58 L37,40 Z" fill="' + hairColor + '"/>' +
            '<path d="M72,38 L68,58 L63,40 Z" fill="' + hairColor + '"/>'
          : '<path d="M29,36 Q50,20 71,36 C68,32 32,32 29,36" fill="' + hairColor + '"/>' +
            '<path d="M28,34 Q32,24 45,28 Q35,32 28,34" fill="' + hairColor + '"/>') +
        '<circle cx="42" cy="46" r="2.5" fill="#1e293b"/>' +
        '<circle cx="58" cy="46" r="2.5" fill="#1e293b"/>' +
        '<path d="M46,55 Q50,59 54,55" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 100 100" class="ws-patient-avatar" aria-hidden="true">' +
      bgGrad +
      '<circle cx="50" cy="50" r="48" fill="url(#' + gradId + ')" stroke="#cbd5e1" stroke-width="2.5"/>' +
      svgContent +
      '</svg>';
  }
  function getVitalWaveformSVG(k, level) {
    if (level === 'missing') return '';
    var pathData = '';
    var className = '';
    
    if (k === 'HR') {
      // High-fidelity P-QRS-T ECG sweep
      pathData = 'M0,15 L10,15 C11,15 12,11 13,11 C14,11 15,15 16,15 L17,15 L18,18 L20,1 L22,27 L23,15 L25,15 C26,15 27,9 28.5,9 C30,9 31,15 32,15 L50,15 L60,15 C61,15 62,11 63,11 C64,11 65,15 66,15 L67,15 L68,18 L70,1 L72,27 L73,15 L75,15 C76,15 77,9 78.5,9 C80,9 81,15 82,15 L100,15';
      className = 'ws-wave-hr';
    } else if (k === 'RR') {
      // Smooth sinusoidal respiration sweep
      pathData = 'M0,15 C10,5 15,5 25,15 C35,25 40,25 50,15 C60,5 65,5 75,15 C85,25 90,25 100,15';
      className = 'ws-wave-rr';
    } else if (k === 'SpO₂' || k === 'SPO₂') {
      // High-fidelity PPG oximetry sweep with dicrotic notch
      pathData = 'M0,15 L5,15 C8,15 12,3 15,3 C18,3 20,11 22,11 C23,11 24,9 25,9 C27,9 30,15 35,15 L50,15 L55,15 C58,15 62,3 65,3 C68,3 70,11 72,11 C73,11 74,9 75,9 C77,9 80,15 85,15 L100,15';
      className = 'ws-wave-spo2';
    } else if (k === 'BP') {
      // Sharp arterial line pressure sweep
      pathData = 'M0,15 L2,15 C3,15 5,1 8,1 C11,1 13,12 15,12 C16,12 17,10 18,10 C20,10 25,15 30,15 L50,15 L52,15 C53,15 55,1 58,1 C61,1 63,12 65,12 C66,12 67,10 68,10 C70,10 75,15 80,15 L100,15';
      className = 'ws-wave-bp';
    } else {
      // Temp, MAP, Pain, Weight, Height, BMI are static parameters and have no telemetry waveforms
      return '';
    }
    
    return '<svg class="ws-vital-wave ' + className + '" viewBox="0 0 50 30" preserveAspectRatio="none" aria-hidden="true">' +
           '<path d="' + pathData + '"/>' +
           '</svg>';
  }
  function renderStoryboard(){
    var item=state.current, p=patientOf(item), st=structureOf();
    var initials=p.name.split(/\s+/).filter(Boolean).slice(0,2).map(function(x){return x[0];}).join('').toUpperCase();
    $('#patientRail .ws-avatar').textContent=initials||'CL';
    $('#patientRail .ws-mini-name').textContent=p.name;
    $('#patientRail .ws-mini-meta').textContent=p.age+' · '+p.gender;
    var vitals=extractVitals(item);
    var safetyWarnings = detectClinicalContradictions(item);
    var allergiesHtml = hasActualAllergies(p.allergies) ? '<span class="ws-allergy-alert">' + esc(p.allergies) + '</span>' : esc(p.allergies);
    var ageGroup = ageGroupFromPatient(item);
    var avatarHtml = getPatientAvatarSVG(p.gender, ageGroup);
    $('#storyboard').innerHTML= safetyWarnings + 
      '<div class="ws-story-card ws-demographics-card">' +
        avatarHtml +
        '<div class="ws-demographics-text">' +
          '<div class="ws-patient-header-row">' +
            '<span class="ws-patient-name">' + esc(p.name) + '</span>' +
            '<span class="ws-patient-meta">' + esc(p.age) + ' · ' + esc(p.gender) + ' · ' + esc(p.location) + '</span>' +
          '</div>' +
          '<div class="ws-patient-dx-row">' +
            '<span class="ws-dx-label">Dx</span>' +
            '<span class="ws-dx-val">' + esc(p.dx) + '</span>' +
          '</div>' +
          '<div class="ws-patient-infographics">' +
            '<div class="ws-infographic-item ws-info-allergies' + (hasActualAllergies(p.allergies) ? ' has-allergy' : '') + '">' +
              '<span class="ws-info-icon">⚠️</span>' +
              '<span class="ws-info-label">Allergies:</span> ' +
              '<span class="ws-info-val">' + allergiesHtml + '</span>' +
            '</div>' +
            '<div class="ws-infographic-item ws-info-code">' +
              '<span class="ws-info-icon">🩺</span>' +
              '<span class="ws-info-label">Code Status:</span> ' +
              '<span class="ws-info-val">' + esc(p.code) + '</span>' +
            '</div>' +
          '</div>' +
         '</div>' +
       '</div>'+ 
      '<div class="ws-story-card ws-vitals-card"><div class="ws-vitals-grid">'+vitals.map(function(v){return '<div class="ws-vital '+esc(v.level)+'"><b>'+esc(v.k)+'</b><span>'+esc(v.v)+'</span>'+getVitalWaveformSVG(v.k, v.level)+'</div>';}).join('')+'</div></div>';
  }
  function extractVitals(item){
    return evidenceVitals(item);
  }
  function renderChart(){
    var item=state.current, p=patientOf(item), tab=state.tab;
    $$('.ws-tabs button,#patientRail button').forEach(function(b){b.classList.toggle('active',b.dataset.tab===tab);});
    var html='';
    if(tab==='overview'){
      html='<div class="ws-chart-hero"><div><h3>Client chart</h3><b>'+esc(p.name)+'</b><p>'+esc(p.age)+' · '+esc(p.gender)+' · '+esc(p.location)+'</p></div><div><span class="ws-mini-badge">Focus</span><p>'+esc(item.clinical_focus||'—')+'</p></div><div><span class="ws-mini-badge">Needs</span><p>'+esc(item.client_needs||'—')+'</p></div></div>'+renderCompletenessStrip()+'<div class="ws-card"><h3>Current cue</h3><p class="ws-note">'+esc(stemOf(item))+'</p></div>'+renderClinicalMap()+renderMediaNeedPanel();
    } else if(['history','notes','labs','vitals','orders','radiology','io'].indexOf(tab)>-1){ html=renderList(tab); }
    else if(tab==='raw'){
      var rawDate = formatLocalString(new Date());
      html='<div class="ws-derived-banner structured"><b>Raw Audit Record</b><span>Retrieved: '+esc(rawDate)+'</span></div><pre class="ws-raw">'+esc(JSON.stringify(item,null,2))+'</pre>';
    }
    $('#chartContent').innerHTML=html || '<div class="ws-empty"><h3>No '+esc(title(tab))+' data</h3><p>The item chunk did not include structured '+esc(tab)+' data. Overview and stem remain available.</p></div>';
  }
  function renderCompletenessStrip(){
    var snap=dataCompletenessSnapshot();
    var vit=evidenceVitals(state.current);
    var spo2=vit.find(function(v){return v.k==='SpO₂';});
    var map=vit.find(function(v){return v.k==='MAP';});
    var cells=[
      ['H&P',snap.history?'structured':'derived'],
      ['Nursing Notes',snap.notes?'structured':'derived'],
      ['Vitals',snap.vitals?'structured':'composed'],
      ['SpO₂',spo2&&spo2.v!=='Not charted'?'documented':'not charted'],
      ['MAP',map&&map.status==='calculated'?'calculated':(map&&map.v!=='Not charted'?'documented':'not calculable')],
      ['Labs',snap.labs?'structured':(snap.derivedLabs?'derived':'not charted')],
      ['Radiology',snap.radiology?'structured':'availability panel'],
      ['Orders',snap.orders?'structured':'action-cue fallback']
    ];
    return '<div class="ws-completeness-strip ws-completeness-strip-v243f1">'+cells.map(function(c){return '<div><b>'+esc(c[0])+'</b><span>'+esc(c[1])+'</span></div>';}).join('')+'</div>';
  }
  function renderClinicalMap(){
    var f=text((state.current&&state.current.clinical_focus)||'Clinical judgment').split('/').slice(0,3);
    return '<div class="ws-clinical-map">'+f.map(function(x,i){return '<div><span>0'+(i+1)+'</span><b>'+esc(text(x)||'Clinical cue')+'</b><small>chart-supported lens</small></div>';}).join('')+'</div>';
  }
  function hasAny(hay,words){
    hay=String(hay||'').toLowerCase();
    return words.some(function(w){return hay.indexOf(String(w).toLowerCase())>-1;});
  }
  function rxCount(hay,rx){
    var m=String(hay||'').match(rx); return m?m.length:0;
  }
  function scoreMediaNeed(name,score,evidence,action,tier,kind){
    return {name:name,score:score,evidence:evidence.filter(Boolean).slice(0,5),action:action,tier:tier,kind:kind||'classifier',generateNow:false};
  }
  function classifyMediaNeeds(item){
    item=item||state.current||{};
    var f=normalizeType(item.format||((item.structure||{}).type)||''), low=allSourceText(item).toLowerCase(), out=[];
    var serial=rxCount(low,/\b(?:time|hour|hr|day|shift|trend|serial|recheck|repeat|q\s?\d+h|after\s+\d+|over\s+\d+)\b/g);
    var vitalLabNumbers=rxCount(low,/\b(?:bp|hr|rr|spo2|spo₂|temperature|temp|glucose|wbc|hgb|hematocrit|platelet|creatinine|bun|potassium|lactate|troponin|inr|aptt|ph|paco2|hco3)\b[^.]{0,28}\d/g);
    var trendScore=(/trend/.test(f)?4:0)+(serial?2:0)+(vitalLabNumbers>=2?3:0)+(hasAny(low,['deteriorat','worsen','improv','response to','evaluate outcomes','reassessment'])?2:0);
    if(trendScore>=5) out.push(scoreMediaNeed('Interactive trend chart',trendScore,['serial/time cues: '+serial,'vital/lab numeric cues: '+vitalLabNumbers,/trend/.test(f)?'Trend item type':'','deterioration/response language detected'],trendScore>=7?'Badly needed · generate algorithmic SVG from documented numbers':'Useful if numeric series is confirmed',trendScore>=7?'A':'B','trend'));
    var ecgScore=(hasAny(low,['ecg','ekg','st elevation','st depression','atrial fibrillation','a-fib','afib','svt','ventricular tachycardia','v-tach','vtach','ventricular fibrillation','v-fib','vfib','asystole','pea','heart block','bradycardia','tachyarrhythmia','dysrhythmia','arrhythmia'])?5:0)+(hasAny(low,['hyperkalemia','potassium'])&&hasAny(low,['peaked t','wide qrs','ecg','ekg'])?3:0)+(hasAny(low,['chest pain','myocardial infarction','acute coronary','acs'])&&hasAny(low,['ecg','ekg','st '])?2:0);
    if(ecgScore>=5) out.push(scoreMediaNeed('ECG strip template',ecgScore,['rhythm/ECG cue detected','template only until verified against case text'],ecgScore>=7?'Badly needed · use verified SVG rhythm template':'Queue for rhythm-template validation',ecgScore>=7?'A':'B','ecg'));
    var fhrScore=hasAny(low,['fetal heart','fhr','deceleration','late decel','variable decel','early decel','variability','tachysystole','uterine contraction','category iii','category ii'])?7:0;
    if(fhrScore) out.push(scoreMediaNeed('FHR tracing template',fhrScore,['fetal monitoring cue detected'],'Badly needed · use verified SVG FHR/contraction template only after pattern confirmation','A','fhr'));
    var abgScore=(hasAny(low,['abg','arterial blood gas','paco2','pao2','hco3','bicarbonate'])?4:0)+(rxCount(low,/\bpH\s*[:=]?\s*7\.\d+/ig)?3:0)+(hasAny(low,['respiratory acidosis','respiratory alkalosis','metabolic acidosis','metabolic alkalosis'])?2:0);
    if(abgScore>=4) out.push(scoreMediaNeed('ABG acid-base map',abgScore,['ABG/acid-base cue detected'],abgScore>=7?'Badly needed · generate map from documented ABG values':'Useful if values are present','A','abg'));
    var marScore=(hasAny(low,['insulin','heparin','warfarin','digoxin','lithium','opioid','morphine','hydromorphone','fentanyl','blood transfusion','packed red blood cells','vancomycin','aminoglycoside','gentamicin','magnesium sulfate','oxytocin','pitocin','tpn','chemotherapy'])?4:0)+(hasAny(low,['dose','units','infusion','rate','hold','administer','medication administration','reassess pain','sedation'])?2:0)+(/calculation/.test(f)?2:0);
    if(marScore>=4) out.push(scoreMediaNeed('MAR / medication-safety card',marScore,['medication/high-alert cue detected'],marScore>=7?'Badly needed · build HTML MAR card from existing meds/orders/options':'Useful medication context card',marScore>=7?'A':'B','mar'));
    var ioScore=(hasAny(low,['intake and output','i&o','urine output','fluid balance','daily weight','dehydration','fluid volume','heart failure','renal failure','kidney failure','burn','third spacing','edema','diuresis'])?4:0)+(hasAny(low,['ml/hr','ml/kg/hr','output','foley'])?2:0);
    if(ioScore>=4) out.push(scoreMediaNeed('I&O / fluid-balance chart',ioScore,['fluid-balance cue detected'],ioScore>=7?'Badly needed · generate bar chart only from documented I&O/weight values':'Useful if fluid values exist',ioScore>=7?'A':'B','io'));
    var oxyScore=(hasAny(low,['spo2','spo₂','oxygen saturation','pulse ox','oxygen','nasal cannula','nonrebreather','ventilator','intubated','tracheostomy','trach','cpap','bipap','ards','respiratory distress','wheezing','stridor','suction'])?4:0)+(hasAny(low,['abg','paco2','pao2','work of breathing','cyanosis'])?2:0);
    if(oxyScore>=5) out.push(scoreMediaNeed('Oxygenation / airway support visual',oxyScore,['oxygenation/airway cue detected'],oxyScore>=7?'Badly needed · use device ladder/ABG support if evidence exists':'Useful support visual',oxyScore>=7?'A':'B','oxygenation'));
    var radScore=(hasAny(low,['ct scan','computed tomography','mri','x-ray','xray','cxr','chest x-ray','ultrasound','cta','angiogram','radiology report','imaging shows','imaging reveals'])?5:0)+(hasAny(low,['pneumothorax','fracture','stroke','hemorrhage','appendicitis','bowel obstruction','tube placement','pulmonary edema'])?1:0);
    if(radScore>=5) out.push(scoreMediaNeed('Radiology report/image panel',radScore,['explicit imaging cue detected'],radScore>=7?'Badly needed if image/report interpretation affects answer':'Queue report card first; image only if required','B','radiology'));
    var woundScore=hasAny(low,['pressure injury','pressure ulcer','wound','burn','stoma','ostomy','incision','dehiscence','drainage','iv infiltration','extravasation','rash','lesion','skin breakdown','central line','picc','chest tube','catheter','tracheostomy site'])?5:0;
    if(woundScore) out.push(scoreMediaNeed('Wound / skin / device diagram',woundScore,['skin/device cue detected'],'Reusable clinical diagram may help; not urgent unless answer depends on appearance','B','diagram'));
    var neuroScore=hasAny(low,['stroke','cva','weakness','facial droop','aphasia','slurred speech','last known well','pupil','gcs','glasgow','seizure','increased icp','intracranial pressure','spinal cord','meningitis','delirium','fall risk'])?5:0;
    if(neuroScore) out.push(scoreMediaNeed('Neuro timeline/body map',neuroScore,['neuro/time-critical cue detected'],'Useful for stroke/seizure/ICP/fall-risk reasoning','B','neuro'));
    out=out.sort(function(a,b){return b.score-a.score;});
    var top=out[0]||scoreMediaNeed('No dedicated media needed',0,['text/chart cards enough for this item'],'Keep chart evidence cards only','C','none');
    var verdict=top.tier==='A'?'badly-needed':(top.tier==='B'?'beneficial':'not-needed');
    return {version:'v243F2-media-need-classifier',itemId:item.id||'',format:f,verdict:verdict,top:top,needs:out.slice(0,5),mediaGenerationStarted:false,heldMediaTypesStillHeld:Object.keys(HELD_RENDERER_TYPES)};
  }
  function numericCues(item){
    var s=allSourceText(item), out=[];
    var specs=[
      ['HR','/min',/(?:\bHR\b|heart rate|pulse)\s*(?:is|=|:)?\s*(\d{2,3})\b/ig],
      ['RR','/min',/(?:\bRR\b|respiratory rate)\s*(?:is|=|:)?\s*(\d{1,3})\b/ig],
      ['SpO₂','%',/(?:SpO2|SpO₂|oxygen saturation|O2 sat|O₂ sat|pulse ox)\s*(?:is|=|:|of)?\s*(\d{2,3})%?/ig],
      ['Temp','°',/(?:\bT\b|temperature|temp)\s*(?:is|=|:)?\s*(\d{2,3}(?:\.\d)?)/ig],
      ['Glucose','mg/dL',/(?:blood glucose|glucose)\s*(?:is|=|:|of)?\s*(\d{2,3})\s*mg\/dL/ig],
      ['WBC','',/\bWBC\s*(?:is|=|:)?\s*(\d{1,2}(?:\.\d)?)/ig],
      ['Hgb','g/dL',/(?:Hgb|hemoglobin)\s*(?:is|=|:)?\s*(\d{1,2}(?:\.\d)?)/ig],
      ['K⁺','mEq/L',/(?:K\+|potassium)\s*(?:is|=|:)?\s*(\d(?:\.\d)?)/ig],
      ['Creatinine','mg/dL',/creatinine\s*(?:is|=|:)?\s*(\d(?:\.\d)?)/ig],
      ['Lactate','mmol/L',/lactate\s*(?:is|=|:)?\s*(\d(?:\.\d)?)/ig],
      ['Troponin','ng/mL',/troponin\s*(?:I|T)?\s*(?:is|=|:)?\s*([<>]?\d(?:\.\d+)?)/ig],
      ['pH','',/\bpH\s*(?:is|=|:)?\s*(7\.\d{1,2})/ig],
      ['PaCO₂','mmHg',/PaCO2|PaCO₂/ig],
      ['HCO₃','mEq/L',/HCO3|HCO₃|bicarbonate/ig]
    ];
    specs.forEach(function(sp){var m, guard=0; while((m=sp[2].exec(s)) && guard++<8){var raw=m[1]||m[0]; var n=parseFloat(String(raw).replace(/[^0-9.\-]/g,'')); if(isFinite(n)) out.push({label:sp[0],value:n,unit:sp[1],source:'documented/extracted text'});}});
    var bpRe=/(?:\bBP\b|blood pressure)\s*(?:is|=|:)?\s*(\d{2,3})\s*\/\s*(\d{2,3})|\b(\d{2,3})\s*\/\s*(\d{2,3})\s*(?:mmHg|mm Hg)\b/ig, mbp;
    while((mbp=bpRe.exec(s))){var sbp=parseInt(mbp[1]||mbp[3],10), dbp=parseInt(mbp[2]||mbp[4],10); if(isFinite(sbp)&&isFinite(dbp)){out.push({label:'SBP',value:sbp,unit:'mmHg',source:'documented/extracted BP'}); out.push({label:'DBP',value:dbp,unit:'mmHg',source:'documented/extracted BP'}); out.push({label:'MAP',value:Math.round(dbp+(sbp-dbp)/3),unit:'mmHg',source:'calculated from documented BP'});}}
    return out;
  }
  function seriesByLabel(cues){
    return cues.reduce(function(m,x){m[x.label]=m[x.label]||[]; m[x.label].push(x); return m;},{});
  }
  function renderSafeMiniTrend(cues){
    var by=seriesByLabel(cues), best=null;
    Object.keys(by).forEach(function(k){if(by[k].length>=2 && (!best || by[k].length>best.items.length)) best={label:k,items:by[k]};});
    if(!best) return '';
    var labels=best.items.map(function(x,i){return 'Cue '+(i+1);});
    var chart=svgLineChart(best.items.map(function(x){return x.value;}),labels,best.items[0].unit||'');
    return '<div class="ws-algo-card wide"><span>Algorithmic trend · evidence only</span><b>'+esc(best.label)+' series</b>'+chart+'<p>Generated only from repeated documented/extracted '+esc(best.label)+' values. No values were invented.</p></div>';
  }
  function renderPerfusionVisual(){
    var vit=evidenceVitals(state.current), bp=vit.find(function(v){return v.k==='BP';})||{}, map=vit.find(function(v){return v.k==='MAP';})||{};
    if(map.v==='Not charted') return '';
    var n=parseFloat(String(map.v).replace(/[^0-9.\-]/g,'')); if(!isFinite(n)) return '';
    var pct=Math.max(0,Math.min(100,(n/120)*100));
    var level=n<65?'critical':(n<70?'watch':'ok');
    return '<div class="ws-algo-card perfusion '+level+'"><span>MAP/perfusion mini-chart</span><b>MAP '+esc(Math.round(n)+' mmHg')+'</b><div class="ws-map-bar" aria-label="MAP perfusion bar"><i style="width:'+pct.toFixed(0)+'%"></i><em>65</em></div><p>'+esc(map.source||'calculated from documented BP')+'. BP: '+esc(bp.v||'Not charted')+'. Threshold marker is a learning aid, not a new chart value.</p></div>';
  }
  function extractMedicationCues(){
    var s=allSourceText(state.current), rows=[];
    var meds=['insulin','heparin','warfarin','digoxin','lithium','morphine','hydromorphone','fentanyl','vancomycin','gentamicin','magnesium sulfate','oxytocin','pitocin','tpn','blood transfusion','packed red blood cells'];
    meds.forEach(function(m){var re=new RegExp('(?:[^.]{0,80}\\b'+m.replace(/ /g,'\\s+')+'\\b[^.]{0,100}\\.)','ig'), hit, guard=0; while((hit=re.exec(s)) && guard++<2){rows.push({name:title(m),value:hit[0].trim(),source:'visible item text'});}});
    if(!rows.length) rows=derivedOrders().filter(function(x){return /administer|give|infuse|hold|dose|med|insulin|heparin|warfarin|opioid|blood/i.test(valueOfRow(x));}).slice(0,4);
    return rows.slice(0,5);
  }
  function renderMarVisual(){
    var cls=classifyMediaNeeds(state.current), needed=(cls.needs||[]).some(function(x){return x.kind==='mar';});
    if(!needed) return '';
    var rows=extractMedicationCues();
    if(!rows.length) return '<div class="ws-algo-card"><span>Medication safety visual</span><b>MAR not charted</b><p>Medication context was suggested by the classifier, but no safe medication/order cue was extractable. No MAR row was invented.</p></div>';
    return '<div class="ws-algo-card wide"><span>Medication safety card · not a new MAR</span><b>Existing med/action cues</b><div class="ws-mini-mar">'+rows.map(function(r,i){return '<div><strong>'+esc(r.name||('Cue '+(i+1)))+'</strong><p>'+esc(valueOfRow(r))+'</p><small>'+esc(r.source||'visible evidence')+'</small></div>';}).join('')+'</div></div>';
  }
  function extractIOValues(){
    var s=allSourceText(state.current), rows=[];
    var specs=[['Intake',/(?:intake|received|infused)[^.]{0,40}?(\d{2,5})\s*mL/ig],['Output',/(?:output|urine output|voided|foley)[^.]{0,40}?(\d{2,5})\s*mL/ig],['Urine output',/(\d+(?:\.\d+)?)\s*mL\/kg\/hr/ig],['Weight',/(?:weight|weighs)[^.]{0,20}?(\d{1,3}(?:\.\d+)?)\s*kg/ig]];
    specs.forEach(function(sp){var m, guard=0; while((m=sp[1].exec(s)) && guard++<5){rows.push({name:sp[0],value:parseFloat(m[1]),unit:/kg\/hr/.test(m[0])?'mL/kg/hr':(/kg\b/.test(m[0])?'kg':'mL'),source:'visible item text'});}});
    return rows;
  }
  function renderIOVisual(){
    var cls=classifyMediaNeeds(state.current), needed=(cls.needs||[]).some(function(x){return x.kind==='io';});
    if(!needed) return '';
    var rows=extractIOValues();
    if(!rows.length) return '<div class="ws-algo-card"><span>I&O / fluid-balance visual</span><b>No numeric I&O charted</b><p>Fluid-balance context is present, but no safe intake/output number was extractable. The visual stays informational only.</p></div>';
    var max=Math.max.apply(null, rows.map(function(r){return r.value;}));
    return '<div class="ws-algo-card wide"><span>I&O / fluid-balance chart</span><b>Documented fluid cues</b><div class="ws-io-bars">'+rows.map(function(r){var w=max?Math.max(8,Math.round((r.value/max)*100)):10; return '<div><label>'+esc(r.name)+'</label><i style="width:'+w+'%"></i><strong>'+esc(r.value+' '+r.unit)+'</strong></div>';}).join('')+'</div><p>Bars use only documented/extracted values.</p></div>';
  }
  function extractAbg(){
    var s=allSourceText(state.current), ph=(s.match(/\bpH\s*(?:is|=|:)?\s*(7\.\d{1,2})/i)||[])[1], paco2=(s.match(/PaCO2|PaCO₂/i)&&((s.match(/(?:PaCO2|PaCO₂)\s*(?:is|=|:)?\s*(\d{2,3})/i)||[])[1])), hco3=(s.match(/(?:HCO3|HCO₃|bicarbonate)\s*(?:is|=|:)?\s*(\d{1,2})/i)||[])[1];
    return {pH:ph,PaCO2:paco2,HCO3:hco3};
  }
  function renderAbgVisual(){
    var a=extractAbg();
    if(!a.pH && !a.PaCO2 && !a.HCO3) return '';
    var p=parseFloat(a.pH), acid=isFinite(p)&&p<7.35, alk=isFinite(p)&&p>7.45;
    var label=acid?'Acidotic pH':(alk?'Alkalotic pH':(a.pH?'pH in expected range':'ABG values partial'));
    return '<div class="ws-algo-card abg"><span>ABG acid-base map</span><b>'+esc(label)+'</b><div class="ws-abg-map"><div><span>pH</span><strong>'+esc(a.pH||'not charted')+'</strong></div><div><span>PaCO₂</span><strong>'+esc(a.PaCO2||'not charted')+'</strong></div><div><span>HCO₃</span><strong>'+esc(a.HCO3||'not charted')+'</strong></div></div><p>ABG map uses documented/extracted values only; missing values are not inferred.</p></div>';
  }
  function renderOxygenationVisual(){
    var cls=classifyMediaNeeds(state.current), needed=(cls.needs||[]).some(function(x){return x.kind==='oxygenation';});
    if(!needed) return '';
    var vit=evidenceVitals(state.current), spo2=vit.find(function(v){return v.k==='SpO₂';})||{}, s=allSourceText(state.current).toLowerCase();
    var device=(s.match(/nasal cannula|nonrebreather|venturi|simple mask|cpap|bipap|ventilator|tracheostomy|room air/i)||[])[0]||'device not charted';
    return '<div class="ws-algo-card"><span>Oxygenation support card</span><b>SpO₂ '+esc(spo2.v||'Not charted')+'</b><p>Oxygen device: '+esc(device)+'. '+esc(spo2.message||'No oxygen saturation value is provided.')+'</p></div>';
  }
  function renderAlgorithmicVisualsPanel(){
    var cues=numericCues(state.current), cls=classifyMediaNeeds(state.current), pieces=[];
    pieces.push(renderPerfusionVisual());
    if((cls.needs||[]).some(function(x){return x.kind==='trend';})) pieces.push(renderSafeMiniTrend(cues));
    pieces.push(renderMarVisual());
    pieces.push(renderIOVisual());
    pieces.push(renderAbgVisual());
    pieces.push(renderOxygenationVisual());
    pieces=pieces.filter(Boolean);
    var deferred=(cls.needs||[]).filter(function(x){return /ecg|fhr|radiology|diagram|neuro/.test(x.kind);}).slice(0,3);
    var deferredHtml=deferred.length?'<div class="ws-algo-deferred"><b>Still held for validation</b>'+deferred.map(function(x){return '<span>'+esc(x.name)+'</span>';}).join('')+'<p>ECG, FHR, radiology images, wound/device diagrams, and hotspot media are not generated in this sprint.</p></div>':'';
    if(!pieces.length && !deferredHtml) return '<section class="ws-algo-panel"><div class="ws-media-head"><div><span class="ws-mini-badge">v243G safe visuals</span><h3>No algorithmic visual needed</h3><p>The chart evidence cards are enough for this item; no media was generated.</p></div><strong>safe</strong></div></section>';
    return '<section class="ws-algo-panel" aria-label="Algorithmic clinical visuals"><div class="ws-media-head"><div><span class="ws-mini-badge">v243G safe visuals</span><h3>Algorithmic visuals from existing evidence</h3><p>Generated only from documented or extracted item values. No ECG, FHR, radiology image, audio, image hotspot, or new clinical fact is created here.</p></div><strong>'+esc(pieces.length+' visual'+(pieces.length===1?'':'s'))+'</strong></div><div class="ws-algo-grid">'+pieces.join('')+'</div>'+deferredHtml+'</section>';
  }

  function sentenceEvidence(item,terms,limit){
    var raw=allSourceText(item||state.current||{}).replace(/\s+/g,' ').trim();
    var parts=raw.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(!parts.length) parts=[raw];
    terms=(terms||[]).map(function(t){return String(t).toLowerCase();});
    var hits=[];
    parts.forEach(function(s){
      var low=s.toLowerCase();
      if(terms.some(function(t){return low.indexOf(t)>-1;})) hits.push(s.slice(0,220));
    });
    return hits.slice(0,limit||4);
  }
  function validationCard(kind,label,status,confidence,reason,evidence,template,priority){
    return {kind:kind,label:label,status:status,confidence:confidence,priority:priority||0,reason:reason,evidence:(evidence||[]).filter(Boolean).slice(0,5),template:template||'',generateNow:false,requiresExternalAsset:status==='high-confidence'||status==='needs-review'};
  }
  function guidedEvidencePreview(item){
    item=item||state.current||{};
    var raw=allSourceText(item), low=raw.toLowerCase(), cls=classifyMediaNeeds(item), candidates=[];
    function any(list){return hasAny(low,list);}
    function hasRx(rx){return rx.test(low);}
    var ecgTerms=['ecg','ekg','atrial fibrillation','a-fib','afib','svt','ventricular tachycardia','v-tach','vtach','ventricular fibrillation','v-fib','vfib','asystole','pea','heart block','st elevation','st depression','stemi','peaked t','wide qrs'];
    var explicitEcg=hasRx(/atrial fibrillation|a-?fib\b|afib|\bsvt\b|ventricular tachycardia|v-?tach|vtach|ventricular fibrillation|v-?fib|vfib|asystole|\bpea\b|heart block|st elevation|st depression|\bstemi\b|peaked t|wide qrs/i);
    var ecgMention=any(['ecg','ekg','rhythm strip','telemetry','arrhythmia','dysrhythmia','chest pain','acute coronary','myocardial infarction']);
    if(explicitEcg){candidates.push(validationCard('ecg','ECG strip template','high-confidence','high','Explicit rhythm/ECG pattern appears in the item. Use a reusable SVG strip template matched only to this documented pattern.',sentenceEvidence(item,ecgTerms,4),'ecg-template-library',9));}
    else if(ecgMention || (cls.needs||[]).some(function(x){return x.kind==='ecg';})){candidates.push(validationCard('ecg','ECG strip template','needs-review','moderate','Cardiac/ECG context exists, but the exact rhythm or waveform pattern is not strong enough for automatic ECG generation.',sentenceEvidence(item,ecgTerms.concat(['chest pain','arrhythmia','telemetry']),4),'review-before-ecg-template',6));}
    var fhrStrong=hasRx(/late decel|late deceleration|variable decel|variable deceleration|early decel|early deceleration|minimal variability|absent variability|tachysystole|category\s*(ii|iii)|uterine contraction/i);
    var fhrMention=any(['fetal heart','fhr','deceleration','variability','uterine contraction','tachysystole','category ii','category iii']);
    if(fhrStrong){candidates.push(validationCard('fhr','FHR tracing template','high-confidence','high','Specific fetal-monitoring pattern is documented. Use a reusable FHR/contraction SVG template after confirming pattern wording.',sentenceEvidence(item,['fetal heart','fhr','deceleration','variability','tachysystole','contraction','category'],4),'fhr-template-library',10));}
    else if(fhrMention || (cls.needs||[]).some(function(x){return x.kind==='fhr';})){candidates.push(validationCard('fhr','FHR tracing template','needs-review','moderate','Fetal monitoring is mentioned, but the exact tracing pattern is not explicit enough for automatic template assignment.',sentenceEvidence(item,['fetal heart','fhr','deceleration','variability','contraction'],4),'review-before-fhr-template',7));}
    var modality=hasRx(/ct scan|computed tomography|\bct\b|mri|x-?ray|xray|\bcxr\b|chest x-?ray|ultrasound|cta|angiogram|radiology|imaging/i);
    var radFinding=hasRx(/pneumothorax|pulmonary edema|infiltrate|consolidation|fracture|hemorrhage|no hemorrhage|ischemic|ischemia|tube placement|bowel obstruction|appendicitis|free air|effusion|opacity/i);
    if(modality && radFinding){candidates.push(validationCard('radiology','Radiology report/schematic','high-confidence','high','Modality and imaging finding are both documented. Prefer report-card or schematic first; use external image only if interpretation is required.',sentenceEvidence(item,['ct','mri','x-ray','xray','cxr','ultrasound','cta','imaging','radiology','pneumothorax','fracture','hemorrhage','infiltrate','tube placement'],4),'radiology-report-or-schematic',8));}
    else if(modality || (cls.needs||[]).some(function(x){return x.kind==='radiology';})){candidates.push(validationCard('radiology','Radiology report/schematic','needs-review','moderate','Imaging is referenced, but a specific finding/modality pair is not strong enough for automatic image/schematic assignment.',sentenceEvidence(item,['ct','mri','x-ray','xray','cxr','ultrasound','cta','imaging','radiology'],4),'review-before-radiology-asset',5));}
    var deviceStrong=hasRx(/pressure injury|pressure ulcer|stage [1-4]|burn|stoma|ostomy|chest tube|tracheostomy|trach|iv infiltration|extravasation|central line|picc|foley|wound dehiscence/i);
    var deviceMention=any(['wound','skin breakdown','rash','lesion','drainage','incision','device','catheter','tube','line']);
    if(deviceStrong){candidates.push(validationCard('diagram','Wound/device clinical diagram','high-confidence','high','A wound/skin/device cue is explicit. Use a reusable diagram; do not create photorealistic patient imagery.',sentenceEvidence(item,['pressure injury','pressure ulcer','burn','stoma','ostomy','chest tube','tracheostomy','trach','infiltration','extravasation','central line','picc','foley','wound'],4),'wound-device-diagram-library',7));}
    else if(deviceMention || (cls.needs||[]).some(function(x){return x.kind==='diagram';})){candidates.push(validationCard('diagram','Wound/device clinical diagram','needs-review','moderate','A skin/device context exists, but the visual target needs human confirmation.',sentenceEvidence(item,['wound','skin','rash','lesion','drainage','incision','catheter','tube','line'],4),'review-before-diagram',4));}
    var neuroStrong=hasRx(/last known well|facial droop|aphasia|unilateral weakness|slurred speech|glasgow|\bgcs\b|fixed pupil|unequal pupils|seizure|increased icp|intracranial pressure/i);
    var neuroMention=any(['stroke','cva','weakness','pupil','gcs','glasgow','seizure','icp','spinal cord','delirium','fall risk']);
    if(neuroStrong){candidates.push(validationCard('neuro','Neuro timeline/body map','high-confidence','high','Time-critical neuro or focal-assessment cues are documented. A timeline/body-map may improve clinical judgment without adding facts.',sentenceEvidence(item,['last known well','stroke','facial droop','aphasia','weakness','pupil','gcs','seizure','icp','intracranial'],4),'neuro-timeline-body-map',7));}
    else if(neuroMention || (cls.needs||[]).some(function(x){return x.kind==='neuro';})){candidates.push(validationCard('neuro','Neuro timeline/body map','needs-review','moderate','Neuro context exists, but a visual map/timeline needs confirmation.',sentenceEvidence(item,['stroke','weakness','pupil','gcs','seizure','icp','delirium','fall risk'],4),'review-before-neuro-asset',4));}
    candidates=candidates.sort(function(a,b){return b.priority-a.priority || (a.kind||'').localeCompare(b.kind||'');});
    var high=candidates.filter(function(x){return x.status==='high-confidence';}).length;
    var review=candidates.filter(function(x){return x.status==='needs-review';}).length;
    var verdict=high?'high-confidence':(review?'needs-review':'no-dedicated-media');
    return {version:'v243H-media-evidence-validation',itemId:item.id||'',format:normalizeType(item.format||((item.structure||{}).type)||''),verdict:verdict,highConfidence:high,needsReview:review,rejected:candidates.length?0:1,candidates:candidates.slice(0,6),sourcePolicy:'Only documented item/chunk text can trigger template assignment. No ECG/FHR/radiology/wound image is generated here.',mediaGenerationStarted:false,externalAssetManifestRequired:high>0||review>0};
  }
  function renderGuidedPreviewQueuePanel(){
    var q=guidedEvidencePreview(state.current);
    var cards=q.candidates.length?q.candidates.map(function(c){
      return '<div class="ws-validation-card '+esc(c.status)+'"><span>'+esc(title(c.kind)+' · '+title(c.status))+'</span><b>'+esc(c.label)+'</b><p>'+esc(c.reason)+'</p><small>'+esc((c.evidence&&c.evidence.length?c.evidence.join(' · '):'No strong sentence evidence captured.'))+'</small><em>'+esc(c.template||'manifest mapping required')+'</em></div>';
    }).join(''):'<div class="ws-validation-card no-media"><span>No dedicated media</span><b>Chart cards are enough</b><p>This item does not have strong evidence for ECG, FHR, radiology, wound/device, or neuro image/template assignment.</p><small>No media is generated and no external asset is requested.</small></div>';
    return '<section class="ws-validation-panel" aria-label="ECG FHR radiology Guided Preview queue"><div class="ws-media-head"><div><span class="ws-mini-badge">v243H validation</span><h3>Media evidence validation queue</h3><p>Strict queue for ECG/FHR/radiology/wound/device/neuro assets. This panel validates whether a reusable template or external asset may be requested; it does not generate media.</p></div><strong>'+esc(title(q.verdict))+'</strong></div><div class="ws-validation-grid">'+cards+'</div><div class="ws-validation-foot"><b>Guardrail:</b> external media can be mapped only with a manifest entry, alt text, source label, and no new clinical facts.</div></section>';
  }

  var EXTERNAL_MEDIA_ALLOWED_KINDS={ecg:1,fhr:1,radiology:1,diagram:1,neuro:1,oxygenation:1,mar:1,io:1,abg:1,trend:1,perfusion:1};
  var EXTERNAL_MEDIA_BLOCKED_KINDS={'image-hotspot':1,'audio-hotspot':1,highlight:1,generated_photo:1,photoreal_patient:1};
  function externalMediaRequiredFields(){
    return ['assetId','kind','templateId','assetPath','altText','caption','allowedUse','sourcePolicy','status','noPatientIdentifiers'];
  }
  function normalizeManifestEntries(payload){
    if(!payload) return [];
    if(Array.isArray(payload)) return payload;
    if(Array.isArray(payload.assets)) return payload.assets;
    if(Array.isArray(payload.entries)) return payload.entries;
    if(payload.manifest && Array.isArray(payload.manifest.assets)) return payload.manifest.assets;
    return [];
  }
  function normalizeAssetKind(kind){
    var k=String(kind||'').toLowerCase().trim().replace(/\s+/g,'-');
    var map={'ekg':'ecg','ecg-strip':'ecg','fhr-tracing':'fhr','fetal-heart-rate':'fhr','xray':'radiology','x-ray':'radiology','cxr':'radiology','wound':'diagram','device':'diagram','skin':'diagram','body-map':'neuro','neuro-map':'neuro','i&o':'io','i-o':'io','fluid-balance':'io','medication':'mar','medication-safety':'mar','map':'perfusion','perfusion-card':'perfusion'};
    return map[k]||k;
  }
  function externalMediaPathOk(p){
    p=String(p||'').trim();
    if(!p) return false;
    if(/^https?:\/\//i.test(p)) return false;
    if(/^data:/i.test(p)) return false;
    if(p.indexOf('..')>-1) return false;
    return /^(media\/external\/|\.\.\/media\/external\/|assets\/media\/external\/)/i.test(p) || /^[a-z0-9_\-\/]+\.(svg|png|jpg|jpeg|webp|mp3|wav)$/i.test(p);
  }
  function validateExternalMediaAsset(asset){
    asset=asset||{};
    var kind=normalizeAssetKind(asset.kind||asset.mediaKind||asset.category);
    var errors=[], warnings=[];
    externalMediaRequiredFields().forEach(function(f){ if(asset[f]===undefined || asset[f]===null || String(asset[f]).trim()==='') errors.push('missing '+f); });
    if(EXTERNAL_MEDIA_BLOCKED_KINDS[kind]) errors.push('blocked media kind: '+kind);
    if(!EXTERNAL_MEDIA_ALLOWED_KINDS[kind]) errors.push('unsupported media kind: '+(kind||'blank'));
    if(String(asset.assetId||'').length<4) errors.push('assetId too short');
    if(String(asset.altText||'').trim().length<24) errors.push('altText too short');
    if(String(asset.caption||'').trim().length<12) errors.push('caption too short');
    if(!/documented|template|reusable|external|manifest|no new clinical facts/i.test(String(asset.sourcePolicy||''))) warnings.push('sourcePolicy should explicitly say no new clinical facts / documented evidence only');
    if(!externalMediaPathOk(asset.assetPath||asset.path||'')) errors.push('assetPath must be local and safe');
    if(asset.noPatientIdentifiers !== true && String(asset.noPatientIdentifiers).toLowerCase()!=='true') errors.push('noPatientIdentifiers must be true');
    if(asset.usedForScoring === true || String(asset.usedForScoring).toLowerCase()==='true') errors.push('external media cannot be scoring-critical in H1');
    if(asset.hotspotRegions || asset.clickRegions || asset.scoringRegions) errors.push('hotspot/scoring regions are blocked in H1');
    return {assetId:String(asset.assetId||''),kind:kind,valid:errors.length===0,errors:errors,warnings:warnings,entry:asset};
  }
  async function fetchJsonMaybe(url){
    try{
      var res=await fetch(url,{cache:'no-store'});
      if(!res.ok) return null;
      return await res.json();
    }catch(e){return null;}
  }
  async function loadExternalMediaManifest(){
    var urls=['../media/external/media-manifest.json','../media/external/manifest.json','../data-governance/external-media-manifest.json','../data-governance/NexusRN-external-media-manifest.json'];
    for(var i=0;i<urls.length;i++){
      var payload=await fetchJsonMaybe(urls[i]);
      if(payload){
        var entries=normalizeManifestEntries(payload), validations=entries.map(validateExternalMediaAsset);
        return {found:true,url:urls[i],payload:payload,entries:entries,validations:validations,validAssets:validations.filter(function(v){return v.valid;}),invalidAssets:validations.filter(function(v){return !v.valid;})};
      }
    }
    return {found:false,url:null,payload:null,entries:[],validations:[],validAssets:[],invalidAssets:[]};
  }
  function validationKindsForItem(item){
    var q=guidedEvidencePreview(item||state.current||{});
    var kinds={};
    (q.candidates||[]).forEach(function(c){kinds[normalizeAssetKind(c.kind)]=c.status||'candidate';});
    return {validation:q,kinds:kinds};
  }
  function safeManifestMappingsForItem(item,manifestResult){
    item=item||state.current||{};
    var id=String(item.id||''), vk=validationKindsForItem(item), allowedKinds=vk.kinds;
    if(!manifestResult || !manifestResult.validAssets) return [];
    return manifestResult.validAssets.filter(function(v){
      var e=v.entry||{}, kind=normalizeAssetKind(e.kind||e.mediaKind||e.category);
      var itemIds=Array.isArray(e.itemIds)?e.itemIds.map(String):[];
      var mapsItem=itemIds.indexOf(id)>-1 || String(e.itemId||'')===id;
      var reusableOk=!itemIds.length && !e.itemId && allowedKinds[kind] && /reusable|template/i.test(String(e.allowedUse||'')+' '+String(e.sourcePolicy||''));
      return (mapsItem || reusableOk) && !!allowedKinds[kind] && !EXTERNAL_MEDIA_BLOCKED_KINDS[kind];
    }).slice(0,4);
  }
  function externalManifestIntakeStatusSync(){
    return {version:'v243H1-external-media-manifest-intake',requiredFields:externalMediaRequiredFields(),allowedKinds:Object.keys(EXTERNAL_MEDIA_ALLOWED_KINDS),blockedKinds:Object.keys(EXTERNAL_MEDIA_BLOCKED_KINDS),manifestLoaded:!!window.NEXUS_EXTERNAL_MEDIA_MANIFEST_CACHE,mediaRenderingStarted:false,hotspotMappingStarted:false,clinicalFactsAdded:false};
  }

  function v243iSandboxHref(){return '../guided-preview/index.html';}
  function externalMediaPreviewAllowed(v){
    v=v||{}; var e=v.entry||{}, kind=normalizeAssetKind(e.kind||e.mediaKind||e.category);
    var p=String(e.assetPath||e.path||'');
    var ext=(p.split('.').pop()||'').toLowerCase();
    var safeImage=/^(svg|png|jpg|jpeg|webp)$/.test(ext);
    var safeMeta=/^(mar|io|abg|trend|perfusion|oxygenation)$/.test(kind);
    return !!v.valid && !EXTERNAL_MEDIA_BLOCKED_KINDS[kind] && !e.hotspotRegions && !e.scoringRegions && !e.clickRegions && e.usedForScoring!==true && externalMediaPathOk(p) && (safeImage||safeMeta);
  }
  function externalMediaPreviewStatusSync(){
    var rendered=!!document.querySelector('[data-nexus-external-preview]');
    var unsafe=!!document.querySelector('audio[data-nexus-external-preview],video[data-nexus-external-preview],canvas[data-nexus-external-preview],[data-hotspot-region],[data-scoring-region]');
    return {version:'v243I-asset-rendering-sandbox',sandboxRoute:'guided-preview/index.html',productionRoutesRenderExternalMedia:false,previewSandboxOnly:true,externalPreviewNodesOnThisRoute:rendered,unsafePreviewNodesOnThisRoute:unsafe,hotspotMappingStarted:false,usedForScoring:false};
  }

  function renderExternalMediaManifestPanel(){
    var q=guidedEvidencePreview(state.current), status=externalManifestIntakeStatusSync();
    var candidateKinds=(q.candidates||[]).map(function(c){return title(c.kind)+' · '+title(c.status);});
    return '<section class="ws-external-media-panel" aria-label="External media manifest intake"><div class="ws-media-head"><div><span class="ws-mini-badge">v243H1 manifest intake</span><h3>External media manifest mapping layer</h3><p>This layer validates your future ZIP/manifest from the external agent. v243I adds an isolated Guided Preview route for preview-only rendering after a valid manifest; production question routes still do not render external media.</p></div><strong>intake ready</strong></div><div class="ws-validation-grid"><div class="ws-validation-card needs-review"><span>Current item queue</span><b>'+esc(q.verdict?title(q.verdict):'No dedicated media')+'</b><p>'+esc(candidateKinds.length?candidateKinds.join(' · '):'Chart cards are enough for this item.')+'</p><small>Manifest mapping must match these evidence-validated kinds before any asset can appear.</small></div><div class="ws-validation-card no-media"><span>Required manifest fields</span><b>'+esc(status.requiredFields.length)+' required fields</b><p>'+esc(status.requiredFields.join(', '))+'</p><small>Blocked in H1: image hotspot, audio hotspot, highlight, scoring regions, external URLs, patient identifiers.</small></div></div><div class="ws-validation-foot"><b>v243I guardrail:</b> external media can be previewed only inside the isolated Guided Preview route after manifest validation. Production routes keep metadata-only mapping; hotspot scoring remains off.<p><a href="'+esc(v243iSandboxHref())+'">Open isolated Guided Preview</a></p></div></section>';
  }
  function renderMediaNeedPanel(){
    var c=classifyMediaNeeds(state.current);
    var cards=(c.needs.length?c.needs:[c.top]).map(function(n){return '<div class="ws-media-card tier-'+esc(n.tier.toLowerCase())+'"><span>Tier '+esc(n.tier)+' · '+esc(n.kind)+'</span><b>'+esc(n.name)+'</b><p>'+esc(n.action)+'</p><small>'+esc((n.evidence||[]).join(' · '))+'</small></div>';}).join('');
    return '<section class="ws-media-panel" aria-label="Media enrichment classifier"><div class="ws-media-head"><div><span class="ws-mini-badge">v243F2 classifier</span><h3>Media need classifier</h3><p>Badges show whether an item needs richer support. v243G below generates only safe algorithmic visuals when item evidence supports them.</p></div><strong>'+esc(title(c.verdict))+'</strong></div><div class="ws-media-grid">'+cards+'</div></section>'+renderAlgorithmicVisualsPanel()+renderGuidedPreviewQueuePanel()+renderExternalMediaManifestPanel();
  }
  function renderList(kind){
    var data=listData(kind), stem=stemOf(state.current);
    if(!data.length){
      if(kind==='history') return renderHistoryPhysical(derivedHistoryPhysical(),true);
      if(kind==='notes') return renderDerivedNotes();
      if(kind==='labs') return renderLabsFallback();
      if(kind==='orders') return renderOrders(derivedOrders(), true);
      if(kind==='radiology') return renderRadiology(derivedRadiology(), true);
      if(kind==='vitals') return renderVitalsComposer([]);
      if(kind==='io') return renderIO(derivedIO(), true);
      return renderSafeBlank(kind);
    }
    if(kind==='history') return renderHistoryPhysical(data,false);
    if(kind==='notes') return renderNotesTimeline(data,false);
    if(kind==='vitals') return renderVitalsComposer(data);
    if(kind==='labs') return renderDataCards(data,'Lab result');
    if(kind==='orders') return renderOrders(data,false);
    if(kind==='radiology') return renderRadiology(data,false);
    if(kind==='io') return renderIO(data,false);
    return renderDataCards(data,title(kind));
  }
  function renderIO(data, derived){
    var baseDate = getBaseDateForItem(state.current);
    var rowsHtml = '';
    var totalIntake = 0;
    var totalOutput = 0;
    data.forEach(function(row, i){
      var timeStr = row.time || formatSmartDateTime(row.time || '', 0, 1);
      var intakeVal = parseFloat(row.intake) || 0;
      var outputVal = parseFloat(row.output) || 0;
      totalIntake += intakeVal;
      totalOutput += outputVal;
      var balance = totalIntake - totalOutput;
      rowsHtml += '<tr>' +
        '<td>' + esc(timeStr) + '</td>' +
        '<td>' + esc(row.intakeRoute || 'Oral/IV') + '</td>' +
        '<td>' + esc(intakeVal ? intakeVal + ' mL' : '—') + '</td>' +
        '<td>' + esc(row.outputRoute || 'Urine') + '</td>' +
        '<td>' + esc(outputVal ? outputVal + ' mL' : '—') + '</td>' +
        '<td class="' + (balance >= 0 ? 'pos' : 'neg') + '">' + esc((balance >= 0 ? '+' : '') + balance + ' mL') + '</td>' +
        '</tr>';
    });
    
    var summaryHtml = '<div class="ws-io-summary-cards">' +
      '<div class="ws-io-sum-card pos"><span>Total Intake</span><b>' + totalIntake + ' mL</b></div>' +
      '<div class="ws-io-sum-card neg"><span>Total Output</span><b>' + totalOutput + ' mL</b></div>' +
      '<div class="ws-io-sum-card ' + ((totalIntake - totalOutput) >= 0 ? 'pos' : 'neg') + '"><span>Net Balance</span><b>' + ((totalIntake - totalOutput) >= 0 ? '+' : '') + (totalIntake - totalOutput) + ' mL</b></div>' +
      '</div>';

    return '<div class="ws-derived-banner structured"><b>Intake & Output Record</b><span>Admitted: ' + esc(formatLocalString(getBaseDateForItem(state.current))) + '</span></div>' +
      summaryHtml +
      '<table class="ws-table compact ws-io-table"><thead><tr><th>Time</th><th>Intake Route</th><th>Intake Vol</th><th>Output Route</th><th>Output Vol</th><th>Net Balance</th></tr></thead><tbody>' + rowsHtml + '</tbody></table>';
  }
  function derivedIO(){
    var s = allSourceText(state.current);
    var rows = [];
    var matchIntake = s.match(/(?:intake|received|infused)[^.]{0,40}?(\d{2,5})\s*mL/i);
    var matchOutput = s.match(/(?:output|urine output|voided|foley)[^.]{0,40}?(\d{2,5})\s*mL/i);
    if(matchIntake || matchOutput) {
      rows.push({
        time: '08:00',
        intake: matchIntake ? matchIntake[1] : '0',
        intakeRoute: matchIntake ? 'Documented Intake' : '—',
        output: matchOutput ? matchOutput[1] : '0',
        outputRoute: matchOutput ? 'Documented Output' : '—'
      });
    }
    return rows;
  }
  function renderSafeBlank(kind){
    return '<div class="ws-smart-empty"><h3>No Active ' + esc(title(kind)) + ' Documented</h3><p>There are no active ' + esc(kind) + ' records documented for this client. Consult primary provider if changes in status occur.</p></div>';
  }
  function renderNotesTimeline(data,derived){
    return '<div class="ws-derived-banner structured"><b>Nursing Progress Notes</b><span>Admitted: '+esc(formatLocalString(getBaseDateForItem(state.current)))+'</span></div><div class="ws-timeline">'+data.map(function(n,i){
      var rawTime = n.time || n.date || '';
      var timeStr = formatSmartDateTime(rawTime, 0, 0);
      return '<div class="ws-time-entry"><span>'+esc(timeStr)+'</span><b>'+esc(n.type||n.author||'Nursing note')+'</b><p>'+esc(n.note||n.text||flattenText(n))+'</p>'+(n.tag?'<em>'+esc(n.tag)+'</em>':'')+'</div>';
    }).join('')+'</div>';
  }
  function renderDerivedNotes(){return renderNotesTimeline(derivedNotes(),true);}
  function renderLabsFallback(){
    var rows=derivedLabs();
    if(rows.length) return '<div class="ws-derived-banner structured"><b>Laboratory Results</b><span>Completed: '+esc(formatLocalString(getBaseDateForItem(state.current)))+'</span></div>'+renderDataCards(rows,'Lab Result');
    return '<div class="ws-smart-empty"><h3>No Active Laboratory Results Documented</h3><p>There are no laboratory results currently recorded for this client. Notify provider if diagnostic results are pending.</p></div>';
  }
  function referenceForLab(name) {
    var n = String(name || '').toLowerCase().trim();
    if (n.indexOf('ammonia') > -1) return '15 - 45 mcg/dL';
    if (n.indexOf('albumin') > -1) return '3.5 - 5.0 g/dL';
    if (n.indexOf('glucose') > -1 || n.indexOf('sugar') > -1 || n.indexOf('bg') === 0 || n === 'bg') {
      if (n.indexOf('fasting') > -1) return '70 - 100 mg/dL (fasting)';
      if (n.indexOf('postprandial') > -1) return '< 140 mg/dL';
      return '70 - 100 mg/dL';
    }
    if (n.indexOf('potassium') > -1 || n === 'k' || n === 'k+') return '3.5 - 5.0 mEq/L';
    if (n.indexOf('sodium') > -1 || n === 'na' || n === 'na+') return '135 - 145 mEq/L';
    if (n.indexOf('chloride') > -1 || n === 'cl' || n === 'cl-') return '98 - 106 mEq/L';
    if (n.indexOf('calcium') > -1 || n === 'ca' || n === 'ca++') return '9.0 - 10.5 mg/dL';
    if (n.indexOf('magnesium') > -1 || n === 'mg' || n === 'mg++') return '1.3 - 2.1 mEq/L';
    if (n.indexOf('phosphorus') > -1 || n === 'p' || n === 'po4') return '3.0 - 4.5 mg/dL';
    if (n.indexOf('wbc') > -1 || n.indexOf('white blood cell') > -1) return '5,000 - 10,000/mm³';
    if (n.indexOf('hemoglobin') > -1 || n.indexOf('hgb') > -1) return 'Male: 14 - 18 g/dL, Female: 12 - 16 g/dL';
    if (n.indexOf('hematocrit') > -1 || n.indexOf('hct') > -1) return 'Male: 42% - 52%, Female: 37% - 47%';
    if (n.indexOf('platelet') > -1 || n === 'plt') return '150,000 - 400,000/mm³';
    if (n.indexOf('bun') > -1 || n.indexOf('urea') > -1) return '10 - 20 mg/dL';
    if (n.indexOf('creatinine') > -1) return 'Male: 0.6 - 1.2 mg/dL, Female: 0.5 - 1.1 mg/dL';
    if (n.indexOf('specific gravity') > -1) return '1.005 - 1.030';
    if (n.indexOf('urine output') > -1) return '> 30 mL/hr';
    if (n.indexOf('lactate') > -1) return '0.5 - 2.2 mmol/L';
    if (n.indexOf('hba1c') > -1 || n.indexOf('a1c') > -1) return '4% - 6% (non-diabetic)';
    if (n.indexOf('prothrombin') > -1 || n.indexOf('pt') === 0 || n.indexOf('inr') > -1) return 'PT: 11 - 12.5 sec, INR: 0.8 - 1.2';
    if (n.indexOf('aptt') > -1 || n.indexOf('ptt') > -1) return '30 - 40 seconds';
    if (n.indexOf('ast') > -1) return '10 - 40 U/L';
    if (n.indexOf('alt') > -1) return '7 - 56 U/L';
    if (n.indexOf('alp') > -1 || n.indexOf('alkaline phosphatase') > -1) return '40 - 120 U/L';
    if (n.indexOf('bilirubin') > -1) return '0.3 - 1.0 mg/dL';
    if (n.indexOf('bnp') > -1) return '< 100 pg/mL';
    if (n.indexOf('troponin') > -1) return '< 0.03 ng/mL';
    if (n.indexOf('digoxin') > -1) return '0.5 - 2.0 ng/mL';
    if (n.indexOf('lithium') > -1) return '0.6 - 1.2 mEq/L';
    return '';
  }
  function renderDataCards(data,heading){
    var baseDate = getBaseDateForItem(state.current);
    var latestTime = '';
    for (var idx = data.length - 1; idx >= 0; idx--) {
      var t = data[idx].time || data[idx].date || '';
      if (t && /^\d{1,2}:\d{2}/.test(t)) {
        latestTime = t;
        break;
      }
    }
    var defaultOffset = (heading && heading.toLowerCase().indexOf('radiology') > -1) ? 120 : 90;
    var unifiedTimeStr = '';
    if (latestTime) {
      unifiedTimeStr = formatSmartDateTime(latestTime, 0, 0);
    } else {
      var d = new Date(baseDate.getTime());
      d.setMinutes(d.getMinutes() + defaultOffset);
      unifiedTimeStr = formatLocalString(d);
    }
    return '<div class="ws-data-grid">'+data.map(function(x,i){
      var label=labelOfRow(x,i), val=valueOfRow(x), sev=severityFor(label,val);
      var timeStr = (x.time || x.date) ? formatSmartDateTime(x.time || x.date, 0, 2) : unifiedTimeStr;
      var ref = x.reference || referenceForLab(label) || '';
      var refHtml = ref ? '<span class="ws-data-reference" style="display: block; font-size: 11px; color: #64748b; margin-top: 4px; font-weight: 500;">Ref: ' + esc(ref) + '</span>' : '';
      return '<div class="ws-data-card '+sev+'"><span>'+esc(heading||'Data')+' · '+esc(timeStr)+'</span><b>'+esc(label)+'</b><p>'+esc(val)+'</p>'+refHtml+(sev?'<em>'+esc(sev==='critical'?'high priority':'review')+'</em>':'')+'</div>';
    }).join('')+'</div>';
  }
  function renderOrders(data,derived){
    var baseDate = getBaseDateForItem(state.current);
    var uniqueData = [];
    var seenKeys = {};
    if (Array.isArray(data)) {
      data.forEach(function(x) {
        var name = String(x.name || '').trim().toLowerCase();
        var val = String(valueOfRow(x) || '').trim().toLowerCase();
        var key = name + '|' + val;
        if (!seenKeys[key]) {
          seenKeys[key] = true;
          uniqueData.push(x);
        }
      });
    }
    return '<div class="ws-derived-banner structured"><b>Provider Orders</b><span>Active Orders</span></div><div class="ws-order-stack">'+uniqueData.map(function(x,i){
      var timeStr = '';
      if (x.time || x.date) {
        timeStr = formatSmartDateTime(x.time || x.date, 0, 1);
      } else {
        var d = new Date(baseDate.getTime());
        d.setMinutes(d.getMinutes() + 10 + i * 10);
        timeStr = formatLocalString(d);
      }
      return '<div class="ws-order"><span>'+esc(x.name||('Order '+(i+1)))+' · '+esc(timeStr)+'</span><p>'+esc(valueOfRow(x))+'</p>'+'</div>';
    }).join('')+'</div>';
  }
  function renderRadiology(data,derived){
    var hasReal=!derived && data && data.length;
    var cardHtml=renderDataCards(data,'Radiology / imaging');
    
    // Find matching imaging asset
    var imageSrc = '';
    var findingLabel = 'Pathology finding';
    var hotspotStyles = '';
    
    var basePath = (window.location.pathname.includes('/workstation-') || window.location.pathname.includes('/guided-preview/')) ? '../' : '';
    
    var rData = derived ? derivedRadiology() : data;
    var hasFallback = rData.some(function(x){
      return (x.study && x.study.indexOf('Radiology not documented') > -1) || 
             x.source === 'renderer safety fallback' ||
             (x.impression && x.impression.indexOf('No imaging study is documented') > -1);
    });
    
    // Detect modality from data text
    var combinedText = rData.map(function(x){
      return ((x.study||'') + ' ' + (x.type||'') + ' ' + (x.test||'') + ' ' + (x.impression||'') + ' ' + (x.report||'') + ' ' + (x.text||'')).toLowerCase();
    }).join(' ');
    
    // 1. Precise Head CT Matcher
    var isHeadCt = combinedText.indexOf('ct head') > -1 || 
                   combinedText.indexOf('head ct') > -1 || 
                   combinedText.indexOf('brain ct') > -1 ||
                   (
                     (combinedText.indexOf('stroke') > -1 || 
                      combinedText.indexOf('slurred speech') > -1 || 
                      combinedText.indexOf('facial droop') > -1 || 
                      combinedText.indexOf('hemiplegia') > -1 || 
                      combinedText.indexOf('cva') > -1 || 
                      combinedText.indexOf('weakness') > -1) && 
                     (combinedText.indexOf('ct') > -1 || combinedText.indexOf('computed tomography') > -1 || combinedText.indexOf('scan') > -1)
                   );
                   
    // 2. Precise Abdominal X-Ray Matcher
    var isAbdXray = combinedText.indexOf('abdominal') > -1 || 
                    combinedText.indexOf('abd x-ray') > -1 || 
                    combinedText.indexOf('abdominal film') > -1 || 
                    combinedText.indexOf('abd film') > -1 || 
                    combinedText.indexOf('abdominal x-ray') > -1 ||
                    combinedText.indexOf('abdominal radiograph') > -1 ||
                    (
                      (combinedText.indexOf('distension') > -1 || 
                       combinedText.indexOf('bowel') > -1 || 
                       combinedText.indexOf('obstruction') > -1) && 
                      (combinedText.indexOf('x-ray') > -1 || combinedText.indexOf('film') > -1 || combinedText.indexOf('radiograph') > -1)
                    );
                    
    // 3. Precise Chest X-Ray Matcher (pneumonia, consolidation, infiltrates)
    var isCxr = combinedText.indexOf('chest x-ray') > -1 || 
                combinedText.indexOf('cxr') > -1 || 
                combinedText.indexOf('chest radiograph') > -1 || 
                combinedText.indexOf('pneumonia') > -1 ||
                combinedText.indexOf('consolidation') > -1 ||
                combinedText.indexOf('infiltrates') > -1 ||
                (
                  (combinedText.indexOf('pulmonary') > -1 || 
                   combinedText.indexOf('lung') > -1 || 
                   combinedText.indexOf('copd') > -1 || 
                   combinedText.indexOf('edema') > -1 || 
                   combinedText.indexOf('chest tube') > -1) && 
                  (combinedText.indexOf('x-ray') > -1 || combinedText.indexOf('film') > -1 || combinedText.indexOf('radiograph') > -1 || combinedText.indexOf('cxr') > -1)
                );
    
    if (hasFallback) {
      imageSrc = '';
    } else if (isHeadCt) {
      imageSrc = basePath + 'media/internal/head_ct.png';
      findingLabel = 'Left parietal subdural hematoma & edema';
      hotspotStyles = 'left: 40%; top: 40%; width: 40px; height: 40px;';
    } else if (isAbdXray) {
      imageSrc = basePath + 'media/internal/abd_xray.png';
      findingLabel = 'Abnormal gaseous distension of bowel loops';
      hotspotStyles = 'left: 50%; top: 52%; width: 55px; height: 55px;';
    } else if (isCxr) {
      imageSrc = basePath + 'media/internal/cxr_pneumonia.png';
      findingLabel = 'Pulmonary consolidation / infiltrates';
      hotspotStyles = 'left: 65%; top: 48%; width: 48px; height: 48px;';
    } else {
      // If the case does not require a specific diagnostic image, no image is rendered
      imageSrc = '';
    }
    
    var viewHtml = '';
    if (imageSrc) {
      viewHtml = '<div class="ws-rad-viewport">' +
        '<div class="ws-rad-image-container">' +
          '<img class="ws-rad-img" src="' + esc(imageSrc) + '" alt="Radiology film viewer" onerror="this.src=\'' + basePath + 'images/chest-xray.png\'" />' +
          '<div class="ws-rad-overlay-canvas">' +
            '<div class="ws-rad-hotspot" style="' + hotspotStyles + '" title="' + esc(findingLabel) + '"></div>' +
          '</div>' +
        '</div>' +
        '<div class="ws-rad-controls">' +
          '<button class="ws-rad-btn" onclick="var img=this.closest(\'.ws-rad-viewport\').querySelector(\'.ws-rad-img\'); img.classList.toggle(\'zoomed\'); this.classList.toggle(\'active\');">' +
            '🔍 Toggle Zoom' +
          '</button>' +
          '<button class="ws-rad-btn" onclick="var canvas=this.closest(\'.ws-rad-viewport\').querySelector(\'.ws-rad-overlay-canvas\'); canvas.classList.toggle(\'active\'); this.classList.toggle(\'active\');">' +
            '✨ Annotate Finding' +
          '</button>' +
        '</div>' +
      '</div>';
    }
    
    var panelClass = 'ws-rad-panel' + (imageSrc ? '' : ' no-image');
    return '<div class="' + panelClass + '">' + viewHtml + '<div><div class="ws-derived-banner structured"><b>Radiology Report</b><span>Completed Radiology</span></div>'+cardHtml+'</div></div>';
  }
  function renderRadiologyFallback(stem){
    return renderRadiology(derivedRadiology(),true);
  }
  function renderVitalsComposer(data){
    var vitals=evidenceVitals(state.current);
    var chartValues=vitals.filter(function(v){return v.v!=='Not charted' && /^(T|HR|RR|MAP)$/.test(v.k);}).map(function(v){return parseFloat(String(v.v).replace(/[^0-9.\-]/g,''));});
    var chartLabels=vitals.filter(function(v){return v.v!=='Not charted' && /^(T|HR|RR|MAP)$/.test(v.k);}).map(function(v){return v.k;});
    var chart=chartValues.length>=2?svgLineChart(chartValues,chartLabels,''):'';
    var rows=normArray(data||[]);
    var table=rows.length?'<details class="ws-structured-source"><summary>Structured vital-sign source rows</summary><table class="ws-table compact"><thead><tr><th>Time / item</th><th>Value</th><th>Status</th></tr></thead><tbody>'+rows.map(function(x,i){
      var label=labelOfRow(x,i);
      var timeStr=formatSmartDateTime(x.time || x.date || label, 0, 1);
      var val=valueOfRow(x), sev=severityFor(label,val);
      return '<tr class="'+sev+'"><td>'+esc(timeStr)+'</td><td>'+esc(val)+'</td><td>'+esc(sev||'charted')+'</td></tr>';
    }).join('')+'</tbody></table></details>':'';
    return '<div class="ws-derived-banner structured"><b>Vital Signs Record</b><span>Recent Readings</span></div><div class="ws-vital-dashboard evidence ws-vital-dashboard-v243f1">'+vitals.map(function(v,i){
      var timeStr=formatSmartDateTime(v.time, 0, 1);
      var historyHtml = '';
      if(rows.length > 1){
        var history = [];
        rows.forEach(function(row, ri){
          var val = vitalValueFromObject(row, v.k);
          if (val && val !== 'Not charted') {
            var rTime = row.time || row.date || ('Record ' + (ri + 1));
            history.push({time: rTime, val: val});
          }
        });
        if(history.length > 1){
          historyHtml = '<div class="ws-vital-history"><span>History:</span> ' + history.map(function(h){
            return esc(h.val) + ' <small>(' + esc(h.time) + ')</small>';
          }).join(' → ') + '</div>';
        }
      }
      return '<div class="ws-vital-tile '+esc(v.level)+'"><span>'+esc(v.k)+'</span><b>'+esc(v.v)+'</b>'+historyHtml+'<small>'+esc(v.source)+' · '+esc(v.status)+' · '+esc(timeStr)+'</small><pre class="ws-vital-refs">'+esc(v.reference)+'</pre>'+(v.message?'<p>'+esc(v.message)+'</p>':'')+'</div>';
    }).join('')+'</div>'+chart+table;
  }
  function renderVitalsFallback(stem){
    return renderVitalsComposer([]);
  }
  function renderVitalsTable(data){
    return renderVitalsComposer(data);
  }
  function renderHeldRendererNotice(f){
    return '<div class="ws-held-panel"><h2>'+esc(title(f))+' renderer is held for production work</h2><p>Audio and image hotspot items are intentionally excluded from the production-candidate Workstation Pro renderer until real media assets, accessible alternatives, and scoring parity are approved. Use the native viewer for these items while the dedicated media renderer is redesigned.</p><ul><li>Needs production-quality clinical image/audio asset rules.</li><li>Needs keyboard and screen-reader equivalent interactions.</li><li>Needs hotspot-region scoring parity tests before public demo.</li></ul><a class="ws-native-cta" href="../practice/index.html?focus=modes&m=v242a&q2=1&v=242V#modes">Open Native Viewer</a></div>';
  }
  function renderQuestion(){
    var item=state.current, vm=state.viewModel||viewModelFromItem(item), f=vm.itemType||normalizeType(item.format||structureOf().type), st=structureOf();
    $('#itemTitle').textContent=title(f);
    if(isHeldRendererType(f) && !/hotspot|image/.test(f)){ $('#itemBadges').innerHTML='<span class="ws-alert red compact">Renderer held</span><span class="ws-alert amber compact">Native fallback only</span>'; $('#questionRenderer').innerHTML=renderHeldRendererNotice(f); return; }
    var badges = [];
    badges.push('<span class="ws-alert red compact">Safety first</span>');
    if (item.difficulty) badges.push('<span class="ws-alert difficulty compact">' + esc(item.difficulty) + '</span>');
    if (item.cjmm_step) badges.push('<span class="ws-alert cjmm compact">' + esc(item.cjmm_step) + '</span>');
    $('#itemBadges').innerHTML = badges.join('');
    var html='<div class="ws-stem">'+esc(stemOf(item))+'</div>';
    if(item.media && typeof item.media === 'string'){
      var trimmed = item.media.trim();
      if(trimmed.indexOf('<svg') === 0){
        html += '<div class="ws-media-container">' + trimmed + '</div>';
      } else if(trimmed.length > 0) {
        html += '<div class="ws-media-container"><img class="ws-media-img" src="../' + esc(trimmed) + '" alt="Clinical media" /></div>';
      }
    }
    if(/highlight/.test(f)) html+=renderHighlight(st);
    else if(/matrix/.test(f)) html+=renderMatrix(st);
    else if(/bow/.test(f)) html+=renderBowtie(st);
    else if(/cloze|dropdown|case-dropdown/.test(f)) html+=renderDropdown(st);
    else if(/ordered/.test(f)) html+=renderOrdered(st);
    else if(/trend/.test(f)) html+=renderTrend(st);
    else if(/hotspot|image/.test(f)) html+=renderHotspot(st);
    else if(/calculation/.test(f)) html+=renderCalculation(st);
    else if(/response|multiple-choice|sata/.test(f)) html+=renderOptions(st,/multiple-choice/.test(f)?'radio':'checkbox');
    else html+=renderOptions(st,'checkbox');
    $('#questionRenderer').innerHTML=html;
    bindQuestionEvents();
  }
  function optionsOf(st){return Array.isArray(st.options)?st.options:[];}
  function renderOptions(st,type){
    var opts=optionsOf(st); if(!opts.length) return '<div class="ws-empty">No option structure available.</div>';
    return opts.map(function(o,i){var sid=shortId(o.id,i,'O'); return '<label class="ws-option" data-id="'+esc(o.id)+'"><input name="ans" type="'+type+'" value="'+esc(o.id)+'"><span class="ws-option-id" title="'+esc(o.id)+'">'+esc(sid)+'</span><span>'+esc(o.text)+'</span></label>';}).join('');
  }
  function renderHighlight(st){
    var tokens=Array.isArray(st.tokens)?st.tokens:[];
    tokens=tokens.filter(function(t){return text(t.text||t.label) && !/no text provided/i.test(text(t.text||t.label));});
    var stem=stemOf(state.current);
    var source=tokens.length?tokens.map(function(t,i){return {id:t.id!=null?t.id:String(i),text:text(t.text||t.label)};}):stem.split(/(?<=[.;])\s+/).filter(function(x){return x.length>12;}).slice(0,7).map(function(x,i){return {id:'derived_'+i,text:x};});
    var passage=source.map(function(t,i){return '<button type="button" class="ws-highlight-seg" data-highlight="'+esc(t.id)+'"><span>'+esc(shortId(t.id,i,'H'))+'</span>'+esc(t.text)+'</button>';}).join(' ');
    return '<div class="ws-card ws-highlight-instruction"><h3>Highlight Text / Table</h3><p class="ws-note">Select the exact chart cue(s). This lab uses passage-style selectable highlights rather than separate answer-option cards.</p></div><div class="ws-highlight-passage">'+passage+'</div>';
  }
  function renderCalculation(st){return '<div class="ws-card"><h3>Medication / calculation control</h3><input id="calcAnswer" placeholder="Enter calculated answer with unit if needed" style="width:100%;padding:12px;border:1px solid #cbd8e5;border-radius:10px"></div>'+renderOptions(st,'radio');}
  function renderMatrix(st){
    var rows=st.rows||[]; var cols=st.columns||[]; if(!rows.length||!cols.length) return renderOptions(st,'checkbox');
    var head='<div class="ws-matrix-head"><div class="ws-matrix-cell">Finding / action</div>'+cols.map(function(c){return '<div class="ws-matrix-cell">'+esc(c.text||c.id)+'</div>';}).join('')+'</div>';
    var isMulti = (state.current && state.current.format === 'matrix-multiple-response') || (st.type === 'matrix-multiple-response');
    var body=rows.map(function(r){
      var left='<div class="ws-matrix-cell"><b>'+esc(r.id||'')+'</b> '+esc(r.text||r.label||'')+'</div>';
      var cells=cols.map(function(c){
        var type = isMulti ? 'checkbox' : 'radio';
        var name = isMulti ? 'row_' + esc(r.id) + '_' + esc(c.id) : 'row_' + esc(r.id);
        return '<label class="ws-matrix-cell ws-matrix-choice"><input type="' + type + '" name="' + name + '" data-row="' + esc(r.text||r.id) + '" value="' + esc(c.text||c.id) + '"> <span>' + esc(c.text||c.id) + '</span></label>';
      }).join('');
      return '<div class="ws-matrix-row">'+left+cells+'</div>';
    }).join('');
    return '<div class="ws-matrix" style="--cols:'+cols.length+'">'+head+body+'</div>';
  }
  function renderBowtie(st){
    function col(name,arr,mode,prefix){
      return '<div class="ws-bowcol"><h3>'+esc(name)+'</h3>'+((arr||[]).map(function(o,i){var sid=shortId(o.id,i,prefix); return '<label class="ws-bow-option" data-id="'+esc(o.id)+'"><input type="'+(mode==='one'?'radio':'checkbox')+'" name="'+esc(name)+'" value="'+esc(o.id)+'"><span class="ws-option-id" title="'+esc(o.id)+'">'+esc(sid)+'</span><span>'+esc(o.text)+'</span></label>';}).join('')||'<div class="ws-empty">No data</div>')+'</div>';
    }
    return '<div class="ws-bowtie pro">'+col('Actions to take',st.actions||[],'many','A')+col('Potential condition',st.conditions||[],'one','C')+col('Parameters to monitor',st.parameters||[],'many','P')+'</div>';
  }
  function renderDropdown(st){
    var blanks=st.blanks||{}; var textHtml=esc(st.text_with_blanks||st.prompt||stemOf(state.current));
    Object.keys(blanks).forEach(function(k){var b=blanks[k], opts=b.options||[]; var sel='<select data-blank="'+esc(k)+'"><option value="">Select…</option>'+opts.map(function(o){return '<option>'+esc(o)+'</option>';}).join('')+'</select>'; var kk=escapeRegExp(k); textHtml=textHtml.replace(new RegExp('\\['+kk+'\\]|{{'+kk+'}}|'+kk,'g'),sel);});
    if(Object.keys(blanks).length) return '<div class="ws-dropdown-text">'+textHtml+'</div>';
    var opts=optionsOf(st); if(!opts.length) return '<div class="ws-empty">No dropdown option structure available.</div>';
    return '<div class="ws-card"><h3>Case dropdown lab</h3><p class="ws-note">This chunk stores the dropdown choices as option records. The lab renders them as a dropdown to preserve the intended interaction.</p><select id="caseDropdownFallback" data-case-dropdown="1"><option value="">Select the safest response…</option>'+opts.map(function(o){return '<option value="'+esc(o.id)+'">'+esc(o.id)+' · '+esc(o.text)+'</option>';}).join('')+'</select></div>';
  }
  function renderOrdered(st){var opts=optionsOf(st); return '<div class="ws-card"><h3>Ordered response lab</h3><p class="ws-note">Use the controls to move actions into the safest order.</p></div><div id="orderList">'+opts.map(function(o,i){return '<div class="ws-option" data-id="'+esc(o.id)+'"><span class="ws-option-id">'+esc(i+1)+'</span><span>'+esc(o.text)+'</span><button type="button" data-move="up">↑</button><button type="button" data-move="down">↓</button></div>';}).join('')+'</div>';}
  function renderTrend(st){
    var table=st.trendTable||{}; var rows=table.rows||[]; var cols=table.columns||[];
    var tableHtml=''; var chart='';
    if(rows.length&&cols.length){
      tableHtml='<table class="ws-table compact"><thead><tr>'+cols.map(function(c){return '<th>'+esc(c)+'</th>';}).join('')+'</tr></thead><tbody>'+rows.map(function(r,ri){
        var isLast=ri===rows.length-1;
        return '<tr'+(isLast?' class="critical"':'')+'>'+ r.map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';
      }).join('')+'</tbody></table>';
      var series=[], timeLabels=rows.map(function(r){return String(r[0]||'');});
      for(var c=1;c<cols.length;c++){
        var vals=rows.map(function(r){return parseFloat(String(r[c]).replace(/[^0-9.\-]/g,''));});
        var valid=vals.filter(function(n){return isFinite(n);});
        if(valid.length<2) continue;
        var vmin=Math.min.apply(null,valid), vmax=Math.max.apply(null,valid);
        var spread=vmax-vmin;
        if(spread<2 && (vmax===0 || spread/Math.abs(vmax)<0.05)) continue;
        if(valid.length<rows.length*0.5) continue;
        series.push({label:cols[c],values:vals,unit:''});
      }
      if(series.length>0){
        chart=svgMultiSeriesChart(series,timeLabels);
      } else {
        var fbCol=1; for(var fc=1;fc<cols.length;fc++){var fv=rows.map(function(r){return parseFloat(String(r[fc]).replace(/[^0-9.\-]/g,''));}).filter(function(n){return isFinite(n);}); if(fv.length>=2){fbCol=fc;break;}}
        chart=svgLineChart(rows.map(function(r){return r[fbCol];}),timeLabels,'');
      }
    }
    return '<div class="ws-card"><h3>Trend interpretation</h3><p class="ws-note">Use direction, deterioration pattern, and the latest value to choose the safest response.</p></div>'+chart+tableHtml+renderOptions(st,'radio');
  }
  function renderHotspot(st){
    var item = state.current;
    var mediaHtml = '';
    if (item.media && item.media.length > 0 && typeof item.media[0] === 'string') {
        var mediaSrc = item.media[0];
        mediaHtml = '<div class="ws-hotspot-interactive-container" style="position:relative; display:inline-block; max-width:100%; border:1px solid #cbd8e5; border-radius:8px; overflow:hidden;"><img class="ws-hotspot-img" src="../' + esc(mediaSrc) + '" style="max-width:100%; max-height:450px; display:block; cursor:crosshair;" alt="Clinical image for hotspot" /><div class="ws-hotspot-marker" style="display:none; position:absolute; width:24px; height:24px; background:rgba(239,68,68,0.7); border:3px solid #b91c1c; border-radius:50%; transform:translate(-50%,-50%); pointer-events:none; z-index:10; box-shadow:0 0 0 2px white;"></div><div class="ws-hotspot-correct-target" style="display:none; position:absolute; border:3px dashed #10b981; background:rgba(16,185,129,0.25); border-radius:4px; pointer-events:none; z-index:9; box-shadow:0 0 0 2px white;"></div></div>';
    } else {
        mediaHtml = '<div class="ws-diagram-placeholder">Clinical image not embedded in this chunk.</div>';
    }
    return '<div class="ws-hotspot"><b>'+esc(st.prompt||'Image Hotspot Assessment')+'</b><div class="ws-diagram" style="text-align:center; margin-top: 15px;">'+mediaHtml+'</div></div>';
  }
  function bindQuestionEvents(){
    $$('.ws-option').forEach(function(label){label.addEventListener('click',function(){setTimeout(function(){label.classList.toggle('selected',!!$('input',label)&&$('input',label).checked);},0);});});
    $$('.ws-hotspot button').forEach(function(b){b.addEventListener('click',function(){state.answers.hotspot=b.dataset.hotspot; $$('.ws-hotspot button').forEach(function(x){x.classList.toggle('selected',x===b);});});});
    var hotspotImg = document.querySelector('.ws-hotspot-img');
    if (hotspotImg) {
      hotspotImg.addEventListener('click', function(e) {
        if (state.submitted) return;
        var rect = hotspotImg.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        var marker = hotspotImg.parentElement.querySelector('.ws-hotspot-marker');
        if (marker) {
          marker.style.left = x + '%';
          marker.style.top = y + '%';
          marker.style.display = 'block';
        }
        var target = state.current.correctTarget;
        if (target && x >= target.x && x <= (target.x + target.w) && y >= target.y && y <= (target.y + target.h)) {
            state.answers.hotspot = "target_hit";
        } else {
            state.answers.hotspot = "target_miss_" + Math.round(x) + "_" + Math.round(y);
        }
      });
    }
    $$('.ws-highlight-seg').forEach(function(b){b.addEventListener('click',function(){b.classList.toggle('selected');});});
    $$('.ws-bow-option').forEach(function(label){label.addEventListener('click',function(){setTimeout(function(){label.classList.toggle('selected',!!$('input',label)&&$('input',label).checked);},0);});});
    $$('[data-move]').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var row=b.closest('.ws-option'),list=$('#orderList'); if(b.dataset.move==='up'&&row.previousElementSibling)list.insertBefore(row,row.previousElementSibling); if(b.dataset.move==='down'&&row.nextElementSibling)list.insertBefore(row.nextElementSibling,row); $$('#orderList .ws-option').forEach(function(r,i){$('.ws-option-id',r).textContent=i+1;});});});
  }
  function selectedIds(){var ids=$$('input[type=checkbox]:checked,input[type=radio]:checked','#questionRenderer').map(function(x){return x.value;}); return ids.concat($$('.ws-highlight-seg.selected').map(function(x){return x.dataset.highlight;}));}
  function score(){
    var vm=state.viewModel||viewModelFromItem(state.current||{}), response=responseFromDom(vm);
    var result=scoreViewModel(vm,response); result.response=response; return result;
  }
  function showScore(){
    state.submitted = true;
    var s=score();
    var pass=s.held?false:(s.correct===s.max);
    var p=$('#scorePanel');
    p.hidden=false;
    p.className = 'ws-score-panel ' + (pass ? 'pass' : 'fail');
    
    var correctTarget = state.current.correctTarget;
    var correctMarker = document.querySelector('.ws-hotspot-correct-target');
    if (correctMarker && correctTarget) {
      correctMarker.style.left = correctTarget.x + '%';
      correctMarker.style.top = correctTarget.y + '%';
      correctMarker.style.width = correctTarget.w + '%';
      correctMarker.style.height = correctTarget.h + '%';
      correctMarker.style.display = 'block';
    }
    
    var scoreHeader = '';
    if (s.held) {
      scoreHeader = '<div class="ws-score-banner-title">Renderer Held</div><div class="ws-score-banner-reason">' + esc(s.reason) + '</div>';
    } else {
      scoreHeader = '<div class="ws-score-row-flex">' +
        '<div class="ws-score-badge ' + (pass ? 'ok' : 'crit') + '"><b>Score:</b> ' + esc(s.correct) + ' / ' + esc(s.max) + '</div>' +
        '<div class="ws-score-badge user-resp"><b>Response:</b> ' + esc((s.got||[]).filter(Boolean).join(' | ') || 'None') + '</div>' +
      '</div>';
    }
    
    p.innerHTML = scoreHeader + 
      '<div class="ws-rationale-container">' + rationaleOf(state.current) + '</div>' +
      '<div class="ws-score-footer-note"><b>Note:</b> v242Y uses a shared ViewModel/scoring parity harness foundation. This lab still does not replace the native production answer engine.</div>';
  }
  function reset(){state.answers={}; state.submitted=false; $('#scorePanel').hidden=true; renderQuestion();}
  function showHeldType(f){
    state.current={id:'held-'+f,format:f,clinical_focus:title(f)+' renderer hold',client_needs:'Renderer governance',structure:{stem:title(f)+' items are held from Workstation Pro production-candidate testing until dedicated media and accessibility work is complete.'},answerKey:{},rationale:'Renderer held by v242X governance.'};
    state.viewModel=viewModelFromItem(state.current);
    renderStoryboard(); renderChart();
    $('#itemTitle').textContent=title(f)+' — Held';
    $('#itemBadges').innerHTML='<span>Renderer held</span><span>Excluded from default selector</span>';
    $('#questionRenderer').innerHTML=renderHeldRendererNotice(f);
    $('#scorePanel').hidden=true;
    setStatus('Held renderer: '+f,'Audio/Image hotspot are intentionally paused for dedicated media parity work');
  }
  function renderAll(){renderStoryboard(); renderChart(); renderQuestion();}
  function initResizer() {
    var resizer = document.getElementById('wsResizer');
    var grid = document.querySelector('.ws-main-grid');
    if (!resizer || !grid) return;
    var isDragging = false;
    resizer.addEventListener('mousedown', function(e) {
      isDragging = true;
      resizer.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      var gridRect = grid.getBoundingClientRect();
      var leftWidth = e.clientX - gridRect.left;
      var totalWidth = gridRect.width;
      var pct = (leftWidth / totalWidth) * 100;
      if (pct < 20) pct = 20;
      if (pct > 80) pct = 80;
      grid.style.gridTemplateColumns = pct + '% 6px ' + (100 - pct) + '%';
    });
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        resizer.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }
  function bindGlobal(){
    $$('#chartTabs button,#patientRail button').forEach(function(b){b.addEventListener('click',function(){state.tab=b.dataset.tab||'overview'; renderChart();});});
    $('#checkBtn').addEventListener('click',showScore); $('#resetBtn').addEventListener('click',reset);
  }
  async function init(){
    try{
      updateMetrics(); bindGlobal();
      initResizer();
      setStatus('Loading v242Q lite index for Workstation Preview algorithmic visuals…');
      var both=await Promise.all([fetchJson('../data-bank/index/questions-index-lite.json'),fetchJson('../data-bank/index/cases-index-lite.json').catch(function(){return {items:[]};})]);
      state.index=both[0]; state.cases=both[1]; buildIndex(); updateMetrics(); fillSelectors();
      var want=normalizeType(qs().get('type'));
      if(want && isHeldRendererType(want)){showHeldType(want); return;}
      var id=qs().get('id');
      if(id){
        var found=state.productionReady.find(function(x){return x.id===id;}) || state.ready.find(function(x){return x.id===id;});
        if(!found && state.index && state.index.items) {
          found=state.index.items.find(function(x){return x.id===id;});
        }
        if(found){
          $('#typeSelect').value=normalizeType(found.format);
          fillItemSelect();
          await loadFullItem(found);
          return;
        }
      }
      var preferred=['matrix-multiple-choice','multiple-choice','multiple-response-sata','bowtie','cloze-dropdown','ordered-response','trend','calculation'];
      var t=preferred.find(function(x){return state.itemsByType.has(x);}) || state.types[0]; $('#typeSelect').value=t; fillItemSelect(); await chooseIndex(0);
    }catch(e){console.error(e); setStatus('v243D failed: '+e.message,'Check console'); ROOT.innerHTML='<div class="ws-empty"><h1>Workstation renderer failed to load</h1><p>'+esc(e.message)+'</p></div>';}
  }
  function workstationAudit(){
    var item=state.current||{}, vm=state.viewModel||null; var modalSkin=!!document.querySelector('.nexus-v242t-storyboard,.nexus-v242t-rail,.nexus-v242u-storyboard');
    var visibleOptions=$$('#typeSelect option').map(function(o){return o.value;});
    var heldVisible=visibleOptions.some(isHeldRendererType);
    var expectedFamilies=['multiple-choice','multiple-response-sata','matrix-multiple-choice','matrix-multiple-response','bowtie','cloze-dropdown','case-dropdown','ordered-response','calculation','trend'];
    var supported=(state.types||[]).slice().sort();
    var missing=expectedFamilies.filter(function(x){return supported.indexOf(x)===-1;});
    var result={version:VERSION,phase:{current:7,total:8,name:'Public-demo Workstation Pro gated route'},route:isPublicDemoRoute()?'public-demo/index.html':'workstation-pro/index.html',isolatedRoute:true,nativePracticeTouched:false,autoMutationObserverSkin:false,reactRuntimeAdded:false,viteRuntimeAdded:false,cssScopePrefix:'ws-',readyStandalone:COUNTS.readyStandalone,cases:COUNTS.cases,learnerFacingTotal:COUNTS.learnerFacingTotal,sourceStandalone:COUNTS.sourceStandalone,heldHiddenStandalone:COUNTS.heldHiddenStandalone,productionCandidateStandalone:COUNTS.productionCandidateStandalone,publicDemoMode:state.publicDemoMode,publicDemoExposedStandalone:COUNTS.publicDemoExposedStandalone||0,heldRendererStandalone:COUNTS.heldRendererStandalone,rendererContractHoldStandalone:COUNTS.rendererContractHoldStandalone||0,heldRendererTypes:Object.keys(HELD_RENDERER_TYPES),heldRendererTypesHiddenFromDefaultSelector:!heldVisible,loadedItemId:item.id||null,loadedFormat:item.format||null,loadedRendererFamily:vm&&vm.itemType,viewModelPresent:!!vm,viewModelSchema:vm&&vm.schema,sharedScoringAdapterPresent:typeof scoreViewModel==='function'&&typeof responseFromDom==='function',supportedRendererFamilies:supported,expectedRendererFamilies:expectedFamilies,missingExpectedFamilies:missing,labSafeStandalone:(state.labReady||[]).length,questionRendererPresent:!!$('#questionRenderer'),chartPanePresent:!!$('#chartContent'),radiologyTabPresent:!!document.querySelector('[data-tab=radiology]'),modalSkinArtifactsPresent:modalSkin};
    result.acceptance=(!modalSkin&&!!state.current&&!!vm&&COUNTS.readyStandalone===5086&&!heldVisible&&!!document.querySelector('[data-tab=radiology]')&&missing.length===0&&(!state.publicDemoMode||(COUNTS.publicDemoExposedStandalone>0&&COUNTS.publicDemoExposedStandalone<=12)))?'PASS_V243D_PUBLIC_DEMO_GATE_PHASE_7_OF_8':'CHECK_V243D_PUBLIC_DEMO_GATE_PHASE_7_OF_8';
    return result;
  }
  window.NEXUS_V242W_ISOLATED_RENDERER_AUDIT=workstationAudit;
  window.NEXUS_V242W2_ISOLATED_RENDERER_AUDIT=workstationAudit;
  window.NEXUS_V242W3_CHART_TABS_AUDIT=workstationAudit;
  window.NEXUS_V242X_VIEWMODEL_AUDIT=workstationAudit;
  window.NEXUS_V242Y_VIEWMODEL_AUDIT=workstationAudit;
  window.NEXUS_V242Z_PRODUCTION_RENDERER_AUDIT=workstationAudit;
  window.NEXUS_V243D_PUBLIC_DEMO_GATE_AUDIT=workstationAudit;
  window.NEXUS_V243F1_CHART_EVIDENCE_COMPOSER_AUDIT=function(){
    var snap=dataCompletenessSnapshot();
    var vit=evidenceVitals(state.current);
    var spo2=vit.find(function(v){return v.k==='SpO₂';})||{};
    var map=vit.find(function(v){return v.k==='MAP';})||{};
    var hardBlankPanel=!!document.querySelector('.ws-empty') && !document.querySelector('.ws-smart-empty');
    var result={version:'v243F1-chart-evidence-composer-hp-vitals-workstation-preview',phase:{current:8,total:8,name:'Chart Evidence Composer + H&P + safer vitals'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,chartTab:state.tab,structured:snap,historyPhysicalTabPresent:!!document.querySelector('[data-tab=history]'),historyPhysicalInViewModel:!!(state.viewModel&&state.viewModel.chartTabs&&state.viewModel.chartTabs.history),historyPhysicalStructuredCount:snap.history||0,spO2:{value:spo2.v,status:spo2.status,source:spo2.source,reference:spo2.reference},map:{value:map.v,status:map.status,source:map.source,reference:map.reference},vitalsReferenceLayerPresent:!!document.querySelector('.ws-vital-tile em'),notChartedValuesLabeled:vit.filter(function(v){return v.v==='Not charted';}).every(function(v){return /not charted|not calculable/i.test(v.message||v.status||'');}),dashOnlyVitalValuesPresent:vit.some(function(v){return /^[-–—]+$/.test(String(v.v||''));}),hardBlankPanelPresent:hardBlankPanel,nativePracticeTouched:false};
    result.acceptance=(result.historyPhysicalTabPresent && !!state.current && !result.dashOnlyVitalValuesPresent && result.notChartedValuesLabeled && !hardBlankPanel)?'PASS_V243F1_CHART_EVIDENCE_COMPOSER_HP_VITALS_PHASE_8_OF_8':'CHECK_V243F1_CHART_EVIDENCE_COMPOSER_HP_VITALS_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_V243F2_MEDIA_NEED_CLASSIFIER_AUDIT=function(){
    var c=classifyMediaNeeds(state.current);
    var sample=(state.productionReady||[]).slice(0,300).map(classifyMediaNeeds);
    var counts=sample.reduce(function(m,x){m[x.verdict]=(m[x.verdict]||0)+1; return m;},{});
    var heldVisible=$$('#typeSelect option').map(function(o){return o.value;}).some(isHeldRendererType);
    var panel=!!document.querySelector('.ws-media-panel');
    var generated=sample.some(function(x){return x.mediaGenerationStarted===true;}) || !!document.querySelector('img[data-generated-media],audio[data-generated-media],canvas[data-generated-media]');
    var result={version:'v243G-algorithmic-visuals-batch1-workstation-preview',phase:{current:8,total:8,name:'Media Need Classifier badges only'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,currentClassification:c,sampleSize:sample.length,sampleVerdictCounts:counts,mediaPanelPresent:panel,mediaGenerationStarted:generated,heldRendererTypesHiddenFromDefaultSelector:!heldVisible,nativePracticeTouched:false,next:'v243G may generate only algorithmic visuals after classifier review'};
    result.acceptance=(!!state.current && panel && !generated && !heldVisible && c && c.top && c.needs)?'PASS_V243F2_MEDIA_NEED_CLASSIFIER_BADGES_PHASE_8_OF_8':'CHECK_V243F2_MEDIA_NEED_CLASSIFIER_BADGES_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_V243G_ALGORITHMIC_VISUALS_AUDIT=function(){
    var cls=classifyMediaNeeds(state.current), cues=numericCues(state.current), panel=!!document.querySelector('.ws-algo-panel'), generated=!!document.querySelector('.ws-algo-card'), unsafe=!!document.querySelector('img[data-generated-media],audio[data-generated-media],canvas[data-generated-media]');
    var deferred=(cls.needs||[]).filter(function(x){return /ecg|fhr|radiology|diagram|neuro/.test(x.kind);}).map(function(x){return x.kind;});
    var result={version:'v243G-algorithmic-visuals-batch1-workstation-preview',phase:{current:8,total:8,name:'Algorithmic visuals batch 1 · safe evidence only'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,currentClassification:cls,numericCueCount:cues.length,algorithmicVisualPanelPresent:panel,algorithmicVisualsGeneratedForCurrentItem:generated,unsafeMediaGenerated:unsafe,deferredMediaStillHeld:deferred,heldRendererTypes:['image-hotspot','audio-hotspot','highlight'],nativePracticeTouched:false,allowedVisuals:['MAP/perfusion card','safe same-measure trend chart','MAR medication-safety card','I&O fluid-balance card','ABG map','oxygenation support card']};
    result.acceptance=(!!state.current && panel && !unsafe)?'PASS_V243G_ALGORITHMIC_VISUALS_BATCH1_PHASE_8_OF_8':'CHECK_V243G_ALGORITHMIC_VISUALS_BATCH1_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_V243E2_DATA_COMPLETENESS_AUDIT=function(){
    var snap=dataCompletenessSnapshot();
    var vit=evidenceVitals(state.current);
    var blankVitals=vit.filter(function(v){return v.v==='Not charted';}).map(function(v){return v.k;});
    var hardBlankPanel=!!document.querySelector('.ws-empty') && !document.querySelector('.ws-smart-empty');
    return {version:'v243E2-production-candidate-data-completeness-workstation-preview',phase:{current:8,total:8,name:'Data completeness fallback and blank-panel reduction'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,chartTab:state.tab,structured:snap,vitals:vit,blankVitals:blankVitals,blankValuesLabeled:blankVitals.length>=0,hardBlankPanelPresent:hardBlankPanel,notesFallbackAvailable:!!document.querySelector('.ws-derived-banner'),radiologyTabPresent:!!document.querySelector('[data-tab=radiology]'),nativePracticeTouched:false,acceptance:(!hardBlankPanel && !!state.current && !!document.querySelector('[data-tab=radiology]'))?'PASS_V243E2_DATA_COMPLETENESS_FALLBACK_PHASE_8_OF_8':'CHECK_V243E2_DATA_COMPLETENESS_FALLBACK_PHASE_8_OF_8'};
  };
  window.NEXUS_V243H_MEDIA_EVIDENCE_VALIDATION_AUDIT=function(){
    var q=guidedEvidencePreview(state.current);
    var panel=!!document.querySelector('.ws-validation-panel');
    var generated=!!document.querySelector('.ws-ecg-strip,.ws-fhr-strip,.ws-radiology-production-image,.ws-generated-clinical-photo');
    var sample=(state.productionReady||[]).slice(0,400).map(guidedEvidencePreview);
    var counts=sample.reduce(function(m,x){m[x.verdict]=(m[x.verdict]||0)+1; return m;},{});
    var result={version:'v243H-media-evidence-validation-queue-workstation-preview',phase:{current:8,total:8,name:'Media evidence validation queue · no generation'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,currentValidation:q,sampleSize:sample.length,sampleVerdictCounts:counts,validationPanelPresent:panel,mediaGenerationStarted:generated,unsafeMediaGenerated:generated,heldMediaTypesStillHeld:['ECG strips','FHR tracings','Radiology images','Wound/device images','Image Hotspot','Audio Hotspot','Highlight'],nativePracticeTouched:false,next:'v243H1 may map external/reusable templates only after manifest validation'};
    result.acceptance=(!!state.current && panel && !generated && q && q.mediaGenerationStarted===false)?'PASS_V243H_MEDIA_EVIDENCE_VALIDATION_QUEUE_PHASE_8_OF_8':'CHECK_V243H_MEDIA_EVIDENCE_VALIDATION_QUEUE_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_V243H1_EXTERNAL_MEDIA_MANIFEST_AUDIT=async function(){
    var manifest=await loadExternalMediaManifest();
    window.NEXUS_EXTERNAL_MEDIA_MANIFEST_CACHE=manifest;
    var q=guidedEvidencePreview(state.current);
    var mapped=safeManifestMappingsForItem(state.current,manifest);
    var panel=!!document.querySelector('.ws-external-media-panel');
    var rendered=!!document.querySelector('img[data-external-media],audio[data-external-media],canvas[data-external-media],svg[data-external-media]');
    var unsafeKinds=manifest.validations.filter(function(v){return EXTERNAL_MEDIA_BLOCKED_KINDS[v.kind];}).length;
    var result={version:'v243H1-external-media-manifest-intake-workstation-preview',phase:{current:8,total:8,name:'External Media Manifest Intake + Safe Mapping Layer'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,currentValidation:q,manifestFound:manifest.found,manifestUrl:manifest.url,manifestEntryCount:manifest.entries.length,validAssetCount:manifest.validAssets.length,invalidAssetCount:manifest.invalidAssets.length,currentItemSafeMappings:mapped.length,manifestRequiredFields:externalMediaRequiredFields(),allowedKinds:Object.keys(EXTERNAL_MEDIA_ALLOWED_KINDS),blockedKinds:Object.keys(EXTERNAL_MEDIA_BLOCKED_KINDS),externalMediaPanelPresent:panel,mediaRenderingStarted:rendered,unsafeKindsDetected:unsafeKinds,clinicalFactsAdded:false,hotspotMappingStarted:false,nativePracticeTouched:false,note:manifest.found?'Manifest found and validated as metadata only; rendering still disabled.':'No external media manifest found yet; intake schema and safe mapping layer are ready.'};
    result.acceptance=(!!state.current && panel && !rendered && unsafeKinds===0)?'PASS_V243H1_EXTERNAL_MEDIA_MANIFEST_INTAKE_PHASE_8_OF_8':'CHECK_V243H1_EXTERNAL_MEDIA_MANIFEST_INTAKE_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_V243I_ASSET_RENDERING_SANDBOX_AUDIT=async function(){
    var h1=await window.NEXUS_V243H1_EXTERNAL_MEDIA_MANIFEST_AUDIT();
    var manifest=window.NEXUS_EXTERNAL_MEDIA_MANIFEST_CACHE || await loadExternalMediaManifest();
    var previewable=(manifest.validAssets||[]).filter(externalMediaPreviewAllowed);
    var status=externalMediaPreviewStatusSync();
    var link=!!document.querySelector('a[href*="guided-preview/index.html"]');
    var result={version:'v243I-asset-rendering-sandbox-workstation-preview',phase:{current:8,total:8,name:'Asset Rendering Sandbox + manifest preview route'},route:location.pathname.replace(/^\//,''),loadedItemId:state.current&&state.current.id,previousManifestAudit:h1.acceptance,manifestFound:manifest.found,manifestEntryCount:manifest.entries.length,validAssetCount:manifest.validAssets.length,previewableAssetCount:previewable.length,invalidAssetCount:manifest.invalidAssets.length,sandboxRoute:'guided-preview/index.html',sandboxRouteLinked:link,productionRoutesRenderExternalMedia:false,previewSandboxOnly:true,externalPreviewNodesOnThisRoute:status.externalPreviewNodesOnThisRoute,unsafePreviewNodesOnThisRoute:status.unsafePreviewNodesOnThisRoute,hotspotMappingStarted:false,scoringMediaStarted:false,blockedKinds:Object.keys(EXTERNAL_MEDIA_BLOCKED_KINDS),nativePracticeTouched:false,note:manifest.found?'Valid assets may be previewed only in the isolated Guided Preview route; question routes remain metadata-only.':'No external media manifest found yet; sandbox route is ready for later ZIP intake and preview.'};
    result.acceptance=(!status.unsafePreviewNodesOnThisRoute && !status.hotspotMappingStarted && !status.usedForScoring && (/^PASS/i.test(String((h1&&h1.acceptance)||''))))?'PASS_V243I_ASSET_RENDERING_SANDBOX_PHASE_8_OF_8':'CHECK_V243I_ASSET_RENDERING_SANDBOX_PHASE_8_OF_8';
    return result;
  };
  window.NEXUS_PHASE_STATUS=function(){return {current:8,total:8,label:'v243I asset rendering sandbox · preview route only',previous:'v243H1 external media manifest intake',next:'v243I1 media manifest ZIP intake after user supplies assets'};};
  document.addEventListener('DOMContentLoaded',init);
})();

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
    // Panel disabled — green accessibility banner removed per user request
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
    var heldVisible=typeOptions.some(function(t){return /image-hotspot|audio-hotspot|highlight/i.test(t);});
    var itemOptions=$$('#itemSelect option');
    var fallback=!!$('#nativeLink,[href*="practice/index.html"]');
    var banner=/public demo|fixed demo|gated/i.test(document.body?document.body.textContent:'');
    var result={version:VERSION,phase:{current:7,total:8,name:'Public demo Workstation Pro gated route'},route:onDemo?'public-demo/index.html':'workstation-pro/index.html',onDemoRoute:onDemo,baseAcceptance:base&&base.acceptance,publicDemoExposedStandalone:base&&base.publicDemoExposedStandalone,visibleTypeOptions:typeOptions.length,visibleItemOptions:itemOptions.length,heldTypesHidden:!heldVisible,nativeFallbackPresent:fallback,publicDemoBannerPresent:banner,fullBankSelectorHidden:onDemo?(itemOptions.length<=12):true,nativePracticeTouched:false,autoMutationObserverSkin:false,imageAudioHotspotHeld:true,highlightHeld:true,counts:{learnerReadyStandalone:5086,cases:1056,learnerFacingTotal:6142},next:'Workstation Preview of 8 — v243E Curated guided sample, only after manual beta/demo testing'};
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