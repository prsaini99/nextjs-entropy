'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

/**
 * Landing v2: "The Thread".
 *
 * A scroll-scrubbed 63.7s brand film owns the first 800vh (engine ported
 * from scroll-hero/index.html: blob fetch so seeking never needs Range
 * support, rAF lerp toward the scroll-mapped time, seeks gated on
 * 'seeked'). Every film chapter carries its own contextual CTA, a fixed
 * dock morphs its label as the visitor moves through the page, and the
 * film's red-thread motif continues below as an SVG line that draws
 * itself with scroll through the proof sections.
 *
 * Reduced motion / small screens get the poster and a static page: the
 * 45MB scrub master is a desktop experience by design until the
 * compressed production encode lands.
 */

const DUR = 62.54;

const CHAPTERS = [
  { k: 'STACKBINARY', in: -1, out: 4.6, ink: false,
    h: <>AI, Cloud &amp; Custom Software.<br />Built to Ship and Scale.</>,
    p: 'An engineering company with 55+ shipped products, several running in production under our own name.',
    cta: null },
  { k: '01 · DISCOVER', in: 9.0, out: 13.6, ink: false,
    h: <>The outcome,<br />not the wishlist.</>,
    p: 'Workshops that find the one thing worth building.',
    cta: { label: 'Book a discovery call', href: '/contact-us' } },
  { k: '02 · ARCHITECT', in: 18.6, out: 23.0, ink: false,
    h: <>Architecture first.</>,
    p: 'Secure by default, drawn before a line of code.',
    cta: { label: 'How we scope projects', href: '#process' } },
  { k: '03 · BUILD', in: 26.6, out: 31.4, ink: false,
    h: <>Delivery you<br />can watch happen.</>,
    p: 'Weekly demos. Working software, not status reports.',
    cta: { label: '55+ shipped products', href: '/case-studies' } },
  { k: '04 · SHIP', in: 37.0, out: 41.8, ink: false,
    h: <>Zero-drama go-lives.</>,
    p: 'Cut time-to-market, not corners.',
    cta: { label: 'See our live AI systems', href: '/martech/ai-call-center' } },
  { k: '05 · SCALE', in: 47.4, out: 52.1, ink: false,
    h: <>From first instance<br />to every region.</>,
    p: 'Run, watched, kept fast. Everywhere.',
    cta: { label: 'Our engineering thinking', href: '/insights' } },
];

const DOCK_LABELS = [
  { until: 6, label: 'Talk to us' },
  { until: 16, label: 'Scope my project' },
  { until: 25, label: 'See the architecture' },
  { until: 34, label: 'Watch us build' },
  { until: 44, label: 'Ship with us' },
  { until: 57, label: 'Scale with us' },
  { until: Infinity, label: 'Start the conversation' },
];

const PROOF = [
  { v: '55+', l: 'products shipped by this team' },
  { v: '4', l: 'live AI platforms we operate ourselves' },
  { v: '3', l: 'offices: Dubai, USA, India' },
  { v: '100%', l: 'of the IP assigned to you on payment' },
];

const SERVICES = [
  { t: 'AI Development', d: 'LLM applications, AI agents, chatbots and voice AI, engineered with evaluation and guardrails.', href: '/services/ai-development' },
  { t: 'Custom Software', d: 'Web platforms, enterprise systems and SaaS products, built around how your business actually runs.', href: '/services/custom-software-development' },
  { t: 'Mobile Apps', d: 'iOS and Android from one Flutter codebase, with the backend and admin panel in scope.', href: '/services/mobile-app-development-dubai' },
  { t: 'Cloud & DevOps', d: 'Migration, CI/CD, Kubernetes and observability. Ship fast without drama.', href: '/services' },
  { t: 'Automation & Integrations', d: 'n8n pipelines, WhatsApp Business API and the systems you already run, finally talking.', href: '/martech/marketing-automation' },
  { t: 'Data & Analytics', d: 'Warehousing, pipelines and dashboards that turn operations into decisions.', href: '/services' },
];

const LIVE_SYSTEMS = [
  { t: 'Voice AI answering real business calls', d: 'A phone-native AI platform we built and operate, answering customer calls in production every day.' },
  { t: 'Campaign automation spending real budgets', d: 'Ad and marketing automation running live accounts, ours included, with real money on the line.' },
  { t: 'The assistant on this page', d: 'The chat bubble below is our own AI build: grounded in our data, shipped the way we ship for clients.' },
];

export default function LandingV2() {
  const filmRef = useRef(null);
  const heroRef = useRef(null);
  const threadRef = useRef(null);
  const [reduced, setReduced] = useState(null); // null until decided client-side
  const [chapter, setChapter] = useState(0);
  const [dockLabel, setDockLabel] = useState(DOCK_LABELS[0].label);
  const [progress, setProgress] = useState(0);
  const [pastFilm, setPastFilm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const tipRef = useRef(null);
  const capRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');
    setReduced(mq.matches || small.matches);
    const onTop = () => setAtTop(window.scrollY < 60);
    onTop();
    addEventListener('scroll', onTop, { passive: true });
    return () => removeEventListener('scroll', onTop);
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const film = filmRef.current;
    let revoke = null;
    fetch('/scroll-hero/hero-scrub.mp4')
      .then((r) => r.blob())
      .then((b) => {
        revoke = URL.createObjectURL(b);
        film.src = revoke;
      })
      .catch(() => {});

    let target = 0;
    let current = 0;
    let seekBusy = false;
    let raf = 0;
    const onSeeked = () => { seekBusy = false; };
    film.addEventListener('seeked', onSeeked);

    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const max = hero.offsetHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      target = p * DUR;
      setProgress(Math.min(1, Math.max(0, scrollY / (document.body.scrollHeight - innerHeight))));
      // The thread: a curvy red line, built in pixel coordinates at runtime
      // (no viewBox stretching, so it can be thick and undistorted), drawing
      // with scroll and ending as an arrowhead on the Discovery Call button.
      const path = threadRef.current;
      const content = contentRef.current;
      const btn = ctaRef.current;
      const tipEl = tipRef.current;
      if (path && content && btn) {
        const cRect = content.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const endY = bRect.top - cRect.top - 30;
        const W = content.offsetWidth;
        const key = `${W}x${Math.round(endY)}`;
        if (path.dataset.key !== key && endY > 200) {
          const cx = W / 2, xL = W * 0.3, xR = W * 0.7;
          const y = (f) => Math.round(endY * f);
          path.setAttribute('d',
            `M ${cx} 0 C ${cx} ${y(0.12)}, ${xL} ${y(0.13)}, ${xL} ${y(0.26)} ` +
            `C ${xL} ${y(0.4)}, ${xR} ${y(0.41)}, ${xR} ${y(0.55)} ` +
            `C ${xR} ${y(0.7)}, ${cx} ${y(0.72)}, ${cx} ${endY}`);
          path.closest('svg').setAttribute('viewBox', `0 0 ${W} ${content.offsetHeight}`);
          const L = path.getTotalLength();
          path.style.strokeDasharray = String(L);
          path.dataset.len = String(L);
          path.dataset.key = key;
        }
        const L = parseFloat(path.dataset.len || '0');
        if (L > 0) {
          const start = hero.offsetHeight - innerHeight;
          const total = content.offsetTop + endY - innerHeight * 0.55 - start;
          const tp = total > 0 ? Math.min(1, Math.max(0, (scrollY - start) / total)) : 0;
          path.style.strokeDashoffset = String(L * (1 - tp));
          if (tipEl) {
            const pt = path.getPointAtLength(L * tp);
            const pt2 = path.getPointAtLength(Math.max(0, L * tp - 2));
            const ang = Math.atan2(pt.y - pt2.y, pt.x - pt2.x) * 180 / Math.PI - 90;
            tipEl.style.transform = `translate(${pt.x}px, ${pt.y}px) rotate(${ang}deg)`;
            tipEl.style.opacity = tp > 0.005 ? '1' : '0';
          }
        }
      }
    };
    addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      if (!isFinite(current)) current = 0;
      const gap = Math.abs(target - current);
      current += (target - current) * (gap > 6 ? 0.55 : gap > 2 ? 0.3 : 0.16);
      if (!seekBusy && Math.abs(film.currentTime - current) > 0.01 && film.readyState >= 2) {
        seekBusy = true;
        try { film.currentTime = current; } catch { seekBusy = false; }
      }
      capRefs.current.forEach((el, i) => {
        const c = CHAPTERS[i];
        if (!el || !c) return;
        const t = current;
        const fade = 0.9;
        let o = 0;
        if (t > c.in && t < c.out) o = Math.min(1, c.in < 0 ? 1 : (t - c.in) / fade, (c.out - t) / fade);
        el.style.opacity = o;
        el.style.transform = `translateY(${(1 - o) * 24}px)`;
        el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      });
      let ch = 0;
      for (let i = 0; i < CHAPTERS.length; i++) if (current >= CHAPTERS[i].in) ch = i;
      setChapter(ch);
      const past = scrollY > (heroRef.current?.offsetHeight || 0) - innerHeight;
      setPastFilm(past);
      const entry = past ? DOCK_LABELS[DOCK_LABELS.length - 1] : DOCK_LABELS.find((d) => current < d.until);
      setDockLabel(entry.label);
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      film.removeEventListener('seeked', onSeeked);
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [reduced]);

  const seekTo = (i) => {
    const hero = heroRef.current;
    if (!hero) return;
    const c = CHAPTERS[i];
    const mid = c.in < 0 ? 1.5 : (c.in + c.out) / 2;
    const max = hero.offsetHeight - innerHeight;
    scrollTo({ top: (mid / DUR) * max, behavior: 'smooth' });
  };

  return (
    <div className="v2-root">
      <style>{v2css}</style>

      <Link href="/" className={`v2-lockup ${atTop && !menuOpen ? 'hiddenTop' : ''}`} aria-label="Stackbinary home">
        <img
          src={reduced === false && !pastFilm && !menuOpen ? '/scroll-hero/lockup-white.png' : '/stack-logo.png'}
          alt="Stackbinary"
        />
      </Link>
      <div className={`v2-sitehead ${atTop && !menuOpen ? 'shown' : 'hidden'}`}>
        <Header />
      </div>
      <button
        className={`v2-menu-btn ${reduced === false && !pastFilm ? 'over-film' : 'over-paper'} ${menuOpen ? 'open' : ''} ${atTop && !menuOpen ? 'tucked' : ''}`}
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span /><span />
      </button>
      {menuOpen && (
        <>
          <div className="v2-menu-veil" onClick={() => setMenuOpen(false)} />
          <nav className="v2-menu" aria-label="Site navigation">
            {[
              ['Home', '/'], ['About', '/about'], ['Services', '/services'],
              ['Hire Developers', '/hire-developers'], ['MarTech', '/martech'],
              ['AI Automation', '/ai-automation'], ['Industries', '/industries'],
              ['Case Studies', '/case-studies'], ['Insights', '/insights'],
              ['Careers', '/careers'],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
            <Link href="/de" className="de" onClick={() => setMenuOpen(false)}>Deutsch</Link>
            <Link href="/contact-us" className="contact" onClick={() => setMenuOpen(false)}>Contact Us →</Link>
          </nav>
        </>
      )}

      {reduced === false && (
        <>
          <div className="v2-bar" style={{ width: `${progress * 100}%` }} />
          <div className="v2-stage">
            <video ref={filmRef} muted playsInline preload="auto" poster="/scroll-hero/poster.jpg" />
          </div>
          {/* Chapter dots: click to fly to a chapter. */}
          <nav className="v2-dots" aria-label="Film chapters">
            {CHAPTERS.map((c, i) => (
              <button key={c.k} className={i === chapter ? 'on' : ''} title={c.k} onClick={() => seekTo(i)} />
            ))}
          </nav>
          {/* The morphing CTA dock. */}
          <Link href="/contact-us" className="v2-dock">
            <span className="pulse" />
            <span key={dockLabel} className="label">{dockLabel}</span>
            <span aria-hidden>→</span>
          </Link>
        </>
      )}

      {/* ---------- The film (desktop, motion allowed) ---------- */}
      {reduced === false && (
        <section ref={heroRef} className="v2-track" aria-label="Stackbinary brand film">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.k}
              ref={(el) => { capRefs.current[i] = el; }}
              className={`v2-cap ${c.ink ? 'ink' : 'paper'}`}
            >
              <div className="k">{c.k}</div>
              <h1>{c.h}</h1>
              {c.p && <p>{c.p}</p>}
              {c.cta && (
                <Link className="ccta" href={c.cta.href}>
                  {c.cta.label} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          ))}
          <div className="v2-hint" style={{ opacity: progress < 0.01 ? 1 : 0 }}>SCROLL</div>
        </section>
      )}

      {/* ---------- Static hero (mobile / reduced motion / pre-hydration) ---------- */}
      {reduced !== false && (
        <section className="v2-static-hero">
          <img src="/scroll-hero/poster.jpg" alt="" />
          <div className="inner">
            <div className="k">STACKBINARY</div>
            <h1>AI, Cloud &amp; Custom Software.<br />Built to Ship and Scale.</h1>
            <p>An engineering company with 55+ shipped products, several running in production under our own name.</p>
            <Link className="ccta solid" href="/contact-us">Book a Discovery Call →</Link>
          </div>
        </section>
      )}

      {/* ---------- Content: the thread continues ---------- */}
      <main className="v2-content" ref={contentRef}>
        <svg className="v2-thread" aria-hidden preserveAspectRatio="none">
          <path ref={threadRef} fill="none" stroke="#E0362C" strokeWidth="4.5" strokeLinecap="round" />
          <polygon ref={tipRef} points="-9,0 9,0 0,16" fill="#E0362C" style={{ opacity: 0 }} />
        </svg>

        <section className="v2-proof">
          {PROOF.map((s) => (
            <div key={s.l}><div className="v">{s.v}</div><div className="l">{s.l}</div></div>
          ))}
        </section>

        <section className="v2-section">
          <div className="k">WHAT WE BUILD</div>
          <h2>One team, the whole system.</h2>
          <div className="v2-grid">
            {SERVICES.map((s) => (
              <Link key={s.t} href={s.href} className="card">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="go" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="v2-section alt" id="proof">
          <div className="k">PROOF, NOT PROMISES</div>
          <h2>Ask any vendor: what do you run in production yourselves?</h2>
          <div className="v2-grid three">
            {LIVE_SYSTEMS.map((s) => (
              <div key={s.t} className="card static">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-section" id="process">
          <div className="k">HOW IT WORKS</div>
          <h2>Fixed scope. Fixed price. Weekly proof.</h2>
          <ol className="v2-steps">
            <li><b>Discover.</b> A working session on the problem. If the project is not worth building, we say so on the call.</li>
            <li><b>Proposal.</b> Deliverables, milestones, team, timeline and one fixed price, in writing, before you commit.</li>
            <li><b>Build.</b> Working software demonstrated every week in your business hours. You steer while it moves.</li>
            <li><b>Own.</b> Code, infrastructure and documentation assign to you completely. It keeps running without us.</li>
          </ol>
        </section>

        <section className="v2-final">
          <h2>The thread ends where your project begins.</h2>
          <p>A thirty-minute call, a written fixed price within days, and an honest no if it is not worth building.</p>
          <span ref={ctaRef} className="cta-anchor"><Link className="ccta solid big" href="/contact-us">Book a Discovery Call →</Link></span>
        </section>
      </main>
    </div>
  );
}

const v2css = `
@font-face { font-family: SatoshiV2; src: url(/scroll-hero/fonts/Satoshi-Regular.woff2) format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: SatoshiV2; src: url(/scroll-hero/fonts/Satoshi-Medium.woff2) format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: SatoshiV2; src: url(/scroll-hero/fonts/Satoshi-Bold.woff2) format("woff2"); font-weight: 700; font-display: swap; }
.v2-root { font-family: SatoshiV2, ui-sans-serif, system-ui, sans-serif; background:#FAF8F4; color:#17171A; }
.v2-lockup { position:fixed; top:22px; left:6vw; z-index:40; font-weight:700; letter-spacing:.02em; color:#17171A; text-decoration:none; }
.v2-lockup img { height:30px; width:auto; }
.v2-nav { position:fixed; top:24px; right:6vw; z-index:40; display:flex; align-items:center; gap:28px; font-weight:700; font-size:14px; letter-spacing:.02em; }
.v2-nav a { text-decoration:none; transition:opacity .2s; opacity:.85; }
.v2-nav a:hover { opacity:1; }
.v2-nav.over-film a { color:#FAF8F4; text-shadow:0 1px 14px rgba(0,0,0,.4); }
.v2-nav.over-paper a { color:#17171A; }
.v2-nav .navcta { border:1.5px solid #E0362C; border-radius:999px; padding:8px 18px; color:#E0362C !important; text-shadow:none !important; opacity:1; }
.v2-nav .navcta:hover { background:#E0362C; color:#fff !important; }
@media (max-width:1023px) { .v2-nav { gap:18px; font-size:13px; } .v2-nav a:not(.navcta) { display:none; } }
.v2-bar { position:fixed; top:0; left:0; height:3px; background:#E0362C; z-index:50; }
.v2-stage { position:fixed; inset:0; overflow:hidden; z-index:0; }
.v2-stage video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.v2-track { height:800vh; position:relative; z-index:1; }
.v2-cap { position:fixed; z-index:20; left:6vw; bottom:14vh; max-width:640px; opacity:0; transform:translateY(24px); pointer-events:none; }
.v2-cap .k, .v2-content .k { font-size:13px; font-weight:700; letter-spacing:.22em; color:#E0362C; margin-bottom:14px; }
.v2-cap h1 { font-size:clamp(34px,4.6vw,62px); font-weight:700; letter-spacing:-.02em; line-height:1.05; margin:0; }
.v2-cap p { font-size:clamp(15px,1.4vw,19px); font-weight:500; margin-top:14px; opacity:.85; }
.v2-cap.ink { color:#17171A; }
.v2-cap.paper { color:#FAF8F4; text-shadow:0 2px 24px rgba(0,0,0,.35); }
.ccta { display:inline-flex; align-items:center; gap:10px; margin-top:22px; font-weight:700; font-size:16px; color:inherit; text-decoration:none; border-bottom:2px solid #E0362C; padding-bottom:4px; transition:gap .2s; }
.ccta:hover { gap:16px; }
.ccta.solid { background:#E0362C; color:#fff; border:none; border-radius:999px; padding:15px 34px; }
.ccta.solid.big { font-size:18px; padding:18px 44px; }
.v2-hint { position:fixed; bottom:26px; left:50%; transform:translateX(-50%); font-size:12px; font-weight:700; letter-spacing:.2em; z-index:20; transition:opacity .4s; color:#FAF8F4; text-shadow:0 2px 18px rgba(0,0,0,.45); }
.v2-dots { position:fixed; right:26px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:12px; z-index:40; }
.v2-dots button { width:9px; height:9px; border-radius:50%; border:1.5px solid #E0362C; background:transparent; cursor:pointer; padding:0; transition:transform .2s, background .2s; }
.v2-dots button.on { background:#E0362C; transform:scale(1.35); }
.v2-dock { position:fixed; right:26px; bottom:104px; z-index:45; display:flex; align-items:center; gap:10px; background:#17171A; color:#FAF8F4; font-weight:700; font-size:15px; padding:14px 22px; border-radius:999px; text-decoration:none; box-shadow:0 8px 30px rgba(23,23,26,.25); }
.v2-dock .pulse { width:8px; height:8px; border-radius:50%; background:#E0362C; animation:v2pulse 2s infinite; }
.v2-dock .label { animation:v2fade .35s; }
@keyframes v2pulse { 0%,100% { box-shadow:0 0 0 0 rgba(224,54,44,.5);} 50% { box-shadow:0 0 0 7px rgba(224,54,44,0);} }
@keyframes v2fade { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:none;} }
.v2-static-hero { position:relative; min-height:92vh; display:flex; align-items:flex-end; color:#FAF8F4; }
.v2-static-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
/* Ink gradient over the poster so the mobile hero reads like the film's
   white captions instead of ink text colliding with the metal nameplate. */
.v2-static-hero::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(23,23,26,.15) 0%, rgba(23,23,26,.45) 45%, rgba(23,23,26,.9) 100%); }
.v2-static-hero .inner { position:relative; z-index:1; padding:0 6vw 12vh; max-width:680px; }
.v2-static-hero h1 { font-size:clamp(32px,8vw,56px); font-weight:700; letter-spacing:-.02em; line-height:1.05; margin:0; text-shadow:0 2px 20px rgba(0,0,0,.35); }
.v2-static-hero p { font-weight:500; margin-top:14px; opacity:.9; }
.v2-content { position:relative; background:#FAF8F4; z-index:2; }
.v2-thread { position:absolute; inset:0; width:100%; height:100%; z-index:1; pointer-events:none; overflow:visible; }
.cta-anchor { display:inline-block; position:relative; z-index:3; }
.v2-sitehead { position:fixed; top:0; left:0; right:0; z-index:58; transition:opacity .3s, transform .3s; }
.v2-sitehead.hidden { opacity:0; transform:translateY(-100%); pointer-events:none; }
.v2-lockup.hiddenTop { opacity:0; pointer-events:none; }
.v2-lockup { transition:opacity .3s; }
.v2-menu-btn.tucked { opacity:0; transform:scale(.85); pointer-events:none; }
@media (max-width:1023px) { .v2-menu-btn.tucked { opacity:1; transform:none; pointer-events:auto; } .v2-sitehead { display:none; } .v2-lockup.hiddenTop { opacity:1; pointer-events:auto; } }
.v2-menu-btn { position:fixed; top:20px; right:6vw; z-index:60; width:46px; height:46px; border-radius:50%; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; transition:background .2s, transform .2s; }
.v2-menu-btn span { display:block; width:18px; height:2px; border-radius:2px; transition:transform .25s, background .2s; }
.v2-menu-btn.over-film { background:rgba(23,23,26,.38); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
.v2-menu-btn.over-film span { background:#FAF8F4; }
.v2-menu-btn.over-paper { background:#17171A; }
.v2-menu-btn.over-paper span { background:#FAF8F4; }
.v2-menu-btn:hover { transform:scale(1.06); }
.v2-menu-btn.open span:first-child { transform:translateY(4px) rotate(45deg); }
.v2-menu-btn.open span:last-child { transform:translateY(-4px) rotate(-45deg); }
.v2-menu-veil { position:fixed; inset:0; z-index:55; background:rgba(23,23,26,.25); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); animation:v2fade .2s; }
.v2-menu { position:fixed; top:78px; right:6vw; z-index:56; background:#FAF8F4; border-radius:18px; padding:18px 0; min-width:250px; box-shadow:0 24px 70px rgba(23,23,26,.28); display:flex; flex-direction:column; animation:v2menu .22s ease; transform-origin:top right; }
@keyframes v2menu { from { opacity:0; transform:scale(.94) translateY(-8px); } to { opacity:1; transform:none; } }
.v2-menu a { padding:11px 28px; font-weight:700; font-size:15px; color:#17171A; text-decoration:none; transition:transform .16s, color .16s; }
.v2-menu a:hover { transform:translateX(5px); color:#E0362C; }
.v2-menu .de { opacity:.6; font-size:13px; }
.v2-menu .contact { margin:10px 22px 0; background:#E0362C; color:#fff; border-radius:999px; text-align:center; padding:13px 20px; }
.v2-menu .contact:hover { transform:none; color:#fff; filter:brightness(1.06); }
.v2-proof { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1px; background:#e4e0d8; border-top:1px solid #e4e0d8; border-bottom:1px solid #e4e0d8; position:relative; z-index:3; }
.v2-proof > div { background:#FAF8F4; padding:44px 6vw; }
.v2-proof .v { font-size:44px; font-weight:700; color:#E0362C; letter-spacing:-.02em; }
.v2-proof .l { font-weight:500; margin-top:6px; opacity:.75; font-size:15px; }
.v2-section { padding:110px 6vw; max-width:1280px; margin:0 auto; position:relative; z-index:3; }
.v2-section.alt { max-width:none; background:#17171A; color:#FAF8F4; }
.v2-section.alt > * { max-width:1280px; margin-left:auto; margin-right:auto; }
.v2-section h2 { font-size:clamp(28px,3.4vw,44px); font-weight:700; letter-spacing:-.02em; line-height:1.1; margin:0 0 46px; max-width:720px; }
.v2-section.alt h2 { margin-bottom:46px; }
.v2-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:22px; }
.v2-grid .card { position:relative; background:#fff; border:1px solid #e4e0d8; border-radius:14px; padding:30px; text-decoration:none; color:inherit; transition:transform .2s, box-shadow .2s; }
.v2-section.alt .card { background:rgba(250,248,244,.05); border-color:rgba(250,248,244,.14); color:#FAF8F4; }
.v2-grid .card:not(.static):hover { transform:translateY(-4px); box-shadow:0 14px 40px rgba(23,23,26,.09); }
.v2-grid h3 { margin:0 0 10px; font-size:19px; font-weight:700; }
.v2-grid p { margin:0; font-weight:500; font-size:15px; opacity:.8; line-height:1.5; }
.v2-grid .go { position:absolute; top:26px; right:26px; color:#E0362C; font-weight:700; opacity:0; transition:opacity .2s; }
.v2-grid .card:hover .go { opacity:1; }
.v2-steps { list-style:none; counter-reset:st; margin:0; padding:0; max-width:760px; }
.v2-steps li { counter-increment:st; padding:26px 0 26px 76px; position:relative; border-top:1px solid #e4e0d8; font-weight:500; line-height:1.55; }
.v2-steps li::before { content:counter(st,decimal-leading-zero); position:absolute; left:0; top:24px; font-weight:700; color:#E0362C; font-size:22px; }
.v2-final { text-align:center; padding:130px 6vw 150px; position:relative; z-index:3; }
.v2-final h2 { font-size:clamp(30px,3.8vw,50px); font-weight:700; letter-spacing:-.02em; margin:0 0 16px; }
.v2-final p { font-weight:500; opacity:.8; margin:0 0 36px; }
@media (max-width:767px) {
  .v2-dots { display:none; }
  .v2-thread { display:none; }
  .v2-dock { right:16px; bottom:92px; font-size:14px; padding:12px 18px; }
  .v2-thread { display:none; }
}
`;
