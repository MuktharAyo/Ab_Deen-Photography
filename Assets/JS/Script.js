// Additional JavaScript to remove preloader from DOM after animation
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 5000); // Matches total animation time
});

// Nav-toggle
// document.addEventListener("DOMContentLoaded", () => {
//   const $ = (id) => document.getElementById(id);
//   const navbar = $("navbar"),
//     navMenu = $("navMenu"),
//     navLogo = $("navLogo"),
//     toggleBtn = $("mobileMenuToggle");
//   const isOpen = () => navMenu.classList.contains("active");
//   const openMenu = () => {
//     navMenu.classList.add("active");
//     navLogo.classList.add("active");
//     toggleBtn.classList.add("active");
//     document.body.style.overflow = "hidden";
//   };
//   const closeMenu = () => {
//     navMenu.classList.remove("active");
//     navLogo.classList.remove("active");
//     toggleBtn.classList.remove("active");
//     document.body.style.overflow = "";
//   };
//   const scrollToHash = (hash) => {
//     const el = document.querySelector(hash);
//     if (!el) return;
//     el.scrollIntoView({ behavior: "smooth" });
//     el.tabIndex = -1;
//     el.focus({ preventScroll: true });
//     history.pushState(null, "", hash);
//   };
//   toggleBtn.addEventListener("click", () => {
//     isOpen() ? closeMenu() : openMenu();
//   });
//   navMenu.addEventListener("click", (e) => {
//     const link = e.target.closest("a");
//     if (!link) return;
//     const href = link.getAttribute("href");
//     if (href?.startsWith("#") && document.querySelector(href)) {
//       e.preventDefault();
//       // close menu, then scroll after transition ends
//       closeMenu();
//       const dur =
//         parseFloat(getComputedStyle(navMenu).transitionDuration) * 1000;
//       setTimeout(() => scrollToHash(href), dur);
//     } else if (isOpen()) {
//       // non-anchor or external link: just close menu so default navigation proceeds
//       closeMenu();
//     }
//   });
//   const onScroll = () =>
//     navbar.classList.toggle("scrolled", window.scrollY > 20);
//   window.addEventListener("scroll", onScroll);
//   onScroll();
// });

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
    isMenuOpen() ? closeMenu() : openMenu()
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
    navbar.classList.toggle("scrolled", window.scrollY > 20)
  );

  themeToggle.addEventListener("click", () =>
    applyTheme(body.classList.contains("light-theme") ? "dark" : "light")
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

// CUSTOM CURSOR
const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll(".btn-hv");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () {
  cursor.classList.add("hovered");
};

// remove cursor hovered class
const hoverDeactive = function () {
  cursor.classList.remove("hovered");
};

// add hover effect on cursor, when hover on any button or hyperlink
anchorElements.forEach((anchor) => {
  anchor.addEventListener("mouseenter", hoverActive);
  anchor.addEventListener("mouseleave", hoverDeactive);
});

buttons.forEach((button) => {
  button.addEventListener("mouseenter", hoverActive);
  button.addEventListener("mouseleave", hoverDeactive);
});

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});

// Filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((button) => button.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Refresh AOS to apply animations to the newly shown items
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    });
  });

  // Initialize gallery with all items visible
  galleryItems.forEach((item) => {
    item.style.display = "block";
  });
});

// Modal
document.querySelectorAll(".open-modal").forEach((item) => {
  item.addEventListener("click", (event) => {
    const modalId = item.getAttribute("data-modal");
    document.getElementById(modalId).classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });
});

// Close modal
document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest(".modal").classList.remove("show");
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });
});
