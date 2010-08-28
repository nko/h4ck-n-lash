

function simulate_left_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.left;
  $game_container.trigger(event);
}

function simulate_right_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.right;
  $game_container.trigger(event);
}

function simulate_up_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.up;
  $game_container.trigger(event);
}

function simulate_down_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.down;
  $game_container.trigger(event);
}

beforeEach(function() {
  $game_container =  $('body');
  jasmine.Clock.useMock();
  jasmine.Clock.reset();
  $('#jasmine_content').empty();
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong
          && player.isPlaying;
    }
  })
});
