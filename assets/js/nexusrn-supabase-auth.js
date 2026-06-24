(function(){
  'use strict';
  var CONFIG = {
    url: 'https://yzlrekjjvenxzpenyily.supabase.co',
    publishableKey: 'sb_publishable_Adrh6-0rsw_OSOfNhN9dgg_qzf7ZSCx',
    productionHost: 'nexusrn.healthqualityleader.com',
    authCallbackPath: '/auth-callback.html',
    dollarTestHours: 48
  };
  var TEST_ACCESS_KEY = 'nexusrn_beta_test_access';
  var client = null;

  function isLocalHost(){
    return /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(window.location.hostname || '');
  }
  function isProductionHost(){
    return (window.location.hostname || '').toLowerCase() === CONFIG.productionHost;
  }
  function authRedirectUrl(){
    return window.location.origin + CONFIG.authCallbackPath;
  }
  function statusText(error){
    if(!error) return '';
    return error.message || String(error);
  }
  function safeJsonParse(v){ try { return JSON.parse(v || 'null'); } catch(e){ return null; } }
  function now(){ return Date.now(); }
  function formatDate(ms){ try { return new Date(ms).toLocaleString(); } catch(e){ return String(ms); } }
  function setText(el, text){ if(el) el.textContent = text || ''; }
  function show(el, yes){ if(el) el.style.display = yes ? '' : 'none'; }

  function initClient(){
    if(client) return client;
    if(!CONFIG.url || !CONFIG.publishableKey) throw new Error('Supabase configuration is missing.');
    if(!window.supabase || !window.supabase.createClient) throw new Error('Supabase SDK is not loaded.');
    client = window.supabase.createClient(CONFIG.url, CONFIG.publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    });
    return client;
  }

  async function getSession(){
    var sb = initClient();
    var res = await sb.auth.getSession();
    if(res.error) throw res.error;
    return res.data.session || null;
  }
  async function getUser(){
    var sb = initClient();
    var res = await sb.auth.getUser();
    if(res.error) throw res.error;
    return res.data.user || null;
  }
  async function signUp(email, password, fullName){
    var sb = initClient();
    return sb.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: authRedirectUrl(),
        data: { full_name: fullName || '' }
      }
    });
  }
  async function signIn(email, password){
    var sb = initClient();
    return sb.auth.signInWithPassword({ email: email, password: password });
  }
  async function signOut(){
    var sb = initClient();
    return sb.auth.signOut();
  }
  async function resetPassword(email){
    var sb = initClient();
    return sb.auth.resetPasswordForEmail(email, { redirectTo: authRedirectUrl() });
  }
  function readTestAccess(){
    return safeJsonParse(window.localStorage.getItem(TEST_ACCESS_KEY));
  }
  function clearTestAccess(){
    window.localStorage.removeItem(TEST_ACCESS_KEY);
  }
  function activeTestAccessForSession(session){
    var s = readTestAccess();
    if(!s || !s.expiresAt || now() >= Number(s.expiresAt)) return null;
    if(!session || !session.user) return null;
    if(s.userId && s.userId !== session.user.id) return null;
    if(s.email && session.user.email && s.email.toLowerCase() !== session.user.email.toLowerCase()) return null;
    return s;
  }
  async function activateLocalDollarTestAccess(){
    if(!isLocalHost()) throw new Error('The $1 beta-access activation is allowed only on localhost.');
    var session = await getSession();
    if(!session || !session.user) throw new Error('Sign in before activating local test access.');
    var expiresAt = now() + CONFIG.dollarTestHours * 60 * 60 * 1000;
    var entitlement = {
      version: 'fixed12-supabase-local-dollar-test',
      source: 'stripe_1_access_test_manual_confirmation',
      userId: session.user.id,
      email: session.user.email || '',
      createdAt: now(),
      expiresAt: expiresAt,
      hours: CONFIG.dollarTestHours,
      host: window.location.hostname
    };
    window.localStorage.setItem(TEST_ACCESS_KEY, JSON.stringify(entitlement));
    return entitlement;
  }
  async function requireSignedIn(options){
    options = options || {};
    try {
      var session = await getSession();
      if(session && session.user) return session;
    } catch(e) {}
    var ret = options.returnTo || (window.location.pathname + window.location.search + window.location.hash);
    window.location.href = 'auth-sign-in.html?returnTo=' + encodeURIComponent(ret);
    return null;
  }
  function parseQuery(){ return new URLSearchParams(window.location.search || ''); }
  function routeWithReturn(route){
    return route + '?returnTo=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
  }

  window.NEXUSRN_SUPABASE = {
    config: Object.assign({}, CONFIG, { publishableKey: CONFIG.publishableKey.slice(0,18) + '…' }),
    initClient: initClient,
    getSession: getSession,
    getUser: getUser,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    resetPassword: resetPassword,
    readTestAccess: readTestAccess,
    activeTestAccessForSession: activeTestAccessForSession,
    activateLocalDollarTestAccess: activateLocalDollarTestAccess,
    clearTestAccess: clearTestAccess,
    isLocalHost: isLocalHost,
    isProductionHost: isProductionHost,
    authRedirectUrl: authRedirectUrl,
    statusText: statusText,
    formatDate: formatDate,
    parseQuery: parseQuery,
    routeWithReturn: routeWithReturn,
    testAccessKey: TEST_ACCESS_KEY
  };
})();
