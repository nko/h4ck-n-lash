var Game = function() {
  var self = this;
  self.sprites = [];
  self.platforms = [];

  self.socket = create_websocket('ws://127.0.0.1:8001');

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
    self.sprites.push(bullet);
    setTimeout( function() {
      self.sprites.splice(self.sprites.indexOf(bullet), 1);
      delete bullet;
    }, BULLET_TIMEOUT );
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
    self.scroll_to_avatar();
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
  scroll_to_avatar: function() {
    var avatar = this.avatars[0]
//    console.log('width');
    window.scrollTo(avatar.position.x-($(window).width()/2), avatar.position.y-($(window).height()/2));
  },              
  add_platform: function(platform) {
    this.current_level.platforms.push(platform);
  },
  get bullets() {
    var bullets = [];
    for(b in this.sprites)  {
      if(this.sprites[b].type == 'bullet') {
        bullets.push(this.sprites[b]);
      }
    }
    return bullets;
  },
  get avatars() {
    var avatars = [];
    for(b in this.sprites)  {
      if(this.sprites[b].type == 'avatar') {
        avatars.push(this.sprites[b]);
      }
    }
    return avatars;
  },
  get current_avatar() {
    return this.avatars[0];
  }
};
