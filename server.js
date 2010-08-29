var sys = require('sys');
var ws = require('./vendor/node.ws.js/ws');
var player_pool = require('./lib/player_pool').create();

static_port = process.env.NODE_PORT || 80;
require('./lib/static_server').start(static_port);

ws_server = ws.createServer( function(player){
  player.addListener('connect',function(){
    sys.log('new websocket connection: ' + this.id);
    this.write(JSON.stringify({event:'player_id',id:this.id}))
  });
  player.addListener('data',function(msg){
    sys.log('websocket id '+this.id+' data:'+msg);
    player_pool.broadcast(this.id, msg); 
  });
  player.addListener('close',function(){
    sys.log('websocket connection closed id '+this.id);
    player_pool.destroy(this.id);
  });

  player_pool.add(player);
});

ws_port = 8001;
ws_server.listen(ws_port);
sys.log('Websocket server listening on port ' + ws_port);
