/* Home page animations: scroll reveal, counters, pointer parallax. */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ---- Counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
  } else {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---- Pointer parallax on the floating sprites ---- */
  const scene = document.getElementById("heroScene");
  const sprites = document.getElementById("sceneSprites");
  if (scene && sprites && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const layers = [...sprites.children].map((node, index) => ({
      node,
      depth: 8 + ((index * 7) % 26),
    }));
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      frame = 0;
      layers.forEach(({ node, depth }) => {
        node.style.translate = `${pointerX * depth}px ${pointerY * depth}px`;
      });
    };

    scene.addEventListener("pointermove", (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * -2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * -2;
      if (!frame) frame = requestAnimationFrame(apply);
    });

    scene.addEventListener("pointerleave", () => {
      pointerX = 0;
      pointerY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    });
  }

  /* ---- Parallax drift on the CTA sprites while scrolling ---- */
  const cta = document.querySelector(".cta-sprites");
  if (cta && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const box = cta.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const progress = (window.innerHeight - box.top) / (window.innerHeight + box.height);
      [...cta.children].forEach((img, index) => {
        const shift = (progress - 0.5) * (index === 0 ? 40 : -40);
        img.style.translate = `0 ${shift}px`;
      });
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }
})();
