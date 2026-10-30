/* Pizzaria — script.js */

gsap.registerPlugin(ScrollTrigger);

/* Dark mode */
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("pizzaria-theme") === "dark") {
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("pizzaria-theme", root.classList.contains("dark") ? "dark" : "light");
});

/* Hero intro */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const intro = gsap.timeline({
  defaults: { duration: 0.6, ease: "power3.out" },
  paused: prefersReduced,
});

intro
  .fromTo(".hero-step",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.12 }
  )
  .fromTo("#hero h1",
    { scale: 0.96, opacity: 1 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
    "-=0.4"
  )
  .fromTo("#hero a",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" },
    "<"
  );

if (prefersReduced) {
  gsap.set(".hero-step", { opacity: 1, y: 0 });
}

/* Replay button */
document.getElementById("replay-intro").addEventListener("click", () => {
  intro.restart();
});

/* Scroll reveals + progress bar */
const revealItems = gsap.utils.toArray(".reveal");
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  revealItems.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.to("#scroll-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(".reveal", { opacity: 1, y: 0, clearProps: "all" });
  gsap.set("#scroll-progress", { scaleX: 0 });
});