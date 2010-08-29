sys = require('sys');
events = require('events');
EE = require('events').EventEmitter;
pp = new EE();

exports.create = function(){
  var pool = {};
  var available_id = 0;

  methods = {
    add: function(player){
      available_id++;
      player.id = available_id;

      pool[available_id] = player;

      pp.emit('new_player', player);
    },

    get: function(id){
      return pool[id];
    },

    destroy: function(id){
      pool[id].end();
      pool[id] = undefined;
    },

    all: function(){
      return pool;
    },

    count: function(){
      return pool.length;
    },

    broadcast: function(player_id,msg){
      for(id in pool){
        if( pool[id] && id != player_id ) pool[id].write(msg);
      }
    }

  };

  for( method_name in methods){
    pp[method_name] = methods[method_name];
  }

  return pp;
}
