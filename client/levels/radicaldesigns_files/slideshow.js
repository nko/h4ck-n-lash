jQuery( function($){

  $('#index-slideshow').cycle({ 
      fx:    'fade', 
      speed:  1500, 
          timeout: 10000,
          pager: '#slideshow-pager'
   });
  $('#pauseBtn').toggle(function() {
          $('#index-slideshow').cycle('pause');
          $(this).attr({ src: "img/fe_index_pause_03.gif"});

          }, function() {

          $('#index-slideshow').cycle('resume', true);
          $(this).attr({ src: "img/fe_index_play_03.gif"});
  });

}); 
