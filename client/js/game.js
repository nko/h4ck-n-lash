var Game = function() {
  var self = this;
  self.avatars = {}; 
  self.bullets = []; 
  self.platforms = [];
  self.player_id = 0; //better if this is not undefined

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
    message = JSON.parse(msg);
    if(message.event == 'player_id'){
      self.player_id = message.id;
    } else if(message.event=='bullet'){
      self.create_bullet({position:message.bullet.position,owner_id: message.id, direction: message.bullet.direction});    
    }else {
      message.game = self;
      if(self.avatars[message.id]) {
        self.avatars[message.id].position = message.position;
      } else {
        self.avatars[message.id] = new Avatar(message);
      }
    }
  };

  $('body').bind('ws_message',self.on_server_message);
  self.on_player_shoot = function(ev){
    var position = {x: ev.player.avatar.position.x+AVATAR_WIDTH/2, y: ev.player.avatar.position.y+AVATAR_HEIGHT/3};

    var bullet = self.create_bullet({position:position, owner_id: self.player_id, direction:ev.player.avatar.direction});

    self.socket.send(JSON.stringify({event:'bullet', id:self.player_id, bullet: bullet}));
  };

  $('body').bind('player.shoot', self.on_player_shoot)

  self.bullet_destructors = [];
  self.create_bullet = function(options){
    var bullet = new Bullet(options);
    self.bullets.push(bullet);
    bullet.destroy = function() {
      self.bullets.splice(self.bullets.indexOf(bullet), 1);
      delete bullet;
    };
    setTimeout( bullet.destroy, BULLET_TIMEOUT );
    return bullet;
  };
  
  self.on_level_loaded = function(ev){
    self.current_level = ev.level;
    self.build_display();
    $('body').trigger(jQuery.Event('ready_to_start'));
  };
  $('body').bind('level.loaded', self.on_level_loaded);

  self.on_bullet_collision = function(ev) {
    ev.bullet.destroy();
    ++self.player.hits;
  };
  
  $('body').bind('bullet.collision', self.on_bullet_collision);
  self.get_level = function(level_id){
    if(!level_id) level_id = null;
    level = new Level(level_id);
    return level;
  };

  self.build_display = function(){
    $('#level-container').html(self.current_level.html);
  };

  self.next_tick = function(){
    self.update_sprites();
    self.detect_collisions();
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
    this.socket.send( JSON.stringify({id:this.player_id,name:this.player.name,position:this.player.avatar.position}));
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
    this.update_hud();
    
    $('#sprite-container').empty();
    $('#sprite-container').html(sprites_html.join(''));
  },
  update_hud: function() {
    $('#scoreboard .hits').text( this.player.hits );
  },
  scroll_to_avatar: function() {
    var avatar = this.player.avatar;
    window.scrollTo(avatar.position.x-($(window).width()/2), avatar.position.y-($(window).height()/2));
  },              
  add_platform: function(platform) {
    this.current_level.platforms.push(platform);
  },

  detect_collisions: function() {
    var avatar =  { 
      x: this.player.avatar.position.x,
      y: this.player.avatar.position.y,
      x_end: this.player.avatar.position.x + AVATAR_WIDTH,
      y_end: this.player.avatar.position.y + AVATAR_HEIGHT
    };

    var game = this;
    $.each(this.bullets, function(i, bullet){
      if(bullet.owner_id.toString() == game.player_id.toString()) {
        return;
      }
      var bpos =  {
        x: bullet.position.x,
        y: bullet.position.y,
        x_end: bullet.position.x + BULLET_WIDTH,
        y_end: bullet.position.y + BULLET_HEIGHT
      };
      var x_overlap = ( 
        bpos.x > avatar.x && bpos.x < avatar.x_end
        || bpos.x_end > avatar.x && bpos.x_end < avatar.x_end
      );
      var y_overlap = ( 
        bpos.y > avatar.y && bpos.y < avatar.y_end
        || bpos.y_end > avatar.y && bpos.y_end < avatar.y_end
      );
      if(x_overlap && y_overlap) {
        var collision = jQuery.Event('bullet.collision');
        collision.bullet = bullet;
        $('body').trigger(collision);
      } 
    });   
  },

  get sprites() {
    return this.bullets + this.avatars;
  },
  get current_avatar() {
    return this.avatars[0];
  }
};
