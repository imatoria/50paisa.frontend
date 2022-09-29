(function ($) {
  "use strict";

  // Add active state to sidbar nav links
  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
  $("nav.navbar a.nav-link").each(function () {
    if (this.href === path) {
      $(this).addClass("active");
    }
  });
})(jQuery);

// Checkbox All Selection
$(".check-all").click(function () {
  $(".check-item").prop("checked", $(this).prop("checked"));
});
