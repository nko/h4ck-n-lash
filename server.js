var sys = require('sys');
var connect = require('./vendor/connect/lib/connect');
var ws = require('./vendor/node.ws.js/ws');
//var connection_pool = require('./lib/connection_pool');

static_server = connect.createServer(
	connect.logger({ format: ':method :url' }),
	connect.bodyDecoder(),
	connect.staticProvider('./client')
);

static_port = process.env.NODE_PORT || 80;
static_server.listen(parseInt(static_port));
sys.log('Static server listening on port ' + static_port);

ws_server = ws.createServer(function(socket){
  socket.addListener('connect',function(){});
  socket.addListener('data',function(){});
  socket.addListener('close',function(){});

  socket.send = function(msg){
    this.write(JSON.stringify(msg))
  };
  socket.broadcast = function(msg){
    var json = JSON.stringify(msg);
//    var sockets = connection_pool.find();
    for(i in sockets){
      sockets[i].write(json);
    } 
  };
});

ws_port = 8001;
ws_server.listen(ws_port);
sys.log('Websocket server listening on port ' + ws_port);
