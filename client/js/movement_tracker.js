function MovementTracker() {
  this.motions = {};
  this.direction = {x:1,y:0};
  this.up = false;
  this.down = false;
  return this;
};
MovementTracker.prototype = {
  set left(value) { 
    if(value) {
      this.direction.x = -1; 
    }
    this.motions.left = value;
  },
  get left() {return this.motions.left;},
  set right(value) { 
    if(value) {
      this.direction.x = 1; 
    }
    this.motions.right = value;
  },
  get right() { return this.motions.right; },
};
