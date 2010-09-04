var sys = require('sys');
var ws = require('./vendor/node.ws.js/ws');
var player_pool = require('./lib/player_pool').create();
var http = require('http');
var io = require('./vendor/socket.io');
var levels = require('./lib/levels').levels();
var player_pool = require('./lib/player_pool').create();

static_port = process.env.NODE_PORT || 80;
require('./lib/static_server').start(static_port);

ws_server = http.createServer(function(req, res){ });
ws_server.listen(8001);

var socket = io.listen( ws_server,{ transports:['websocket','flashsocket'] });

socket.on( 'clientConnect', function(client){
  sys.log('new websocket connection: ' + client.sessionId);
  
  //var level_id = Math.floor(Math.random()*levels.length);
  var level_id = 1;

  player_pool.add_player_to_level( client, level_id);

  client.send(JSON.stringify( {
      event: 'player_connect', 
      id: client.sessionId, 
      level: levels[level_id], 
      level_id: level_id
  }));
});

socket.on('clientMessage', function( msg, client){
  if(msg.event) sys.puts('message: '+msg);
  message = JSON.parse(msg);
  player_pool.broadcast_to_level( message.level_id, msg, client.sessionId);
});

socket.on('clientDisconnect', function(client){
  sys.puts('client diconnected: '+client.sessionId);
  client.broadcast(JSON.stringify({event:'die',id:client.sessionId})); 
  
});

