function Bullet(player) {
  var self = this;
  self.position = $.extend({}, player.avatar.position);
  self.position = {x:player.avatar.position.x+AVATAR_WIDTH/2, y:player.avatar.position.y+AVATAR_HEIGHT/3};
  self.velocity = {x:BULLET_VELOCITY, y:0};

  return self;
};

Bullet.prototype = {
  update_position: function() {
    this.position.x += this.velocity.x;
  },
  get html() {
    return '<div class="bullet" style="top:'+this.position.y+'px;left:'+this.position.x+'px;"></div>';
  },

  update_display: function() {
  }
}
