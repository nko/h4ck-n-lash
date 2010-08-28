var Game = function() {
  var self = this;
  self.sprites = [];
  self.platforms = [];
  self.bullets = [];

  self.on_player_entry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    ev.player.avatar.game = self;
    self.sprites.push(ev.player.avatar);
    self.current_level = self.get_level();
    self.build_display();
  };
  $('body').bind('player.entry', self.on_player_entry );

  self.on_player_shoot = function(ev){
    var bullet = new Bullet(ev.player);
    self.bullets.push(bullet);
    self.sprites.push(bullet);
  };
  $('body').bind('player.shoot', self.on_player_shoot)

  self.get_level = function(level_id){
    if(!level_id) level_id = null;
    level = new Level(level_id);
    return level;
  };
  self.build_display = function(){
    //load level
    $('#level-container').html(self.current_level.html);
  };
  self.next_tick = function(){
    self.update_sprites();
    self.refresh_display();
  };

  // game loop functions
  self.start = function(){
    self.loop_timer = setInterval(function() { self.next_tick(); }, ONE_GAME_TICK);
  };
  self.pause = function() {
    clearInterval(self.loop_timer);
  };
 
  return self;
}

Game.prototype = {
  update_sprites: function(){
    $.each(this.sprites,function( i, sprite){
      sprite.update_position();
    });
  },
  refresh_display: function() {
    var sprites_html = [];
    $.each(this.sprites,function( i, sprite){
      sprites_html.push(sprite.html);
    });
    $('#sprite-container').empty();
    $('#sprite-container').html(sprites_html.join(''));
  },
  add_platform: function(platform) {
    this.platforms.push(platform);
  },
};
