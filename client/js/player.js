var Player = function( options ) {
  options = options || {};
	options.name = options.name || "anonymous";
  options.life = PLAYER_LIFE;
  
  this.avatar = new Avatar(options);
  this.initialize_keyboard_bindings();

	var entry_event = $.Event('player.entry');
	entry_event.player = this;
	$('body').trigger(entry_event);
}

Player.prototype = {
  initialize_keyboard_bindings : function(){
    var self = this;
    $(document).keydown(function(event){
      switch (event.keyCode){
        case Config.key_codes.left:
          self.avatar.move.left = true;
          return false;
        case Config.key_codes.right:
          self.avatar.move.right = true;
          return false;
        case Config.key_codes.down:
          self.avatar.move.down = true;
          return false;
        case Config.key_codes.up:
          self.avatar.move.up = true;
          return false;
        case Config.key_codes.jump:
          self.avatar.accelerate_up();
          return false;
        case Config.key_codes.shoot:
          var shoot_event = jQuery.Event('player.shoot');
          shoot_event.player = self;
          $('body').trigger(shoot_event);
          return false;
      }
    });
    $(document).keyup(function(event){
      switch (event.keyCode){
        case Config.key_codes.left:
          self.avatar.move.left= false;
          return false;
        case Config.key_codes.right:
          self.avatar.move.right = false;
          return false;
        case Config.key_codes.up:
          self.avatar.move.up = false;
          return false;
        case Config.key_codes.down:
          self.avatar.move.down= false;
          return false;
      }
    });


  },
  get name(){
    return this.avatar.name;
  },
  set name(new_name) {
    return this.avatar.name = new_name;
  },

  get life() {
    return this.avatar.life;
  },
  set life(value) {
    return this.avatar.life = value;
  }
};
