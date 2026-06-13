/**
 * Animations — loader, ripple effect
 */
(function () {
  "use strict";

  /** Hide loader after page load */
  function initLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;

    function hideLoader() {
      loader.classList.add("loader-hidden");
      loader.setAttribute("aria-hidden", "true");
      setTimeout(function () {
        loader.remove();
      }, 500);
    }

    if (document.readyState === "complete") {
      setTimeout(hideLoader, 400);
    } else {
      window.addEventListener("load", function () {
        setTimeout(hideLoader, 400);
      });
    }
  }

  /** Ripple effect on buttons */
  function createRipple(event) {
    var button = event.currentTarget;
    if (button.classList.contains("is-disabled")) return;

    var circle = document.createElement("span");
    circle.className = "ripple";

    var rect = button.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = event.clientX - rect.left - size / 2;
    var y = event.clientY - rect.top - size / 2;

    circle.style.width = circle.style.height = size + "px";
    circle.style.left = x + "px";
    circle.style.top = y + "px";

    button.appendChild(circle);
    circle.addEventListener("animationend", function () {
      circle.remove();
    });
  }

  function initRipple() {
    document.addEventListener("click", function (e) {
      var target = e.target.closest(".ripple-btn");
      if (target) createRipple({ currentTarget: target, clientX: e.clientX, clientY: e.clientY });
    });
  }

  initLoader();
  initRipple();
})();
