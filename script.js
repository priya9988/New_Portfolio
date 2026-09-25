const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];


/* =========================================
   LOADER
   ========================================= */

window.addEventListener("load", () => {

  setTimeout(() => {
    $("#loader")?.classList.add("hide");
  }, 900);

});


/* =========================================
   HEADER SCROLL
   ========================================= */

const header = $("#header");

window.addEventListener(
  "scroll",
  () => {

    header?.classList.toggle(
      "scrolled",
      window.scrollY > 45
    );

  },
  { passive: true }
);


/* =========================================
   MOBILE MENU
   ========================================= */

const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn?.addEventListener("click", () => {

  const open = nav.classList.toggle("open");

  menuBtn.classList.toggle("open", open);

  document.body.classList.toggle(
    "menu-open",
    open
  );

});


$$(".nav a").forEach((a) => {

  a.addEventListener("click", () => {

    nav.classList.remove("open");

    menuBtn.classList.remove("open");

    document.body.classList.remove("menu-open");

  });

});


/* =========================================
   DARK / LIGHT MODE
   ========================================= */

const themeBtn = $("#themeBtn");
const themeIcon = $("#themeIcon");

const saved = localStorage.getItem("priya-theme");

if (saved === "light") {

  document.body.classList.add("light");

  themeIcon.textContent = "☀";

}


themeBtn?.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const light =
    document.body.classList.contains("light");

  localStorage.setItem(
    "priya-theme",
    light ? "light" : "dark"
  );

  themeIcon.textContent =
    light ? "☀" : "☾";

});


/* =========================================
   REVEAL ANIMATION
   ========================================= */

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold:0.1,
      rootMargin:"0px 0px -45px 0px"
    }
  );


$$(".reveal").forEach((el) => {

  observer.observe(el);

});


/* =========================================
   ACTIVE NAV SECTION
   ========================================= */

const sections = $$("main section[id]");
const links = $$(".nav a");

const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          links.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${entry.target.id}`
            );

          });

        }

      });

    },
    {
      threshold:0.3
    }
  );


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =========================================
   SMOOTH ANCHOR SCROLL
   ========================================= */

$$('a[href^="#"]').forEach((a) => {

  a.addEventListener("click", (e) => {

    const id = a.getAttribute("href");

    const target = $(id);

    if (
      id &&
      id !== "#" &&
      target
    ) {

      e.preventDefault();

      window.scrollTo({

        top:
          target.getBoundingClientRect().top +
          window.scrollY -
          (header?.offsetHeight || 0) -
          18,

        behavior:"smooth"

      });

    }

  });

});


/* =========================================
   CUSTOM CURSOR
   ========================================= */

const cursor = $("#cursor");
const ring = $("#cursorRing");

let mx = 0;
let my = 0;

let rx = 0;
let ry = 0;


if (
  cursor &&
  ring &&
  matchMedia("(pointer:fine)").matches
) {

  addEventListener("mousemove", (e) => {

    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";

  });


  const tick = () => {

    rx += (mx - rx) * .13;
    ry += (my - ry) * .13;

    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    requestAnimationFrame(tick);

  };

  tick();


  $$(
    "a,button,.project-card,.skill"
  ).forEach((el) => {

    el.addEventListener(
      "mouseenter",
      () => {
        document.body.classList.add(
          "cursor-active"
        );
      }
    );

    el.addEventListener(
      "mouseleave",
      () => {
        document.body.classList.remove(
          "cursor-active"
        );
      }
    );

  });

}


/* =========================================
   MAGNETIC ELEMENTS
   ========================================= */

$$(".magnetic").forEach((el) => {

  el.addEventListener("mousemove", (e) => {

    const r = el.getBoundingClientRect();

    const x =
      (e.clientX -
        r.left -
        r.width / 2) *
      .1;

    const y =
      (e.clientY -
        r.top -
        r.height / 2) *
      .1;

    el.style.transform =
      `translate(${x}px,${y}px)`;

  });


  el.addEventListener(
    "mouseleave",
    () => {
      el.style.transform = "";
    }
  );

});


/* =========================================
   PROJECT 3D HOVER
   ========================================= */

$$(".project-visual").forEach((card) => {

  card.addEventListener(
    "mousemove",
    (e) => {

      if (
        !matchMedia("(pointer:fine)").matches
      ) {
        return;
      }

      const r =
        card.getBoundingClientRect();

      const x =
        (e.clientX - r.left) /
          r.width -
        .5;

      const y =
        (e.clientY - r.top) /
          r.height -
        .5;

      card.style.transform =
        `perspective(900px)
         rotateX(${y * -3}deg)
         rotateY(${x * 3}deg)
         translateY(-7px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================
   HERO PARALLAX
   ========================================= */

const heroArt = $(".hero-art");

addEventListener("mousemove", (e) => {

  if (
    !heroArt ||
    !matchMedia("(pointer:fine)").matches
  ) {
    return;
  }

  const x =
    (e.clientX / innerWidth - .5) * 2;

  const y =
    (e.clientY / innerHeight - .5) * 2;

  heroArt.style.transform =
    `translate(${x * 6}px,${y * 6}px)`;

});


/* =========================================
   CURRENT YEAR
   ========================================= */

$("#year").textContent =
  new Date().getFullYear();