function create_websocket( host ){
  io.setPath('/vendor/socket-io/');
  var ws = new io.Socket(window.location.hostname,{port:8001});
  ws.connect();
  ws.send('foo');
  ws.on('connect', function() {
    $('body').trigger("ws_connect");
  });

  ws.on('message', function(msg) {
    // e.data contains received string.
    $('body').trigger("ws_message", msg);
  });

  return ws;
}; 
