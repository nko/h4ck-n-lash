function build_simulated_key_press(kc) {
  return function () {
    var event = jQuery.Event('keydown');
    event.keyCode = Config.key_codes[kc];
    $game_container.trigger(event);
  };
}
function build_simulated_key_up(kc) {
  return function () {
    var event = jQuery.Event('keyup');
    event.keyCode = Config.key_codes[kc];
    $game_container.trigger(event);
  };
}
for( key_code in Config.key_codes ) {
  window['simulate_' + key_code + '_key_press'] = build_simulated_key_press(key_code);
  window['simulate_' + key_code + '_key_up'] = build_simulated_key_up(key_code);
}

function repeat( number_of_times, callback ) {
  for( var x=0; x < number_of_times; x++ ) {
    callback.call();
  }
}

beforeEach(function() {
  real_ws_connection = window.create_websocket;
  socket_spy = jasmine.createSpy('socket');
  spyOn(window, 'create_websocket').andReturn(socket_spy);
  $game_container =  $('body');
  $game_container.unbind('player.entry').unbind('player.shoot');
  $(document).unbind('keydown');
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
function restore_websockets_code() {
  window.create_websocket = real_ws_connection;
}

