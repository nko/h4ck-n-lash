var Level = function(level) {
	level.platforms = level.platforms || [];

	var level_loaded_event = jQuery.Event('level.loaded');
	if(level.html_file) {
		$.ajax({
			url: level.html_file,
			success: function(data){
				level.html = data;
				level_loaded_event.level = level;
				$('body').trigger(level_loaded_event);
			}
		});
	} else {
		level_loaded_event.level = level;
		$('body').trigger(level_loaded_event);
	}

	// adjust the width of the game elements
	$('#game-container').css('width', level.width).css('height', level.height);
	$('#level-container').css('width', level.width).css('height', level.height);
	$('#sprite-container').css('width', level.width).css('height', level.height);
}
