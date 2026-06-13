/**
 * Main application logic — بيتزا لذة الملوك
 * Handles rendering, navigation, search, and interactions
 */
(function () {
  "use strict";

  const PLACEHOLDER_IMG = "assets/images/placeholder.svg";
  let activeCategoryId = null;
  let searchTimeout = null;

  const els = {
    restaurantName: document.getElementById("restaurant-name"),
    welcomeText: document.getElementById("welcome-text"),
    tagline: document.getElementById("tagline"),
    logo: document.querySelector(".logo"),
    phones: document.getElementById("phones"),
    address: document.getElementById("address"),
    categoryNav: document.getElementById("category-nav"),
    menuGrid: document.getElementById("menu-grid"),
    emptyState: document.getElementById("empty-state"),
    categoryNote: document.getElementById("category-note"),
    searchInput: document.getElementById("search-input"),
    footerName: document.getElementById("footer-name"),
    year: document.getElementById("year"),
    whatsappBtn: document.getElementById("whatsapp-btn"),
    facebookBtn: document.getElementById("facebook-btn"),
    footerWhatsappLink: document.getElementById("footer-whatsapp-link"),
    footerFacebookLink: document.getElementById("footer-facebook-link"),
    backToTop: document.getElementById("back-to-top"),
  };

  /** Format single or multi-size prices */
  function formatPrice(item) {
    if (item.prices) {
      const parts = [];
      if (item.prices.L != null) parts.push("L: " + item.prices.L);
      if (item.prices.M != null) parts.push("M: " + item.prices.M);
      if (item.prices.S != null) parts.push("S: " + item.prices.S);
      if (parts.length === 0) return "اسأل عن السعر";
      return parts.join(" | ") + " ج.م";
    }
    if (item.price != null && item.price !== "") return item.price + " ج.م";
    return "اسأل عن السعر";
  }

  /** Find category by id */
  function getCategory(id) {
    return MENU_DATA.categories.find(function (c) { return c.id === id; });
  }

  /** Get display label for category button */
  function getCategoryLabel(category) {
    return category.nameAr || category.name;
  }

  /** Build a menu card element */
  function createCard(item, index) {
    var article = document.createElement("article");
    article.className = "menu-card";
    article.style.animationDelay = Math.min(index * 0.04, 0.4) + "s";

    var displayName = item.name;
    var descHtml = item.description
      ? '<p class="card-desc">' + item.description + "</p>"
      : "";

    article.innerHTML =
      '<div class="card-image-wrap">' +
      '<!-- ضع هنا صورة الصنف -->' +
      '<img src="' + item.image + '" alt="' + displayName + '" loading="lazy" decoding="async" class="card-image">' +
      "</div>" +
      '<div class="card-body">' +
      "<h3 class=\"card-title\">" + displayName + "</h3>" +
      descHtml +
      '<p class="card-price">' + formatPrice(item) + "</p>" +
      "</div>";

    var img = article.querySelector(".card-image");
    img.addEventListener("error", function () {
      img.src = PLACEHOLDER_IMG;
      img.classList.add("is-placeholder");
    });

    return article;
  }

  /** Render menu items into grid */
  function renderItems(categoryId, itemsOverride) {
    var category = getCategory(categoryId);
    if (!category) return;

    var items = itemsOverride || category.items;
    /* Hide unavailable items from public menu */
    items = items.filter(function (item) {
      return item.available !== false;
    });
    els.menuGrid.innerHTML = "";
    els.menuGrid.classList.remove("fade-out");

    if (category.note) {
      els.categoryNote.textContent = category.note;
      els.categoryNote.classList.remove("hidden");
    } else {
      els.categoryNote.classList.add("hidden");
    }

    if (!items || items.length === 0) {
      els.emptyState.classList.remove("hidden");
      els.menuGrid.classList.add("hidden");
      return;
    }

    els.emptyState.classList.add("hidden");
    els.menuGrid.classList.remove("hidden");

    var fragment = document.createDocumentFragment();
    items.forEach(function (item, i) {
      fragment.appendChild(createCard(item, i));
    });
    els.menuGrid.appendChild(fragment);
  }

  /** Switch active category with fade transition */
  function switchCategory(id) {
    if (id === activeCategoryId) return;
    activeCategoryId = id;

    var buttons = els.categoryNav.querySelectorAll(".cat-btn");
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.category === id;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    els.menuGrid.classList.add("fade-out");

    setTimeout(function () {
      var query = els.searchInput.value.trim().toLowerCase();
      if (query) {
        filterAndRender(query);
      } else {
        renderItems(id);
      }
      els.menuGrid.classList.remove("fade-out");
      els.menuGrid.classList.add("fade-in");
      requestAnimationFrame(function () {
        els.menuGrid.classList.remove("fade-in");
      });
    }, 180);
  }

  /** Filter items by search query within active category */
  function filterAndRender(query) {
    var category = getCategory(activeCategoryId);
    if (!category) return;

    var filtered = category.items.filter(function (item) {
      var name = (item.name || "").toLowerCase();
      var nameEn = (item.nameEn || "").toLowerCase();
      return name.indexOf(query) !== -1 || nameEn.indexOf(query) !== -1;
    });

    renderItems(activeCategoryId, filtered);
  }

  /** Build category navigation buttons */
  function renderCategories() {
    els.categoryNav.innerHTML = "";
    var fragment = document.createDocumentFragment();

    MENU_DATA.categories.forEach(function (category, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn ripple-btn" + (index === 0 ? " active" : "");
      btn.dataset.category = category.id;
      btn.textContent = getCategoryLabel(category);
      btn.setAttribute("aria-pressed", index === 0 ? "true" : "false");

      btn.addEventListener("click", function () {
        els.searchInput.value = "";
        switchCategory(category.id);
      });

      fragment.appendChild(btn);
    });

    els.categoryNav.appendChild(fragment);
    activeCategoryId = MENU_DATA.categories[0].id;
    renderItems(activeCategoryId);
  }

  /** Populate header and footer from data */
  function initHeader() {
    var r = MENU_DATA.restaurant;
    if (els.restaurantName) els.restaurantName.textContent = r.name;
    if (els.welcomeText) els.welcomeText.textContent = r.welcome || "";
    if (els.tagline) els.tagline.textContent = r.tagline || "";
    if (els.footerName) els.footerName.textContent = r.name;
    if (els.year) els.year.textContent = new Date().getFullYear();
    if (els.logo && r.logo) {
      els.logo.src = r.logo;
      els.logo.addEventListener("error", function () {
        els.logo.src = "assets/images/placeholder.svg";
      });
    }

    if (els.phones && r.phones && r.phones.length) {
      els.phones.innerHTML = r.phones
        .map(function (p) {
          return '<a href="tel:' + p + '">' + p + "</a>";
        })
        .join(" &nbsp;|&nbsp; ");
    }

    if (els.address && r.address) {
      els.address.textContent = r.address;
    }
  }

  /** Set social link hrefs */
  function initSocialLinks() {
    if (SOCIAL_LINKS.whatsapp) {
      els.whatsappBtn.href = SOCIAL_LINKS.whatsapp;
      if (els.footerWhatsappLink) els.footerWhatsappLink.href = SOCIAL_LINKS.whatsapp;
    } else {
      els.whatsappBtn.classList.add("is-disabled");
      els.whatsappBtn.addEventListener("click", function (e) { e.preventDefault(); });
      if (els.footerWhatsappLink) els.footerWhatsappLink.classList.add("is-disabled");
    }

    if (SOCIAL_LINKS.facebook) {
      els.facebookBtn.href = SOCIAL_LINKS.facebook;
      if (els.footerFacebookLink) els.footerFacebookLink.href = SOCIAL_LINKS.facebook;
    } else {
      els.facebookBtn.classList.add("is-disabled");
      els.facebookBtn.addEventListener("click", function (e) { e.preventDefault(); });
      if (els.footerFacebookLink) els.footerFacebookLink.classList.add("is-disabled");
    }
  }

  /** Search input handler with debounce */
  function initSearch() {
    els.searchInput.addEventListener("input", function (e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function () {
        var query = e.target.value.trim().toLowerCase();
        if (!query) {
          renderItems(activeCategoryId);
          return;
        }
        filterAndRender(query);
      }, 150);
    });
  }

  /** Back to top button visibility and scroll */
  function initBackToTop() {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        els.backToTop.classList.add("visible");
      } else {
        els.backToTop.classList.remove("visible");
      }
    }, { passive: true });

    els.backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /** Scroll active category button into view */
  function scrollActiveCategoryIntoView() {
    var active = els.categoryNav.querySelector(".cat-btn.active");
    if (active) {
      active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  /** Initialize application */
  function init() {
    initHeader();
    initSocialLinks();
    renderCategories();
    initSearch();
    initBackToTop();

    els.categoryNav.addEventListener("click", function () {
      setTimeout(scrollActiveCategoryIntoView, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
