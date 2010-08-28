Avatar = function(options){
  this.id = Math.random();
  this.name = options.name || '';
  this.velocity = {x:0, y:0};
  this.position = {x:0,y:0};
  this.dom_element = $('<div id="avatar-'+this.id+'" class="avatar"><div class="avatar-name">'+this.name+'</div></div>') 
};

Avatar.prototype = {
  
  accelerate_left : function(){
    this.velocity.x--; 
  },

  accelerate_right: function(){
    this.velocity.x++; 
  },
  accelerate_up: function(){
    this.velocity.y++;
  },
  update_position : function(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  },

  update_display: function(){
    $(this.dom_element).offset({top:this.position.y, left:this.position.x});
  }
};
