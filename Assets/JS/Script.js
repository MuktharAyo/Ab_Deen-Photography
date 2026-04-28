// Additional JavaScript to remove preloader from DOM after animation
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 5000); // Matches total animation time
});

// Nav-toggle
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // Nav elements
  const navbar = $("navbar");
  const navMenu = $("navMenu");
  const navLogo = $("navLogo");
  const toggleBtn = $("mobileMenuToggle");

  // Theme elements
  const body = document.body;
  const themeToggle = $("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Nav helpers
  const isMenuOpen = () => navMenu.classList.contains("active");
  const openMenu = () => {
    navMenu.classList.add("active");
    navLogo.classList.add("active");
    toggleBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    navMenu.classList.remove("active");
    navLogo.classList.remove("active");
    toggleBtn.classList.remove("active");
    document.body.style.overflow = "";
  };
  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    el.tabIndex = -1;
    el.focus({ preventScroll: true });
    history.pushState(null, "", hash);
  };

  // Theme helpers
  const applyTheme = (theme) => {
    if (theme === "light") {
      body.classList.add("light-theme");
      themeIcon.className = "ri-sun-line";
    } else {
      body.classList.remove("light-theme");
      themeIcon.className = "ri-moon-line";
    }
    localStorage.setItem("theme", theme);
  };

  // Initialize theme from storage
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  // Event listeners
  toggleBtn.addEventListener("click", () =>
    isMenuOpen() ? closeMenu() : openMenu(),
  );

  navMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");

    if (href?.startsWith("#") && document.querySelector(href)) {
      e.preventDefault();
      closeMenu();
      const dur =
        parseFloat(getComputedStyle(navMenu).transitionDuration) * 1000;
      setTimeout(() => scrollToHash(href), dur);
    } else if (isMenuOpen()) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", () =>
    navbar.classList.toggle("scrolled", window.scrollY > 20),
  );

  themeToggle.addEventListener("click", () =>
    applyTheme(body.classList.contains("light-theme") ? "dark" : "light"),
  );
});

// Scroll to reveal
// const revealElements = document.querySelectorAll("[data-reveal]");

// const scrollReveal = function () {
//   for (let i = 0; i < revealElements.length; i++) {
//     const elementIsInScreen =
//       revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2;

//     if (elementIsInScreen) {
//       revealElements[i].classList.add("revealed");
//     } else {
//       revealElements[i].classList.remove("revealed");
//     }
//   }
// };

// window.addEventListener("scroll", scrollReveal);

// scrollReveal();

//  BACK TO TOP BUTTON
const backTopBtn = document.querySelector(".back-top-btn");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

// New CUSTOM CURSOR
// CUSTOM CURSOR
const cursor = document.querySelector("[data-cursor]");

if (cursor) {
  document.body.addEventListener("mousemove", function (event) {
    setTimeout(function () {
      cursor.style.top = `${event.clientY}px`;
      cursor.style.left = `${event.clientX}px`;
    }, 100);
  });

  const hoverActive = function () {
    cursor.classList.add("hovered");
  };

  const hoverDeactive = function () {
    cursor.classList.remove("hovered");
  };

  // Works for existing and dynamically generated anchors/buttons
  document.addEventListener("mouseover", function (event) {
    if (event.target.closest("a, .btn-hv")) {
      hoverActive();
    }

    if (event.target.closest("body")) {
      cursor.classList.remove("disabled");
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.closest("a, .btn-hv")) {
      hoverDeactive();
    }
  });

  document.body.addEventListener("mouseout", function (event) {
    // only disable when leaving the page area
    if (!event.relatedTarget) {
      cursor.classList.add("disabled");
    }
  });

  document.body.addEventListener("mouseover", function () {
    cursor.classList.remove("disabled");
  });
}
