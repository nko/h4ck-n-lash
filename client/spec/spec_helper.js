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
  $game_container =  $('body');
  $game_container.unbind('player.entry').unbind('player.shoot');
  $game_container.unbind('ws_message');

  real_ws_connection = window.create_websocket;
/*  socket_spy = jasmine.createSpyObj('socket', ['send']);
  spyOn(window, 'create_websocket').andCallFake( function() {
      $game_container.trigger('ws_message', JSON.stringify( {
        level_id: 0,
        player_id: 3,
        level:{
           id: 0,
            name: 'prototype',
            height:600,
            width:960,
            platforms:[{y:580,x:0,x_end:960},{y:400,x:0,x_end:300},{y:380,x:770,x_end:960},{y:180,x:400,x_end:600}],
            html_file:'faked'
        },
        event: 'player_connect'
      }));
      return socket_spy;
    }
  );*/
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
  });

  xhrs = [];
  spyOn($, 'ajax').andCallFake( function(args) {
    args.success('faked');
  });

});
function restore_websockets_code() {
  window.create_websocket = real_ws_connection;
}

