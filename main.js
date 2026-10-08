(() => {
  // WhatsApp e endereço do link da bio (rosa-franca-bio.pages.dev)
  const WA_NUMBER = '5511920626631';
  const ENDERECO = 'R. Pedro Luís Garcia, 39 - Centro, Itapevi - SP';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduce;
  const wa = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  /* ================= links ================= */
  $$('[data-wa-msg]').forEach(a => { a.href = wa(a.dataset.waMsg); });
  $$('[data-map]').forEach(a => { a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ENDERECO); });

  /* ================= portfólio (fotos reais do link da bio) ================= */
  const PROJETOS = [
    { n: '01', c: 'Cozinha', l: 'Cozinha planejada', a: 'Cozinha planejada com armários verdes, painéis em madeira clara e bancada e revestimento em mármore branco' },
    { n: '02', c: 'Escritório', l: 'Escritório planejado', a: 'Escritório com estante iluminada em laca branca, cantinho do café e bancada de trabalho em madeira' },
    { n: '03', c: 'Sala', l: 'Living integrado', a: 'Living integrado à cozinha azul marinho, com sofá, varanda e vista para a cidade' },
    { n: '04', c: 'Studio', l: 'Studio planejado', a: 'Studio com painel de armários azuis, tablado em madeira separando dormitório e living' },
    { n: '05', c: 'Home office', l: 'Home office retrátil', a: 'Armário azul com bancada retrátil que abre formando mesa de home office sobre a TV' },
    { n: '06', c: 'Cozinha', l: 'Cozinha compacta', a: 'Cozinha compacta com armários azuis até o teto, bancada de granito e adega vertical em madeira' },
    { n: '07', c: 'Sala', l: 'Living e dormitório', a: 'Ambiente integrado com estante em madeira, rack, cama e painel de armários azuis ao fundo' },
    { n: '08', c: 'Cozinha', l: 'Cozinha em madeira', a: 'Cozinha planejada em madeira clara com nichos aéreos, bancada de granito e forno embutido' },
    { n: '09', c: 'Banheiro', l: 'Gabinete de banheiro', a: 'Gabinete de banheiro suspenso em madeira clara com cuba esculpida em superfície branca' },
    { n: '10', c: 'Showroom', l: 'Showroom Rosa França', a: 'Showroom com parede ripada, estantes de amostras, mesa de reunião e estações de atendimento' },
    { n: '11', c: 'Showroom', l: 'Mostruário de acabamentos', a: 'Estante com iluminação embutida exibindo amostras de acabamentos, sobre balcão com portas em palhinha' },
    { n: '12', c: 'Home office', l: 'Home office', a: 'Home office com bancada suspensa em madeira, prateleira iluminada e guarda-roupa off-white ao lado' },
    { n: '13', c: 'Infantil', l: 'Quarto de bebê', a: 'Quarto de bebê com cômoda de palhinha e trocador, ao lado de estante em madeira com iluminação embutida' },
    { n: '14', c: 'Copa', l: 'Espaço café', a: 'Nicho de copa com balcão suspenso em madeira, cuba e cafeteira, sobre parede laranja terracota' },
    { n: '15', c: 'Comercial', l: 'Recepção de clínica', a: 'Recepção de clínica com balcão em madeira, parede laranja terracota, sofá curvo e espelho' },
    { n: '16', c: 'Cozinha', l: 'Cozinha com nichos iluminados', a: 'Cozinha planejada em madeira clara com nichos iluminados, revestimento marmorizado e forno embutido' },
    { n: '17', c: 'Lavabo', l: 'Lavabo', a: 'Lavabo com parede verde, gabinete suspenso amadeirado, cuba oval e espelho orgânico' },
    { n: '18', c: 'Quarto', l: 'Dormitório casal', a: 'Dormitório de casal com painel ripado em madeira, armários brancos até o teto e criados-mudos embutidos' }
  ];
  const DESTAQUES = ['01', '03', '13', '04', '17', '12', '14', '08', '18', '15', '05', '09'];
  const src = n => `img/projeto-${n}.jpg`;

  const track = $('[data-track]');
  DESTAQUES.forEach((n, k) => {
    const p = PROJETOS.find(x => x.n === n);
    const f = document.createElement('figure');
    f.className = 'panel work';
    f.dataset.cursor = 'Ampliar';
    f.dataset.lb = PROJETOS.indexOf(p);
    f.tabIndex = 0;
    f.setAttribute('role', 'button');
    f.setAttribute('aria-label', `Ampliar: ${p.l}`);
    f.innerHTML = `<div class="work__frame"><img src="${src(n)}" width="820" height="1024" loading="lazy" decoding="async" alt="${p.a}" data-par></div>
      <figcaption><span>${p.l}</span><i>${String(k + 1).padStart(2, '0')}</i></figcaption>`;
    track.append(f);
  });
  $('[data-works-total]').textContent = String(DESTAQUES.length).padStart(2, '0');

  /* ================= lightbox ================= */
  const lb = $('[data-lb]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]'), lbThumbs = $('[data-lb-thumbs]');
  let lbI = 0, lastFocus = null;
  PROJETOS.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', p.l);
    b.innerHTML = `<img src="${src(p.n)}" alt="" loading="lazy">`;
    b.addEventListener('click', () => showLb(i));
    lbThumbs.append(b);
  });
  const showLb = i => {
    lbI = (i + PROJETOS.length) % PROJETOS.length;
    const p = PROJETOS[lbI];
    lbImg.src = src(p.n); lbImg.alt = p.a;
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbCap.textContent = `${p.c} · ${p.l}`;
    $$('button', lbThumbs).forEach((b, k) => b.classList.toggle('is-on', k === lbI));
    const on = lbThumbs.children[lbI]; if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  };
  const openLb = i => { lastFocus = document.activeElement; lb.hidden = false; showLb(i); if (lenis) lenis.stop(); document.body.style.overflow = 'hidden'; $('[data-lb-close]').focus(); };
  const closeLb = () => { lb.hidden = true; if (lenis) lenis.start(); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  $$('.work').forEach(w => {
    w.addEventListener('click', () => openLb(+w.dataset.lb));
    w.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(+w.dataset.lb); } });
  });
  $('[data-open-all]').addEventListener('click', () => openLb(0));
  $('[data-lb-close]').addEventListener('click', closeLb);
  $('[data-lb-prev]').addEventListener('click', () => showLb(lbI - 1));
  $('[data-lb-next]').addEventListener('click', () => showLb(lbI + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') showLb(lbI + 1);
    if (e.key === 'ArrowLeft') showLb(lbI - 1);
  });
  let tsx = 0;
  lb.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tsx; if (Math.abs(dx) > 50) showLb(lbI + (dx < 0 ? 1 : -1)); });

  /* ================= texto em palavras ================= */
  const split = (el, inner) => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const d = (i++ * .06) + 's';
            if (inner) { const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--d', d); w.append(s); }
            else { w.textContent = part; w.style.setProperty('--d', d); }
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  };
  $$('[data-split]').forEach(el => split(el, true));
  $$('[data-words], [data-scrub]').forEach(el => split(el, false));

  /* ================= revelar por interseção ================= */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px' });
  $$('[data-words], [data-clip]').forEach(el => io.observe(el));

  // vídeos só tocam quando aparecem
  const vio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !reduce) e.target.play().catch(() => {}); else e.target.pause();
  }), { threshold: .1 });
  $$('video').forEach(v => vio.observe(v));

  /* ================= nav ================= */
  const nav = $('.nav'), toggle = $('.nav__toggle'), float = $('.float');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  /* ================= rolagem suave ================= */
  let lenis = null;
  if (motion && window.Lenis) {
    lenis = new Lenis({ lerp: .085, smoothWheel: true });
    lenis.stop();
  }
  const scrollToEl = target => {
    if (target == null) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else if (target === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const t = id === '#top' ? 0 : $(id);
    if (t == null) return;
    e.preventDefault(); closeMenu(); scrollToEl(t);
  }));

  /* ================= planta interativa ================= */
  const ROOMS = {
    cozinha:   { k: 'Cozinha', img: '01', t: 'Armários até o teto, nichos iluminados e bancadas pensadas para a rotina de quem cozinha.' },
    sala:      { k: 'Sala e living', img: '03', t: 'Rack, painel e estantes integrando sala e cozinha, aproveitando cada parede.' },
    varanda:   { k: 'Varanda gourmet', img: '06', t: 'Armários e bancada para transformar a varanda em extensão da cozinha.' },
    lavabo:    { k: 'Lavabo', img: '17', t: 'Gabinete suspenso, cuba e espelho. O ambiente pequeno que mais impressiona as visitas.' },
    servico:   { k: 'Área de serviço', img: '14', t: 'Armários e nichos que escondem a bagunça e organizam a lavanderia.' },
    office:    { k: 'Home office', img: '12', t: 'Bancada suspensa, prateleiras iluminadas ou até mesa retrátil que some quando o trabalho acaba.' },
    quarto:    { k: 'Quarto casal', img: '18', t: 'Guarda-roupa até o teto, painel ripado e criados-mudos embutidos na cabeceira.' },
    banheiro:  { k: 'Banheiro', img: '09', t: 'Gabinete sob medida com cuba esculpida e espaço para tudo o que a rotina pede.' },
    infantil:  { k: 'Quarto infantil', img: '13', t: 'Cômoda com trocador, estante iluminada e móveis que acompanham o crescimento.' },
    comercial: { k: 'Ambiente comercial', img: '15', t: 'Recepções, clínicas, lojas e escritórios com a mesma linguagem do projeto residencial.' }
  };
  const picked = new Set();
  const pv = $('.preview'), pvImg = $('[data-pv-img]'), pvK = $('[data-pv-k]'), pvT = $('[data-pv-t]'), pickedBox = $('[data-picked]');
  pvImg.alt = PROJETOS[0].a;
  let pvKey = 'cozinha', swapT;
  const preview = key => {
    if (key === pvKey) return;
    pvKey = key;
    const r = ROOMS[key];
    pv.classList.add('is-swap');
    clearTimeout(swapT);
    swapT = setTimeout(() => {
      pvImg.src = src(r.img); pvImg.alt = (PROJETOS.find(p => p.n === r.img) || {}).a || r.k;
      pvK.textContent = r.k; pvT.textContent = r.t;
      pv.classList.remove('is-swap');
    }, 220);
  };
  const renderPicked = () => {
    pickedBox.innerHTML = '';
    if (!picked.size) { pickedBox.innerHTML = '<em>Nenhum ainda. Toque na planta.</em>'; return; }
    picked.forEach(k => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = ROOMS[k].k; b.setAttribute('aria-label', `Remover ${ROOMS[k].k}`);
      b.addEventListener('click', () => toggleRoom(k));
      pickedBox.append(b);
    });
  };
  const toggleRoom = k => {
    const on = !picked.has(k);
    on ? picked.add(k) : picked.delete(k);
    $$(`[data-room="${k}"]`).forEach(el => { el.classList.toggle('is-on', on); el.setAttribute('aria-pressed', on); });
    if (on) preview(k);
    renderPicked();
  };
  $$('[data-room]').forEach(el => {
    const k = el.dataset.room;
    el.addEventListener('click', () => toggleRoom(k));
    el.addEventListener('keydown', e => { if (el.tagName !== 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleRoom(k); } });
    el.addEventListener('pointerenter', () => { preview(k); el.classList.add('is-peek'); });
    el.addEventListener('pointerleave', () => el.classList.remove('is-peek'));
    el.addEventListener('focus', () => preview(k));
  });

  /* ================= formulário -> WhatsApp ================= */
  const form = $('[data-form]'), err = $('[data-err]');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const nome = (f.get('nome') || '').trim();
    const nomeField = form.nome.closest('.field');
    if (!nome) { nomeField.classList.add('is-bad'); err.textContent = 'Informe seu nome para a equipe saber com quem está falando.'; form.nome.focus(); return; }
    nomeField.classList.remove('is-bad'); err.textContent = '';
    const cidade = (f.get('cidade') || '').trim();
    const amb = [...picked].map(k => ROOMS[k].k);
    const lines = [
      `Olá, Rosa França! Meu nome é ${nome}.`,
      `${f.get('momento')} e quero um orçamento de móveis planejados.`,
      amb.length ? `Ambientes: ${amb.join(', ')}.` : 'Ainda não defini os ambientes.',
      cidade && `Cidade/bairro: ${cidade}.`,
      '(Vim pelo site)'
    ].filter(Boolean);
    window.open(wa(lines.join('\n')), '_blank', 'noopener');
  });
  form.nome.addEventListener('input', () => { form.nome.closest('.field').classList.remove('is-bad'); err.textContent = ''; });

  $('[data-year]').textContent = new Date().getFullYear();

  /* ================= cursor + magnético ================= */
  if (fine && !reduce) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('[data-cursor-label]');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const lab = e.target.closest('[data-cursor]');
      cur.classList.toggle('is-label', !!lab);
      if (lab) label.textContent = lab.dataset.cursor;
      cur.classList.toggle('is-hover', !lab && !!e.target.closest('a, button, .room, label, summary'));
    });
    const loop = () => { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .32}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transition = 'transform .6s cubic-bezier(.2,.7,.1,1)'; el.style.transform = ''; setTimeout(() => el.style.transition = '', 600); });
    });
  }

  /* ================= avaliações: trilho infinito + arrastar ================= */
  const rail = $('[data-rail]'), rtrack = $('[data-rail-track]');
  [...rtrack.children].forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); rtrack.append(c); });
  [...rtrack.children].slice(0, 4).forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); rtrack.append(c); });
  const cards = $$('.rv', rtrack);
  let tx = 0, vel = 0, dragging = false, lastX = 0, half = 0, railOn = false, scrollVel = 0;
  const measure = () => { half = (rtrack.scrollWidth - parseFloat(getComputedStyle(rtrack).paddingLeft) * 2) / 3; };
  measure(); addEventListener('resize', measure);
  new IntersectionObserver(([e]) => { railOn = e.isIntersecting; }).observe(rail);
  rail.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; rail.classList.add('is-drag'); rail.setPointerCapture(e.pointerId); });
  rail.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; tx += dx; vel = dx; });
  const endDrag = () => { dragging = false; rail.classList.remove('is-drag'); };
  rail.addEventListener('pointerup', endDrag); rail.addEventListener('pointercancel', endDrag);
  const railLoop = () => {
    if (railOn) {
      if (!dragging) { vel *= .92; tx += vel - (reduce ? 0 : .5) - scrollVel * .35; }
      if (half) { while (tx <= -half) tx += half; while (tx > 0) tx -= half; }
      rtrack.style.transform = `translate3d(${tx}px,0,0)`;
      const sk = clamp((dragging ? vel : vel + scrollVel) * -.22, -7, 7);
      cards.forEach(p => p.style.setProperty('--skew', sk.toFixed(2) + 'deg'));
    }
    requestAnimationFrame(railLoop);
  };
  railLoop();

  /* ================= ticker ================= */
  const tick = $('.ticker__track');
  tick.innerHTML += tick.innerHTML;
  let tk = 0;
  const tickLoop = () => {
    tk -= (reduce ? 0 : .55) + Math.abs(scrollVel) * .5;
    const w = tick.scrollWidth / 2;
    if (w && tk <= -w) tk += w;
    tick.style.transform = `translate3d(${tk}px,0,0)`;
    requestAnimationFrame(tickLoop);
  };
  tickLoop();

  /* ================= sequência da obra (canvas) ================= */
  const FRAMES = 155;
  const canvas = $('[data-obra-canvas]'), ctx = canvas.getContext('2d');
  const frames = new Array(FRAMES);
  const frameSrc = i => `img/seq/f${String(i + 1).padStart(3, '0')}.webp`;
  let curFrame = 0, drawn = -1;
  const sizeCanvas = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    drawn = -1; draw(curFrame);
  };
  // procura o quadro carregado mais próximo enquanto o resto chega
  const nearest = i => {
    for (let d = 0; d < FRAMES; d++) {
      if (frames[i - d] && frames[i - d].complete && frames[i - d].naturalWidth) return frames[i - d];
      if (frames[i + d] && frames[i + d].complete && frames[i + d].naturalWidth) return frames[i + d];
    }
    return null;
  };
  function draw(i) {
    curFrame = i;
    const img = nearest(i);
    if (!img || !canvas.width) return;
    if (drawn === i && img === frames[i]) return;
    drawn = img === frames[i] ? i : -1;
    const cw = canvas.width, ch = canvas.height, ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    let w, h;
    if (cr > ir) { w = cw; h = cw / ir; } else { h = ch; w = ch * ir; }
    // em tela vertical, puxa o enquadramento um pouco para a esquerda (onde ficam os móveis)
    const fx = cr < 1 ? .45 : .5;
    ctx.drawImage(img, (cw - w) * fx, (ch - h) / 2, w, h);
  }
  const loadFrame = i => new Promise(r => {
    if (frames[i]) return r();
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => { if (Math.abs(i - curFrame) < 6) draw(curFrame); r(); };
    // uma nova tentativa se a rede falhar
    im.onerror = () => { if (im.dataset.retry) return r(); im.dataset.retry = 1; setTimeout(() => { im.src = frameSrc(i) + '?r=1'; }, 800); };
    im.src = frameSrc(i);
    frames[i] = im;
  });
  const loadSequence = async () => {
    await loadFrame(0); draw(0);
    // primeiro um quadro a cada 8, depois preenche; no máximo 6 pedidos por vez
    const order = [];
    for (const step of [8, 4, 2, 1]) for (let i = 0; i < FRAMES; i += step) if (!order.includes(i)) order.push(i);
    const worker = async () => { while (order.length) await loadFrame(order.shift()); };
    await Promise.all(Array.from({ length: 6 }, worker));
  };
  addEventListener('resize', sizeCanvas);
  const chaps = $$('[data-chap]'), needle = $('[data-needle]'), pct = $('[data-obra-pct]');
  const CHAP_AT = [0, 25 / 154, 50 / 154, 85 / 154];
  let chapIdx = 0;
  const setObra = p => {
    draw(Math.round(p * (FRAMES - 1)));
    needle.style.left = (p * 100).toFixed(2) + '%';
    pct.textContent = Math.round(p * 100);
    let idx = 0;
    CHAP_AT.forEach((t, k) => { if (p >= t) idx = k; });
    if (idx !== chapIdx) {
      chapIdx = idx;
      chaps.forEach((c, k) => { c.classList.toggle('is-active', k === idx); c.classList.toggle('is-past', k < idx); });
    }
  };
  // começa a carregar quando a seção se aproxima
  new IntersectionObserver(([e], ob) => { if (e.isIntersecting) { ob.disconnect(); sizeCanvas(); loadSequence(); } }, { rootMargin: '150% 0px' }).observe($('[data-obra]'));

  /* ================= barra, nav, flutuante ================= */
  const bar = $('[data-progress]');
  let lastY = 0, heroEnd = innerHeight;
  const onScroll = y => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const past = y > heroEnd - 90;
    nav.classList.toggle('is-solid', past);
    nav.classList.toggle('is-hidden', past && y > lastY + 2 && !nav.classList.contains('is-open'));
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    float.classList.toggle('is-on', past);
    lastY = y;
  };

  /* ================= nota do Google ================= */
  const scoreN = $('[data-score-n]');
  const countScore = () => {
    if (!motion) { scoreN.textContent = '5,0'; return; }
    const o = { v: 0 };
    gsap.to(o, { v: 5, duration: 1.6, ease: 'power3.out', onUpdate: () => { scoreN.textContent = o.v.toFixed(1).replace('.', ','); } });
    gsap.from('.score__stars svg', { scale: 0, rotate: -90, stagger: .1, duration: .6, ease: 'back.out(2.4)', delay: .4 });
  };
  new IntersectionObserver(([e], ob) => { if (e.isIntersecting) { ob.disconnect(); countScore(); } }, { threshold: .4 }).observe($('[data-score]'));

  /* ================= sem GSAP / movimento reduzido ================= */
  if (!motion) {
    $('.loader').remove();
    document.body.classList.remove('is-loading');
    $('.hero').classList.add('is-in');
    $('[data-split]').classList.add('is-in');
    $$('.manifesto__text .w').forEach(w => w.classList.add('on'));
    // sem animação, mostra a loja pronta
    const showLast = () => { sizeCanvas(); loadFrame(FRAMES - 1).then(() => setObra(1)); };
    showLast();
    heroEnd = innerHeight;
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    onScroll(scrollY);
    return;
  }

  /* ================= GSAP ================= */
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', e => { ScrollTrigger.update(); scrollVel = clamp(e.velocity || 0, -60, 60); onScroll(e.scroll); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  }
  gsap.ticker.add(() => { scrollVel *= .9; });
  const mm = gsap.matchMedia();

  /* ---------- HERO ---------- */
  const hero = $('[data-hero]'), fig = $('[data-hero-fig]'), word = $('[data-hero-word]'), wordIn = $('.hero__word-in');
  const stage = $('.hero__stage');
  gsap.set(fig, { xPercent: -50 });
  gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: () => '+=' + innerHeight, scrub: true,
      onRefresh: () => { heroEnd = hero.offsetHeight - innerHeight; } }
  })
    .to(wordIn, { xPercent: -30, ease: 'none', duration: 1 }, 0)
    .to(fig, { scale: .84, yPercent: 4, ease: 'none', duration: 1 }, 0)
    .fromTo('[data-hero-tag]', { y: 0, opacity: 1 }, { y: -90, opacity: 0, ease: 'power1.in', duration: .55, immediateRender: false }, 0)
    .fromTo('[data-hero-side], .hero__hint, .hero__title-block', { y: 0, opacity: 1 }, { y: -60, opacity: 0, ease: 'power1.in', duration: .45, immediateRender: false }, 0)
    .to('.hero__grid', { scale: 1.25, opacity: .4, ease: 'none', duration: 1 }, 0);
  // a próxima seção sobe por cima e o palco recua
  gsap.fromTo(stage, { scale: 1, borderRadius: 0, filter: 'brightness(1)' }, { scale: .9, borderRadius: 24, filter: 'brightness(.4)', ease: 'none',
    scrollTrigger: { trigger: '[data-manifesto]', start: 'top bottom', end: 'top top', scrub: true } });

  if (fine) {
    const qfx = gsap.quickTo(fig, 'x', { duration: 1.2, ease: 'power3' });
    const qwx = gsap.quickTo(word, 'x', { duration: 1.6, ease: 'power3' });
    const qwy = gsap.quickTo(word, 'y', { duration: 1.6, ease: 'power3' });
    const glow = $('[data-glow]'), grid = $('.hero__grid');
    hero.addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      qfx(x * 24); qwx(x * -60); qwy(y * -24);
      glow.style.setProperty('--gx', (e.clientX / innerWidth * 100).toFixed(1) + '%');
      glow.style.setProperty('--gy', (e.clientY / innerHeight * 100).toFixed(1) + '%');
      grid.style.backgroundPosition = `calc(50% + ${x * 30}px) calc(50% + ${y * 30}px)`;
    });
  }

  /* ---------- MANIFESTO ---------- */
  const scrubWords = $$('.w', $('.manifesto [data-scrub]'));
  const light = (words, p) => { const lit = Math.round(p * words.length); words.forEach((w, k) => w.classList.toggle('on', k < lit)); };
  const orb = $('[data-orb]');
  mm.add('(min-width: 761px)', () => {
    gsap.fromTo(orb, { scale: .55, opacity: 0, rotate: -6, yPercent: -50 }, { scale: 1, opacity: 1, rotate: 0, yPercent: -50, ease: 'none',
      scrollTrigger: { trigger: '[data-manifesto]', start: 'top 60%', end: 'top top', scrub: true } });
  });
  mm.add('(max-width: 760px)', () => {
    gsap.set(orb, { top: 'auto', bottom: '6vh', right: 'var(--pad)', width: '38vw' });
    gsap.fromTo(orb, { scale: .55, opacity: 0, yPercent: 0 }, { scale: 1, opacity: 1, yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '[data-manifesto]', start: 'top 60%', end: 'top top', scrub: true } });
  });
  ScrollTrigger.create({ trigger: '[data-manifesto]', start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate: s => light(scrubWords, clamp(s.progress * 1.15, 0, 1)) });

  /* ---------- OBRA: o showroom se constrói com a rolagem ---------- */
  const obraP = { p: 0 };
  gsap.to(obraP, { p: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-obra]', start: 'top top', end: '+=320%', pin: '.obra__pin', scrub: .6, anticipatePin: 1 },
    onUpdate: () => setObra(obraP.p) });
  gsap.from('.obra__head > *', { y: 50, opacity: 0, stagger: .12, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '[data-obra]', start: 'top 60%' } });

  /* ---------- PROJETOS (horizontal) ---------- */
  const works = $('[data-works]'), wbar = $('[data-works-bar]'), wn = $('[data-works-n]');
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  const wList = $$('.work');
  const hTween = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: works, start: 'top top', end: () => '+=' + dist(), pin: '.works__pin', scrub: 1, invalidateOnRefresh: true,
      onUpdate: s => {
        wbar.style.transform = `scaleX(${s.progress})`;
        wn.textContent = String(Math.min(wList.length, Math.floor(s.progress * wList.length) + 1)).padStart(2, '0');
      } }
  });
  $$('[data-par]').forEach(im => {
    gsap.fromTo(im, { xPercent: -6 }, { xPercent: 6, ease: 'none',
      scrollTrigger: { trigger: im.closest('.panel'), containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true } });
  });
  wList.forEach(p => {
    gsap.from(p, { y: 80, opacity: 0, rotate: 2, ease: 'power2.out',
      scrollTrigger: { trigger: p, containerAnimation: hTween, start: 'left 100%', end: 'left 65%', scrub: true } });
  });

  /* ---------- PLANTA: desenhar as paredes ---------- */
  const walls = $$('.room rect, .planta__wall, .planta__dims line');
  walls.forEach(r => { const L = r.getTotalLength ? r.getTotalLength() : 800; r.style.strokeDasharray = L; r.style.strokeDashoffset = L; });
  gsap.to(walls, { strokeDashoffset: 0, duration: 1.8, stagger: .06, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.planta', start: 'top 70%', once: true },
    onComplete: () => walls.forEach(r => { r.style.strokeDasharray = 'none'; }) });
  gsap.from('.room text, .planta__hall, .planta__hall-t', { opacity: 0, y: 8, duration: .8, stagger: .03, ease: 'power2.out', delay: .9,
    scrollTrigger: { trigger: '.planta', start: 'top 70%', once: true } });
  gsap.from('.plan__side > *', { y: 60, opacity: 0, stagger: .15, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.plan__side', start: 'top 80%' } });

  /* ---------- CHAVES ---------- */
  gsap.fromTo('[data-par-y]', { yPercent: -8 }, { yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '.keys', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('[data-key]', { x: -40, opacity: 0, stagger: .12, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.keys__list', start: 'top 80%' } });

  /* ---------- DIFERENCIAIS: cartas empilhadas ---------- */
  const scards = $$('[data-scard]');
  scards.forEach((c, i) => {
    const next = scards[i + 1];
    if (!next) return;
    gsap.fromTo(c, { scale: 1, filter: 'brightness(1)' }, { scale: .9, filter: 'brightness(.55)', ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true } });
  });
  scards.forEach(c => {
    gsap.from(c.querySelectorAll('h3, p, .scard__img'), { y: 50, opacity: 0, stagger: .1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: c, start: 'top 70%' } });
  });

  /* ---------- PROCESSO ---------- */
  const ticksG = $('.method__ticks');
  for (let k = 0; k < 60; k++) {
    const a = k / 60 * Math.PI * 2, r1 = 96, r2 = k % 15 === 0 ? 106 : 100;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', 100 + Math.cos(a) * r1); l.setAttribute('y1', 100 + Math.sin(a) * r1);
    l.setAttribute('x2', 100 + Math.cos(a) * r2); l.setAttribute('y2', 100 + Math.sin(a) * r2);
    ticksG.append(l);
  }
  const steps = $$('[data-mstep]'), mnum = $('[data-m-num]'), dial = $('[data-dial]');
  let mIdx = 0;
  ScrollTrigger.create({
    trigger: '[data-method]', start: 'top top', end: '+=240%', pin: true, scrub: true,
    onUpdate: s => {
      dial.style.strokeDashoffset = 565.5 * (1 - s.progress);
      const idx = Math.min(steps.length - 1, Math.floor(s.progress * steps.length * .999));
      if (idx === mIdx) return;
      mIdx = idx;
      steps.forEach((st, k) => { st.classList.toggle('is-active', k === idx); st.classList.toggle('is-past', k < idx); });
      gsap.fromTo(mnum, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'power3.out' });
      mnum.textContent = String(idx + 1).padStart(2, '0');
    }
  });

  /* ---------- SHOWROOM: a janela abre até a tela cheia ---------- */
  const rxMedia = $('[data-roomx-media]');
  const rxStart = () => innerWidth < 641 ? [25, 15] : [22, 30];
  const rxState = { p: 0 };
  const paintRx = () => {
    const [v, h] = rxStart(), q = 1 - rxState.p;
    rxMedia.style.clipPath = `inset(${(v * q).toFixed(2)}% ${(h * q).toFixed(2)}% ${(v * q).toFixed(2)}% ${(h * q).toFixed(2)}% round ${(999 * q * q).toFixed(0)}px)`;
    rxMedia.style.setProperty('--shade', clamp((rxState.p - .55) / .35, 0, 1).toFixed(3));
  };
  gsap.timeline({ scrollTrigger: { trigger: '[data-roomx]', start: 'top top', end: '+=160%', pin: '.room-x__pin', scrub: true } })
    .to(rxState, { p: 1, ease: 'none', duration: 1, onUpdate: paintRx }, 0)
    .fromTo('[data-roomx-copy]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'power2.out', duration: .35 }, .65);
  paintRx();

  /* ---------- SOBRE ---------- */
  gsap.fromTo('.about__photo img', { yPercent: -10 }, { yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '[data-portrait]', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('[data-reel]', { y: 120, rotate: 4 }, { y: -40, rotate: -2, ease: 'none',
    scrollTrigger: { trigger: '[data-portrait]', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- FINAL + RODAPÉ ---------- */
  gsap.fromTo('.final__mark', { scale: .7, rotate: -8 }, { scale: 1.15, rotate: 0, ease: 'none',
    scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.foot__big', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* ================= ABERTURA ================= */
  const count = $('[data-count]');
  const heroImg = $('.hero__figure img');
  const strokes = $$('.loader__stroke > *');
  strokes.forEach(s => { const L = s.getTotalLength(); s.style.strokeDasharray = L; s.style.strokeDashoffset = L; });
  const ready = Promise.all([
    heroImg.complete ? Promise.resolve() : new Promise(r => { heroImg.onload = heroImg.onerror = r; }),
    document.fonts ? document.fonts.ready : Promise.resolve()
  ]);
  const cap = new Promise(r => setTimeout(r, 4000));
  const counter = { v: 0 };
  const intro = gsap.timeline({ paused: true });
  intro
    .to('.loader__fill', { opacity: 1, duration: .5, ease: 'power1.out' })
    .to('.loader__stroke', { opacity: 0, duration: .4 }, '<')
    .to('.loader__inner, .loader__coord', { y: -30, opacity: 0, duration: .6, ease: 'power2.in' }, '+=.15')
    .to('.loader__count, .loader__grid', { opacity: 0, duration: .4 }, '<')
    .to('.loader__panel', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, '-=.15')
    .from(fig, { yPercent: 16, scale: 1.1, opacity: 0, duration: 1.8, ease: 'expo.out' }, '-=.7')
    .from(wordIn, { yPercent: 60, opacity: 0, duration: 1.6, ease: 'expo.out' }, '<.1')
    .add(() => {
      hero.classList.add('is-in'); $('[data-split]').classList.add('is-in');
      document.body.classList.remove('is-loading');
      $('.loader').style.display = 'none';
      if (lenis) lenis.start();
      ScrollTrigger.refresh();
    }, '<.2');

  gsap.to(strokes, { strokeDashoffset: 0, duration: 1.4, stagger: .1, ease: 'power2.inOut' });
  const countTween = gsap.to(counter, { v: 92, duration: 1.5, ease: 'power2.out', onUpdate: () => { count.textContent = Math.round(counter.v); } });
  Promise.race([Promise.all([ready, new Promise(r => setTimeout(r, 1700))]), cap]).then(() => {
    countTween.kill();
    gsap.to(counter, { v: 100, duration: .35, ease: 'power1.out', onUpdate: () => { count.textContent = Math.round(counter.v); }, onComplete: () => intro.play() });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
