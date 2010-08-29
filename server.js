var sys = require('sys');
var ws = require('./vendor/node.ws.js/ws');
//var player_pool = require('./lib/player_pool').create();
var http = require('http');
var io = require('./vendor/socket.io');

static_port = process.env.NODE_PORT || 80;
require('./lib/static_server').start(static_port);

ws_server = http.createServer(function(req, res){ });
ws_server.listen(8001);

var socket = io.listen( ws_server,{ transports:['websocket','flashsocket'] });

socket.on( 'clientConnect', function(client){
  sys.log('new websocket connection: ' + client.sessionId);
  client.send(JSON.stringify({event:'player_id',id:client.sessionId}));
});

socket.on('clientMessage', function( msg, client){
//  sys.puts(sys.inspect(msg));
  client.broadcast(msg);
});

socket.on('clientDisconnect', function(client){
  sys.puts('client diconnected: '+client.sessionId);
  client.broadcast(JSON.stringify({event:'die',id:client.sessionId})); 
});

