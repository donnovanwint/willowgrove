// Static site builder: node src/build.mjs  ->  dist/
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

const SITE = {
  name: 'Willow Grove SDA Church',
  url: 'https://willowgrovesdachurch.org',
  phone: '(215) 657-8364',
  tel: '+12156578364',
  street: '1576 Fairview Ave',
  city: 'Willow Grove, PA 19090',
  give: 'https://adventistgiving.org/donate/ANB4LG',
  map: 'https://www.google.com/maps/search/?api=1&query=1576+Fairview+Ave+Willow+Grove+PA+19090',
};

// Placeholder photography (Unsplash). Swap for real church photos later.
const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const P = {
  leader: '1500648767791-00dcc994a43e', plant: '1416879595882-3373a0480b5b', pulpit: '1491438590914-bc09fcaaf77a', light: '1516450360452-9312f5e86fc7',
  worship: '1438232992991-995b7058bbb3', greet: '1600880292203-757bb62b4baf', pews: '1519491050282-cf00c82424b4', smile: '1531123897727-8f129e1688ce', church: '1544928147-79a2dbc1f389', talk: '1522202176988-66273c2fd55f', hero: '1519491050282-cf00c82424b4', friends: '1529156069898-49953e39b3ac', young: '1523580494863-6f3031224c94',
  serve: '1593113598332-cd288d649433', bible: '1504052434569-70ad5836ab65', study: '1541339907198-e08756dedf3f',
  band: '1516450360452-9312f5e86fc7', give: '1469571486292-0ba58a3f068b', people: '1438232992991-995b7058bbb3',
  laugh: '1511632765486-a01980e01a18', group: '1541339907198-e08756dedf3f', hands: '1488521787991-ed7bbaae773c',
  kids: '1517486808906-6ca8b3f04846', sun: '1507003211169-0a1dd7228f2d', face1: '1544027993-37dbfe43562a', face2: '1582213782179-e0d53f98f2ca',
};
const img = (id, alt, w, h, o = {}) => {
  const ws = [...new Set([...[400, 800, 1200, 1800].filter(x => x < w), w])];
  const srcset = ws.map(x => `${U(id, x)} ${x}w`).join(', ');
  const sizes = w >= 1400 ? '100vw' : `(max-width: 820px) 100vw, ${w}px`;
  return `<img src="${U(id, w)}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" width="${w}" height="${h}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} ${o.cls ? `class="${o.cls}"` : ''}>`;
};

const I = {
  chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  car: '<path d="M5 16l1.5-5.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 16M4 16h16v3H4zM7.5 19v1.5M16.5 19v1.5"/><circle cx="8" cy="16" r=".6" fill="currentColor"/><circle cx="16" cy="16" r=".6" fill="currentColor"/>',
  shirt: '<path d="M8 4l-5 3 2.5 4L8 10v10h8V10l2.5 1L21 7l-5-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4z"/>',
  church: '<path d="M12 3v4M10 5h4M12 7l6 4v9H6v-9zM10 20v-4h4v4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.5 5.7 3.5 9S14.5 18.3 12 21c-2.5-2.7-3.5-5.7-3.5-9S9.5 5.7 12 3z"/>',
  clock: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>',
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  heart: '<path d="M12 20s-7-4.4-9-9.2C1.8 7.6 3.8 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.2 0 5.2 3.1 4 6.3-2 4.8-9 9.2-9 9.2z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.6 3-5.5 6.5-5.5s6 1.9 6.5 5.5"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.4 3.5 5.2"/>',
  book: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5C4.7 20 4 19.3 4 18.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  fb: '<path d="M14 8h3V4.5h-3A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V21H13v-6.5h3L16.5 11H13V9a1 1 0 0 1 1-1z" fill="currentColor" stroke="none"/>',
  ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".8" fill="currentColor"/>',
  yt: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"/>',
};
const ico = (n, c = '') => `<svg ${c ? `class="${c}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const arrow = ico('arrow');

const NAV = [
  ['/visit/', 'Plan a Visit'], ['/about/', 'About'], ['/ministries/', 'Ministries'],
  ['/events/', 'Events'], ['/watch/', 'Watch'], ['/give/', 'Give'], ['/contact/', 'Contact'],
];

const logo = () => `<a class="logo" href="/"><span class="logo-mark" role="img" aria-label="Willow Grove monogram"></span><span class="logo-text">Willow Grove<small>SDA Church</small></span></a>`;
const header = cur => `
<a class="skip" href="#main">Skip to content</a>
<div class="top-bar"><div class="wrap"><span class="ib">${ico('info')}<span><b>New here?</b> You’re welcome here. <span class="long">Plan your visit, find service times, and more.</span></span></span><a href="/visit/">Plan your visit <span class="arr">→</span></a></div></div>
<header class="site-header"><div class="wrap nav">
  ${logo()}
  <ul class="nav-list" id="nav">${NAV.map(([h, t]) => `<li><a class="nl" href="${h}"${cur === h ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul>
  <div class="nav-tools"><a class="icon-btn" href="/contact/" aria-label="Contact and search">${ico('search')}</a>
  <button class="icon-btn menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button></div>
</div></header>`;

const footer = () => `
<footer class="site-footer"><div class="wrap">
  <div class="foot-top">${logo()}<div class="social"><a href="#" aria-label="Facebook">${ico('fb')}</a><a href="#" aria-label="YouTube">${ico('yt')}</a><a href="#" aria-label="Instagram">${ico('ig')}</a></div></div>
  <div class="foot-info">
    <div class="it">${ico('pin')}<div><b>${SITE.street}</b>${SITE.city}</div></div>
    <div class="it">${ico('cal')}<div><b>Saturdays at 11:00 AM</b>Worship Service</div></div>
    <div class="it">${ico('phone')}<div><b>${SITE.phone}</b>Call or Text Us</div></div>
  </div>
  <nav class="foot-links" aria-label="Footer"><a href="/about/">About</a><a href="/ministries/">Ministries</a><a href="/events/">Events</a><a href="/watch/">Watch</a><a href="${SITE.give}" rel="noopener">Give</a><a href="/contact/">Contact</a></nav>
  <div class="legal">© ${new Date().getFullYear()} ${SITE.name}. A congregation of the worldwide Seventh-day Adventist Church.</div>
</div></footer>`;

const footerDark = () => `
<footer class="site-footer dark"><div class="wrap">
  <div class="fd-grid">
    <div>${logo()}</div>
    <div><b>Visit</b><p>${SITE.street}<br>${SITE.city}<br><a href="tel:${SITE.tel}">${SITE.phone}</a></p></div>
    <div><b>Worship</b><p>Saturdays<br>Divine Worship 11:00 AM</p></div>
    <div><b>Follow Us</b><div class="social"><a href="#" aria-label="Facebook">${ico('fb')}</a><a href="#" aria-label="Instagram">${ico('ig')}</a><a href="#" aria-label="YouTube">${ico('yt')}</a></div></div>
  </div>
  <div class="legal">© ${new Date().getFullYear()} ${SITE.name}. A congregation of the worldwide Seventh-day Adventist Church. <span><a href="/about/">About</a> · <a href="/contact/">Contact</a></span></div>
</div></footer>`;

const ld = (extra = {}) => JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Church', name: SITE.name, url: SITE.url, telephone: SITE.tel,
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Willow Grove', addressRegion: 'PA', postalCode: '19090', addressCountry: 'US' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '11:00', closes: '12:45' }],
  parentOrganization: { '@type': 'Organization', name: 'Seventh-day Adventist Church' }, ...extra,
});

const pages = [];
const page = (path, { title, desc, body, plain = true }) => pages.push({ path, title, desc, body, plain });

const layout = ({ path, title, desc, body, plain }) => `<!doctype html>
<html lang="en" class="no-js"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}">
<meta name="theme-color" content="#1E4FD8"><link rel="canonical" href="${SITE.url}${path}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta property="og:image" content="${U(P.worship, 1200)}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"></noscript>
<link rel="stylesheet" href="/assets/css/style.css">
<script type="application/ld+json">${ld()}</script>
</head><body class="${plain ? 'page-plain' : ''}">
${header(path)}
<main id="main">${body}</main>
${path === '/' ? footer() : footerDark()}
<script src="/assets/js/main.js" defer></script>
</body></html>`;

const cta = (h = 'Your seat is saved.', p = 'No dress code, no pressure, no perfect résumé. Just show up as you are — we’ll save you a seat and a smile.') => `
<section class="sec" style="padding-top:0"><div class="wrap"><div class="cta-band rv"><h2>${h}</h2><p>${p}</p>
<div class="cta-row"><a class="btn btn--white" href="/visit/">Plan Your Visit ${arrow}</a><a class="btn btn--ghost" href="/watch/">Watch Online</a></div></div></div></section>`;

const faqs = [
  ['What time does worship start?', 'Worship is Saturdays at 11:00 AM. Arriving 10–15 minutes early gives you time to park, grab a seat, and meet a few people.'],
  ['What should I wear?', 'Whatever you’re comfortable in. You’ll see everything from jeans and sneakers to suits and dresses. Come as you are.'],
  ['Where do I park and where do I go?', `We’re at ${SITE.street}, ${SITE.city}. Free on-site parking is available — look for a greeter at the main entrance and they’ll point you in the right direction.`],
  ['Why Saturday?', 'Seventh-day Adventists observe the Sabbath — from Friday sunset to Saturday sunset — as a weekly gift of rest, worship, and community, just as described in the Bible. You can read more on our About page.'],
  ['What about my kids?', 'Children are warmly welcome. Ask a greeter about children’s programs and Pathfinders (our youth club for ages 10–15).'],
  ['Do I have to be Adventist to come?', 'Not at all. Whether you’re a lifelong believer, curious, or skeptical, there’s room for you and your questions.'],
  ['Is there anything I need to bring?', 'Just yourself. A Bible is nice but not required — we’ll have everything you need.'],
];
const faqHtml = `<div class="faq rv">${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><div class="ans">${a}</div></details>`).join('')}</div>`;

/* ---------------- HOME ---------------- */
const mini = [
  ['feeding', 'Feeding Ministry', 'Sharing food, hope, and Christ’s love.', P.serve, 'Volunteers sorting food for neighbors'],
  ['prison', 'Prison Ministry', 'Bringing encouragement and God’s Word.', P.hands, 'Hands gathered around a table in prayer'],
  ['pathfinders', 'Pathfinders', 'Building faithful leaders for tomorrow.', P.kids, 'Young people on an outing together'],
  ['sabbath-school', 'Sabbath School', 'Studying God’s Word together.', P.study, 'Friends studying together'],
  ['young-adults', 'Young Adults', 'Real faith. Real community. A greater purpose.', P.friends, 'Young adults together at sunset'],
];
page('/', {
  title: 'Willow Grove SDA Church — Come Worship. Grow in Christ.',
  desc: 'Worship with us Saturdays at 11:00 AM at 1576 Fairview Ave, Willow Grove, PA. A Christ-centered, Bible-based Seventh-day Adventist church family.',
  plain: false,
  body: `
<section class="hero"><div class="hero-bg">${img(P.worship, 'A worshipper lifting a hand in prayer during a church service', 1800, 1000, { eager: true })}</div>
<div class="wrap hero-inner"><h1>Come worship.<br>Grow in Christ.</h1>
  <p class="verse-line">“But grow in the grace and knowledge of our Lord and Savior Jesus Christ…”<small>2 Peter 3:18 (NKJV)</small></p>
  <div class="cta-row"><a class="btn" href="/visit/">Plan Your Visit ${arrow}</a><a class="btn btn--ghost" href="/watch/">Watch Online ${ico('play')}</a></div>
</div></section>

<section class="info-bar" aria-label="Service details"><div class="wrap">
  <div class="it">${ico('cal')}<div><b>Saturdays at 11:00 AM</b><span>Worship Service</span></div></div>
  <a class="it" href="${SITE.map}" rel="noopener">${ico('pin')}<div><b>${SITE.street}<br>${SITE.city}</b></div></a>
  <a class="it" href="tel:${SITE.tel}">${ico('phone')}<div><b>${SITE.phone}</b><span>Call or Text Us</span></div></a>
</div></section>

<section class="sec tint start"><div class="wrap">
  <h2 class="rv">New here? Start here.</h2>
  <div class="grid g3">
    <a class="scard rv" href="/visit/"><div class="ph">${img(P.greet, 'Two people greeting each other warmly', 640, 360)}</div><div class="bd"><span class="ic">${ico('users')}</span><div><b>Plan your visit</b><p>Everything you need to know before you arrive.</p></div><span class="go">${arrow}</span></div></a>
    <a class="scard rv" style="--d:.08s" href="/visit/#expect"><div class="ph">${img(P.pews, 'Rows of wooden pews in a church sanctuary', 640, 360)}</div><div class="bd"><span class="ic">${ico('book')}</span><div><b>What to expect</b><p>A friendly, Christ-centered worship experience.</p></div><span class="go">${arrow}</span></div></a>
    <a class="scard rv" style="--d:.16s" href="/contact/"><div class="ph">${img(P.smile, 'A smiling woman, ready to answer your questions', 640, 360)}</div><div class="bd"><span class="ic">${ico('chat')}</span><div><b>Ask a question</b><p>We’re here to help. Get in touch any time.</p></div><span class="go">${arrow}</span></div></a>
  </div>
</div></section>

<section class="welcome" aria-labelledby="welcome-h">
  ${img(P.church, 'Church members gathered around a table in fellowship', 700, 480)}
  <div class="tx rv"><span class="eyebrow">A welcoming church family</span><h2 id="welcome-h">Growing together in faith, hope, and love.</h2>
    <p>We are a Christ-centered, Bible-based church committed to worship, discipleship, service, and community. No matter where you are on your spiritual journey, you’re welcome here.</p>
    <a class="link-arrow" href="/about/">Learn more about our church ${arrow}</a></div>
  ${img(P.talk, 'Friends talking and laughing together', 700, 480)}
</section>

<section class="word" aria-labelledby="word-h">${img(P.bible, 'An open Bible', 1800, 700)}
  <div class="wrap rv"><h2 id="word-h">The Word that leads, comforts, and transforms.</h2>
    <blockquote>“Your word is a lamp to my feet and a light to my path.”<cite>Psalm 119:105 (NKJV)</cite></blockquote>
    <a class="btn btn--gold" href="/watch/">Watch the latest sermon ${arrow}</a></div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><div><h2>Ministries</h2><p>Discover meaningful ways to serve, grow, and make a difference.</p></div><a class="link-arrow" href="/ministries/">View all ministries ${arrow}</a></div>
  <div class="mgrid">${mini.map(([id, t, d, im, alt], i) => `<a class="mcard rv" style="--d:${i * .05}s" href="/ministries/#${id}">${img(im, alt, 480, 360)}<div><b>${t}</b><span>${d}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec tint" id="expect"><div class="wrap visit-grid">
  <div class="vcard rv"><div class="tx"><h2 style="font-size:1.6rem">What to expect in your first visit</h2><p>We want you to feel at home from the moment you arrive. Our worship is simple, Scripture-centered, and full of gratitude. Come as you are, and bring your questions.</p><a class="link-arrow" href="/visit/">Plan your visit ${arrow}</a></div>${img(P.greet, 'Two people greeting each other warmly', 640, 480)}</div>
  <div class="faq-box rv" style="--d:.08s"><h3>Before you arrive <a class="link-arrow" href="/visit/#faq">View all FAQs ${arrow}</a></h3>
    <div class="faq">${[['Is there parking available?', `Yes — free on-site parking at ${SITE.street}. A greeter at the main entrance will point you the right way.`], ['What should I wear?', 'Whatever you’re comfortable in. You’ll see everything from jeans to suits. Come as you are.'], ['Are children and youth welcome?', 'Absolutely. Ask a greeter about children’s programs and Pathfinders for ages 10–15.'], ['How long is the service?', 'Sabbath School is followed by worship at 11:00 AM. Plan on about two hours in total.']].map(([q, a]) => `<details><summary>${q}</summary><div class="ans">${a}</div></details>`).join('')}</div></div>
</div></section>

<section class="give"><div class="wrap"><div class="rv"><span class="eyebrow">Give with purpose</span><h2>Support a church that makes a difference.</h2>
  <p>Your generous giving helps us worship, serve, and share the hope of God’s Word in our community and beyond.</p><a class="btn" href="${SITE.give}" rel="noopener">Give Online ${arrow}</a></div>
  <div class="seed" aria-hidden="true">${ico('heart')}</div></div></section>

<section class="close" aria-labelledby="close-h">${img(P.talk, 'Friends talking and laughing together', 1800, 600)}
  <div class="wrap"><div class="in rv"><h2 id="close-h">You’re welcome here.</h2><p>Come as you are. Grow with us. Be part of what God is doing in our church and community.</p></div></div></section>`,
});

/* ---------------- INNER PAGES (match ChatGPT mockups) ---------------- */
const hero2 = (title, sub, im, alt) => `
<section class="pg-hero">${img(im, alt, 1800, 600, { eager: true })}<div class="wrap"><h1>${title}</h1><p>${sub}</p></div></section>`;
const infoBar = () => `
<section class="info-bar" aria-label="Service details"><div class="wrap">
  <div class="it">${ico('cal')}<div><b>Saturdays at 11:00 AM</b><span>Worship Service</span></div></div>
  <a class="it" href="${SITE.map}" rel="noopener">${ico('pin')}<div><b>${SITE.street}<br>${SITE.city}</b></div></a>
  <a class="it" href="tel:${SITE.tel}">${ico('phone')}<div><b>${SITE.phone}</b><span>Call or Text Us</span></div></a>
</div></section>`;
const faqs2 = [
  ['What time is the service?', 'Worship begins Saturdays at 11:00 AM. Arriving 10–15 minutes early gives you time to park, find a seat, and meet a few people.'],
  ['Where should I park?', `Free on-site parking is available at ${SITE.street}. A greeter at the main entrance will point you the right way.`],
  ['What about my children?', 'Children and youth are warmly welcome. Ask a greeter about children’s programs, and about Pathfinders for ages 10–15.'],
  ['Do I need to be a Seventh-day Adventist to attend?', 'Not at all. Whether you are a lifelong believer, curious, or still asking questions, you are welcome here.'],
  ['Is there wheelchair accessibility?', 'Please call us at ' + SITE.phone + ' and we will gladly help make your visit comfortable.'],
];
const faqList = list => `<div class="faq">${list.map(([q, a]) => `<details><summary>${q}</summary><div class="ans">${a}</div></details>`).join('')}</div>`;

/* VISIT */
page('/visit/', {
  title: 'Plan a Visit — Willow Grove SDA Church',
  desc: 'Everything you need for your first visit: service time, location, parking, what to wear, and what to expect at Willow Grove SDA Church.',
  body: `${hero2('Plan a Visit', 'You’re always welcome here.', P.greet, 'Two people greeting each other warmly')}${infoBar()}
<section class="sec" id="expect"><div class="wrap">
  <h2 class="rv">What to Expect</h2><p class="lead rv">A warm and friendly, Christ-centered worship, practical teaching from God’s Word, and a community that cares.</p>
  <div class="steps" style="margin-top:2.5rem">
    <div class="step rv"><h3>Arrive</h3><p>Friendly greeters will meet you at the door.</p></div>
    <div class="step rv" style="--d:.06s"><h3>Worship</h3><p>Music, prayer, and a Bible-based message.</p></div>
    <div class="step rv" style="--d:.12s"><h3>Learn</h3><p>Relevant, Christ-centered teaching.</p></div>
    <div class="step rv" style="--d:.18s"><h3>Connect</h3><p>Meet new people and get involved.</p></div>
  </div>
  <div class="grid g3" style="margin-top:3rem">
    <div class="card rv"><span class="ic">${ico('car')}</span><h3>Parking</h3><p>Free parking is available on site, with accessible parking near the entrance.</p></div>
    <div class="card rv" style="--d:.06s"><span class="ic">${ico('shirt')}</span><h3>What to Wear</h3><p>Come as you are. You’ll see a range from casual to business attire.</p></div>
    <div class="card rv" style="--d:.12s"><span class="ic">${ico('users')}</span><h3>Kids &amp; Families</h3><p>Sabbath School classes are available for children and youth.</p></div>
  </div>
</div></section>
<section class="sec tint" id="faq"><div class="wrap faq-split">
  <div class="rv"><h2>Frequently Asked Questions</h2>${faqList(faqs2)}</div>
  <div class="rv" style="--d:.1s">${img(P.talk, 'Friends talking and laughing together', 700, 760, { cls: 'pic tall' })}</div>
</div></section>`,
});

/* ABOUT */
const beliefs = [
  ['Holy Scriptures', 'The Bible is God’s inspired Word and the standard for faith and life.'], ['Trinity', 'One God: Father, Son, and Holy Spirit.'], ['God the Father', 'Creator, source, and sustainer of all, full of love and justice.'],
  ['God the Son', 'Jesus Christ is truly God and truly human, our Savior and Lord.'], ['God the Holy Spirit', 'Active in creation, inspiration, and in drawing us to Jesus.'], ['Creation', 'God created the world in a recent six-day creation and rested on the seventh.'],
  ['Nature of Humanity', 'Made in God’s image, free, and designed for relationship.'], ['Great Controversy', 'All of history is part of a cosmic conflict between good and evil.'], ['Life, Death & Resurrection of Christ', 'Jesus’ life, death, and resurrection provide the only way to salvation.'],
  ['Experience of Salvation', 'By grace through faith, we are made new in Christ.'], ['Growing in Christ', 'Daily walking with Jesus transforms our lives.'], ['The Church', 'A community of believers who confess Jesus as Lord and Savior.'],
  ['Remnant & Its Mission', 'A global movement called to share the everlasting gospel.'], ['Unity in the Body of Christ', 'One body, many people — every nation, culture, and background.'], ['Baptism', 'A public sign of faith, new life, and belonging.'],
  ['Lord’s Supper', 'Communion renews our connection to Christ and each other.'], ['Spiritual Gifts & Ministries', 'God gives every member gifts to serve others.'], ['Gift of Prophecy', 'Ellen G. White’s ministry is viewed as a continuing prophetic gift.'],
  ['Law of God', 'The Ten Commandments reveal God’s love and will.'], ['The Sabbath', 'A weekly gift of rest and worship from Friday to Saturday sunset.'], ['Stewardship', 'We’re caretakers of time, talents, and resources.'],
  ['Christian Behavior', 'A life shaped by purity, health, and wise choices.'], ['Marriage & Family', 'A lifelong, loving union and the foundation of family.'], ['Christ’s Ministry in the Sanctuary', 'Jesus ministers on our behalf in heaven.'],
  ['Second Coming', 'Christ will return personally and visibly.'], ['Death & Resurrection', 'Death is a sleep until the resurrection at Christ’s return.'], ['Millennium & End of Sin', 'A thousand years of peace, then the final end of evil.'], ['New Earth', 'God will make all things new — no more pain or tears.'],
];
const leaders = [[P.face1, 'Pastor Name', 'Senior Pastor'], [P.smile, 'Elder Name', 'Head Elder'], [P.leader, 'Member Name', 'Church Clerk'], [P.face2, 'Deaconess Name', 'Head Deaconess']];
page('/about/', {
  title: 'About — Willow Grove SDA Church',
  desc: 'Who we are, what we believe, and the story of Willow Grove Seventh-day Adventist Church.',
  body: `${hero2('About Us', 'A church family growing together in faith, hope and love.', P.bible, 'An open Bible')}
<section class="sec"><div class="wrap split rv"><div><h2>Who We Are</h2><p>Willow Grove Seventh-day Adventist Church is a community of believers in Willow Grove, Pennsylvania, devoted to following Jesus, sharing His love, and serving our neighbors.</p><p>We gather every Sabbath to worship, to study God’s Word, and to encourage one another — and everyone is welcome.</p><a class="btn" href="/visit/">Plan Your Visit ${arrow}</a></div>
  ${img(P.talk, 'Church members smiling and talking together', 800, 520, { cls: 'pic' })}</div></section>
<section class="sec tint" id="beliefs-intro"><div class="wrap split rv">${img(P.plant, 'A young plant growing in sunlight', 800, 520, { cls: 'pic' })}<div><h2>What We Believe</h2><p>We are part of the worldwide Seventh-day Adventist Church and hold the fundamental beliefs of the Adventist faith — grounded in Scripture, centered on Jesus, and lived out in everyday life.</p><a class="btn" href="#beliefs">Explore Our Beliefs ${arrow}</a></div></div></section>
<section class="sec" id="history"><div class="wrap split rv"><div>${img(P.pews, 'The church sanctuary with wooden pews', 800, 520, { cls: 'pic' })}</div><div><h2>Our History</h2><p>For decades, God has been faithful to this church and our community. Our full story is being gathered — founding year, milestones, and the people who shaped Willow Grove SDA Church.</p><p class="muted-note">History timeline coming soon.</p></div></div></section>
<section class="sec tint" id="leadership"><div class="wrap"><h2 class="rv">Our Leadership</h2>
  <div class="grid g4 leaders">${leaders.map(([im, n, r], i) => `<figure class="lead-card rv" style="--d:${i * .05}s">${img(im, r + ' portrait (placeholder)', 360, 440)}<figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`).join('')}</div></div></section>
<section class="sec" id="beliefs"><div class="wrap"><div class="rv"><span class="eyebrow">Fundamental beliefs</span><h2>28 Beliefs, in brief</h2></div>
  <div class="cols rv">${beliefs.map(([t, d], i) => `<div class="belief"><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div></section>`,
});

/* MINISTRIES */
const mcards = [
  ['feeding', 'Feeding Ministry', 'Providing meals and hope to individuals and families in our community.', P.serve, 'Volunteers sorting food for neighbors'],
  ['prison', 'Prison Ministry', 'Sharing God’s love and encouragement with those who are incarcerated.', P.hands, 'Hands gathered around a table in prayer'],
  ['pathfinders', 'Pathfinders', 'Helping young people grow in Christ through outdoor activities, service, and leadership.', P.kids, 'Young people on an outing together'],
  ['sabbath-school', 'Sabbath School', 'In-depth Bible study for all ages, every Sabbath morning.', P.study, 'Friends studying together'],
];
page('/ministries/', {
  title: 'Ministries — Willow Grove SDA Church',
  desc: 'Feeding ministry, prison ministry, Pathfinders, Sabbath School, and young adults — find where you belong at Willow Grove SDA Church.',
  body: `${hero2('Ministries', 'Serving Christ. Serving People.', P.serve, 'Volunteers serving the community')}
<section class="sec"><div class="wrap">
  <p class="lead center rv">Our ministries help us grow in Christ and make a practical difference in our church and community. There’s a place for you.</p>
  <div class="grid g2 mlist">${mcards.map(([id, t, d, im, alt], i) => `<article class="mrow rv" id="${id}" style="--d:${(i % 2) * .06}s">${img(im, alt, 520, 360)}<div><h2>${t}</h2><p>${d}</p><a class="link-arrow" href="/contact/">Learn more<span class="sr"> about ${t}</span> ${arrow}</a></div></article>`).join('')}
    <article class="mrow rv" id="young-adults">${img(P.friends, 'Young adults together at sunset', 520, 360)}<div><h2>Young Adults</h2><p>A community of young adults seeking to know Jesus, build authentic relationships, and make a difference.</p><a class="link-arrow" href="/contact/">Learn more<span class="sr"> about Young Adults</span> ${arrow}</a></div></article>
    <blockquote class="quote-card rv" style="--d:.06s">“Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace.”<cite>1 Peter 4:10</cite></blockquote>
  </div>
</div></section>`,
});

/* EVENTS — sample entries; replace with the real calendar */
const upcoming = [['Nov', '7', 'Church Fellowship Lunch', 'After Divine Worship', 'Everyone is invited to a time of food and fellowship.'], ['Nov', '14', 'Community Food Distribution', 'Time to be confirmed', 'Helping local families with groceries and essentials.'], ['Nov', '21', 'Pathfinder Club Meeting', 'Time to be confirmed', 'For ages 10–15. Activities, service and more.'], ['Nov', '28', 'Young Adults Bible Study', 'Time to be confirmed', 'A time to study, connect, and grow together.']];
page('/events/', {
  title: 'Events — Willow Grove SDA Church',
  desc: 'Upcoming events and recurring gatherings at Willow Grove SDA Church.',
  body: `${hero2('Events', 'Worship. Learn. Serve. Belong.', P.band, 'A worship team leading singing')}
<section class="sec"><div class="wrap" style="max-width:960px">
  <div class="tabs" aria-label="Events"><a class="on" href="#upcoming">Upcoming Events</a><a href="#recurring">Recurring Gatherings</a></div>
  <div class="stack" id="upcoming">${upcoming.map(([m, d, t, when, p]) => `<div class="event"><div class="date"><span>${m}</span><b>${d}</b></div><div><h2>${t} <span class="tag">Sample</span></h2><p>${when}</p><p>${p}</p></div><span class="go-ic" aria-hidden="true">${arrow}</span></div>`).join('')}
    <p><a class="btn" href="/contact/">Ask About Upcoming Events ${arrow}</a></p></div>
  <h2 id="recurring" style="margin-top:3.5rem">Recurring Gatherings</h2>
  <div class="grid g3" style="margin-top:1rem">
    <div class="card"><span class="ic">${ico('book')}</span><h3>Sabbath School</h3><p>Saturdays · Morning</p></div>
    <div class="card"><span class="ic">${ico('cal')}</span><h3>Divine Worship</h3><p>Saturdays · 11:00 AM</p></div>
    <div class="card"><span class="ic">${ico('users')}</span><h3>Prayer Meeting</h3><p>Midweek · Time to be confirmed</p></div>
  </div>
</div></section>`,
});

/* WATCH */
const sermons = [[P.pulpit, 'Walking in Faith'], [P.light, 'Hope in Difficult Times'], [P.hands, 'A Life of Service']];
page('/watch/', {
  title: 'Watch — Willow Grove SDA Church',
  desc: 'Watch Willow Grove SDA Church services and recent sermons online.',
  body: `${hero2('Watch', 'Be encouraged. Be equipped. Stay connected.', P.pews, 'The church sanctuary')}
<section class="sec"><div class="wrap"><h2 class="rv">Live Stream</h2>
  <div class="live-grid rv"><a class="vid" href="#" aria-label="Play the latest service">${img(P.pulpit, 'A speaker preaching from a pulpit', 900, 506)}<span class="play"><i>${ico('play')}</i></span></a>
    <div class="panel"><h3>Live Stream</h3><p>Join us for Divine Worship every Saturday at 11:00 AM.</p><a class="btn" href="#">Watch Live ${ico('play')}</a><p style="margin:1rem 0 0"><a class="link-arrow" href="#">View on YouTube ${arrow}</a></p></div></div></div></section>
<section class="sec tint"><div class="wrap"><h2 class="rv">Recent Sermons</h2>
  <div class="grid g3">${sermons.map(([im, t], i) => `<div class="rv" style="--d:${i * .06}s"><a class="vid" href="#" aria-label="Play ${t}">${img(im, 'Thumbnail for ' + t, 640, 360)}<span class="play"><i>${ico('play')}</i></span></a><div class="vid-meta"><b>${t}</b><span>Speaker TBC · Date TBC</span></div></div>`).join('')}</div>
  <p style="text-align:center;margin-top:2rem"><a class="btn" href="#">View All Sermons ${arrow}</a></p></div></section>`,
});

/* GIVE */
const gifts = [['church', 'Local Church Ministry', 'Supports worship, discipleship, and daily operations.'], ['heart', 'Community Outreach', 'Helps fund our feeding and community programs.'], ['users', 'Youth & Young Adults', 'Invests in the next generation of leaders.'], ['globe', 'Missions', 'Supports local and global Seventh-day Adventist mission work.']];
page('/give/', {
  title: 'Give — Willow Grove SDA Church',
  desc: 'Support the mission of Willow Grove SDA Church with a secure online gift through Adventist Giving.',
  body: `${hero2('Give', 'A cheerful heart. A lasting impact.', P.hands, 'Hands joined together in giving and prayer')}
<section class="sec"><div class="wrap split rv"><div><p class="lead">Your generosity helps advance the mission of Christ through our church and community.</p><a class="btn" href="${SITE.give}" rel="noopener">Give Online ${arrow}</a><p class="muted-note" style="margin-top:1rem">You’ll complete your gift securely on adventistgiving.org.</p></div>
  ${img(P.plant, 'A young plant growing in sunlight', 800, 440, { cls: 'pic' })}</div></section>
<section class="sec tint"><div class="wrap"><h2 class="rv">Where Your Gifts Go</h2>
  <div class="grid g2">${gifts.map(([ic, t, d], i) => `<div class="card gift rv" style="--d:${(i % 2) * .06}s"><span class="ic">${ico(ic)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div></section>
<section class="word" aria-label="Scripture on giving">${img(P.hands, 'Hands raised in worship', 1800, 600)}<div class="wrap rv" style="margin:0 auto;padding-left:0"><blockquote style="font:500 clamp(1.3rem,1rem + 1.4vw,2rem)/1.35 var(--font-display);color:#fff">“Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.”<cite>2 Corinthians 9:7</cite></blockquote></div></section>`,
});

/* CONTACT */
page('/contact/', {
  title: 'Contact — Willow Grove SDA Church',
  desc: 'Contact Willow Grove SDA Church: address, phone, directions, and a message form.',
  body: `${hero2('Contact Us', 'We’d love to hear from you.', P.pews, 'The church sanctuary')}
<section class="sec"><div class="wrap grid g2" style="align-items:start;gap:3rem">
  <div class="rv"><h2>Get in Touch</h2><p class="muted">Have a question, prayer request, or want to learn more? Fill out the form below and we’ll get back to you.</p>
    <form class="form" data-demo><div class="field"><label for="nm">Name</label><input id="nm" required autocomplete="name"></div><div class="field"><label for="em">Email</label><input id="em" type="email" required autocomplete="email"></div><div class="field"><label for="ms">Message</label><textarea id="ms" required></textarea></div><button class="btn" type="submit">Send Message</button></form><p class="form-ok" role="status" tabindex="-1">Thank you! We’ll be in touch soon.</p></div>
  <div class="rv" style="--d:.08s"><h2>Our Information</h2>
    <ul class="info-list"><li><span class="ic">${ico('pin')}</span><div><b>${SITE.street}</b><a href="${SITE.map}" rel="noopener">${SITE.city}</a></div></li><li><span class="ic">${ico('phone')}</span><div><b>Phone</b><a href="tel:${SITE.tel}">${SITE.phone}</a></div></li><li><span class="ic">${ico('cal')}</span><div><b>Worship</b><span>Saturdays at 11:00 AM</span></div></li></ul>
    <div class="map" style="margin-top:1.6rem"><iframe title="Map to Willow Grove SDA Church" loading="lazy" src="https://maps.google.com/maps?q=1576%20Fairview%20Ave%2C%20Willow%20Grove%2C%20PA%2019090&z=14&output=embed"></iframe></div>
    <p style="margin-top:1rem"><a class="btn btn--outline" href="${SITE.map}" rel="noopener">View on Google Maps ${arrow}</a></p></div>
</div></section>`,
});

/* ---------------- WRITE ---------------- */
for (const p of pages) {
  const dir = p.path === '/' ? out : join(out, p.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), layout(p));
}
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${SITE.url}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'llms.txt'), `# ${SITE.name}\n> A welcoming Seventh-day Adventist church in Willow Grove, PA. Worship Saturdays at 11:00 AM, ${SITE.street}, ${SITE.city}. Phone ${SITE.phone}.\n\n## Pages\n${pages.map(p => `- [${p.title}](${SITE.url}${p.path}): ${p.desc}`).join('\n')}\n`);
writeFileSync(join(out, 'assets/img/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#1E4FD8"/><path d="M32 12v40M20 24h24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`);
console.log(`Built ${pages.length} pages → dist/`);
