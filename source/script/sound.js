'use strict';
import MobileDetect from 'mobile-detect';

class Sound {

  constructor(){

    var md = new MobileDetect(window.navigator.userAgent);

    $(function(){
      var sound = document.getElementById('sound');
      sound.volume = 0.3;
      var toggleSound = function(_on){
        if(_on){
          sound.play();
          Cookies.set('isSoundOn', 1);
          $('#sound_btn').removeClass('off');
        }
        else {
          sound.pause();
          Cookies.set('isSoundOn', 0);
          $('#sound_btn').addClass('off');
        }
      }
      toggleSound(!(md.mobile() || parseInt(Cookies.get('isSoundOn'),10)==0));

      $('body')
        .on('click', '#sound_btn', function(){
          toggleSound($(this).hasClass('off'));
        });
    });
  }

}
export default Sound;