// script to paste into firebug/chrome console to get a list of the selectors
var game_offset = $('#game-container').offset();
console.log(game_offset);
var platforms = [];
var selectors = 'ul.org-members li,ul.repositories li.public,.first,.last,#footer,#footer .sponsor,#footer .sosueme .main';
$(selectors).each(function(i,dom){
	var offset = $(dom).offset();
	var width = $(dom).width();
	platforms.push({y:offset.top,x:offset.left-game_offset.left,x_end:offset.left-game_offset.left+width});
	$(dom).css('border-top', '1px solid red');
});
console.log(JSON.stringify(platforms));
