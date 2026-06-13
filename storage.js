/**
 * storage.js — Local Storage management for Admin Panel
 * Auto-saves menu data and keeps a baseline for reset.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "restaurant-menu-admin";
  var BASELINE_KEY = "restaurant-menu-imported";
  var PREVIEW_KEY = "restaurant-menu-previews";

  /**
   * Save current working menu data to localStorage.
   */
  function saveMenuData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save menu data:", e);
      return false;
    }
  }

  /**
   * Load working menu data from localStorage.
   * Returns null if nothing saved.
   */
  function loadMenuData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to load menu data:", e);
      return null;
    }
  }

  /**
   * Save the last imported version as baseline for Reset Changes.
   */
  function saveBaseline(data) {
    try {
      localStorage.setItem(BASELINE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save baseline:", e);
      return false;
    }
  }

  /**
   * Load baseline data for reset.
   */
  function loadBaseline() {
    try {
      var raw = localStorage.getItem(BASELINE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  /**
   * Store blob preview URLs keyed by item id (for uploaded images).
   * Only stores data URLs for preview — not exported.
   */
  function saveImagePreviews(previews) {
    try {
      localStorage.setItem(PREVIEW_KEY, JSON.stringify(previews));
    } catch (e) {
      /* Previews may exceed quota — non-critical */
    }
  }

  /**
   * Load stored image preview URLs.
   */
  function loadImagePreviews() {
    try {
      var raw = localStorage.getItem(PREVIEW_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  /**
   * Clear all admin storage.
   */
  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BASELINE_KEY);
    localStorage.removeItem(PREVIEW_KEY);
  }

  global.MenuStorage = {
    saveMenuData: saveMenuData,
    loadMenuData: loadMenuData,
    saveBaseline: saveBaseline,
    loadBaseline: loadBaseline,
    saveImagePreviews: saveImagePreviews,
    loadImagePreviews: loadImagePreviews,
    clearAll: clearAll,
  };
})(window);
