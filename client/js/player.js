var Player = function() {
	this.name = prompt('What is your name?');
	var entry_event = $.Event('player.entry');
	entry_event.player = this;
  this.avatar = new Avatar();
	$('body').trigger(entry_event);

  this.initialize_keyboard_bindings();
}

Player.prototype = {
  initialize_keyboard_bindings : function(){
    var self = this;
    $(document).keydown(function(event){
      
      if(event.keyCode == Config.key_codes.left){
        self.avatar.accelerate_left(1);
        return false;
      }
    });
  }
};
