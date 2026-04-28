import { catalogData } from "./Data/CatalogData.js";

document.addEventListener("DOMContentLoaded", () => {
  const catalogGrid = document.querySelector(".catalog");
  const filterControls = document.querySelector(".filter-controls");

  // if (!catalogGrid || !filterControls) return;

  const modalHost = document.getElementById("modalRoot") || document.body;

  const escapeHTML = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const createCatalogCard = (item) => {
    const extraPhotoClass = item.photoClass
      ? ` ${escapeHTML(item.photoClass)}`
      : "";
    return `
      <div class="gallery-item" data-category="${escapeHTML(item.category)}" data-aos="fade-up">
        <div class="photo${extraPhotoClass} btn-hv open-modal" data-modal="${escapeHTML(item.id)}">
          <img src="${escapeHTML(item.cover)}" alt="${escapeHTML(item.title)}" loading="lazy" />
          <div class="info">
            <h2>${escapeHTML(item.title)} | <br> ${escapeHTML(item.subtitle)}</h2>
          </div>
        </div>
      </div>
    `;
  };

  const createModal = (item) => {
    const galleryHTML = item.gallery
      .map(
        (img) => `
          <a href="${escapeHTML(img)}" data-fancybox="${escapeHTML(item.id)}-gallery">
            <img src="${escapeHTML(img)}" alt="${escapeHTML(item.title)}" loading="lazy" />
          </a>
        `,
      )
      .join("");

    const deliverablesHTML = item.deliverables
      .map((d) => `<span>${escapeHTML(d)}</span>`)
      .join("");

    return `
      <div class="modal" id="${escapeHTML(item.id)}" aria-hidden="true">
        <div class="modal_content">
          <div class="modal-header">
            <div class="close-modal btn-hv">
              <div class="close-arrow">
                <div class="arrow-line arrow-one"></div>
                <div class="arrow-line arrow-two"></div>
                <div class="arrow-tip arrow-top"></div>
                <div class="arrow-tip arrow-bottom"></div>
              </div>
              <span>back</span>
            </div>
          </div>

          <div class="modal-body">
            <div class="modal-img">
              <img src="${escapeHTML(item.cover)}" alt="${escapeHTML(item.title)}" />
              <div class="modal-details">
                <span class="client">${escapeHTML(item.client)} | ${escapeHTML(item.location)}</span>
                <div class="modal-info">
                  <span class="date">${escapeHTML(item.date || "")}</span>
                  <div class="deliverables">
                    <h6 class="modal-info_title">deliverables</h6>
                    ${deliverablesHTML}
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-grid">
              <div class="grid-wrapper">
                ${galleryHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  function renderCatalog() {
    catalogGrid.innerHTML = catalogData.map(createCatalogCard).join("");

    const modalHTML = catalogData.map(createModal).join("");
    if (document.getElementById("modalRoot")) {
      modalHost.innerHTML = modalHTML;
    } else {
      modalHost.insertAdjacentHTML("beforeend", modalHTML);
    }
  }

  function setActiveFilter(button) {
    filterControls.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  }

  function filterItems(filterValue) {
    const items = document.querySelectorAll(".gallery-item");

    items.forEach((item) => {
      const match = filterValue === "all" || item.dataset.category === filterValue;

      item.style.display = match ? "block" : "none";

      // reset AOS state so filtered items do not stay hidden
      item.classList.remove("aos-animate");
    });

    // tell AOS to recalculate after filtering
    if (window.AOS) {
      AOS.refreshHard();
    }
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  renderCatalog();

  if (window.AOS) {
    AOS.init();
    AOS.refreshHard();
  }

  filterControls.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    setActiveFilter(btn);
    filterItems(btn.dataset.filter);
  });

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".open-modal");
    if (openBtn) {
      openModal(openBtn.dataset.modal);
      return;
    }

    const closeBtn = e.target.closest(".close-modal");
    if (closeBtn) {
      closeModal(closeBtn.closest(".modal"));
      return;
    }

    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const activeModal = document.querySelector(".modal.show");
    if (activeModal) closeModal(activeModal);
  });
});
