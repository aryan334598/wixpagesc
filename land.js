/**
 * <my-landing-page> — "Soma Method" earthy editorial landing page.
 * Single self-contained Web Component (Shadow DOM). Usage:
 *   <script src="my-landing-page.js"></script>
 *   <my-landing-page></my-landing-page>
 *
 * Note: Tailwind needs a build step, so the utilities used here are
 * pre-compiled by hand inside the <style> block (same naming idea, zero dependencies).
 * Photos are replaced by grain-textured tonal placeholders — swap any `.ph` element's
 * background for `background-image:url(...)` to use real photography.
 */
class MyLandingPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Fonts must live in the document head (@font-face is unreliable inside shadow roots)
    if (!document.getElementById('mlp-fonts')) {
      const l = document.createElement('link');
      l.id = 'mlp-fonts';
      l.rel = 'stylesheet';
      l.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Montserrat:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
    this.render();
  }

  render() {
    const star = '✦';
    const marquee = Array.from({ length: 10 }, () => `<span>Nervous system care</span><i>${star}</i><span>Body-based healing</span><i>${star}</i>`).join('');

    this.shadowRoot.innerHTML = `
<style>
  :host { display:block; --bone:#F6F2EA; --butter:#F4EED1; --powder:#C1D4E3; --mud:#524840; --ink:#2F2A26; }
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  .page { background:var(--bone); color:var(--ink); font-family:'Montserrat',system-ui,sans-serif; line-height:1.7; font-size:16px; overflow-x:hidden; }
  a { color:inherit; text-decoration:none; }
  :focus-visible { outline:2px solid var(--mud); outline-offset:3px; }

  /* type */
  .serif { font-family:'Cormorant Garamond','Canela',Georgia,serif; font-weight:400; line-height:1.05; letter-spacing:-.01em; }
  .h1 { font-size:clamp(2.8rem,7vw,5.6rem); }
  .h2 { font-size:clamp(2rem,4.5vw,3.5rem); }
  .h3 { font-size:clamp(1.5rem,2.4vw,2rem); }
  em { font-style:italic; }
  .eyebrow { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.2em; }
  .muted { opacity:.78; }

  /* layout utils */
  .wrap { max-width:1180px; margin:0 auto; padding:0 24px; }
  .section { padding:96px 0; position:relative; }
  .center { text-align:center; }
  .stack > * + * { margin-top:20px; }

  /* pill buttons */
  .btn { display:inline-block; border-radius:999px; padding:15px 34px; font-weight:600; font-size:.9rem; letter-spacing:.04em; background:var(--powder); color:var(--ink); border:0; cursor:pointer; transition:transform .2s, background .2s; }
  .btn:hover { transform:translateY(-2px); }
  .btn.butter { background:var(--butter); }

  /* nav */
  nav { display:flex; align-items:center; justify-content:space-between; padding:22px 24px; max-width:1180px; margin:0 auto; }
  .logo { font-size:1.6rem; }
  nav ul { display:flex; gap:32px; list-style:none; font-size:.85rem; font-weight:500; }
  nav ul a:hover { text-decoration:underline; text-underline-offset:6px; }
  @media(max-width:760px){ nav ul { display:none; } }

  /* photo placeholders: tonal gradient + film grain */
  .ph { position:relative; background:var(--c1,#8a7866); overflow:hidden; border-radius:0; }
  .ph::before { content:''; position:absolute; inset:0; background:var(--g, linear-gradient(160deg,var(--c1),var(--c2))); filter:saturate(.7); }
  .ph::after { content:''; position:absolute; inset:0; opacity:.3; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 .3 0 0 0 0 .25 0 0 0 0 .2 0 0 0 .8 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>"); }
  .ph svg { position:absolute; inset:0; width:100%; height:100%; z-index:1; }

  /* sticker badges */
  .badge { position:absolute; z-index:5; width:130px; height:130px; border-radius:50%; display:grid; place-items:center; text-align:center; padding:14px; font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.16em; line-height:1.5; background:var(--powder); transform:rotate(-12deg); }
  .badge.butter { background:var(--butter); }

  /* hero */
  .hero { display:grid; grid-template-columns:1.05fr 1fr; gap:56px; align-items:center; padding-top:40px; padding-bottom:110px; }
  .hero .ph { aspect-ratio:4/5; }
  .hero .badge { right:-26px; bottom:56px; }
  .hero-img { position:relative; }
  @media(max-width:860px){ .hero { grid-template-columns:1fr; } .hero .badge { right:12px; } }

  /* wave + marquee */
  .wave { display:block; width:100%; height:64px; margin-bottom:-1px; }
  .marquee { background:var(--butter); overflow:hidden; white-space:nowrap; padding:22px 0; }
  .track { display:inline-flex; gap:28px; animation:slide 40s linear infinite; font-size:1.7rem; }
  .track i { font-style:normal; font-size:1.1rem; align-self:center; }
  .marquee .serif span { font-style:italic; }
  @keyframes slide { to { transform:translateX(-50%); } }

  /* intro */
  .intro { max-width:760px; margin:0 auto; }

  /* bento 3x2 — outer open, inner 1px borders */
  .bento { display:grid; grid-template-columns:repeat(3,1fr); }
  .cell { min-height:300px; padding:34px; display:flex; flex-direction:column; justify-content:flex-end; border-right:1px solid var(--ink); border-bottom:1px solid var(--ink); }
  .cell:nth-child(3n) { border-right:0; }
  .cell:nth-child(n+4) { border-bottom:0; }
  .cell.ph { padding:0; }
  .cell p { font-size:.92rem; margin-top:12px; }
  .blue { background:var(--powder); } .brown { background:var(--mud); color:var(--bone); } .yellow { background:var(--butter); }
  @media(max-width:860px){ .bento { grid-template-columns:1fr; } .cell { border-right:0 !important; border-bottom:1px solid var(--ink) !important; min-height:240px; } .cell:last-child { border-bottom:0 !important; } }

  /* overlapping collage */
  .collage { display:grid; grid-template-columns:1.1fr 1fr; align-items:center; gap:0; }
  .collage .ph { aspect-ratio:5/4; z-index:1; }
  .card { background:#fff; padding:56px 48px; margin-left:-90px; z-index:2; position:relative; }
  .collage .card { margin-top:90px; }
  @media(max-width:860px){ .collage { grid-template-columns:1fr; } .card { margin:-60px 16px 0; padding:36px 28px; } .collage .card { margin-top:-60px; } }

  /* 3 column features */
  .features { background:var(--powder); }
  .cols { display:grid; grid-template-columns:repeat(3,1fr); gap:48px; margin-top:64px; }
  .col p { max-width:300px; margin:16px auto 0; line-height:1.9; font-size:.95rem; }
  @media(max-width:860px){ .cols { grid-template-columns:1fr; gap:56px; } }

  /* founder */
  .founder { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  .stage { position:relative; height:520px; }
  .stage .statue { position:absolute; left:0; top:0; width:62%; height:88%; --c1:#c9c0b2; --c2:#9e9484; }
  .stage .portrait { position:absolute; right:0; bottom:0; width:56%; height:72%; z-index:2; --c1:#8d7461; --c2:#5d4a3c; border:10px solid var(--bone); }
  @media(max-width:860px){ .founder { grid-template-columns:1fr; } }

  /* faq */
  .faq { background:var(--mud); padding:110px 0; position:relative; }
  .faq::before { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(30,24,20,.5),rgba(30,24,20,.75)),linear-gradient(120deg,#6f7f88,#2f3b42); }
  .faq .badge { left:calc(50% - 440px); top:-48px; }
  .acc { position:relative; z-index:2; background:#fff; max-width:660px; margin:0 auto; padding:44px 40px; box-shadow:0 30px 60px rgba(0,0,0,.25); }
  details { border-bottom:1px solid var(--ink); }
  summary { list-style:none; cursor:pointer; display:flex; justify-content:space-between; gap:20px; padding:20px 0; font-weight:500; }
  summary::-webkit-details-marker { display:none; }
  summary::after { content:'+'; font-size:1.4rem; line-height:1; transition:transform .25s; }
  details[open] summary::after { transform:rotate(45deg); }
  details p { padding:0 0 22px; font-size:.93rem; max-width:520px; }
  @media(max-width:860px){ .faq .badge { left:16px; } .acc { margin:0 16px; padding:30px 24px; } }

  /* cta + footer */
  .cta { padding:110px 0 90px; }
  footer { background:var(--butter); padding:70px 0 0; overflow:hidden; }
  .foot-links { display:flex; justify-content:space-between; flex-wrap:wrap; gap:20px; font-size:.82rem; font-weight:500; padding-bottom:40px; }
  .giant { font-size:clamp(4rem,19.5vw,17rem); line-height:.8; text-align:center; white-space:nowrap; letter-spacing:-.03em; margin-bottom:-.06em; }

  @media (prefers-reduced-motion:reduce){ .track { animation:none; } .btn { transition:none; } }
</style>

<div class="page">
  <nav aria-label="Main">
    <a href="#top" class="serif logo"><em>Soma</em> Method</a>
    <ul>
      <li><a href="#approach">Approach</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#founder">Founder</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a class="btn butter" href="#book">Book a call</a>
  </nav>

  <header class="wrap hero" id="top">
    <div class="stack">
      <p class="eyebrow">Somatic therapy</p>
      <h1 class="serif h1">We work <em>with</em> the body, <em>not</em> against it.</h1>
      <p class="muted" style="max-width:460px">Gentle, body-based therapy for people who have talked about it for years and still feel it in their shoulders, jaw and breath.</p>
      <p style="padding-top:12px"><a class="btn" href="#book">Book a free consult</a></p>
    </div>
    <div class="hero-img">
      <div class="ph" style="--c1:#b79f86;--c2:#6e5a49" role="img" aria-label="Close-up of a collarbone in warm light">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M-10 330 Q110 250 200 300 T410 280 L410 510 L-10 510Z" fill="#f1e3d0" opacity=".35"/><path d="M60 300 Q150 270 200 310 Q250 270 340 300" stroke="#f6ead8" stroke-width="3" fill="none" opacity=".6"/></svg>
      </div>
      <div class="badge" aria-hidden="true">Held &amp; heard</div>
    </div>
  </header>

  <svg class="wave" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true"><path d="M0 64 V30 Q90 0 180 30 T360 30 T540 30 T720 30 T900 30 T1080 30 T1260 30 T1440 30 V64Z" fill="#F4EED1"/></svg>
  <div class="marquee" aria-hidden="true"><div class="track serif">${marquee}</div></div>

  <section class="section">
    <div class="wrap intro center stack">
      <p class="eyebrow">Why somatic</p>
      <h2 class="serif h2">Your body keeps <em>the story</em> your mind can't always tell.</h2>
      <p class="muted">Stress, grief and old survival habits live in muscle, posture and breath. We start there, at a pace your nervous system can trust.</p>
    </div>
  </section>

  <section class="section" id="approach" style="padding-top:0">
    <div class="wrap">
      <h2 class="serif h2 center" style="margin-bottom:56px">Our work is <em>rooted</em> in four things</h2>
      <div class="bento">
        <div class="cell blue"><h3 class="serif h3">Safety first</h3><p>Nothing happens until your body says it's ready.</p></div>
        <div class="cell ph" style="--c1:#7c6a58;--c2:#3f352c;min-height:300px" role="img" aria-label="Close-up of an eye">
          <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><ellipse cx="150" cy="150" rx="105" ry="46" fill="#e8dcc8" opacity=".75"/><circle cx="150" cy="150" r="38" fill="#4c5b66"/><circle cx="150" cy="150" r="16" fill="#1e1a17"/></svg>
        </div>
        <div class="cell brown"><h3 class="serif h3">Slow, small steps</h3><p>Tiny, tolerable doses of change that actually stick.</p></div>
        <div class="cell yellow"><h3 class="serif h3">Breath &amp; movement</h3><p>Simple practices you can take home and use daily.</p></div>
        <div class="cell ph" style="--c1:#c7b49c;--c2:#8b7761;min-height:300px" role="img" aria-label="Close-up of hands">
          <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M40 230 Q90 120 150 150 Q210 110 260 230" fill="none" stroke="#f3e6d2" stroke-width="14" stroke-linecap="round" opacity=".55"/></svg>
        </div>
        <div class="cell blue"><h3 class="serif h3">Your pace, always</h3><p>You lead. We follow, and we never push past a no.</p></div>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:20px">
    <div class="wrap collage">
      <div class="ph" style="--c1:#a89580;--c2:#5f5043" role="img" aria-label="Overlapping faces, softly lit"></div>
      <div class="card stack">
        <p class="eyebrow">The limits of talk</p>
        <h2 class="serif h2">Why top-down talk therapy <em>isn't always enough</em></h2>
        <p class="muted">Insight helps, but a body that still braces for danger can't be reasoned into calm. We add the missing layer: sensation, breath and gentle regulation.</p>
        <a class="btn" href="#book">See how it works</a>
      </div>
    </div>
  </section>

  <section class="section features" id="process">
    <div class="wrap center">
      <p class="eyebrow">The process</p>
      <h2 class="serif h2" style="margin-top:14px">Three phases, <em>one</em> steady direction</h2>
      <div class="cols">
        <div class="col"><h3 class="serif h2">Overcome</h3><p>Notice the patterns of tension and stress your body runs on autopilot, without judgment.</p></div>
        <div class="col"><h3 class="serif h2">Release</h3><p>Let the held charge move through, with breath, touch-free tools and slow movement.</p></div>
        <div class="col"><h3 class="serif h2">Reclaim</h3><p>Come home to a body that feels like yours: rested, responsive and safe to live in.</p></div>
      </div>
    </div>
  </section>

  <section class="section" id="founder">
    <div class="wrap founder">
      <div class="stage" aria-hidden="true">
        <div class="ph statue"></div>
        <div class="ph portrait"></div>
        <div class="badge butter" style="left:44%;top:6%">Est. 2016</div>
      </div>
      <div class="stack">
        <p class="eyebrow">Meet the founder</p>
        <h2 class="serif h2">Hi, I'm Maya. I learned this <em>the long way.</em></h2>
        <p class="muted">After a decade of therapy that left my body unchanged, somatic work finally let me exhale. I'm a certified somatic practitioner, and I built Soma Method to make that relief easier to reach.</p>
        <a class="btn" href="#book">Read my story</a>
      </div>
    </div>
  </section>

  <section class="faq" id="faq">
    <div class="badge butter" aria-hidden="true">Good to know</div>
    <div class="acc">
      <h2 class="serif h2 center" style="margin-bottom:24px">Is this <em>right</em> for me?</h2>
      <details open><summary>Do I need therapy experience?</summary><p>No. Many clients arrive brand new. We explain every step before we try it.</p></details>
      <details><summary>What happens in a session?</summary><p>We check in, choose a small focus, and practice with breath, posture and attention. Sessions run 60 minutes, online or in person.</p></details>
      <details><summary>Will I have to relive trauma?</summary><p>No. Somatic work avoids retelling. We stay with present-moment sensation at a tolerable level.</p></details>
      <details><summary>How soon will I feel a change?</summary><p>Many people notice calmer sleep or breathing within a few sessions. Deeper change takes longer, and we pace it with you.</p></details>
    </div>
  </section>

  <section class="cta center" id="book">
    <div class="wrap stack">
      <h2 class="serif h2">Ready to feel <em>at home</em> in your body?</h2>
      <p class="muted" style="max-width:480px;margin-inline:auto">Book a free 20-minute consult. No pressure, just a conversation.</p>
      <p style="padding-top:10px"><a class="btn" href="mailto:hello@somamethod.com">Book a free consult</a></p>
    </div>
  </section>

  <footer>
    <div class="wrap foot-links">
      <span>hello@somamethod.com</span>
      <span>Instagram &nbsp; Journal &nbsp; Privacy</span>
      <span>© 2026 Soma Method</span>
    </div>
    <div class="giant serif" aria-hidden="true"><em>Soma</em> Method</div>
  </footer>
</div>`;
  }
}

customElements.define('my-landing-page', MyLandingPage);