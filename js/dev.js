document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems);
});


// Scale modal window on mobile devices
$(window).on("resize", function () {
  $(".modal").css("max-height", $(window).height() * 0.7);
}).resize();