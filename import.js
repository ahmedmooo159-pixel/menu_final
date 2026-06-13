/**
 * import.js — Import menu from data.js or JSON files
 * Normalizes data into admin-friendly internal format.
 */
(function (global) {
  "use strict";

  var IMAGE_FOLDER = "assets/images/";

  /**
   * Extract filename from full image path.
   * "assets/images/pizza.jpg" → "pizza.jpg"
   */
  function extractFilename(imagePath) {
    if (!imagePath) return "placeholder.svg";
    var imageString = String(imagePath);
    if (imageString.indexOf("data:") === 0) return imageString;
    var parts = imageString.replace(/\\/g, "/").split("/");
    return parts[parts.length - 1] || "placeholder.svg";
  }

  /**
   * Build full image path from filename for export.
   */
  function buildImagePath(filename) {
    if (!filename) return IMAGE_FOLDER + "placeholder.svg";
    var fn = String(filename);
    if (fn.indexOf("data:") === 0) return fn;
    if (fn.indexOf("/") !== -1 || fn.indexOf("\\") !== -1) {
      return fn.replace(/\\/g, "/");
    }
    return IMAGE_FOLDER + fn;
  }

  /**
   * Deep clone an object.
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Normalize a single item for admin editing.
   */
  function normalizeItem(item) {
    var normalized = {
      id: item.id || generateId(),
      name: item.name || "",
      nameEn: item.nameEn || "",
      description: item.description || "",
      image: extractFilename(item.image),
      available: item.available !== false,
    };

    if (item.prices && typeof item.prices === "object") {
      normalized.prices = {};
      if (item.prices.L != null) normalized.prices.L = Number(item.prices.L);
      if (item.prices.M != null) normalized.prices.M = Number(item.prices.M);
      if (item.prices.S != null) normalized.prices.S = Number(item.prices.S);
    } else if (item.price != null && item.price !== "") {
      normalized.price = Number(item.price);
    }

    return normalized;
  }

  /**
   * Normalize full menu structure from MENU_DATA format.
   */
  function normalizeMenuData(raw) {
    if (!raw) return null;

    var result = {
      restaurant: deepClone(raw.restaurant || {}),
      socialLinks: deepClone(raw.socialLinks || {}),
      categories: [],
    };

    if (raw.categories && Array.isArray(raw.categories)) {
      result.categories = raw.categories.map(function (cat) {
        return {
          id: cat.id,
          name: cat.name || "",
          nameAr: cat.nameAr || "",
          note: cat.note || "",
          items: (cat.items || []).map(normalizeItem),
        };
      });
    } else {
      /* Support flat menuData format: { pizza: [...], pasta: [...] } */
      Object.keys(raw).forEach(function (key) {
        if (key === "restaurant" || key === "socialLinks") return;
        if (!Array.isArray(raw[key])) return;
        result.categories.push({
          id: key,
          name: key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "),
          nameAr: "",
          note: "",
          items: raw[key].map(normalizeItem),
        });
      });
    }

    return result;
  }

  /**
   * Generate unique item id.
   */
  function generateId() {
    return "item-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  }

  /**
   * Parse data.js file content using Function constructor.
   * Extracts MENU_DATA and SOCIAL_LINKS globals.
   */
  function parseDataJsContent(content) {
    var wrapped =
      content +
      "\n;return { menu: typeof MENU_DATA !== 'undefined' ? MENU_DATA : (typeof menuData !== 'undefined' ? menuData : null), social: typeof SOCIAL_LINKS !== 'undefined' ? SOCIAL_LINKS : null };";

    var fn = new Function(wrapped);
    var result = fn();

    if (!result.menu) {
      throw new Error("Could not find MENU_DATA or menuData in file.");
    }

    var normalized = normalizeMenuData(result.menu);

    if (result.social) {
      normalized.socialLinks = deepClone(result.social);
    }

    return normalized;
  }

  /**
   * Parse JSON file content.
   */
  function parseJsonContent(content) {
    var parsed = JSON.parse(content);

    if (parsed.menu || parsed.MENU_DATA) {
      var data = parsed.menu || parsed.MENU_DATA;
      var normalized = normalizeMenuData(data);
      if (parsed.socialLinks || parsed.SOCIAL_LINKS) {
        normalized.socialLinks = deepClone(parsed.socialLinks || parsed.SOCIAL_LINKS);
      }
      return normalized;
    }

    return normalizeMenuData(parsed);
  }

  /**
   * Read and parse a File object (data.js or .json).
   */
  function importFromFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.onload = function (e) {
        try {
          var content = e.target.result;
          var isJson = file.name.endsWith(".json") || content.trim().charAt(0) === "{";
          var data = isJson ? parseJsonContent(content) : parseDataJsContent(content);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = function () {
        reject(new Error("Failed to read file."));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Load initial data from embedded MENU_DATA + SOCIAL_LINKS.
   */
  function loadFromPage() {
    var data = null;

    if (typeof MENU_DATA !== "undefined") {
      data = normalizeMenuData(MENU_DATA);
    }

    if (data && typeof SOCIAL_LINKS !== "undefined") {
      data.socialLinks = deepClone(SOCIAL_LINKS);
    }

    return data;
  }

  /**
   * Denormalize item for export to data.js format.
   */
  function denormalizeItem(item) {
    var exported = {
      id: item.id,
      name: item.name,
      description: item.description || "",
      image: buildImagePath(item.image),
      available: item.available !== false,
    };

    if (item.nameEn) exported.nameEn = item.nameEn;

    if (item.prices && Object.keys(item.prices).length > 0) {
      exported.prices = {};
      if (item.prices.L != null) exported.prices.L = item.prices.L;
      if (item.prices.M != null) exported.prices.M = item.prices.M;
      if (item.prices.S != null) exported.prices.S = item.prices.S;
    } else if (item.price != null) {
      exported.price = item.price;
    }

    if (item.available === false) {
      exported.available = false;
    } else {
      delete exported.available;
    }

    return exported;
  }

  global.MenuImport = {
    extractFilename: extractFilename,
    buildImagePath: buildImagePath,
    normalizeMenuData: normalizeMenuData,
    normalizeItem: normalizeItem,
    denormalizeItem: denormalizeItem,
    parseDataJsContent: parseDataJsContent,
    parseJsonContent: parseJsonContent,
    importFromFile: importFromFile,
    loadFromPage: loadFromPage,
    generateId: generateId,
    deepClone: deepClone,
  };
})(window);
