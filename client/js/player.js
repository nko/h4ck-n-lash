var Player = function() {
	this.name = prompt('What is your name?');
	var entryEvent = $.Event('player.entry');
	entryEvent.player = this;
	$('body').trigger(entryEvent);
}
