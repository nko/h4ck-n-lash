var Game = function() {
  var self = this;
  self.sprites = [];
  self.on_player_entry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    self.sprites.push(ev.player.avatar);
    self.current_level = self.get_level();
    self.build_display();
  };
  $('body').bind('player.entry', self.on_player_entry );

  self.get_level = function(level_id){
    if(!level_id) level_id = null;
    level = new Level(level_id);
    return level;
  };
  self.build_display = function(){
    //load level
    $('#level-container').html(self.current_level.html);
    //load sprite and put name above it
    $('#sprite-container').html('');
    $(self.sprites).each(function(index, value) {
      $('#sprite-container').append('<div class="avatar"><div class="avatar-name">'+value.name+'</div></div>'); 
    });
  };
  
  return self;
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
