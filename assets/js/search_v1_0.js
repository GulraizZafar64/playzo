/**
 * Search bar — waits for jQuery (loads in parallel with other afterInteractive scripts).
 */
(function searchInit() {
  function whenJQuery(fn) {
    var jq = typeof window !== "undefined" && (window.jQuery || window.$);
    if (jq) {
      fn(jq);
      return;
    }
    if (typeof window === "undefined") return;
    var tries = 0;
    var id = setInterval(function () {
      tries += 1;
      var j = window.jQuery || window.$;
      if (j) {
        clearInterval(id);
        fn(j);
      } else if (tries > 200) {
        clearInterval(id);
      }
    }, 25);
  }

  function bind($) {
    window.doSearch = function () {
      var $input = $("#search-input");
      if (!$input.length) return;
      var val = String($input.val() || "")
        .trim()
        .replace(/ /g, "-");
      if (val !== "") {
        window.location = "/search.html?q=" + encodeURIComponent(val);
      }
    };

    $(document).on("keyup", "#search-input", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        window.doSearch();
      }
    });

    $(document).on("click", "#search-button", function () {
      window.doSearch();
    });

    $(document).on("shown.bs.modal", "#searchGameModal", function () {
      $("#search-input").trigger("focus");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      whenJQuery(bind);
    });
  } else {
    whenJQuery(bind);
  }
})();
