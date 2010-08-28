

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

function simulate_jump_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.jump;
  $game_container.trigger(event);
}

function simulate_down_key_press() {
  var event = jQuery.Event('keydown');
  event.keyCode = Config.key_codes.down;
  $game_container.trigger(event);
}

function repeat( number_of_times, callback ) {
  for( var x=0; x < number_of_times; x++ ) {
    callback.call();
  }
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
