function Bullet(options) {
  var self = this;
  self.type = "bullet";
  self.direction = $.extend({}, options.direction);
  self.position = options.position;
  self.owner_id = options.owner_id;
//  self.position = {x:player.avatar.position.x+AVATAR_WIDTH/2, y:player.avatar.position.y+AVATAR_HEIGHT/3};
  
  var diagonal = self.direction.x && self.direction.y;
  var axis_velocity = diagonal ? BULLET_DIAGONAL_VELOCITY : BULLET_VELOCITY;
  self.velocity = {
    x: (self.direction.x ) * axis_velocity, 
    y: (self.direction.y ) * axis_velocity 
  };

  return self;
};

Bullet.prototype = {
  update_position: function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  },
  get html() {
    return '<div class="bullet" style="top:'+Math.floor(this.position.y)+'px;left:'+Math.floor(this.position.x)+'px;"></div>';
  }
}
