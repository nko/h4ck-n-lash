sys = require('sys');

exports.create = function(){
  var pool = {};
  var available_id = 0;

  return {
    add_player_to_level: function( player, level_id){
      if(!pool[level_id]) pool[level_id] = {};
      pool[level_id][player.sessionId] = player;
    },

    get: function(id){
      return pool[id];
    },

    destroy: function(id){
      pool[id].end();
      pool[id] = undefined;
    },

    broadcast_to_level: function( level_id, msg, player_id){
      var players = pool[level_id];
      for(id in players){
        if( players[id] && id != player_id ) players[id].send(msg);
      }
    },

    all: function(){
      return pool;
    },

    count: function(){
      return pool.length;
    }

  };
}
