var Player = function() {
	this.name = prompt('What is your name?');
	var entry_event = $.Event('player.entry');
	entry_event.player = this;
  this.avatar = new Avatar();
  this.avatar.name = this.name;
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
      }
    });
  }
};
