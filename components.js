/* Componentes Vue 3 compartilhados (build global via CDN, sem bundler)
   Requer vehicles.js carregado antes deste arquivo. */
const { ref, computed, onMounted } = Vue;

const modelLink = m => `modelo.html?id=${m.id}`;

/* ---------- Imagem do veículo ----------
   Se model.image estiver preenchido, usa a foto; senão desenha a ilustração vetorial. */
const CAR_BODIES = {
  hatch: { left: 70, right: 530, roof: 62,
    top: "V138 Q70 126 84 122 L128 114 L172 70 Q180 62 196 62 H340 Q362 62 376 76 L412 112 L500 124 Q530 130 530 150 V182",
    win: "M142 112 L176 74 Q182 68 196 68 H262 V112 Z M272 68 H338 Q354 68 364 78 L394 112 H272 Z" },
  suv: { left: 50, right: 552, roof: 52,
    top: "V142 Q50 126 70 121 L120 112 L170 62 Q180 52 200 52 H400 Q420 52 432 64 L482 112 L535 122 Q552 128 552 148 V182",
    win: "M140 110 L178 68 Q182 63 196 63 H288 V110 Z M298 63 H398 Q410 63 418 72 L452 110 H298 Z" },
  sedan: { left: 40, right: 560, roof: 68,
    top: "V148 Q40 134 58 130 L130 118 L184 78 Q194 68 214 68 H350 Q384 68 410 92 L450 118 L520 126 Q560 132 560 152 V182",
    win: "M148 118 L190 84 Q196 75 212 75 H282 V118 Z M292 75 H348 Q372 75 392 94 L420 118 H292 Z" },
  coupe: { left: 40, right: 560, roof: 72,
    top: "V152 Q40 138 60 134 L140 122 L212 82 Q226 72 250 72 H330 Q372 74 402 100 L440 124 L520 130 Q560 136 560 154 V182",
    win: "M158 122 L214 90 Q226 80 248 80 H320 Q354 82 380 104 L408 122 H158 Z" },
  pickup: { left: 36, right: 550, roof: 66,
    top: "V120 H196 V92 Q196 72 220 66 H330 Q352 66 366 82 L400 116 L504 128 Q550 134 550 154 V182",
    win: "M208 112 V92 Q208 79 224 74 H292 V112 Z M302 74 H334 Q346 74 354 84 L380 112 H302 Z",
    extra: "M44 128 H188" },
  van: { left: 50, right: 550, roof: 68,
    top: "V100 Q50 72 80 68 H380 Q410 68 426 90 L470 122 L520 130 Q550 136 550 156 V182",
    win: "M68 82 H150 V118 H64 Z M162 82 H250 V118 H162 Z M262 82 H372 Q392 82 404 98 L430 118 H262 Z" },
};

/* Posição (em coordenadas do SVG 600x240) dos 8 pontos de destaque */
const spotCoords = b => ({
  A: [b.right - 125, 98], B: [150, 182], C: [300, 126], D: [b.right - 14, 150],
  E: [260, b.roof - 6], F: [340, 152], G: [230, 126], H: [b.left + 14, 140],
});

const CarArt = {
  props: { model: Object, color: String },
  setup(props) {
    const b = computed(() => CAR_BODIES[(props.model && props.model.body) || "suv"]);
    const fill = computed(() => props.color || (props.model && props.model.color) || "#2b2b2e");
    const d = computed(() => `M${b.value.left} 182 ${b.value.top} H494 A44 44 0 0 0 406 182 H194 A44 44 0 0 0 106 182 Z`);
    return { b, fill, d };
  },
  template: `
    <img v-if="model && model.image" class="car car--photo" :src="model.image" :alt="'Vinci Model ' + model.name" />
    <svg v-else class="car" viewBox="0 0 600 240" role="img" :aria-label="model ? 'Vinci Model ' + model.name : 'Veículo Vinci'">
      <ellipse cx="300" cy="220" rx="265" ry="8" fill="#000" opacity=".12" />
      <path :d="d" :fill="fill" stroke="rgba(0,0,0,.22)" stroke-width="1.5" stroke-linejoin="round" />
      <path v-if="b.extra" :d="b.extra" stroke="rgba(0,0,0,.35)" stroke-width="3" fill="none" />
      <path :d="b.win" fill="#12151a" opacity=".8" />
      <rect :x="b.right - 18" y="136" width="14" height="5" rx="2.5" fill="#fff" />
      <rect :x="b.left + 2" y="138" width="8" height="6" rx="2" fill="#e71a3b" />
      <g v-for="x in [150, 450]" :key="x">
        <circle :cx="x" cy="182" r="34" fill="#15171a" />
        <circle :cx="x" cy="182" r="21" fill="#d5d8dc" />
        <circle :cx="x" cy="182" r="7" fill="#15171a" />
      </g>
    </svg>`
};

/* ---------- Header + mega menu ---------- */
const SiteHeader = {
  components: { CarArt },
  props: { active: { type: String, default: "" } },
  setup() {
    const menuOpen = ref(false);
    const megaOpen = ref(false);
    let timer;
    const nav = [
      { label: "Home", href: "index.html", key: "home" },
      { label: "Sobre", href: "index.html#sobre", key: "sobre" },
      { label: "Veículos", href: "veiculos.html", key: "veiculos", mega: true },
      { label: "Serviços", href: "#", key: "servicos" },
      { label: "Test Drive", href: "#", key: "test" },
    ];
    const side = [
      { label: "Ofertas", href: "#" },
      { label: "Test Drive", href: "#", hot: true },
      { label: "Lojas", href: "#" },
      { label: "Serviços", href: "#" },
      { label: "SAC", href: "#" },
      { label: "Privacidade", href: "#" },
    ];
    const openMega = () => { clearTimeout(timer); megaOpen.value = true; };
    const closeMega = () => { timer = setTimeout(() => (megaOpen.value = false), 120); };
    return { menuOpen, megaOpen, nav, side, models: VINCI_MODELS, modelLink, openMega, closeMega };
  },
  template: `
    <header class="header" @keydown.esc="megaOpen = false">
      <div class="header__bar">
        <a class="brand" href="index.html" aria-label="Vinci - Início"><img src="logo.svg" alt="" /><span>VINCI</span></a>
        <button class="burger" :class="{ 'is-open': menuOpen }" @click="menuOpen = !menuOpen" aria-label="Abrir menu">
          <span></span><span></span><span></span>
        </button>
        <nav class="nav" :class="{ 'is-open': menuOpen }">
          <div v-for="item in nav" :key="item.key" class="nav__item"
               @mouseenter="item.mega ? openMega() : null" @mouseleave="item.mega ? closeMega() : null">
            <a class="nav__link" :class="{ 'is-active': active === item.key }" :href="item.href">{{ item.label }}</a>
          </div>
        </nav>
      </div>
      <div class="mega" :class="{ 'is-open': megaOpen }" @mouseenter="openMega" @mouseleave="closeMega">
        <div class="mega__models">
          <div class="mega__model" v-for="m in models" :key="m.id">
            <car-art :model="m"></car-art>
            <h4>Modelo {{ m.name }}</h4>
            <div class="mega__links"><a :href="modelLink(m)">Ver mais</a><a href="#">Comprar</a></div>
          </div>
        </div>
        <div class="mega__side">
          <span class="eyebrow">Navegue</span>
          <ul><li v-for="s in side" :key="s.label"><a :href="s.href" :class="{ 'is-hot': s.hot }">{{ s.label }}</a></li></ul>
        </div>
      </div>
    </header>`
};

/* ---------- Footer ---------- */
const SiteFooter = {
  setup() {
    const cols = [
      { title: "Sobre", links: ["A Marca", "História", "Qualidade", "Onde estamos", "Investidores"] },
      { title: "Contato", links: ["Fale Conosco", "Atendimento", "SAC"] },
      { title: "SAC", links: ["Canais Oficiais", "Redes Sociais", "Suporte"] },
    ];
    return { cols };
  },
  template: `
    <footer class="footer">
      <div class="footer__grid">
        <a class="brand" href="index.html"><img src="logo.svg" alt="" /><span>VINCI</span></a>
        <div v-for="c in cols" :key="c.title">
          <h5>{{ c.title }}</h5>
          <ul><li v-for="l in c.links" :key="l"><a href="#">{{ l }}</a></li></ul>
        </div>
        <p class="footer__copy">©Copyright {{ new Date().getFullYear() }}.<br>Todos os direitos reservados.</p>
      </div>
    </footer>`
};

/* ---------- Card de modelo (home e catálogo) ---------- */
const ModelCard = {
  components: { CarArt },
  props: { model: { type: Object, required: true } },
  setup(props) {
    const short = computed(() => props.model.description.split(". ")[0] + ".");
    return { short, modelLink };
  },
  template: `
    <article class="model-card">
      <div class="model-card__top">
        <h2 class="model-card__title">Vinci<br>Model {{ model.name }}</h2>
        <dl class="specs">
          <dt>Potência:</dt><dd>{{ model.power }} cavalos</dd>
          <dt>Autonomia:</dt><dd>{{ model.range }}km por carga</dd>
          <dt>Peso:</dt><dd>{{ model.weight }} kg</dd>
          <dt>Tecnologia:</dt><dd>{{ model.tech }}</dd>
        </dl>
      </div>
      <a :href="modelLink(model)" class="model-card__img" :aria-label="'Conheça o Vinci Model ' + model.name">
        <car-art :model="model"></car-art>
      </a>
      <p class="model-card__desc">{{ short }}</p>
      <div class="model-card__foot">
        <span>{{ model.tagline }}</span>
        <a :href="modelLink(model)" class="link-ul">CONHEÇA</a>
      </div>
    </article>`
};

/* ---------- FAQ (accordion) ---------- */
const FaqList = {
  props: { items: { type: Array, required: true } },
  setup() {
    const openIndex = ref(null);
    const toggle = i => (openIndex.value = openIndex.value === i ? null : i);
    return { openIndex, toggle };
  },
  template: `
    <div class="faq__list">
      <div v-for="(item, i) in items" :key="i" class="faq__item" :class="{ 'is-open': openIndex === i }">
        <button class="faq__q" @click="toggle(i)" :aria-expanded="openIndex === i">
          <span>{{ item.q }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8l9 9 9-9"/></svg>
        </button>
        <div class="faq__a" :style="{ maxHeight: openIndex === i ? '220px' : '0' }"><p>{{ item.a }}</p></div>
      </div>
    </div>`
};

/* ---------- Hotspots do veículo ---------- */
const HotspotViewer = {
  components: { CarArt },
  props: { model: { type: Object, required: true }, color: String },
  setup(props) {
    const current = ref(null);
    const labels = {
      A: "Retrovisores inteligentes", B: "Rodas de liga leve", C: "Reconhecimento de digital", D: "Sensor de proximidade",
      E: "Antena 5G", F: "Design sofisticado", G: "Abertura automática", H: "Câmera de estacionamento",
    };
    const spots = computed(() => {
      const c = spotCoords(CAR_BODIES[props.model.body]);
      return Object.keys(labels).map(k => ({ k, label: labels[k], x: (c[k][0] / 600) * 100, y: (c[k][1] / 240) * 100 }));
    });
    return { current, spots };
  },
  template: `
    <section class="showcase reveal">
      <div class="container">
        <div class="showcase__head">
          <div>
            <h2>Vinci Model {{ model.name }}</h2>
            <p>{{ model.description }}</p>
          </div>
          <ul class="legend">
            <li v-for="s in spots" :key="s.k" :class="{ 'is-on': current === s.k }"
                @mouseenter="current = s.k" @mouseleave="current = null">
              <span class="badge">{{ s.k }}</span>{{ s.label }}
            </li>
          </ul>
        </div>
        <div class="stage">
          <div class="stage__inner">
            <car-art :model="model" :color="color"></car-art>
            <span v-for="s in spots" :key="s.k" class="dot" :class="{ 'is-on': current === s.k }"
                  :style="{ left: s.x + '%', top: s.y + '%' }" :title="s.label"
                  @mouseenter="current = s.k" @mouseleave="current = null">{{ s.k }}</span>
          </div>
        </div>
      </div>
    </section>`
};

/* ---------- Contador animado ---------- */
const StatItem = {
  props: { value: Number, suffix: String, label: String },
  setup(props) {
    const shown = ref(0);
    const el = ref(null);
    onMounted(() => {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now(), dur = 1200;
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          shown.value = Math.round(props.value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      io.observe(el.value);
    });
    const text = computed(() => shown.value.toLocaleString("pt-BR"));
    return { el, text };
  },
  template: `<div class="stat" ref="el"><strong>{{ text }} {{ suffix }}</strong><span>{{ label }}</span></div>`
};

const IconChevron = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 4l8 8-8 8"/></svg>`
};

/* ---------- Registro + efeito reveal ao rolar ---------- */
function mountVinci(rootOptions) {
  const app = Vue.createApp(rootOptions);
  app.component("car-art", CarArt);
  app.component("site-header", SiteHeader);
  app.component("site-footer", SiteFooter);
  app.component("model-card", ModelCard);
  app.component("faq-list", FaqList);
  app.component("hotspot-viewer", HotspotViewer);
  app.component("stat-item", StatItem);
  app.component("icon-chevron", IconChevron);
  app.mount("#app");

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target)));
  }, { threshold: 0.15 });
  setTimeout(() => document.querySelectorAll(".reveal").forEach(el => io.observe(el)), 50);
}
