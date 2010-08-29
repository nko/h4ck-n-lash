var Game = function() {
  var self = this;
  self.avatars = {}; 
  self.bullets = []; 
  self.platforms = [];

  self.socket = create_websocket('ws://'+window.location.hostname+':8001');

  self.on_player_entry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    ev.player.avatar.game = self;
    self.player = ev.player;
    self.avatars[ev.player.name] = ev.player.avatar;
    self.get_level();
  };

  $('body').bind('player.entry', self.on_player_entry );

  self.on_server_message = function(e,msg){
    opponent = JSON.parse(msg);
    opponent.game = self;
    self.avatars[opponent.id] = new Avatar(opponent);
  };

  $('body').bind('ws_message',self.on_server_message);
  self.on_player_shoot = function(ev){
    var bullet = new Bullet(ev.player);
    self.bullets.push(bullet);
    setTimeout( function() {
      self.bullets.splice(self.bullets.indexOf(bullet), 1);
      delete bullet;
    }, BULLET_TIMEOUT );
  };
  $('body').bind('player.shoot', self.on_player_shoot)

  self.on_level_loaded = function(ev){
    self.current_level = ev.level;
    self.build_display();
    $('body').trigger(jQuery.Event('ready_to_start'));
  };
  $('body').bind('level.loaded', self.on_level_loaded);

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
    self.update_server();
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
  update_server: function(){
    this.socket.send( JSON.stringify({name:this.player.name,position:this.player.avatar.position}));
  },
  update_sprites: function(){
    $.each(this.avatars,function( i, avatar){
      avatar.update_position();
    });
    $.each(this.bullets,function( i, bullet){
      bullet.update_position();
    });
  },
  refresh_display: function() {
    var sprites_html = [];
    $.each(this.avatars,function( i, avatar){
      sprites_html.push(avatar.html);
    });
    $.each(this.bullets,function( i, bullet){
      sprites_html.push(bullet.html);
    });
    $('#sprite-container').empty();
    $('#sprite-container').html(sprites_html.join(''));
  },
  scroll_to_avatar: function() {
    var avatar = this.player.avatar;
//    console.log('width');
    window.scrollTo(avatar.position.x-($(window).width()/2), avatar.position.y-($(window).height()/2));
  },              
  add_platform: function(platform) {
    this.current_level.platforms.push(platform);
  },
  get sprites() {
    return this.bullets + this.avatars;
  },
  get current_avatar() {
    return this.avatars[0];
  }
};
