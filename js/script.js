// Scallop landing — vanilla JS
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// mobile nav
const burger = $('#burger');
const nav = $('#nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('nav--open');
  burger.setAttribute('aria-expanded','false');
}));

// reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => io.observe(el));

// showcase tabs
const tabData = {
  lend: {
    title: 'Supply to earn. Utilization sets the rate.',
    desc: 'Lenders receive sCoins that accrue value. When utilization rises, APY rises — transparent curves, no hidden levers. Withdraw anytime if liquidity allows.',
    list: ['Live APYs — e.g. USDsui 7.01% at 84.85% utilization in screenshot','scaSUI as liquid staked SUI, usable as collateral','Rewards separated from base yield'],
    linkText: 'Open lending market →',
    browser: 'Lending Pools'
  },
  collateral: {
    title: 'Post collateral to unlock borrowing.',
    desc: 'Deposits into Collateral Pools carry a weight (50–85%). The protocol aggregates everything into one Risk Level — keep it below 100%.',
    list: ['scaSUI 85%, USDsui 85%, XAU 50%, haSUI 75%','Total Deposits shown per asset; your deposit is separate','Deposit & Withdraw are distinct from Supply'],
    linkText: 'Open collateral pools →',
    browser: 'Collateral Pools'
  },
  stake: {
    title: 'Liquid-stake SUI → scaSUI.',
    desc: 'Stake via Scallop’s validator, keep liquidity, and use the receipt as collateral. Instant unstake design — your SUI never sleeps.',
    list: ['scaSUI Price ≈ 1.0056 SUI','scaSUI APR 1.361% • 224K SUI staked (as in app)','Use scaSUI directly in lending & collateral'],
    linkText: 'Open liquid staking →',
    browser: 'Liquid-Stake SUI'
  },
  vesca: {
    title: 'Lock SCA → veSCA. Boost and govern.',
    desc: 'veSCA is the locked form of SCA. It boosts earnings, grants voting rights, and reduces circulating supply — aligning long-term incentives.',
    list: ['44.34M veSCA • 55.89M SCA locked','Average lock 3.17 years • 22% of supply locked','Boost, loyalty and referral layers'],
    linkText: 'Explore veSCA →',
    browser: 'veSCA'
  }
};
const tabs = $$('.tab');
const panels = $$('.browser__panel');
const titleEl = $('#showcaseTitle');
const descEl = $('#showcaseDesc');
const listEl = $('#showcaseList');
const linkEl = $('#showcaseLink');
const browserTitle = $('#browserTitle');

function activateTab(key){
  tabs.forEach(t => {
    const on = t.dataset.tab === key;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
  const d = tabData[key];
  if(d){
    titleEl.textContent = d.title;
    descEl.textContent = d.desc;
    listEl.innerHTML = d.list.map(x=>`<li>${x}</li>`).join('');
    linkEl.textContent = d.linkText;
    browserTitle.textContent = d.browser;
  }
}
tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

// bubble canvas — lightweight, original
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas?.getContext('2d');
let bubbles = [];
let raf = 0;
let w=0,h=0,dpr=1;

function resize(){
  if(!canvas || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 1.8);
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.width = w+'px'; canvas.style.height = h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
function makeBubbles(){
  const count = Math.min(42, Math.floor(w/28));
  bubbles = Array.from({length: count}, (_,i) => ({
    x: Math.random()*w,
    y: h + Math.random()*600,
    r: 1.5 + Math.random()*7,
    s: 0.35 + Math.random()*1.05, // speed
    a: 0.08 + Math.random()*0.18, // alpha
    drift: (Math.random()-0.5)*0.9,
    wobble: Math.random()*Math.PI*2,
    wb: 0.006 + Math.random()*0.012,
    hue: 195 + Math.random()*14
  }));
}
function frame(){
  if(!ctx) return;
  ctx.clearRect(0,0,w,h);
  // subtle vignette at top (hero depth) — only fill hero area
  // bubbles
  for(const b of bubbles){
    b.y -= b.s;
    b.x += Math.sin(b.wobble) * 0.22 + b.drift*0.08;
    b.wobble += b.wb;
    if(b.y < -20){
      b.y = h + 20 + Math.random()*200;
      b.x = Math.random()*w;
    }
    // only draw when in viewport top 75% for performance perception
    // but keep them everywhere lightly
    const alpha = b.a * (b.y < 420 ? 0.9 : 0.42) * (1 - (b.y/h)*0.3);
    ctx.beginPath();
    // outer glow
    ctx.fillStyle = `hsla(${b.hue}, 38%, 72%, ${alpha*0.22})`;
    ctx.arc(b.x, b.y, b.r*1.9, 0, Math.PI*2);
    ctx.fill();
    // core
    const g = ctx.createRadialGradient(b.x - b.r*0.3, b.y - b.r*0.4, b.r*0.2, b.x, b.y, b.r);
    g.addColorStop(0, `hsla(${b.hue}, 65%, 96%, ${alpha})`);
    g.addColorStop(0.55, `hsla(${b.hue}, 42%, 78%, ${alpha*0.85})`);
    g.addColorStop(1, `hsla(${b.hue}, 36%, 64%, ${alpha*0.18})`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
    ctx.fill();
    // specular highlight
    ctx.fillStyle = `rgba(255,255,255,${alpha*0.9})`;
    ctx.beginPath();
    ctx.arc(b.x - b.r*0.32, b.y - b.r*0.38, b.r*0.28, 0, Math.PI*2);
    ctx.fill();
  }
  raf = requestAnimationFrame(frame);
}
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(canvas && ctx && !prefersReduced){
  resize(); makeBubbles(); frame();
  window.addEventListener('resize', () => { resize(); makeBubbles(); });
} else if(canvas){
  canvas.style.display='none';
}

// subtle nav shadow on scroll
const navEl = $('#nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if(y > 12) navEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.22)';
  else navEl.style.boxShadow = 'none';
  lastY = y;
}, {passive:true});
