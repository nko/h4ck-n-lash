var Game = function() {
  var self = this;
  self.sprites = [];
  self.on_player_entry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    self.sprites.push(ev.player.avatar);
  };
  
  $('body').bind('player.entry', self.on_player_entry );
  
  return this;
}

Game.prototype = {
  next_tick: function(){
    this.update_sprites();
  },
  update_sprites: function(){
    $.each(this.sprites,function( i, sprite){
      sprite.update_position();
    });
  }
};
