var Player = function( name ) {
	var entry_event = $.Event('player.entry');
	entry_event.player = this;
  this.avatar = new Avatar({name:name});
	this.name = name || prompt('What is your name?');
	$('body').trigger(entry_event);

  this.initialize_keyboard_bindings();
}

Player.prototype = {
  initialize_keyboard_bindings : function(){
    var self = this;
    $(document).keydown(function(event){
      switch (event.keyCode){
        case Config.key_codes.left:
          self.avatar.accelerate_left();
          return false;
        case Config.key_codes.right:
          self.avatar.accelerate_right();
          return false;
        case Config.key_codes.up:
          self.avatar.accelerate_up();
          return false;
      }
    });
  },
  get name(){
    return this.avatar.name;
  },
  set name(new_name) {
    return this.avatar.name = new_name;
  }
};
