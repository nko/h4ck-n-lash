var Game = function() {
  var self = this;
  self.sprites = [];
  self.onPlayerEntry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    self.sprites.push(ev.player);
  };
  
  $('body').bind('player.entry', self.onPlayerEntry );
  
  return this;
}
