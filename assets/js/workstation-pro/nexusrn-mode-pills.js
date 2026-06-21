/* nexusrn-mode-pills.js — RN Learning Mode Pills & State Integration System
   Manages active learning drills, filters questions, runs timers, and shows performance results. */
(function(){
  'use strict';
  var $=function(s,c){return(c||document).querySelector(s);};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

  /* ── Mode configuration ── */
      var MODES=[
    {key:'practice',label:'Practice',full:'Nexus Practice Studio',
     desc:'Open-ended practice across all item types. Build breadth and confidence with the full question bank.',
     tooltipCopy:'Main practice hub. Build clinical judgment with NGN-style items, feedback, and focused repetition.',
     presets:[
       {name:'All Types', what:'Comprehensive practice.', how:'Mixed standalone & cases.', why:'Full spectrum exposure.'},
       {name:'NGN Only', what:'Next Gen questions only.', how:'Filters for NGN formats.', why:'Familiarize with new formats.'},
       {name:'Standalone', what:'Standard questions.', how:'Multiple choice/select all.', why:'Core knowledge check.'},
       {name:'Timed Set', what:'Speed practice.', how:'20 questions with timer.', why:'Pacing improvement.'}
     ],
     settings:{questions:{label:'Questions',opts:[10,20,30,50]},difficulty:{label:'Difficulty',opts:['Mixed','Easy','Moderate','Hard','Very Hard']},feedback:{label:'Feedback',opts:['Immediate','End of set']}},
     count:1680,time:'20 min'},
    {key:'readiness',label:'Readiness',full:'Nexus Readiness Check',
     desc:'Comprehensive readiness assessment simulating NCLEX-style testing. Gauge your exam preparedness.',
     tooltipCopy:'Find your current strengths and weak spots. Use readiness signals to decide what to study next.',
     presets:[
       {name:'Full Readiness', what:'Complete simulation.', how:'100 varied questions.', why:'Highest predictive accuracy.'},
       {name:'Quick Check', what:'Short simulation.', how:'30 varied questions.', why:'Fast benchmark.'},
       {name:'Benchmark Check', what:'Standardized set.', how:'Fixed difficulty questions.', why:'Compare against peers.'}
     ],
     settings:{questions:{label:'Questions',opts:[30,50,75,100]},difficulty:{label:'Difficulty',opts:['Mixed','Hard']},feedback:{label:'Feedback',opts:['End only','After each']}},
     count:1680,time:'45 min'},
    {key:'adaptive',label:'Adaptive',full:'Nexus Adaptive Exam',
     desc:'AI-driven adaptive exam engine that adjusts difficulty in real-time based on your performance pattern.',
     tooltipCopy:'Exam-style adaptive practice. Train stamina, prioritization, and decision-making under realistic pressure.',
     presets:[
       {name:'NCLEX Simulation', what:'Variable length CAT.', how:'Stops when confident (75-145).', why:'The most authentic experience.'},
       {name:'Adaptive Benchmark', what:'Fixed length CAT.', how:'100 questions, adaptive difficulty.', why:'Measures max ability.'}
     ],
     settings:{questions:{label:'Questions',opts:[50,75,100,145]},feedback:{label:'Feedback',opts:['End only','After each']}},
     count:1680,time:'60 min'},
    {key:'judgment',label:'Judgment',full:'Nexus Judgment Lab',
     desc:'Train RN clinical judgment using NGN-style cases and CJMM steps. Master the Clinical Judgment Measurement Model.',
     tooltipCopy:'Deep clinical reasoning lab. Break down cues, priorities, risks, and next-best nursing actions.',
     presets:[
       {name:'Full Case', what:'Complete scenario.', how:'All 6 CJMM steps.', why:'End-to-end clinical reasoning.'},
       {name:'Cue Finder', what:'Focus on early steps.', how:'Recognize/Analyze cues only.', why:'Improve data gathering.'},
       {name:'Outcome Judge', what:'Focus on late steps.', how:'Evaluate outcomes only.', why:'Improve evaluation skills.'}
     ],
     settings:{cases:{label:'Cases',opts:[1,2,3,5]},difficulty:{label:'Difficulty',opts:['Mixed','Hard','Very Hard']},feedback:{label:'Feedback',opts:['End of case','After each']}},
     count:448,time:'25 min'},
    {key:'pulse',label:'Pulse',full:'Nexus Daily Pulse',
     desc:'Quick daily RN knowledge check — targeted questions on priority nursing topics to keep your clinical knowledge sharp.',
     tooltipCopy:'Quick daily knowledge check. Keep high-yield NCLEX topics fresh with short targeted practice.',
     presets:[
       {name:'Morning Round', what:'Quick jumpstart.', how:'5 random questions.', why:'Engage your brain early.'},
       {name:'Weak Areas', what:'Targets lowest subjects.', how:'10 history-based questions.', why:'Directly improves weaknesses.'},
       {name:'Random Mix', what:'Varied question set.', how:'Random selection.', why:'Simulates unexpected scenarios.'},
       {name:'NCLEX Focus', what:'NCLEX distribution.', how:'Matches client needs.', why:'Balanced preparation.'}
     ],
     settings:{questions:{label:'Questions',opts:[5,10,15,20]},difficulty:{label:'Difficulty',opts:['Mixed','Easy','Moderate','Hard']},feedback:{label:'Feedback',opts:['Immediate','End of set']},topic:{label:'Topic',opts:['Weak areas','All']}},
     count:1200,time:'8 min'},
    {key:'recovery',label:'Recovery',full:'Nexus Recovery Path',
     desc:'Revisit previously missed questions with spaced repetition. Strengthen weak areas through adaptive re-exposure.',
     tooltipCopy:'Personal repair route. Revisit missed concepts and rebuild weak areas step by step.',
     presets:[
       {name:'Most Missed', what:'Focus on repeated errors.', how:'Selects lowest accuracy items.', why:'Highest impact review.'},
       {name:'Recent Errors', what:'Review latest mistakes.', how:'Questions missed recently.', why:'Immediate reinforcement.'},
       {name:'Spaced Review', what:'Optimal timing review.', how:'Algorithm-timed re-exposure.', why:'Long-term retention.'}
     ],
     settings:{questions:{label:'Questions',opts:[5,10,15,20]},difficulty:{label:'Difficulty',opts:['Original','Mixed']},feedback:{label:'Feedback',opts:['Immediate','End of set']}},
     count:340,time:'12 min'},
    {key:'rapid',label:'Rapid',full:'Nexus Rapid Response',
     desc:'Time-pressured drills that simulate real clinical urgency. Build speed and accuracy under pressure.',
     tooltipCopy:'Urgent-priority practice. Sharpen safety, deterioration, rescue, and first-action decisions.',
     presets:[
       {name:'30s Drill', what:'Extreme speed test.', how:'30 seconds per item.', why:'Forces rapid decision making.'},
       {name:'60s Drill', what:'Standard speed test.', how:'60 seconds per item.', why:'Balances speed and thought.'},
       {name:'90s Drill', what:'Complex speed test.', how:'90 seconds per item.', why:'For harder case items.'}
     ],
     settings:{questions:{label:'Questions',opts:[10,15,20,30]},timeLimit:{label:'Time Limit',opts:['30s each','60s each','90s each']},difficulty:{label:'Difficulty',opts:['Mixed','Hard']}},
     count:890,time:'15 min'},
    {key:'pharm',label:'Pharm',full:'Nexus PharmLab',
     desc:'Dedicated pharmacology drills — drug classifications, interactions, dosage calculations, and nursing implications.',
     tooltipCopy:'Medication reasoning lab. Practice safety, adverse effects, contraindications, and nursing monitoring.',
     presets:[
       {name:'High-Alert Meds', what:'Dangerous drugs.', how:'Focus on narrow therapeutic index.', why:'Crucial safety knowledge.'},
       {name:'Dosage Calc', what:'Math and calculations.', how:'Calculation items only.', why:'Prevents medication errors.'},
       {name:'Interactions', what:'Drug combinations.', how:'Focus on contraindications.', why:'Improves patient safety.'}
     ],
     settings:{questions:{label:'Questions',opts:[10,15,20,30]},difficulty:{label:'Difficulty',opts:['Mixed','Easy','Moderate','Hard']},feedback:{label:'Feedback',opts:['Immediate','End of set']}},
     count:320,time:'18 min'}
  ];

  var activeMode=MODES[0]; /* default: Practice */
  var activeSettings={};

  /* ── Session State ── */
  window.NEXUS_SESSION = {
    isActive: false,
    mode: null,
    settings: {},
    items: [],
    currentIndex: 0,
    scores: [],
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    rapidInterval: null,
    rapidRemaining: 0,
    abilityHistory: [0],
    isReviewMode: false
  };

  /* ── Helpers ── */
  function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;return e;}

  function saveMissedQuestion(id) {
    if (!id || String(id).startsWith('held-')) return;
    try {
      var missed = JSON.parse(localStorage.getItem('NEXUS_MISSED_QUESTIONS_V2') || '[]');
      if (!missed.includes(id)) {
        missed.push(id);
        localStorage.setItem('NEXUS_MISSED_QUESTIONS_V2', JSON.stringify(missed));
      }
    } catch(e){}
  }

  function removeMissedQuestion(id) {
    if (!id) return;
    try {
      var missed = JSON.parse(localStorage.getItem('NEXUS_MISSED_QUESTIONS_V2') || '[]');
      var idx = missed.indexOf(id);
      if (idx > -1) {
        missed.splice(idx, 1);
        localStorage.setItem('NEXUS_MISSED_QUESTIONS_V2', JSON.stringify(missed));
      }
    } catch(e){}
  }

  /* ── Render pills ── */
  function isPublicDemoMode(){
    try {
      return /\/(public-demo|public-demo)\//i.test(location.pathname||'') || 
             new URLSearchParams(location.search||'').get('demo')==='1' || 
             new URLSearchParams(location.search||'').get('publicDemo')==='1' || 
             (location.hash||'').indexOf('public-demo') > -1;
    } catch(e) {
      return false;
    }
  }

  function showLockedModeModal(mode) {
    var overlay = document.getElementById('ws-locked-mode-modal');
    if (overlay) overlay.remove();

    overlay = el('div', 'ws-modal-overlay');
    overlay.id = 'ws-locked-mode-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var modal = el('div', 'ws-modal-content');
    modal.className = 'ws-locked-mode-modal-content';
    modal.style.cssText = 'background: linear-gradient(135deg, #0b1329, #020617); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 20px; padding: 30px; max-width: 450px; text-align: center; color: #f8fafc; box-shadow: 0 20px 50px rgba(0,0,0,0.5);';

    modal.innerHTML = 
      '<div style="font-size: 40px; margin-bottom: 15px;">🔒</div>' +
      '<h3 style="font-size: 22px; font-weight: 800; margin-bottom: 12px; color:#ffffff;">' + esc(mode.full) + ' Locked</h3>' +
      '<p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 24px;">' +
        '<strong>' + esc(mode.full) + '</strong> is part of the full app. This public preview includes curated guided samples only.' +
      '</p>' +
      '<div style="display:flex; flex-direction:column; gap:10px;">' +
        '<button class="ws-modal-btn ws-modal-apply" id="ws-locked-close" style="width:100%; border-radius:8px; padding:12px; background:linear-gradient(135deg,#14b8a6,#22d3ee); color:#020617; border:none; font-weight:700; cursor:pointer;">Dismiss Preview Lock</button>' +
      '</div>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('ws-locked-close').addEventListener('click', function() {
      overlay.remove();
    });
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });
    
    var keyHandler = function(ev) {
      if (ev.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', keyHandler);
      }
    };
    document.addEventListener('keydown', keyHandler);
  }

  /* ── Render pills ── */
  function renderPills(){
    var nav=$('.ws-mode-pills');
    if(!nav)return;
    nav.innerHTML='';
    var vw=window.innerWidth;
    var showMore=(vw<1200);
    var visibleModes=showMore?MODES.slice(0,5):MODES;
    var hiddenModes=showMore?MODES.slice(5):[];
    var isDemo = isPublicDemoMode();

    visibleModes.forEach(function(m){
      var btnWrap = el('div','ws-mode-pill-wrap');
      // Create tooltip
      var tooltip = el('div', 'ws-tooltip-card');
      tooltip.id = 'ws-tooltip-' + m.key;
      tooltip.setAttribute('role', 'tooltip');
      tooltip.innerHTML = '<div class="ws-tt-title">' + esc(m.full) + '</div>' +
                          '<div class="ws-tt-desc">' + esc(m.tooltipCopy) + '</div>';
      
      var btnLabel = (isDemo ? '🔒 ' : '') + esc(m.full);
      var btn=el('button','ws-mode-pill'+(isDemo ? ' ws-mode-pill-preview' : '')+(m.key===activeMode.key?' active':''),'<span class="ws-pill-text">' + btnLabel + '</span><div class="ws-pill-anim-lines"></div>');
      btn.setAttribute('aria-describedby', 'ws-tooltip-' + m.key);
      btn.type='button';
      btn.dataset.mode=m.key;
      btn.setAttribute('aria-pressed',m.key===activeMode.key?'true':'false');
      
      // Hover and Focus events for tooltips
      var showTooltip = function() {
        $$('.ws-tooltip-card').forEach(function(t) {
          t.classList.remove('ws-tooltip-visible');
          t.classList.remove('ws-tooltip-dismissed');
        });
        tooltip.classList.add('ws-tooltip-visible');
        tooltip.classList.remove('ws-tooltip-dismissed');
      };
      
      var hideTooltip = function() {
        tooltip.classList.remove('ws-tooltip-visible');
        tooltip.classList.remove('ws-tooltip-dismissed');
      };
      
      btn.addEventListener('mouseenter', showTooltip);
      btn.addEventListener('focus', showTooltip);
      btn.addEventListener('mouseleave', hideTooltip);
      btn.addEventListener('blur', hideTooltip);
      
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          tooltip.classList.add('ws-tooltip-dismissed');
          tooltip.classList.remove('ws-tooltip-visible');
        }
      });
      
      btn.addEventListener('click',function(){
        if(!window.NEXUS_SESSION.isActive) {
          if (isDemo) {
            showLockedModeModal(m);
          } else {
            openModal(m);
          }
        }
      });
      
      btnWrap.appendChild(btn);
      btnWrap.appendChild(tooltip);
      nav.appendChild(btnWrap);
    });

    if(hiddenModes.length){
      var moreWrap=el('div','ws-mode-more-wrap');
      var moreBtn=el('button','ws-mode-pill ws-mode-more','More ▾');
      moreBtn.type='button';
      var dropdown=el('div','ws-mode-more-dropdown');
      dropdown.style.display='none';
      hiddenModes.forEach(function(m){
        var itemLabel = (isDemo ? '🔒 ' : '') + esc(m.label);
        var item=el('button','ws-mode-more-item'+(m.key===activeMode.key?' active':''),itemLabel);
        item.type='button';
        item.addEventListener('click',function(){
          dropdown.style.display='none'; 
          if(isDemo) {
            showLockedModeModal(m);
          } else {
            if(!window.NEXUS_SESSION.isActive) openModal(m);
          }
        });
        dropdown.appendChild(item);
      });
      moreBtn.addEventListener('click',function(e){
        if(window.NEXUS_SESSION.isActive) return;
        e.stopPropagation();
        dropdown.style.display=dropdown.style.display==='none'?'flex':'none';
      });
      document.addEventListener('click',function(){dropdown.style.display='none';});
      moreWrap.appendChild(moreBtn);
      moreWrap.appendChild(dropdown);
      nav.appendChild(moreWrap);
    }
  }

  /* ── Update summary ── */
  function updateSummary(){
    var txt=$('#wsModeSummaryText');
    if(!txt)return;
    if (window.NEXUS_SESSION.isActive) {
      var currentNum = window.NEXUS_SESSION.currentIndex + 1;
      var totalNum = window.NEXUS_SESSION.items.length;
      txt.textContent = window.NEXUS_SESSION.mode.label + ' Drill · Q ' + currentNum + ' of ' + totalNum;
      return;
    }
    var parts=[activeMode.label];
    if(activeSettings.cases)parts.push(activeSettings.cases+' cases');
    else if(activeSettings.questions)parts.push(activeSettings.questions+' Qs');
    if(activeSettings.difficulty)parts.push(activeSettings.difficulty);
    parts.push(activeMode.time);
    txt.textContent=parts.join(' · ');
  }

  /* ── Modal ── */
  function openModal(mode){
    closeModal();
    var overlay=el('div','ws-mode-overlay');
    overlay.id='wsModeOverlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label',mode.full+' settings');

    var modal=el('div','ws-mode-modal');

    /* Header */
    var header=el('div','ws-modal-header');
    header.innerHTML='<h2>'+esc(mode.full)+'</h2><button type="button" class="ws-modal-close" aria-label="Close">✕</button>';
    modal.appendChild(header);

    /* Description */
    modal.appendChild(el('p','ws-modal-desc',esc(mode.desc)));

    /* Presets */
    var presetSection=el('div','ws-modal-section');
    presetSection.appendChild(el('label','ws-modal-label','Quick Presets'));
    var presetRow=el('div','ws-modal-presets');
    var selectedPreset=null;
    mode.presets.forEach(function(p,i){
      var wrap=el('div','ws-preset-wrap');
      var tooltip=el('div','ws-tooltip-card right-align');
      tooltip.innerHTML = '<div class="ws-tt-title">' + esc(p.name) + '</div>' +
                          '<div class="ws-tt-row"><span class="ws-tt-label">What?</span><span class="ws-tt-val">' + esc(p.what) + '</span></div>' +
                          '<div class="ws-tt-row"><span class="ws-tt-label">How?</span><span class="ws-tt-val">' + esc(p.how) + '</span></div>' +
                          '<div class="ws-tt-row"><span class="ws-tt-label">Why?</span><span class="ws-tt-val">' + esc(p.why) + '</span></div>';

      var btn=el('button','ws-preset-pill'+(i===0?' active':''),esc(p.name));
      btn.type='button';
      btn.addEventListener('click',function(){
        presetRow.querySelectorAll('.ws-preset-pill').forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        selectedPreset=p.name;
        
        // Adjust settings selects dynamically based on preset
        if (mode.key === 'pulse') {
          if (p.name === 'Morning Round') { settingSelects.questions.value = 5; }
          else if (p.name === 'Weak Areas') { settingSelects.questions.value = 10; }
          else if (p.name === 'NCLEX Focus') { settingSelects.questions.value = 15; }
        } else if (mode.key === 'practice') {
          if (p.name === 'Timed Set') { settingSelects.questions.value = 20; settingSelects.feedback.value = 'Immediate'; }
        } else if (mode.key === 'judgment') {
          if (p.name === 'Full Case') { settingSelects.cases.value = 1; }
        }
      });
      if(i===0)selectedPreset=p.name;
      wrap.appendChild(btn);
      wrap.appendChild(tooltip);
      presetRow.appendChild(wrap);
    });
    presetSection.appendChild(presetRow);
    modal.appendChild(presetSection);

    /* Settings */
    var settingsSection=el('div','ws-modal-section');
    settingsSection.appendChild(el('label','ws-modal-label','Settings'));
    var settingsGrid=el('div','ws-modal-settings');
    var settingSelects={};
    var keys=Object.keys(mode.settings);
    keys.forEach(function(k){
      var cfg=mode.settings[k];
      var wrap=el('div','ws-modal-setting');
      wrap.appendChild(el('span','ws-modal-setting-label',esc(cfg.label)));
      var sel=document.createElement('select');
      sel.className='ws-modal-select';
      cfg.opts.forEach(function(o){
        var opt=document.createElement('option');
        opt.value=o;opt.textContent=o;
        sel.appendChild(opt);
      });
      settingSelects[k]=sel;
      wrap.appendChild(sel);
      settingsGrid.appendChild(wrap);
    });
    settingsSection.appendChild(settingsGrid);
    modal.appendChild(settingsSection);

    /* Footer info */
    var info=el('div','ws-modal-info','<span>'+mode.count+' eligible RN items</span><span>Estimated '+esc(mode.time)+'</span>');
    modal.appendChild(info);

    /* Action buttons */
    var actions=el('div','ws-modal-actions');
    var cancelBtn=el('button','ws-modal-btn ws-modal-cancel','Cancel');
    cancelBtn.type='button';
    var applyBtn=el('button','ws-modal-btn ws-modal-apply','Apply Settings');
    applyBtn.type='button';
    var startBtn=el('button','ws-modal-btn ws-modal-start','Start');
    startBtn.type='button';

    cancelBtn.addEventListener('click',closeModal);
    var closeBtn = header.querySelector('.ws-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    function applyChanges(){
      activeMode=mode;
      activeSettings={};
      Object.keys(settingSelects).forEach(function(k){
        activeSettings[k]=settingSelects[k].value;
      });
      activeSettings._preset=selectedPreset;
      window.NEXUS_ACTIVE_MODE={mode:mode.key,full:mode.full,settings:activeSettings};
      renderPills();
      updateSummary();
      closeModal();
    }
    
    applyBtn.addEventListener('click',applyChanges);
    
    startBtn.addEventListener('click',function(){
      applyChanges();
      window.NEXUS_SESSION_MANAGER.startSession(activeMode, activeSettings);
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(applyBtn);
    actions.appendChild(startBtn);
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    /* Close on backdrop click */
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal();});
    /* Close on ESC */
    document.addEventListener('keydown',escHandler);
    /* Focus trap — focus the close button */
    setTimeout(function(){var cb=$('.ws-modal-close');if(cb)cb.focus();},50);
  }

  function escHandler(e){if(e.key==='Escape')closeModal();}

  function closeModal(){
    var ov=$('#wsModeOverlay');
    if(ov)ov.remove();
    document.removeEventListener('keydown',escHandler);
  }

  /* ── Session Lifecycle Manager ── */
  window.NEXUS_SESSION_MANAGER = {
    startSession: function(mode, settings) {
      var ws = window.NEXUS_WORKSTATION_PRO;
      if (!ws) {
        alert("Workstation Pro rendering engine not fully initialized.");
        return;
      }

      // 1. Build session questions queue
      var items = buildSessionItems(mode.key, settings);
      if (!items || items.length === 0) {
        alert("No eligible questions found in the bank for the chosen settings.");
        return;
      }

      // 2. Initialize Session State
      window.NEXUS_SESSION.isActive = true;
      window.NEXUS_SESSION.mode = mode;
      window.NEXUS_SESSION.settings = settings;
      window.NEXUS_SESSION.items = items;
      window.NEXUS_SESSION.currentIndex = 0;
      window.NEXUS_SESSION.scores = [];
      window.NEXUS_SESSION.startTime = Date.now();
      window.NEXUS_SESSION.elapsedTime = 0;
      window.NEXUS_SESSION.abilityHistory = [0];
      window.NEXUS_SESSION.isReviewMode = false;

      // 3. Lock Lower Control selectors
      var deck = $('.ws-control-deck');
      if (deck) {
        deck.classList.add('session-active');
        $$('select, button', deck).forEach(function(el) { el.disabled = true; });
      }

      // 4. Update top bar HUD classes
      var topbar = $('.ws-topbar');
      if (topbar) {
        topbar.classList.add('session-active');
        
        // Inject progress line
        var prog = $('.ws-topbar-progress');
        if (!prog) {
          prog = el('div', 'ws-topbar-progress');
          topbar.appendChild(prog);
        }
        prog.style.width = '0%';

        // Toggle Start -> End button
        var startBtn = $('#wsModeStart');
        if (startBtn) {
          startBtn.textContent = 'End Session';
          startBtn.classList.remove('ws-mode-start');
          startBtn.classList.add('ws-mode-end');
        }
        var editBtn = $('#wsModeEdit');
        if (editBtn) editBtn.style.display = 'none';
      }

      // 5. Start elapsed stopwatch timer
      if (window.NEXUS_SESSION.timerInterval) clearInterval(window.NEXUS_SESSION.timerInterval);
      window.NEXUS_SESSION.timerInterval = setInterval(function() {
        window.NEXUS_SESSION.elapsedTime++;
        updateSessionTimerUI();
      }, 1000);

      // 6. Reset recovery fallback flag
      window.NEXUS_RECOVERY_EMPTY_FALLBACK = false;

      // 7. Load first item
      ws.chooseIndex(0).then(function() {
        if (window.NEXUS_RECOVERY_EMPTY_FALLBACK) {
          alert("Spaced repetition queue is empty! Populate it by answering questions incorrectly. Starting fallback drill using high-difficulty items.");
          window.NEXUS_RECOVERY_EMPTY_FALLBACK = false;
        }
        updateSessionHUD();
        setupDrillActionBar();
        startRapidResponseCountdown();
      });
    },

    endSession: function(confirmExit) {
      if (confirmExit) {
        if (!confirm("Are you sure you want to end this drill session? Your progress will not be saved.")) {
          return;
        }
      }

      // 1. Clear intervals
      if (window.NEXUS_SESSION.timerInterval) clearInterval(window.NEXUS_SESSION.timerInterval);
      if (window.NEXUS_SESSION.rapidInterval) clearInterval(window.NEXUS_SESSION.rapidInterval);
      window.NEXUS_SESSION.isActive = false;

      // 2. Remove HUD elements & Restore Topbar
      var topbar = $('.ws-topbar');
      if (topbar) {
        topbar.classList.remove('session-active');
        var prog = $('.ws-topbar-progress');
        if (prog) prog.remove();

        var startBtn = $('#wsModeStart');
        if (startBtn) {
          startBtn.textContent = 'Start';
          startBtn.classList.add('ws-mode-start');
          startBtn.classList.remove('ws-mode-end');
        }
        var editBtn = $('#wsModeEdit');
        if (editBtn) editBtn.style.display = '';
      }

      // Remove timers/review HUD from workspace
      var timerNode = $('#wsRapidTimer');
      if (timerNode) timerNode.remove();
      var reviewHud = $('#wsReviewHud');
      if (reviewHud) reviewHud.remove();

      // 3. Unlock selectors
      var deck = $('.ws-control-deck');
      if (deck) {
        deck.classList.remove('session-active');
        $$('select, button', deck).forEach(function(el) { el.disabled = false; });
      }

      // 4. Restore actions buttons in workstation
      var sessionNext = $('#wsSessionNextBtn');
      if (sessionNext) sessionNext.remove();
      var checkBtn = $('#checkBtn');
      if (checkBtn) {
        checkBtn.textContent = 'Check / Score in Lab';
        checkBtn.disabled = false;
        checkBtn.style.display = '';
      }

      // 5. Restore default filter selectors and load free-play question
      var ws = window.NEXUS_WORKSTATION_PRO;
      if (ws) {
        ws.fillSelectors();
        ws.chooseIndex(0);
      }
      renderPills();
      updateSummary();
    },

    nextQuestion: function() {
      var ws = window.NEXUS_WORKSTATION_PRO;
      if (!ws) return;

      if (window.NEXUS_SESSION.rapidInterval) clearInterval(window.NEXUS_SESSION.rapidInterval);

      var nextIdx = window.NEXUS_SESSION.currentIndex + 1;
      
      // Check if it's the last question
      if (nextIdx >= window.NEXUS_SESSION.items.length) {
        window.NEXUS_SESSION_MANAGER.renderSessionSummary();
        return;
      }

      window.NEXUS_SESSION.currentIndex = nextIdx;
      ws.chooseIndex(nextIdx).then(function() {
        updateSessionHUD();
        setupDrillActionBar();
        startRapidResponseCountdown();
      });
    },

    onQuestionScored: function(scoreResult) {
      if (!window.NEXUS_SESSION || !window.NEXUS_SESSION.isActive) {
        // Just run spaced repetition update in free-play and return early
        var item = window.NEXUS_WORKSTATION_PRO && window.NEXUS_WORKSTATION_PRO.state && window.NEXUS_WORKSTATION_PRO.state.current;
        if (item && scoreResult && !scoreResult.held) {
          if (scoreResult.correct === scoreResult.max) {
            removeMissedQuestion(item.id);
          } else {
            saveMissedQuestion(item.id);
          }
        }
        return;
      }

      // Record score for current index
      var item = window.NEXUS_WORKSTATION_PRO.state.current;
      window.NEXUS_SESSION.scores[window.NEXUS_SESSION.currentIndex] = {
        item: item,
        score: scoreResult
      };

      // Spaced repetition hooks
      if (scoreResult && !scoreResult.held) {
        if (scoreResult.correct === scoreResult.max) {
          removeMissedQuestion(item.id);
        } else {
          saveMissedQuestion(item.id);
        }
      }

      // Adaptive Exam logic: select next question based on current performance
      if (window.NEXUS_SESSION.mode && window.NEXUS_SESSION.mode.key === 'adaptive' && !window.NEXUS_SESSION.isReviewMode) {
        var isCorrect = scoreResult && (scoreResult.correct === scoreResult.max);
        adjustAdaptiveExamTrack(isCorrect);
      }

      // Handle Immediate vs Silent Feedback workflows
      var feedbackType = (window.NEXUS_SESSION.settings && window.NEXUS_SESSION.settings.feedback) || 'Immediate';
      
      if (feedbackType === 'Immediate' || feedbackType === 'After each' || feedbackType === 'End of case') {
        // Immediate Feedback: Display scorePanel and update next buttons
        var checkBtn = $('#checkBtn');
        if (checkBtn) {
          checkBtn.disabled = true;
          checkBtn.style.display = 'none';
        }
        
        var nextBtn = $('#wsSessionNextBtn');
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.classList.remove('secondary');
          nextBtn.classList.add('primary');
        }
      } else {
        // Silent Feedback (End of set): Proceed immediately to next question
        setTimeout(function() {
          window.NEXUS_SESSION_MANAGER.nextQuestion();
        }, 150);
      }
    },

    renderSessionSummary: function() {
      // Clear timers
      if (window.NEXUS_SESSION.timerInterval) clearInterval(window.NEXUS_SESSION.timerInterval);
      if (window.NEXUS_SESSION.rapidInterval) clearInterval(window.NEXUS_SESSION.rapidInterval);

      var scores = window.NEXUS_SESSION.scores;
      var total = window.NEXUS_SESSION.items.length;
      
      // Ensure all items are scored (unanswered ones count as zero)
      for (var i = 0; i < total; i++) {
        if (!scores[i]) {
          scores[i] = {
            item: window.NEXUS_SESSION.items[i],
            score: { correct: 0, max: 1, got: [], held: false }
          };
        }
      }

      var correctCount = scores.filter(function(s) {
        return s.score && s.score.correct === s.score.max && !s.score.held;
      }).length;
      
      var pct = Math.round((correctCount / total) * 100) || 0;
      var minutes = Math.floor(window.NEXUS_SESSION.elapsedTime / 60);
      var seconds = window.NEXUS_SESSION.elapsedTime % 60;
      var timeStr = String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');

      // Create summary overlay
      var overlay = el('div', 'ws-mode-overlay');
      overlay.id = 'wsSummaryOverlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      var modal = el('div', 'ws-mode-modal ws-summary-modal');
      
      // Header
      modal.appendChild(el('div', 'ws-modal-header', '<h2>Drill Session Complete</h2>'));
      
      // Statistics dashboard
      var stats = el('div', 'ws-summary-stats');
      stats.innerHTML = 
        '<div class="ws-summary-stat">' +
          '<span class="ws-summary-stat-val ' + (pct >= 75 ? 'good' : (pct >= 60 ? 'warn' : 'crit')) + '">' + pct + '%</span>' +
          '<span class="ws-summary-stat-label">Accuracy Score</span>' +
        '</div>' +
        '<div class="ws-summary-stat">' +
          '<span class="ws-summary-stat-val">' + correctCount + ' / ' + total + '</span>' +
          '<span class="ws-summary-stat-label">Questions Correct</span>' +
        '</div>' +
        '<div class="ws-summary-stat">' +
          '<span class="ws-summary-stat-val">' + timeStr + '</span>' +
          '<span class="ws-summary-stat-label">Time Elapsed</span>' +
        '</div>';
      modal.appendChild(stats);

      // NCLEX prediction or Adaptive graph
      if (window.NEXUS_SESSION.mode.key === 'readiness') {
        var readinessText = 'Low Probability of Passing';
        var readinessClass = 'crit';
        if (pct >= 75) { readinessText = 'High Probability of Passing'; readinessClass = 'good'; }
        else if (pct >= 60) { readinessText = 'Borderline Probability of Passing'; readinessClass = 'warn'; }
        
        var readinessBox = el('div', 'ws-readiness-prediction ' + readinessClass);
        readinessBox.innerHTML = '<h4>NCLEX Readiness Prediction</h4><b>' + readinessText + '</b><p>Readiness prediction is calculated based on cumulative performance and format-weighted difficulty profiles.</p>';
        modal.appendChild(readinessBox);
      } else if (window.NEXUS_SESSION.mode.key === 'adaptive') {
        var graphSvg = svgAdaptiveHistoryChart(window.NEXUS_SESSION.abilityHistory);
        var graphBox = el('div', 'ws-adaptive-graph-box');
        graphBox.innerHTML = '<h4>Dynamic Ability Estimator (Theta Tracking)</h4>' + graphSvg;
        modal.appendChild(graphBox);
      }

      // CJMM Cognitive breakdown
      var cjmmStats = calculateCJMMBreakdown(scores);
      var cjmmBox = el('div', 'ws-modal-section');
      cjmmBox.appendChild(el('label', 'ws-modal-label', 'Performance by Clinical Judgment Step'));
      var cjmmGrid = el('div', 'ws-cjmm-breakdown-grid');
      cjmmStats.forEach(function(step) {
        var stepPct = Math.round((step.correct / step.total) * 100) || 0;
        var barColor = stepPct >= 75 ? '#10b981' : (stepPct >= 50 ? '#f59e0b' : '#ef4444');
        cjmmGrid.innerHTML += 
          '<div class="ws-cjmm-breakdown-row">' +
            '<span class="ws-cjmm-step-name">' + esc(step.name) + '</span>' +
            '<div class="ws-cjmm-progress-bar"><div class="ws-cjmm-progress-fill" style="width: ' + stepPct + '%; background:' + barColor + '"></div></div>' +
            '<span class="ws-cjmm-step-ratio">' + step.correct + '/' + step.total + '</span>' +
          '</div>';
      });
      cjmmBox.appendChild(cjmmGrid);
      modal.appendChild(cjmmBox);

      // Detailed question table
      var tableSection = el('div', 'ws-modal-section');
      tableSection.appendChild(el('label', 'ws-modal-label', 'Question Review List'));
      var tableWrap = el('div', 'ws-summary-table-wrap');
      
      var table = el('table', 'ws-table compact');
      var tbody = '<thead><tr><th>#</th><th>Clinical Focus</th><th>Format</th><th>Status</th><th>Review</th></tr></thead><tbody>';
      scores.forEach(function(s, idx) {
        var isCorrect = s.score && s.score.correct === s.score.max && !s.score.held;
        var focus = s.item.clinical_focus || s.item.prompt || 'Clinical Drill Item';
        if (focus.length > 60) focus = focus.slice(0, 57) + '...';
        var format = s.item.format || (s.item.structure && s.item.structure.type) || 'Standalone';
        tbody += 
          '<tr>' +
            '<td>' + (idx + 1) + '</td>' +
            '<td>' + esc(focus) + '</td>' +
            '<td>' + esc(format) + '</td>' +
            '<td><span class="ws-mini-badge ' + (isCorrect ? 'good' : 'crit') + '">' + (isCorrect ? 'Correct' : 'Incorrect') + '</span></td>' +
            '<td><button type="button" class="ws-summary-review-btn" data-review-idx="' + idx + '">Review</button></td>' +
          '</tr>';
      });
      tbody += '</tbody>';
      table.innerHTML = tbody;
      tableWrap.appendChild(table);
      tableSection.appendChild(tableWrap);
      modal.appendChild(tableSection);

      // Actions footer
      var actions = el('div', 'ws-modal-actions');
      var exitBtn = el('button', 'ws-modal-btn ws-modal-cancel', 'Exit Drill');
      exitBtn.type = 'button';
      var retakeBtn = el('button', 'ws-modal-btn ws-modal-start', 'Start New Drill');
      retakeBtn.type = 'button';

      exitBtn.addEventListener('click', function() {
        overlay.remove();
        window.NEXUS_SESSION_MANAGER.endSession(false);
      });
      retakeBtn.addEventListener('click', function() {
        overlay.remove();
        window.NEXUS_SESSION_MANAGER.endSession(false);
        setTimeout(function() {
          openModal(window.NEXUS_SESSION.mode || MODES[0]);
        }, 100);
      });

      actions.appendChild(exitBtn);
      actions.appendChild(retakeBtn);
      modal.appendChild(actions);

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // Handle Review item click
      $$('.ws-summary-review-btn', modal).forEach(function(btn) {
        btn.addEventListener('click', function() {
          var idx = parseInt(btn.dataset.reviewIdx, 10);
          overlay.remove();
          enterReviewMode(idx);
        });
      });
    }
  };

  /* ── HUD and Timer Updates ── */
  function updateSessionTimerUI() {
    var tracker = $('#wsModeSummaryText');
    if (!tracker || !window.NEXUS_SESSION.isActive) return;
    
    var currentNum = window.NEXUS_SESSION.currentIndex + 1;
    var totalNum = window.NEXUS_SESSION.items.length;
    var minutes = Math.floor(window.NEXUS_SESSION.elapsedTime / 60);
    var seconds = window.NEXUS_SESSION.elapsedTime % 60;
    var timerStr = String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');

    tracker.textContent = window.NEXUS_SESSION.mode.label + ' · Q ' + currentNum + ' of ' + totalNum + ' · ' + timerStr;
  }

  function updateSessionHUD() {
    updateSessionTimerUI();
    
    // Update progress bar width
    var prog = $('.ws-topbar-progress');
    if (prog) {
      var pct = (window.NEXUS_SESSION.currentIndex) / window.NEXUS_SESSION.items.length * 100;
      prog.style.width = pct + '%';
    }
  }

  /* ── Action Bar Setup inside Session ── */
  function setupDrillActionBar() {
    var ws = window.NEXUS_WORKSTATION_PRO;
    if (!ws) return;

    var actionbar = $('.ws-actionbar');
    if (!actionbar) return;

    // Check if next button exists, if not inject it
    var nextBtn = $('#wsSessionNextBtn');
    if (!nextBtn) {
      nextBtn = el('button');
      nextBtn.type = 'button';
      nextBtn.id = 'wsSessionNextBtn';
      nextBtn.className = 'secondary';
      nextBtn.disabled = true;
      
      var resetBtn = $('#resetBtn');
      if (resetBtn) resetBtn.insertAdjacentElement('afterend', nextBtn);
      else actionbar.appendChild(nextBtn);

      nextBtn.addEventListener('click', function() {
        window.NEXUS_SESSION_MANAGER.nextQuestion();
      });
    }

    var checkBtn = $('#checkBtn');
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.style.display = '';
    }

    var isLast = (window.NEXUS_SESSION.currentIndex >= window.NEXUS_SESSION.items.length - 1);
    
    var feedbackType = window.NEXUS_SESSION.settings.feedback || 'Immediate';
    if (feedbackType === 'Immediate' || feedbackType === 'After each' || feedbackType === 'End of case') {
      // Immediate mode
      if (checkBtn) checkBtn.textContent = 'Check / Score in Lab';
      nextBtn.textContent = isLast ? 'Finish Session' : 'Next Question →';
      nextBtn.style.display = '';
      nextBtn.disabled = true;
      nextBtn.classList.add('secondary');
      nextBtn.classList.remove('primary');
    } else {
      // Silent mode
      if (checkBtn) checkBtn.textContent = isLast ? 'Submit & Finish Session' : 'Submit Answer';
      nextBtn.style.display = 'none';
    }

    // Hide native links during sessions to keep clean focus
    var nativeLink = $('#nativeLink');
    if (nativeLink) nativeLink.style.display = 'none';
  }

  /* ── Rapid Response Timer Drill ── */
  function startRapidResponseCountdown() {
    if (window.NEXUS_SESSION.mode.key !== 'rapid' || window.NEXUS_SESSION.isReviewMode) return;

    var timerNode = $('#wsRapidTimer');
    if (timerNode) timerNode.remove();

    var limitStr = window.NEXUS_SESSION.settings.timeLimit || '30s each';
    var duration = parseInt(limitStr, 10) || 30;
    
    window.NEXUS_SESSION.rapidRemaining = duration;

    // Create rapid timer panel above stem
    var renderer = $('#questionRenderer');
    if (renderer) {
      timerNode = el('div');
      timerNode.id = 'wsRapidTimer';
      timerNode.className = 'ws-rapid-timer';
      timerNode.innerHTML = 'Time Remaining: <span id="wsTimerCount">' + duration + '</span>s';
      renderer.parentNode.insertBefore(timerNode, renderer);
    }

    if (window.NEXUS_SESSION.rapidInterval) clearInterval(window.NEXUS_SESSION.rapidInterval);
    window.NEXUS_SESSION.rapidInterval = setInterval(function() {
      window.NEXUS_SESSION.rapidRemaining--;
      var cnt = $('#wsTimerCount');
      if (cnt) {
        cnt.textContent = window.NEXUS_SESSION.rapidRemaining;
        if (window.NEXUS_SESSION.rapidRemaining <= 5) {
          cnt.parentNode.classList.add('critical');
        }
      }

      if (window.NEXUS_SESSION.rapidRemaining <= 0) {
        clearInterval(window.NEXUS_SESSION.rapidInterval);
        // Timeout! Auto-submit
        var ws = window.NEXUS_WORKSTATION_PRO;
        if (ws) {
          ws.showScore();
        }
      }
    }, 1000);
  }

  /* ── Adaptive Exam difficulty shifting logic ── */
  function adjustAdaptiveExamTrack(isCorrect) {
    var ws = window.NEXUS_WORKSTATION_PRO;
    if (!ws) return;

    var currentAbility = window.NEXUS_SESSION.abilityHistory[window.NEXUS_SESSION.abilityHistory.length - 1];
    
    if (isCorrect) {
      currentAbility = Math.min(3, currentAbility + 0.6);
    } else {
      currentAbility = Math.max(-3, currentAbility - 0.6);
    }
    window.NEXUS_SESSION.abilityHistory.push(parseFloat(currentAbility.toFixed(2)));

    // Calculate difficulty tier based on running ability
    var targetDiff = 'Moderate';
    if (currentAbility > 1.2) targetDiff = 'Very Hard';
    else if (currentAbility > 0.4) targetDiff = 'Hard';
    else if (currentAbility < -1.0) targetDiff = 'Easy';
    else if (currentAbility < -0.2) targetDiff = 'Moderate';

    // Retrieve a fresh adaptive item from global pool
    var pool = ws.state.productionReady || ws.state.labReady || ws.state.ready || [];
    
    // Filter out items already in the session queue
    var usedIds = window.NEXUS_SESSION.items.map(function(it) { return it.id; });
    var candidates = pool.filter(function(it) {
      return !usedIds.includes(it.id) && it.difficulty === targetDiff;
    });

    if (candidates.length === 0) {
      // Fallback: any difficulty close by
      candidates = pool.filter(function(it) {
        return !usedIds.includes(it.id);
      });
    }

    if (candidates.length > 0) {
      // Pick one randomly
      var pick = candidates[Math.floor(Math.random() * candidates.length)];
      
      // Append to the active session items queue!
      window.NEXUS_SESSION.items.push(pick);
    }
  }

  /* ── Dynamic Charts SVG Builders ── */
  function svgAdaptiveHistoryChart(history) {
    var w=500, h=160, pad=30;
    var plotW = w-pad*2, plotH = h-pad*2;
    var n = history.length;
    var points = history.map(function(val, i) {
      var x = pad + plotW * (i / (n-1 || 1));
      // Ability ranges -3 to +3
      var y = pad + plotH * (1 - (val + 3) / 6);
      return {x:x, y:y, val:val, idx:i};
    });

    var pathD = points.map(function(p,i){return (i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1);}).join(' ');
    
    var dots = points.map(function(p) {
      return '<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="4.5" fill="#0f766e" stroke="#fff" stroke-width="1.5"><title>Question '+p.idx+' Ability: '+p.val+'</title></circle>';
    }).join('');

    return '<svg viewBox="0 0 '+w+' '+h+'" class="ws-adaptive-svg">' +
      '<line x1="'+pad+'" y1="'+(pad+plotH/2)+'" x2="'+(w-pad)+'" y2="'+(pad+plotH/2)+'" stroke="#cbd5e1" stroke-dasharray="3,2" />' + // Passing line
      '<text x="'+(w-pad-5)+'" y="'+(pad+plotH/2 - 6)+'" text-anchor="end" fill="#64748b" font-size="8" font-weight="900">PASSING THRESHOLD</text>' +
      '<path d="'+pathD+'" fill="none" stroke="#0f766e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />' +
      dots +
      '<text x="'+pad+'" y="'+(h-8)+'" font-size="9" fill="#94a3b8" font-weight="bold">Start</text>' +
      '<text x="'+(w-pad)+'" y="'+(h-8)+'" text-anchor="end" font-size="9" fill="#94a3b8" font-weight="bold">Question '+n+'</text>' +
    '</svg>';
  }

  function calculateCJMMBreakdown(scores) {
    var cjmmKeys = ['Recognize Cues', 'Analyze Cues', 'Prioritize Hypotheses', 'Generate Solutions', 'Take Action', 'Evaluate Outcomes'];
    var counts = cjmmKeys.map(function(name) {
      return { name: name, correct: 0, total: 0 };
    });

    scores.forEach(function(s) {
      var step = s.item.cjmm_step || 'Recognize Cues';
      var record = counts.find(function(c) { return c.name.toLowerCase() === step.toLowerCase(); });
      if (!record) {
        // Fallback for custom or unrecognized
        record = counts[0];
      }
      record.total++;
      if (s.score && s.score.correct === s.score.max && !s.score.held) {
        record.correct++;
      }
    });

    // Remove empty categories from summary chart to save space
    return counts.filter(function(c) { return c.total > 0; });
  }

  function buildSessionItems(modeKey, settings) {
    var ws = window.NEXUS_WORKSTATION_PRO;
    if (!ws) return [];
    
    var count = 10;
    if (settings.questions) count = parseInt(settings.questions, 10);
    else if (settings.cases) count = parseInt(settings.cases, 10);
    
    var pool = [];
    var isCaseMode = (modeKey === 'judgment');
    
    if (isCaseMode) {
      var cases = (ws.state.cases && ws.state.cases.items) || [];
      var unfolding6q = (ws.state.unfolding6q && ws.state.unfolding6q.cases) || [];
      pool = cases.map(function(c){ c._isCase = true; c.chunk = c.chunk || 'data-bank/index/cases-index-lite.json'; return c; }).concat(
        unfolding6q.map(function(c){ c._isCase = true; c.chunk = 'NexusRN_UNFOLDING_6Q_MASTER_ALL_CASES.json'; return c; })
      );
    } else {
      pool = ws.state.productionReady || ws.state.labReady || ws.state.ready || [];
    }

    // Filter by difficulty if set
    var diff = settings.difficulty || 'Mixed';
    if (diff !== 'Mixed' && diff !== 'Adaptive' && diff !== 'Progressive' && diff !== 'Original') {
      pool = pool.filter(function(it) { return it.difficulty === diff; });
    }

    // Filter by mode-specific constraints
    if (modeKey === 'pulse') {
      var priorityKeywords = ['sepsis', 'stroke', 'heart failure', 'pneumonia', 'copd', 'cardiac', 'diabetic', 'insulin', 'burn', 'shock', 'triage', 'emergency', 'respiratory', 'infusion', 'heparin', 'potassium'];
      var priorityPool = pool.filter(function(it) {
        var text = ((it.clinical_focus || '') + ' ' + (it.prompt || '')).toLowerCase();
        return priorityKeywords.some(function(kw) { return text.includes(kw); });
      });
      if (priorityPool.length >= count) {
        pool = priorityPool;
      }
    } else if (modeKey === 'recovery') {
      var missedIds = [];
      try {
        missedIds = JSON.parse(localStorage.getItem('NEXUS_MISSED_QUESTIONS_V2') || '[]');
      } catch(e) {}
      if (missedIds.length > 0) {
        pool = pool.filter(function(it) { return missedIds.includes(it.id); });
      } else {
        pool = pool.filter(function(it) { return it.difficulty === 'Hard' || it.difficulty === 'Very Hard'; });
        window.NEXUS_RECOVERY_EMPTY_FALLBACK = true;
      }
    } else if (modeKey === 'pharm') {
      var pharmKeywords = ['insulin','heparin','warfarin','digoxin','lithium','opioid','morphine','hydromorphone','fentanyl','blood transfusion','vancomycin','gentamicin','magnesium sulfate','oxytocin','pitocin','tpn','chemotherapy','medication','drug','pharm','dose','unit','infusion','mg','mcg','dosage','calculations'];
      pool = pool.filter(function(it) {
        var text = ((it.clinical_focus || '') + ' ' + (it.prompt || '')).toLowerCase();
        var isCalc = ['calculation','new-calculation','calculation-cal'].includes(it.format ? it.format.toLowerCase() : '');
        return isCalc || pharmKeywords.some(function(kw) { return text.includes(kw); });
      });
    } else if (modeKey === 'practice') {
      if (settings._preset === 'NGN Only') {
        var ngnFormats = ['bowtie','cloze-dropdown','highlight','matrix-multiple-choice','matrix-multiple-response','matrix-multiple-response-mmr'];
        pool = pool.filter(function(it) { return ngnFormats.includes(it.format ? it.format.toLowerCase() : ''); });
      } else if (settings._preset === 'Standalone') {
        pool = pool.filter(function(it) { return !it._isCase; });
      }
    }

    // Shuffle pool
    pool = pool.slice().sort(function() { return 0.5 - Math.random(); });
    
    // Slice to count (Adaptive exam starts with 1 item, appends dynamically)
    if (modeKey === 'adaptive') {
      var modCandidates = pool.filter(function(it) { return it.difficulty === 'Moderate'; });
      var firstItem = modCandidates.length > 0 ? modCandidates[0] : pool[0];
      pool = [firstItem];
    } else if (pool.length > count) {
      pool = pool.slice(0, count);
    }
    
    return pool;
  }

  /* ── Interactive Review Mode HUD ── */
  function enterReviewMode(idx) {
    window.NEXUS_SESSION.isReviewMode = true;
    window.NEXUS_SESSION.currentIndex = idx;
    
    var ws = window.NEXUS_WORKSTATION_PRO;
    if (!ws) return;

    ws.chooseIndex(idx).then(function() {
      // Auto-trigger scoring to show correct markings and rationale
      var savedResponse = (window.NEXUS_SESSION.scores[idx] && window.NEXUS_SESSION.scores[idx].score) ? window.NEXUS_SESSION.scores[idx].score.response : null;
      ws.showScore();
      
      // Inject review navigation banner
      var reviewHud = $('#wsReviewHud');
      if (!reviewHud) {
        reviewHud = el('div', 'ws-review-hud');
        reviewHud.id = 'wsReviewHud';
        $('.ws-clinical-stage').insertBefore(reviewHud, $('#storyboard'));
      }
      
      var total = window.NEXUS_SESSION.items.length;
      reviewHud.innerHTML = 
        '<span>Reviewing Question ' + (idx + 1) + ' of ' + total + '</span>' +
        '<div class="ws-review-actions">' +
          '<button type="button" class="ws-review-nav" id="wsReviewPrev" ' + (idx <= 0 ? 'disabled' : '') + '>← Previous</button>' +
          '<button type="button" class="ws-review-nav" id="wsReviewNext" ' + (idx >= total - 1 ? 'disabled' : '') + '>Next →</button>' +
          '<button type="button" class="ws-review-nav summary-btn" id="wsReviewBack">Back to Summary</button>' +
        '</div>';

      $('#wsReviewPrev').addEventListener('click', function() { enterReviewMode(idx - 1); });
      $('#wsReviewNext').addEventListener('click', function() { enterReviewMode(idx + 1); });
      $('#wsReviewBack').addEventListener('click', function() {
        reviewHud.remove();
        window.NEXUS_SESSION_MANAGER.renderSessionSummary();
      });

      // Update Topbar
      updateSessionHUD();

      // Clear countdown timers if any
      var timerNode = $('#wsRapidTimer');
      if (timerNode) timerNode.remove();

      // Configure Action bar buttons during review
      var checkBtn = $('#checkBtn');
      if (checkBtn) checkBtn.style.display = 'none';
      var resetBtn = $('#resetBtn');
      if (resetBtn) resetBtn.style.display = 'none';
      var nextBtn = $('#wsSessionNextBtn');
      if (nextBtn) nextBtn.style.display = 'none';
    });
  }

  /* ── Init ── */
  function init(){
    renderPills();
    updateSummary();
    window.addEventListener('resize', function(){
      var pills=$('.ws-mode-pills');
      if(pills) renderPills();
    });

    /* Edit button opens active mode modal */
    var editBtn=$('#wsModeEdit');
    if(editBtn) editBtn.addEventListener('click',function(){openModal(activeMode);});
    
    /* Start/End button click handler */
    var startBtn=$('#wsModeStart');
    if(startBtn) {
      startBtn.addEventListener('click',function(){
        if (window.NEXUS_SESSION.isActive) {
          window.NEXUS_SESSION_MANAGER.endSession(true);
        } else {
          openModal(activeMode);
        }
      });
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
})();
