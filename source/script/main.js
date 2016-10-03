$(function(){

  // スライダー
  // --------
  $('#slider').slick({
    dots: false,
    draggable: false,
    pauseOnHover: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1200,
    prevArrow: '',
    nextArrow: ''
  });

  $('#badge').delay(2000).fadeIn(1200);

  $(window)
    .on('resize', function(){
      $('#slider').css('height', $(window).height()+'px');
    });
});