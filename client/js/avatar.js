Avatar = function(options){
  var self = this;
  self.id = Math.random();
  self.name = options.name || 'anonymous';
  self.position = options.position || {x:0,y:0};
  self.type = 'avatar';
  self.velocity = {x:0, y:0};
  self.game = options.game;
  self.life = options.life;
	self.current_frame = 0;
	
  self.move = new MovementTracker(); 
  self.direction = self.move.direction;
  if(options.direction) {
    self.direction.x = options.direction.x;
    self.direction.y = options.direction.y;
  } else {
    self.direction.x = 1;
  }

  self.animation_cycles = {
    run_right:{y:0,step:90,frames:6},
    run_left:{y:95,step:90,frames:6}
  };
  
  self.current_cycle = this.animation_cycles.run_right;
  self.current_cycle.current_frame = 0;
};

Avatar.prototype = {
  get html() {
    return '<div id="avatar-'+this.id+'" class="avatar" style="top:'+Math.floor(this.position.y)+'px;left:'+Math.floor(this.position.x)+'px;background-position:'+(-1*this.current_frame*this.current_cycle.step)+'px '+this.current_cycle.y+'px"><div class="avatar-name"><div class="life-bar" style="width:' + ( this.life * 8 ) + 'px;"></div>' + this.name + '</div></div>';
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
    this.update_acceleration();
    this.update_position_x();
    this.update_position_y();
  },

  update_animation : function(){
    
    if(this.direction.x == 1) this.current_cycle = this.animation_cycles.run_right; 
    if(this.direction.x == -1) this.current_cycle = this.animation_cycles.run_left;
    //stop animating unless we are running or jumping
    if(Math.abs(this.velocity.x) < 1 && this.velocity.y==0) {
      this.current_frame = 5;
      return;
    }
    if( this.current_frame >= this.current_cycle.frames){
      this.current_frame = 0;
    } else {
      this.current_frame++;
    }
  },

  update_acceleration: function(){
    if(this.move.left) this.accelerate_left();
    if(this.move.right) this.accelerate_right();
    //deal with gravity
    this.velocity.y += GRAVITY;
    // make sure we don't exceed max velocity 
    if(Math.abs(this.velocity.y) >= MAX_Y_VELOCITY){
      var direction = this.velocity.y > 0 ? 1 : -1;
      this.velocity.y = MAX_Y_VELOCITY * direction;
    }
    // apply friction
    if(!this.move.left && !this.move.right) {
      this.velocity.x *= AVATAR_FRICTION;
      if( Math.abs(this.velocity.x) <= 0.05) this.velocity.x = 0;
    }
  },

  update_position_x: function(){
    var new_x = this.position.x + this.velocity.x;
    if(new_x <= 0) {
      new_x = 0;
      this.velocity.x = 0;
    }
    if(new_x > this.game.current_level.width - AVATAR_WIDTH) {
      new_x = this.game.current_level.width - AVATAR_WIDTH;
      this.velocity.x = 0;
    }
    this.position.x = new_x;
  },

  update_position_y: function(){
    var self = this;

    var old_y = this.position.y;
    this.position.y += this.velocity.y;

    // don't move past the bottom of the level
    if( this.position.y > (this.game.current_level.height - AVATAR_HEIGHT)){
      this.position.y = this.game.current_level.height - AVATAR_HEIGHT;
      this.velocity.y = 0;
    }

    // don't move past the top of the level
    if( this.position.y <= 0){
      this.position.y = 0; 
      this.velocity.y = 0;
    }

    // land on platforms
    var new_position_bottom = this.position.y + AVATAR_HEIGHT;
    var old_position_bottom = old_y + AVATAR_HEIGHT;
    $.each( this.game.current_level.platforms, function( i, platform){
      if( old_position_bottom <= platform.y && new_position_bottom >= platform.y){
        if( self.position.x + AVATAR_WIDTH > platform.x && self.position.x < platform.x_end){
					//console.log('landed on platform', platform);
          self.position.y = platform.y - AVATAR_HEIGHT;
          self.velocity.y = 0;
        }
      } 
    });
  }

};
