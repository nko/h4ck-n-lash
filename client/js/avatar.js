Avatar = function(options){
  this.id = Math.random();
  this.name = options.name || 'anonymous';
  this.move = {
    left: false,
    right: false
  };
  this.velocity = {x:0, y:0};
  this.position = options.position || {x:0, y:0};
  this.dom_element = $('<div id="avatar-'+this.id+'" class="avatar"><div class="avatar-name">'+this.name+'</div></div>') 
};

Avatar.prototype = {
  
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
    if(this.move.left) this.accelerate_left();
    if(this.move.right) this.accelerate_right();
    //deal with gravity
    this.velocity.y += GRAVITY;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // apply friction
    if(!this.move.left && !this.move.right) {
      this.velocity.x *= AVATAR_FRICTION;
      if( Math.abs(this.velocity.x) <= 0.05) this.velocity.x = 0;
    }
  },

  update_display: function(){
    $(this.dom_element).css({top:this.position.y, left:this.position.x});
  }
};
