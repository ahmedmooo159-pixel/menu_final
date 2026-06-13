/**
 * export.js — Export menu to data.js and images-needed.txt
 * Generates ready-to-replace files for the restaurant site.
 */
(function (global) {
  "use strict";

  /**
   * Escape string for JavaScript output.
   */
  function escapeJs(str) {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "");
  }

  /**
   * Format a single item as JS object literal.
   */
  function formatItem(item) {
    var parts = ['id: "' + escapeJs(item.id) + '"'];
    parts.push('name: "' + escapeJs(item.name) + '"');

    if (item.nameEn) {
      parts.push('nameEn: "' + escapeJs(item.nameEn) + '"');
    }

    parts.push('description: "' + escapeJs(item.description || "") + '"');

    if (item.prices && Object.keys(item.prices).length > 0) {
      var priceParts = [];
      if (item.prices.L != null) priceParts.push("L: " + item.prices.L);
      if (item.prices.M != null) priceParts.push("M: " + item.prices.M);
      if (item.prices.S != null) priceParts.push("S: " + item.prices.S);
      parts.push("prices: { " + priceParts.join(", ") + " }");
    } else if (item.price != null) {
      parts.push("price: " + item.price);
    }

    parts.push('image: "' + escapeJs(item.image) + '"');

    if (item.available === false) {
      parts.push("available: false");
    }

    return "{ " + parts.join(", ") + " }";
  }

  /**
   * Format categories array as JS.
   */
  function formatCategories(categories) {
    return categories
      .map(function (cat) {
        var lines = ["    {"];
        lines.push('      id: "' + escapeJs(cat.id) + '",');
        lines.push('      name: "' + escapeJs(cat.name) + '",');
        lines.push('      nameAr: "' + escapeJs(cat.nameAr || "") + '",');

        if (cat.note) {
          lines.push('      note: "' + escapeJs(cat.note) + '",');
        }

        var items = (cat.items || []).map(function (item) {
          return "        " + formatItem(MenuImport.denormalizeItem(item));
        });

        lines.push("      items: [");
        lines.push(items.join(",\n"));
        lines.push("      ],");
        lines.push("    }");
        return lines.join("\n");
      })
      .join(",\n");
  }

  /**
   * Format restaurant object as JS.
   */
  function formatRestaurant(r) {
    if (!r) return "{}";
    var lines = ["  restaurant: {"];
    lines.push('    name: "' + escapeJs(r.name || "") + '",');
    if (r.nameEn) lines.push('    nameEn: "' + escapeJs(r.nameEn) + '",');
    if (r.welcome) lines.push('    welcome: "' + escapeJs(r.welcome) + '",');
    if (r.tagline) lines.push('    tagline: "' + escapeJs(r.tagline) + '",');
    if (r.logo) lines.push('    logo: "' + escapeJs(r.logo) + '",');

    if (r.phones && r.phones.length) {
      lines.push("    phones: [" + r.phones.map(function (p) { return '"' + escapeJs(p) + '"'; }).join(", ") + "],");
    }

    if (r.address) lines.push('    address: "' + escapeJs(r.address) + '",');
    if (r.deliveryNote) lines.push('    deliveryNote: "' + escapeJs(r.deliveryNote) + '",');

    lines.push("  },");
    return lines.join("\n");
  }

  /**
   * Format social links as JS.
   */
  function formatSocialLinks(links) {
    if (!links) return "const SOCIAL_LINKS = {};";
    var lines = ["const SOCIAL_LINKS = {"];
    if (links.whatsapp) lines.push('  whatsapp: "' + escapeJs(links.whatsapp) + '",');
    if (links.facebook) lines.push('  facebook: "' + escapeJs(links.facebook) + '",');
    lines.push("};");
    return lines.join("\n");
  }

  /**
   * Generate complete data.js file content.
   */
  function generateDataJs(data) {
    var header =
      "/**\n" +
      " * ═══════════════════════════════════════════════════════════\n" +
      " *  ملف البيانات — تم إنشاؤه من لوحة التحكم Admin Panel\n" +
      " *  Restaurant: " + (data.restaurant && data.restaurant.name ? data.restaurant.name : "") + "\n" +
      " * ═══════════════════════════════════════════════════════════\n" +
      " */\n\n";

    var body =
      "const MENU_DATA = {\n" +
      formatRestaurant(data.restaurant) +
      "\n  categories: [\n" +
      formatCategories(data.categories) +
      "\n  ],\n" +
      "};\n\n" +
      formatSocialLinks(data.socialLinks);

    return header + body;
  }

  /**
   * Collect all unique image filenames from menu data.
   */
  function collectImageNames(data) {
    var names = [];
    var seen = {};

    (data.categories || []).forEach(function (cat) {
      (cat.items || []).forEach(function (item) {
        if (typeof item.image === "string" && item.image.indexOf("data:") === 0) {
          return;
        }
        var filename = MenuImport.extractFilename(item.image);
        if (filename && filename !== "placeholder.svg" && !seen[filename]) {
          seen[filename] = true;
          names.push(filename);
        }
      });
    });

    return names.sort();
  }

  /**
   * Generate images-needed.txt content.
   */
  function generateImagesList(data) {
    var names = collectImageNames(data);
    var header =
      "# Images needed for restaurant menu\n" +
      "# Place all files inside: assets/images/\n" +
      "# Generated by Admin Panel\n" +
      "# Total: " + names.length + " images\n\n";

    return header + names.join("\n") + "\n";
  }

  /**
   * Trigger browser download of a text file.
   */
  function downloadFile(filename, content, mimeType) {
    var blob = new Blob([content], { type: mimeType || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Export data.js file.
   */
  function exportDataJs(data) {
    var content = generateDataJs(data);
    downloadFile("data.js", content, "text/javascript;charset=utf-8");
    return content;
  }

  /**
   * Export images-needed.txt file.
   */
  function exportImagesList(data) {
    var content = generateImagesList(data);
    downloadFile("images-needed.txt", content, "text/plain;charset=utf-8");
    return content;
  }

  global.MenuExport = {
    generateDataJs: generateDataJs,
    generateImagesList: generateImagesList,
    collectImageNames: collectImageNames,
    exportDataJs: exportDataJs,
    exportImagesList: exportImagesList,
    downloadFile: downloadFile,
  };
})(window);
