/* =========================================================
   Edit your content here — the page builds itself from this.
   ========================================================= */
const PROFILE = {
  name: "Your Name",
  role: "I build fast, reliable software for the web.",
  email: "you@example.com",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
  },
};

const PROJECTS = [
  {
    title: "Project One",
    blurb: "A blazing-fast SaaS dashboard with real-time analytics, billing and a design system that scaled across four product teams.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    links: { live: "#", code: "#" },
    category: ["web"],
    emoji: "01",
    gradient: ["#6ee7ff", "#a78bfa"],
  },
  {
    title: "Project Two",
    blurb: "Distributed API gateway handling 1M+ requests/day with sub-50ms p99 latency, rate limiting and automatic failover.",
    tags: ["Go", "Redis", "gRPC", "Kubernetes"],
    links: { live: "#", code: "#" },
    category: ["api"],
    emoji: "02",
    gradient: ["#34d399", "#38bdf8"],
  },
  {
    title: "Project Three",
    blurb: "Open-source headless CMS focused on developer ergonomics — 3k+ GitHub stars and an active plugin community.",
    tags: ["Node.js", "React", "SQLite"],
    links: { live: "#", code: "#" },
    category: ["oss", "web"],
    emoji: "03",
    gradient: ["#fbbf24", "#fb7185"],
  },
  {
    title: "Project Four",
    blurb: "An edge-deployed URL shortener with click analytics and custom domains — live in 12 regions worldwide.",
    tags: ["Cloudflare Workers", "Hono", "D1"],
    links: { live: "#", code: "#" },
    category: ["web", "oss"],
    emoji: "04",
    gradient: ["#f472b6", "#818cf8"],
  },
  {
    title: "Project Five",
    blurb: "CLI tool that trims CI pipelines by caching build graphs — cut average pipeline time by 60% for the team.",
    tags: ["Rust", "CLI", "DX"],
    links: { live: "#", code: "#" },
    category: ["oss"],
    emoji: "05",
    gradient: ["#22d3ee", "#3b82f6"],
  },
  {
    title: "Project Six",
    blurb: "Event-driven microservices platform for e-commerce checkout — PCI-compliant, auditable, and fully observable.",
    tags: ["Python", "Kafka", "AWS", "Terraform"],
    links: { live: "#", code: "#" },
    category: ["api"],
    emoji: "06",
    gradient: ["#a3e635", "#14b8a6"],
  },
];

/* ---------- Theme ---------- */
(function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Nav: shrink on scroll + active section ---------- */
const nav = document.getElementById("nav");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`
        )
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

/* ---------- Render skill chips ---------- */
document.querySelectorAll("[data-skills]").forEach((el, cardIdx) => {
  el.innerHTML = el.dataset.skills
    .split(",")
    .map(
      (s, i) =>
        `<span class="chip" style="animation-delay:${cardIdx * 60 + i * 40}ms">${s.trim()}</span>`
    )
    .join("");
});

/* ---------- Render projects ---------- */
const grid = document.getElementById("projectGrid");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

grid.innerHTML = PROJECTS.map((p) => {
  const [a, b] = p.gradient;
  return `
  <article class="project reveal" data-categories="${p.category.join(",")}">
    <div class="project-thumb" style="background:linear-gradient(135deg, ${a}, ${b})">${esc(p.emoji)}</div>
    <div class="project-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.blurb)}</p>
      <div class="tags">
        ${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
      </div>
      <div class="project-links">
        <a href="${esc(p.links.live)}" target="_blank" rel="noopener">Live →</a>
        <a href="${esc(p.links.code)}" target="_blank" rel="noopener">Code ↗</a>
      </div>
    </div>
  </article>`;
}).join("");

/* ---------- Project filters ---------- */
const filters = document.querySelectorAll(".filter");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    document.querySelectorAll(".project").forEach((card) => {
      const cats = card.dataset.categories.split(",");
      card.classList.toggle("hide", !(f === "all" || cats.includes(f)));
    });
  });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Contact form validation ---------- */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

const validators = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address.",
  message: (v) => (v.trim().length >= 10 ? "" : "Message should be at least 10 characters."),
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstBad = null;

  Object.keys(validators).forEach((key) => {
    const input = form.elements[key];
    const msg = validators[key](input.value);
    const field = input.closest(".field");
    const err = field.querySelector(".error");
    field.classList.toggle("invalid", !!msg);
    err.textContent = msg;
    if (msg && !firstBad) firstBad = input;
  });

  if (firstBad) {
    firstBad.focus();
    note.textContent = "Please fix the highlighted fields.";
    note.className = "form-note";
    return;
  }

  const name = form.elements.name.value.trim();
  note.textContent = `Thanks, ${name.split(" ")[0]}! This is a front-end demo — hook it up to a form service (Formspree, Resend, etc.) to start receiving messages.`;
  note.className = "form-note ok";
  form.reset();
});

/* ---------- Apply profile ---------- */
document.querySelector(".name").textContent = PROFILE.name;
document.title = `${PROFILE.name} — Portfolio`;

/* =========================================================
   ANIMATIONS — all gated behind prefers-reduced-motion
   ========================================================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Typewriter (hero role) ---------- */
const typedEl = document.getElementById("typed");
if (typedEl && !reduceMotion) {
  const phrases = [
    PROFILE.role.replace(/^I build /, "").replace(/\.$/, ""),
    "fast, reliable software",
    "delightful user interfaces",
    "scalable backends",
    "things people love to use",
  ];
  let pi = 0, ci = 0, deleting = false;

  const tick = () => {
    const word = phrases[pi];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        return setTimeout(tick, 1900);
      }
      setTimeout(tick, 62 + Math.random() * 65);
    } else {
      typedEl.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        return setTimeout(tick, 420);
      }
      setTimeout(tick, 34);
    }
  };
  setTimeout(tick, 650);
} else if (typedEl) {
  typedEl.textContent = PROFILE.role.replace(/^I build /, "").replace(/\.$/, "");
}

/* ---------- Scroll progress bar ---------- */
const progress = document.getElementById("scrollProgress");
const onProgress = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
};
onProgress();
window.addEventListener("scroll", onProgress, { passive: true });

/* ---------- Cursor spotlight + grid parallax ---------- */
const spotlight = document.getElementById("spotlight");
const gridBg = document.querySelector(".grid-bg");
let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;

if (!reduceMotion) {
  window.addEventListener("pointermove", (e) => {
    tmx = e.clientX / window.innerWidth;
    tmy = e.clientY / window.innerHeight;
    spotlight.classList.add("on");
    spotlight.style.setProperty("--mx", `${e.clientX}px`);
    spotlight.style.setProperty("--my", `${e.clientY}px`);
  });
  window.addEventListener("pointerleave", () => spotlight.classList.remove("on"));

  const smooth = () => {
    mx += (tmx - mx) * 0.075;
    my += (tmy - my) * 0.075;
    gridBg.style.transform = `translate3d(${(mx - 0.5) * 54}px, ${(my - 0.5) * 54}px, 0)`;
    requestAnimationFrame(smooth);
  };
  requestAnimationFrame(smooth);
}

/* ---------- Stat count-up ---------- */
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      countObserver.unobserve(el);
      if (reduceMotion) return;

      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();

      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

/* ---------- Project card 3D tilt ---------- */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-5px) scale(1.015)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- Magnetic buttons ---------- */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".btn, .filter").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${(e.clientY - (r.top + r.height / 2)) * 0.18}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ---------- Stagger groups (skills rows, stats, projects) ---------- */
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document
  .querySelectorAll(".skills, .stats, .projects")
  .forEach((el) => staggerObserver.observe(el));

/* ---------- Fade nav in on load ---------- */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
