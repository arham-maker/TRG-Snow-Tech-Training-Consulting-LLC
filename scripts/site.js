(function () {
  "use strict";

  function initNav() {
    var header = document.querySelector("[data-site-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var mobile = document.querySelector("[data-mobile-nav]");
    if (!header || !toggle || !mobile) return;

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) mobile.removeAttribute("hidden");
      else mobile.setAttribute("hidden", "");
    });

    var path = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      var href = (link.getAttribute("href") || "").replace(/\/$/, "") || "/";
      if (href === path) link.classList.add("is-active");
    });
  }

  function blockHasContent(block) {
    if (!block || block.classList.contains("sqs-block-spacer")) return false;
    var text = String(block.textContent || "")
      .replace(/\s+/g, " ")
      .trim();
    var hasMedia =
      block.querySelector("img, iframe, video, .thumb-image, .sqs-image") !== null;
    var hasForm =
      block.querySelector("form, .form-wrapper, .sqs-form-content, .react-form-contents") !==
      null;
    return text.length > 2 || hasMedia || hasForm;
  }

  function initEditableSlots() {
    document.querySelectorAll("[data-trg-editable]").forEach(function (slot) {
      var cms = slot.querySelector(".trg-editable__cms");
      if (!cms) return;
      var blocks = cms.querySelectorAll(
        ".sqs-block, .sqs-block-html, .sqs-block-button, .sqs-block-image, .sqs-block-markdown, .sqs-block-summary-v2, .sqs-block-form, .sqs-block-newsletter, .sqs-block-gallery"
      );
      var has = false;
      Array.prototype.slice.call(blocks).forEach(function (block) {
        if (blockHasContent(block)) has = true;
      });
      if (has) slot.classList.add("has-cms");
      else slot.classList.remove("has-cms");
    });
  }

  function initSqsFormSlots() {
    document.querySelectorAll("[data-sqs-form-slot]").forEach(function (slot) {
      var cms = slot.querySelector(".trg-editable__cms") || slot;
      var hasReal =
        cms.querySelector(
          ".sqs-block-form, .sqs-block-newsletter, .newsletter-block, .form-wrapper, .sqs-form-content, .react-form-contents"
        ) !== null;
      if (hasReal) slot.classList.add("has-cms");
      else slot.classList.remove("has-cms");
    });
  }

  function initQuoteForms() {
    document.querySelectorAll("[data-quote-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        var status = form.querySelector("[data-form-status]");
        var name = form.querySelector('[name="name"]');
        var email = form.querySelector('[name="email"]');
        if (!name || !email || !String(name.value || "").trim() || !String(email.value || "").trim()) {
          event.preventDefault();
          if (status) {
            status.hidden = false;
            status.textContent = "Please enter your name and email.";
            status.classList.add("is-error");
            status.classList.remove("is-success");
          }
          return;
        }
        if (status) {
          status.hidden = false;
          status.textContent = "Opening your email client to send this request…";
          status.classList.add("is-success");
          status.classList.remove("is-error");
        }
      });
    });
  }

  function initHomeClass() {
    var path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/") document.body.classList.add("trg-home");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeClass();
    initNav();
    initEditableSlots();
    initSqsFormSlots();
    initQuoteForms();
  });
})();
