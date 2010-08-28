Avatar = function(){
  this.velocity = {x:0, y:0};
  this.position = {x:0,y:0};
};

Avatar.prototype = {
  
  accelerate_left : function(val){
    this.velocity.x--; 
  },
  
  update_position : function(){
    this.position.x += this.velocity.x;
  } 
};
