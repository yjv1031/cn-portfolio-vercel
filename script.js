const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");
const sections = [...navLinks].map((link) =>
  document.querySelector(link.getAttribute("href"))
);

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!nav || !menuBtn) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (window.innerWidth > 680) return;
  if (nav.contains(target) || menuBtn.contains(target)) return;
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (!nav || !menuBtn) return;
  if (event.key !== "Escape") return;
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

window.addEventListener("resize", () => {
  if (!nav || !menuBtn) return;
  if (window.innerWidth > 680) {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const selected = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", selected);
      });
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => {
  if (section) sectionObserver.observe(section);
});

const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
