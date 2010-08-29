var Level = function(level_id) {
  var self = this;
  var level_id = level_id;
  if(!level_id) level_id = 0;
  
  self.load_level = function(){
    new_level = github;
    self.id = new_level.id;
    self.name = new_level.name; 
    self.html_file = new_level.html_file;
    self.width = new_level.width;
    self.height = new_level.height;
    self.selectors = new_level.selectors;
    self.platforms = new_level.platforms || [];
    $.ajax({
      url: self.html_file,
      success: function(data){
        self.html = data;

        /*if(self.selectors) {
          var new_platforms = [];
          $.each(self.selectors, function(i,selector){
            $(selector, self.html).each(function(i, dom){
              //console.log(dom);
              var offset = $(dom, self.html).offset();
              var width  = $(dom, self.html).css('width');
              new_platforms.push({y:offset.top,x:offset.left,x_end:offset.left+width});
            });
          });
          self.platforms.concat(new_platforms);
        }*/

        level_loaded_event = jQuery.Event('level.loaded');
        level_loaded_event.level = self;
        $('body').trigger(level_loaded_event);
      }
    });

    // adjust the width of the game elements
    $('#game-container').css('width', self.width).css('height', self.height);
    $('#level-container').css('width', self.width).css('height', self.height);
    $('#sprite-container').css('width', self.width).css('height', self.height);
  };

  self.load_level(level_id);
  return self;
}

var level_0 ={
  id: 0,
  name: 'prototype',
  height:600,
  width:960,
  stylesheet: '/level0.css',
  platforms:[
  {y:580,x:0,x_end:960},
  {y:400,x:0,x_end:300},
  {y:380,x:770,x_end:960},
  {y:180,x:400,x_end:600} 
  ],
  html:  " <div id='platform1' class='floor'></div> <div id='platform2' class='floor'></div> <div id='platform3' class='floor'></div> <div id='platform4' class='floor'></div> <div id='candy1' ><img src='/images/cheeseburger.jpg' height='200' width='150'/></div> <div id='candy2' >CLOUD</div> <div id='candy3' >CLOUD</div> <div id='candy4' >CLOUD</div> <div class='tube' id='rdtube' ></div>"
};

var level_1 ={
  id: 1,
  name: 'prototype',
  height:1400,
  width:1400,
  stylesheet: '/level1.css',
  platforms:[],
  html:  ""
};

var github ={
  id: 3,
  name: 'github',
  height:2500,
  width:1060,
  selectors:['ul.org-members li', 'ul.repositories li.public', '.first', '.last'],
  platforms:[],
  html_file:'/levels/github.html'
};
