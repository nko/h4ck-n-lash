function create_websocket( host ){

  var ws = new WebSocket(host);

  ws.onopen = function() {
    $('body').trigger("ws_connect");
  };

  ws.onmessage = function(e) {
    // e.data contains received string.
    $('body').trigger("ws_message", e.data);
  };

  ws.onerror = function() {
    $('body').trigger("ws_error");
  };

  return ws;
}; 
