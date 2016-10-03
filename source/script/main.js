$(function(){

  $.cookie.defaults.path = '/';

  // Sound
  // --------

  var sound = document.getElementById('sound');
  sound.volume = 0.3;
  var toggleSound = function(_on){
    console.log(_on);
    if(_on){
      sound.play();
      $.cookie('isSoundOn', 1);
      $('#sound_btn').removeClass('off');
    }
    else {
      sound.pause();
      $.cookie('isSoundOn', 0);
      $('#sound_btn').addClass('off');
    }
  }
  toggleSound(!(isMobile.iOS() || parseInt($.cookie('isSoundOn'),10)==0));

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
  $('body')
    .on('click', '#sound_btn', function(){
      console.log('a');
      toggleSound($(this).hasClass('off'));
    });
});

isMobile = {
  Android: function() {
    if (navigator.userAgent.match(/Android/i)) {
      return true;
    } else {
      return false;
    }
  },
  BlackBerry: function() {
    if (navigator.userAgent.match(/BlackBerry/i)) {
      return true;
    } else {
      return false;
    }
  },
  iOS: function() {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      return true;
    } else {
      return false;
    }
  },
  Windows: function() {
    if (navigator.userAgent.match(/IEMobile/i)) {
      return true;
    } else {
      return false;
    }
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
  }
};