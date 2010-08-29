// script to paste into firebug/chrome console to get a list of the selectors
var platforms = [];
var selectors = 'ul.org-members li,ul.repositories li.public,.first,.last';
$(selectors).each(function(i,dom){
	var offset = $(dom).offset();
	var width = $(dom).width();
	platforms.push({y:offset.top,x:offset.left,x_end:offset.left+width});
});
console.log(JSON.stringify(platforms));

