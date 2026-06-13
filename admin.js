/**
 * admin.js — Main Admin Panel logic
 * Handles UI rendering, editing, drag-drop, search, and auto-save.
 */
(function () {
  "use strict";

  var IMAGE_BASE = "assets/images/";
  var PLACEHOLDER = "assets/images/placeholder.svg";

  var state = {
    data: null,
    activeCategoryId: null,
    searchQuery: "",
    imagePreviews: {},
    pendingDeleteId: null,
    saveTimer: null,
  };

  var els = {};

  /** Initialize DOM references */
  function cacheElements() {
    els.categoryList = document.getElementById("category-list");
    els.itemsGrid = document.getElementById("items-grid");
    els.emptyItems = document.getElementById("empty-items");
    els.activeCategoryTitle = document.getElementById("active-category-title");
    els.itemCount = document.getElementById("item-count");
    els.searchInput = document.getElementById("search-input");
    els.autosaveStatus = document.getElementById("autosave-status");
    els.modalOverlay = document.getElementById("modal-overlay");
    els.addItemForm = document.getElementById("add-item-form");
    els.modalCategory = document.getElementById("modal-category");
    els.confirmOverlay = document.getElementById("confirm-overlay");
    els.confirmMessage = document.getElementById("confirm-message");
    els.importFileInput = document.getElementById("import-file-input");
    els.toastContainer = document.getElementById("toast-container");
  }

  /** Show toast notification */
  function showToast(message, type) {
    var toast = document.createElement("div");
    toast.className = "toast " + (type || "info");
    toast.textContent = message;
    els.toastContainer.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = "0";
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  /** Update autosave status indicator */
  function setSaveStatus(status) {
    els.autosaveStatus.textContent = status === "saving" ? "Saving..." : "Saved";
    els.autosaveStatus.className = "autosave-status " + status;
  }

  /** Persist current state to localStorage */
  function autoSave() {
    setSaveStatus("saving");
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(function () {
      MenuStorage.saveMenuData(state.data);
      MenuStorage.saveImagePreviews(state.imagePreviews);
      setSaveStatus("saved");
    }, 400);
  }

  /** Get image preview URL for an item */
  function getImageSrc(item) {
    if (item.image) {
      if (/^(data:|https?:|\/|assets\/)/.test(item.image)) {
        return item.image;
      }
      return IMAGE_BASE + item.image;
    }
    if (state.imagePreviews[item.id]) {
      return state.imagePreviews[item.id];
    }
    return PLACEHOLDER;
  }

  /** Find category by id */
  function getCategory(id) {
    return state.data.categories.find(function (c) { return c.id === id; });
  }

  /** Get filtered items for active category */
  function getVisibleItems() {
    var category = getCategory(state.activeCategoryId);
    if (!category) return [];

    var items = category.items.slice();

    if (state.searchQuery) {
      var q = state.searchQuery.toLowerCase();
      items = items.filter(function (item) {
        return (
          (item.name || "").toLowerCase().indexOf(q) !== -1 ||
          (item.nameEn || "").toLowerCase().indexOf(q) !== -1
        );
      });
    }

    return items;
  }

  /** Validate price input — numbers only */
  function isValidPrice(value) {
    if (value === "" || value == null) return true;
    return /^\d+(\.\d+)?$/.test(String(value).trim());
  }

  /** Parse price value to number or null */
  function parsePrice(value) {
    if (value === "" || value == null) return null;
    var num = parseFloat(String(value).trim());
    return isNaN(num) ? null : num;
  }

  /** Handle image file selection */
  function handleImageUpload(file, itemId, previewEl, filenameEl) {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      return;
    }

    var filename = file.name.replace(/\s+/g, "-").toLowerCase();
    var reader = new FileReader();

    reader.onload = function (e) {
      state.imagePreviews[itemId] = e.target.result;

      if (previewEl) previewEl.src = e.target.result;
      if (filenameEl) filenameEl.value = filename;

      if (itemId !== "modal") {
        var category = getCategory(state.activeCategoryId);
        if (category) {
          var item = category.items.find(function (i) { return i.id === itemId; });
          if (item) {
            item.image = e.target.result;
            autoSave();
          }
        }
      }

      autoSave();
    };

    reader.readAsDataURL(file);
  }

  /** Render category sidebar */
  function renderCategories() {
    els.categoryList.innerHTML = "";

    state.data.categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-item" + (cat.id === state.activeCategoryId ? " active" : "");
      btn.dataset.categoryId = cat.id;
      btn.innerHTML = cat.name + ' <span class="cat-count">' + cat.items.length + "</span>";

      btn.addEventListener("click", function () {
        state.activeCategoryId = cat.id;
        state.searchQuery = "";
        els.searchInput.value = "";
        renderCategories();
        renderItems();
      });

      els.categoryList.appendChild(btn);
    });
  }

  /** Build price fields HTML for item card */
  function buildPriceFields(item) {
    if (item.prices) {
      return (
        '<div class="price-fields-inline">' +
        '<div><label class="form-label">L</label><input type="text" class="form-input price-input" data-field="priceL" data-id="' + item.id + '" value="' + (item.prices.L != null ? item.prices.L : "") + '" inputmode="numeric"></div>' +
        '<div><label class="form-label">M</label><input type="text" class="form-input price-input" data-field="priceM" data-id="' + item.id + '" value="' + (item.prices.M != null ? item.prices.M : "") + '" inputmode="numeric"></div>' +
        '<div><label class="form-label">S</label><input type="text" class="form-input price-input" data-field="priceS" data-id="' + item.id + '" value="' + (item.prices.S != null ? item.prices.S : "") + '" inputmode="numeric"></div>' +
        "</div>"
      );
    }

    return (
      '<label class="form-label">Price</label>' +
      '<input type="text" class="form-input price-input" data-field="price" data-id="' + item.id + '" value="' + (item.price != null ? item.price : "") + '" inputmode="numeric" placeholder="0">'
    );
  }

  /** Create item card element */
  function createItemCard(item, index) {
    var card = document.createElement("div");
    card.className = "item-card" + (item.available === false ? " unavailable" : "");
    card.dataset.itemId = item.id;
    card.draggable = true;
    card.style.animationDelay = Math.min(index * 0.04, 0.3) + "s";

    card.innerHTML =
      '<div class="card-drag-handle" title="Drag to reorder">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>' +
      "</div>" +
      '<div class="card-image-wrap">' +
      '<img src="' + getImageSrc(item) + '" alt="' + (item.name || "Item") + '" class="card-preview-img" loading="lazy">' +
      '<div class="upload-btn-wrap">' +
      '<button type="button" class="btn btn-sm upload-btn" data-upload="' + item.id + '">Upload</button>' +
      "</div>" +
      "</div>" +
      '<div class="card-body">' +
      '<label class="form-label">Food Name</label>' +
      '<input type="text" class="form-input" data-field="name" data-id="' + item.id + '" value="' + escapeAttr(item.name) + '">' +
      '<label class="form-label">Name (EN)</label>' +
      '<input type="text" class="form-input" data-field="nameEn" data-id="' + item.id + '" value="' + escapeAttr(item.nameEn || "") + '">' +
      '<label class="form-label">Description</label>' +
      '<textarea class="form-input" data-field="description" data-id="' + item.id + '" rows="2">' + escapeHtml(item.description || "") + "</textarea>" +
      buildPriceFields(item) +
      '<div class="card-actions">' +
      '<div class="card-actions-left">' +
      '<label class="form-check"><input type="checkbox" data-field="available" data-id="' + item.id + '"' + (item.available !== false ? " checked" : "") + "> Available</label>" +
      "</div>" +
      '<div class="card-btn-group">' +
      '<button type="button" class="card-btn" data-duplicate="' + item.id + '">Duplicate</button>' +
      '<button type="button" class="card-btn danger" data-delete="' + item.id + '">Delete</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    var img = card.querySelector(".card-preview-img");
    img.addEventListener("error", function () {
      img.src = PLACEHOLDER;
    });

    setupDragDrop(card, item);
    return card;
  }

  /** Escape HTML for textarea content */
  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /** Escape attribute values */
  function escapeAttr(str) {
    return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  /** Render items grid for active category */
  function renderItems() {
    var category = getCategory(state.activeCategoryId);
    if (!category) {
      els.activeCategoryTitle.textContent = "Select a category";
      els.itemCount.textContent = "";
      els.itemsGrid.innerHTML = "";
      els.emptyItems.classList.add("hidden");
      return;
    }

    els.activeCategoryTitle.textContent = category.name + (category.nameAr ? " — " + category.nameAr : "");
    var items = getVisibleItems();
    els.itemCount.textContent = items.length + " item" + (items.length !== 1 ? "s" : "");

    els.itemsGrid.innerHTML = "";

    if (items.length === 0) {
      els.emptyItems.classList.remove("hidden");
      els.itemsGrid.classList.add("hidden");
      return;
    }

    els.emptyItems.classList.add("hidden");
    els.itemsGrid.classList.remove("hidden");

    items.forEach(function (item, i) {
      els.itemsGrid.appendChild(createItemCard(item, i));
    });
  }

  /** Find item by id across all categories */
  function findItem(itemId) {
    for (var i = 0; i < state.data.categories.length; i++) {
      var cat = state.data.categories[i];
      for (var j = 0; j < cat.items.length; j++) {
        if (cat.items[j].id === itemId) {
          return { category: cat, item: cat.items[j], index: j };
        }
      }
    }
    return null;
  }

  /** Update item field from input change */
  function updateItemField(itemId, field, value) {
    var found = findItem(itemId);
    if (!found) return;

    var item = found.item;

    switch (field) {
      case "name":
        item.name = value;
        break;
      case "nameEn":
        item.nameEn = value;
        break;
      case "description":
        item.description = value;
        break;
      case "price":
        item.price = parsePrice(value);
        delete item.prices;
        break;
      case "priceL":
        if (!item.prices) item.prices = {};
        item.prices.L = parsePrice(value);
        delete item.price;
        break;
      case "priceM":
        if (!item.prices) item.prices = {};
        item.prices.M = parsePrice(value);
        delete item.price;
        break;
      case "priceS":
        if (!item.prices) item.prices = {};
        item.prices.S = parsePrice(value);
        delete item.price;
        break;
      case "available":
        item.available = value;
        break;
    }

    autoSave();
  }

  /** Duplicate an item */
  function duplicateItem(itemId) {
    var found = findItem(itemId);
    if (!found) return;

    var copy = MenuImport.deepClone(found.item);
    copy.id = MenuImport.generateId();
    copy.name = copy.name + " (Copy)";

    if (state.imagePreviews[itemId]) {
      state.imagePreviews[copy.id] = state.imagePreviews[itemId];
    }

    found.category.items.splice(found.index + 1, 0, copy);
    renderCategories();
    renderItems();
    autoSave();
    showToast("Item duplicated.", "success");
  }

  /** Delete item after confirmation */
  function deleteItem(itemId) {
    var found = findItem(itemId);
    if (!found) return;

    found.category.items.splice(found.index, 1);
    delete state.imagePreviews[itemId];
    renderCategories();
    renderItems();
    autoSave();
    showToast("Item deleted.", "success");
  }

  /** Setup HTML5 drag and drop for reordering */
  function setupDragDrop(card, item) {
    card.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", item.id);
      e.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", function () {
      card.classList.remove("dragging");
      document.querySelectorAll(".item-card.drag-over").forEach(function (el) {
        el.classList.remove("drag-over");
      });
    });

    card.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      card.classList.add("drag-over");
    });

    card.addEventListener("dragleave", function () {
      card.classList.remove("drag-over");
    });

    card.addEventListener("drop", function (e) {
      e.preventDefault();
      card.classList.remove("drag-over");

      var draggedId = e.dataTransfer.getData("text/plain");
      var targetId = item.id;
      if (draggedId === targetId) return;

      var category = getCategory(state.activeCategoryId);
      if (!category) return;

      var fromIndex = -1;
      var toIndex = -1;

      category.items.forEach(function (it, idx) {
        if (it.id === draggedId) fromIndex = idx;
        if (it.id === targetId) toIndex = idx;
      });

      if (fromIndex === -1 || toIndex === -1) return;

      var moved = category.items.splice(fromIndex, 1)[0];
      category.items.splice(toIndex, 0, moved);

      renderItems();
      autoSave();
    });
  }

  /** Populate category select in modal */
  function populateCategorySelect() {
    els.modalCategory.innerHTML = "";
    state.data.categories.forEach(function (cat) {
      var opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = cat.name;
      if (cat.id === state.activeCategoryId) opt.selected = true;
      els.modalCategory.appendChild(opt);
    });
  }

  /** Open add item modal */
  function openModal() {
    populateCategorySelect();
    els.addItemForm.reset();
    document.getElementById("modal-image-preview").src = PLACEHOLDER;
    document.getElementById("modal-image-name").value = "";
    document.getElementById("modal-available").checked = true;
    document.querySelector('input[name="price-type"][value="single"]').checked = true;
    togglePriceFields();
    els.modalOverlay.classList.remove("hidden");
  }

  /** Close add item modal */
  function closeModal() {
    els.modalOverlay.classList.add("hidden");
  }

  /** Toggle single/multi price fields in modal */
  function togglePriceFields() {
    var isMulti = document.querySelector('input[name="price-type"]:checked').value === "multi";
    document.getElementById("single-price-fields").classList.toggle("hidden", isMulti);
    document.getElementById("multi-price-fields").classList.toggle("hidden", !isMulti);
  }

  /** Handle add item form submit */
  function handleAddItem(e) {
    e.preventDefault();

    var name = document.getElementById("modal-name").value.trim();
    if (!name) {
      showToast("Name is required.", "error");
      return;
    }

    var isMulti = document.querySelector('input[name="price-type"]:checked').value === "multi";
    var priceVal = document.getElementById("modal-price").value.trim();
    var priceL = document.getElementById("modal-price-l").value.trim();
    var priceM = document.getElementById("modal-price-m").value.trim();
    var priceS = document.getElementById("modal-price-s").value.trim();

    if (isMulti) {
      if (!isValidPrice(priceL) || !isValidPrice(priceM) || !isValidPrice(priceS)) {
        showToast("Prices must be numbers only.", "error");
        return;
      }
    } else if (!isValidPrice(priceVal)) {
      showToast("Price must be a number only.", "error");
      return;
    }

    var categoryId = els.modalCategory.value;
    var category = getCategory(categoryId);
    if (!category) return;

    var itemId = MenuImport.generateId();
    var newItem = {
      id: itemId,
      name: name,
      nameEn: document.getElementById("modal-name-en").value.trim(),
      description: document.getElementById("modal-description").value.trim(),
      image: state.imagePreviews["modal"] || document.getElementById("modal-image-name").value.trim() || "placeholder.svg",
      available: document.getElementById("modal-available").checked,
    };

    if (isMulti) {
      newItem.prices = {};
      var l = parsePrice(priceL);
      var m = parsePrice(priceM);
      var s = parsePrice(priceS);
      if (l != null) newItem.prices.L = l;
      if (m != null) newItem.prices.M = m;
      if (s != null) newItem.prices.S = s;
    } else {
      var p = parsePrice(priceVal);
      if (p != null) newItem.price = p;
    }

    if (state.imagePreviews["modal"]) {
      state.imagePreviews[itemId] = state.imagePreviews["modal"];
      delete state.imagePreviews["modal"];
    }

    category.items.push(newItem);
    state.activeCategoryId = categoryId;

    closeModal();
    renderCategories();
    renderItems();
    autoSave();
    showToast("New item added.", "success");
  }

  /** Bind all event listeners */
  function bindEvents() {
    els.searchInput.addEventListener("input", function (e) {
      state.searchQuery = e.target.value.trim();
      renderItems();
    });

    document.getElementById("btn-add-item").addEventListener("click", openModal);
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    els.addItemForm.addEventListener("submit", handleAddItem);

    els.modalOverlay.addEventListener("click", function (e) {
      if (e.target === els.modalOverlay) closeModal();
    });

    document.querySelectorAll('input[name="price-type"]').forEach(function (radio) {
      radio.addEventListener("change", togglePriceFields);
    });

    document.getElementById("modal-upload-btn").addEventListener("click", function () {
      document.getElementById("modal-image-input").click();
    });

    document.getElementById("modal-image-input").addEventListener("change", function (e) {
      var file = e.target.files[0];
      handleImageUpload(
        file,
        "modal",
        document.getElementById("modal-image-preview"),
        document.getElementById("modal-image-name")
      );
      e.target.value = "";
    });

    els.itemsGrid.addEventListener("input", function (e) {
      var target = e.target;
      var field = target.dataset.field;
      var itemId = target.dataset.id;
      if (!field || !itemId) return;

      if (field.indexOf("price") === 0 || field === "price") {
        if (!isValidPrice(target.value)) {
          target.classList.add("invalid");
          return;
        }
        target.classList.remove("invalid");
      }

      var value = target.type === "checkbox" ? target.checked : target.value;
      updateItemField(itemId, field, value);

      if (field === "available") {
        var card = target.closest(".item-card");
        if (card) card.classList.toggle("unavailable", !value);
      }
    });

    els.itemsGrid.addEventListener("click", function (e) {
      var uploadBtn = e.target.closest("[data-upload]");
      if (uploadBtn) {
        var itemId = uploadBtn.dataset.upload;
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", function (ev) {
          var file = ev.target.files[0];
          var card = uploadBtn.closest(".item-card");
          var preview = card.querySelector(".card-preview-img");
          handleImageUpload(file, itemId, preview, null);
        });
        input.click();
        return;
      }

      var dupBtn = e.target.closest("[data-duplicate]");
      if (dupBtn) {
        duplicateItem(dupBtn.dataset.duplicate);
        return;
      }

      var delBtn = e.target.closest("[data-delete]");
      if (delBtn) {
        var found = findItem(delBtn.dataset.delete);
        state.pendingDeleteId = delBtn.dataset.delete;
        els.confirmMessage.textContent =
          'Are you sure you want to delete "' + (found ? found.item.name : "this item") + '"?';
        els.confirmOverlay.classList.remove("hidden");
      }
    });

    document.getElementById("confirm-cancel").addEventListener("click", function () {
      els.confirmOverlay.classList.add("hidden");
      state.pendingDeleteId = null;
    });

    document.getElementById("confirm-delete").addEventListener("click", function () {
      if (state.pendingDeleteId) {
        deleteItem(state.pendingDeleteId);
        state.pendingDeleteId = null;
      }
      els.confirmOverlay.classList.add("hidden");
    });

    els.confirmOverlay.addEventListener("click", function (e) {
      if (e.target === els.confirmOverlay) {
        els.confirmOverlay.classList.add("hidden");
        state.pendingDeleteId = null;
      }
    });

    document.getElementById("btn-export").addEventListener("click", function () {
      MenuExport.exportDataJs(state.data);
      showToast("data.js exported! Replace js/data.js with the downloaded file.", "success");
    });

    document.getElementById("btn-export-images").addEventListener("click", function () {
      MenuExport.exportImagesList(state.data);
      showToast("images-needed.txt downloaded.", "success");
    });

    document.getElementById("btn-import").addEventListener("click", function () {
      els.importFileInput.click();
    });

    els.importFileInput.addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;

      MenuImport.importFromFile(file)
        .then(function (data) {
          state.data = data;
          state.imagePreviews = {};
          MenuStorage.saveBaseline(data);
          MenuStorage.saveMenuData(data);
          if (state.data.categories.length) {
            state.activeCategoryId = state.data.categories[0].id;
          }
          renderCategories();
          renderItems();
          showToast("Menu imported successfully.", "success");
        })
        .catch(function (err) {
          showToast("Import failed: " + err.message, "error");
        });

      e.target.value = "";
    });

    document.getElementById("btn-reset").addEventListener("click", function () {
      var baseline = MenuStorage.loadBaseline();
      if (!baseline) {
        showToast("No imported version to reset to. Import a menu first.", "error");
        return;
      }

      if (!confirm("Reset all changes to the last imported version?")) return;

      state.data = MenuImport.deepClone(baseline);
      state.imagePreviews = MenuStorage.loadImagePreviews();
      if (state.data.categories.length) {
        state.activeCategoryId = state.data.categories[0].id;
      }
      renderCategories();
      renderItems();
      autoSave();
      showToast("Changes reset to last imported version.", "info");
    });
  }

  /** Load initial data: localStorage → page MENU_DATA */
  function loadInitialData() {
    var saved = MenuStorage.loadMenuData();
    if (saved && saved.categories && saved.categories.length) {
      state.data = saved;
      state.imagePreviews = MenuStorage.loadImagePreviews();
    } else {
      state.data = MenuImport.loadFromPage();
      if (state.data) {
        MenuStorage.saveBaseline(state.data);
        MenuStorage.saveMenuData(state.data);
      }
    }

    if (!state.data || !state.data.categories.length) {
      showToast("No menu data found. Import a data.js file.", "error");
      return false;
    }

    state.activeCategoryId = state.data.categories[0].id;
    return true;
  }

  /** Initialize admin panel */
  function init() {
    cacheElements();
    if (!loadInitialData()) return;
    renderCategories();
    renderItems();
    bindEvents();
    setSaveStatus("saved");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
