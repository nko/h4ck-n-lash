function MovementTracker() {
  this.holding_key = {};
  this.direction = {x:0,y:0};
  this.up = false;
  return this;
};
MovementTracker.prototype = {
  set left(value) { 
    if(value) {
      this.direction.x = -1; 
      this.holding_key.right = false;
    }
    this.holding_key.left = value;
  },
  get left() {return this.holding_key.left;},
  set right(value) { 
    if(value) {
      this.direction.x = 1; 
      this.holding_key.left = false;
    }
    this.holding_key.right = value;
  },
  get right() { return this.holding_key.right; },
  set down(value) { 
    var default_x_direction = 0;
    if(value) {
      this.direction.y = 1; 
      this.holding_key.up = false;
    } else {
      this.direction.y = Math.min(this.direction.y, 0); 
      default_x_direction = 1;
    }
    if(!(this.holding_key.right || this.holding_key.left)) {
      this.direction.x = default_x_direction;
    }
    this.holding_key.down = value;
  },
  get down() { return this.holding_key.down; },
  set up(value) { 
    var default_x_direction = 0;
    if(value) {
      this.direction.y = -1; 
      this.holding_key.down = false;
    } else {
      this.direction.y = Math.max(this.direction.y, 0); 
      default_x_direction = 1;
    }
    if(!(this.holding_key.right || this.holding_key.left)) {
      this.direction.x = default_x_direction;
    }
    this.holding_key.up = value;
  },
  get up() { return this.holding_key.up; },

};
