Avatar = function(options){
  this.id = Math.random();
  this.name = options.name || 'anonymous';
  this.position = options.position || {x:0,y:0};

  this.move = {
    left: false,
    right: false
  };
  this.velocity = {x:0, y:0};

};

Avatar.prototype = {
  get html() {
    return '<div id="avatar-'+this.id+'" class="avatar" style="top:'+this.position.y+'px;left:'+this.position.x+'px;"><div class="avatar-name">'+this.name+'</div></div>';
  },

  accelerate_left : function(){
    this.velocity.x -= AVATAR_RUN_ACCEL; 
  }, 
  accelerate_right: function(){
    this.velocity.x += AVATAR_RUN_ACCEL; 
  },

  accelerate_up: function(){
    this.velocity.y += AVATAR_JUMP_ACCEL;
  },

  update_position : function(){
    var self = this;
    // update acceleration
    if(this.move.left) this.accelerate_left();
    if(this.move.right) this.accelerate_right();

    //deal with gravity
    this.velocity.y += GRAVITY;

    if(Math.abs(this.velocity.y) >= MAX_Y_VELOCITY){
      var direction = this.velocity.y > 0 ? 1 : -1;
      this.velocity.y = MAX_Y_VELOCITY * direction;
    }

    // update position
    var new_x = this.position.x + this.velocity.x;
    if(new_x < 0) {
      new_x = 0;
      this.velocity.x = 0;
    }
    if(new_x > this.game.current_level.width - AVATAR_WIDTH) {
      new_x = this.game.current_level.width - AVATAR_WIDTH;
      this.velocity.x = 0;
    }
    this.position.x = new_x;

    var old_y = this.position.y;
    this.position.y += this.velocity.y;

    if( this.position.y > (this.game.current_level.height - AVATAR_HEIGHT)){
      this.position.y = this.game.current_level.height - AVATAR_HEIGHT;
      this.velocity.y = 0;
    }
    var new_position_bottom = this.position.y + AVATAR_HEIGHT;
    var old_position_bottom = old_y + AVATAR_HEIGHT;
    $.each( this.game.platforms, function( i, platform){
      console.log('old position', old_position_bottom);
      console.log('new position', new_position_bottom);
      console.log('x', self.position.x);
      console.log('platform',platform);
      if( old_position_bottom <= platform.y && new_position_bottom >= platform.y){
        if( self.position.x > platform.x && self.position.x < platform.x_end){
          self.position.y = platform.y - AVATAR_HEIGHT;
          self.velocity.y = 0;
        }
      } 
    });
    // apply friction
    if(!this.move.left && !this.move.right) {
      this.velocity.x *= AVATAR_FRICTION;
      if( Math.abs(this.velocity.x) <= 0.05) this.velocity.x = 0;
    }
  },

  update_display: function(){
  }
};
