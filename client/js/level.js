var Level = function(level_id) {
  var self = this;
	var level = levels.github;
	self.id = level.id;
	self.name = level.name; 
	self.width = level.width;
	self.height = level.height;
	self.platforms = level.platforms || [];

	var level_loaded_event = jQuery.Event('level.loaded');
	if(level.html_file) {
		$.ajax({
			url: level.html_file,
			success: function(data){
				self.html = data;
				level_loaded_event.level = self;
				$('body').trigger(level_loaded_event);
			}
		});
	} else {
		self.html = level.html;
		level_loaded_event.level = self;
		$('body').trigger(level_loaded_event);
	}

	// adjust the width of the game elements
	$('#game-container').css('width', self.width).css('height', self.height);
	$('#level-container').css('width', self.width).css('height', self.height);
	$('#sprite-container').css('width', self.width).css('height', self.height);
}

var levels = {
	test_level: {
	  id: 0,
	  name: 'prototype',
	  height:600,
	  width:960,
	  platforms:[{y:580,x:0,x_end:960},{y:400,x:0,x_end:300},{y:380,x:770,x_end:960},{y:180,x:400,x_end:600}],
		html_file: false,
	  html: "<link type='text/css' rel='stylesheet' href='/levels/level0.css'/>  <div id='platform1' class='floor'></div> <div id='platform2' class='floor'></div> <div id='platform3' class='floor'></div> <div id='platform4' class='floor'></div> <div id='candy1' ><img src='/images/cheeseburger.jpg' height='200' width='150'/></div> <div id='candy2' >CLOUD</div> <div id='candy3' >CLOUD</div> <div id='candy4' >CLOUD</div> <div class='tube' id='rdtube' ></div>"
	},
	
	github: {
		id: 1,
		name: 'github',
		height:2600,
		width:1160,
		html_file:'/levels/github.html',
		platforms:[{"y":171,"x":120,"x_end":570},{"y":171,"x":590,"x_end":1040},{"y":282,"x":120,"x_end":570},{"y":313,"x":120,"x_end":548},{"y":441,"x":120,"x_end":548},{"y":569,"x":120,"x_end":548},{"y":697,"x":120,"x_end":548},{"y":825,"x":120,"x_end":548},{"y":972,"x":120,"x_end":548},{"y":1100,"x":120,"x_end":548},{"y":1247,"x":120,"x_end":548},{"y":1375,"x":120,"x_end":548},{"y":282,"x":590,"x_end":1040},{"y":314,"x":590,"x_end":998},{"y":358,"x":590,"x_end":998},{"y":402,"x":590,"x_end":998},{"y":446,"x":590,"x_end":998},{"y":490,"x":590,"x_end":998},{"y":534,"x":590,"x_end":998},{"y":578,"x":590,"x_end":998},{"y":622,"x":590,"x_end":998},{"y":666,"x":590,"x_end":998},{"y":710,"x":590,"x_end":998},{"y":754,"x":590,"x_end":998},{"y":798,"x":590,"x_end":998},{"y":842,"x":590,"x_end":998},{"y":886,"x":590,"x_end":998},{"y":930,"x":590,"x_end":998},{"y":974,"x":590,"x_end":998},{"y":1018,"x":590,"x_end":998},{"y":1062,"x":590,"x_end":998},{"y":1106,"x":590,"x_end":998},{"y":1150,"x":590,"x_end":998},{"y":1194,"x":590,"x_end":998},{"y":1238,"x":590,"x_end":998},{"y":1282,"x":590,"x_end":998},{"y":1326,"x":590,"x_end":998},{"y":1370,"x":590,"x_end":998},{"y":1414,"x":590,"x_end":998},{"y":1458,"x":590,"x_end":998},{"y":1502,"x":590,"x_end":998},{"y":1546,"x":590,"x_end":998},{"y":1590,"x":590,"x_end":998},{"y":1634,"x":590,"x_end":998},{"y":1678,"x":590,"x_end":998},{"y":1722,"x":590,"x_end":998},{"y":1766,"x":590,"x_end":998},{"y":1810,"x":590,"x_end":998},{"y":1854,"x":590,"x_end":998},{"y":1898,"x":590,"x_end":998},{"y":1942,"x":590,"x_end":998},{"y":1986,"x":590,"x_end":998},{"y":2030,"x":590,"x_end":998},{"y":2074,"x":590,"x_end":998},{"y":2118,"x":590,"x_end":998},{"y":2162,"x":590,"x_end":998},{"y":2206,"x":590,"x_end":998},{"y":2250,"x":590,"x_end":998},{"y":2294,"x":590,"x_end":998},{"y":2338,"x":590,"x_end":998},{"y":2382,"x":590,"x_end":998},{"y":2456,"x":0,"x_end":1160}],
		selectors:'ul.org-members li,ul.repositories li.public,.first,.last,#footer' 
	},

	google: {
		id: 2,
		name: 'google',
		height:600,
		width:960,
		html_file:'/levels/google.html',
		platforms: [{"y":46,"x":342,"x_end":617},{"y":211,"x":219,"x_end":731},{"y":252,"x":354,"x_end":466},{"y":252,"x":471,"x_end":600},{"y":402,"x":298,"x_end":423},{"y":402,"x":447,"x_end":559},{"y":402,"x":583,"x_end":662},{"y":552,"x":8,"x_end":163}],
		selectors: '#lga img, .ds, #sbl, #fll a, #cpf a, input[type="text"]'
	}
};


