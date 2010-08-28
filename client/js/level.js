var Level = function(level_id) {
  var self = this;
  var level_id = level_id;
  if(!level_id) level_id = 0;
  
  self.load_level = function(){
    new_level = level_0;
    self.id = new_level.id;
    self.name = new_level.name; 
    self.html = new_level.html;
    self.width = new_level.width;
    self.height = new_level.height;
    self.platforms = new_level.platforms;
    return self;
  };

  self.load_level(level_id);
  return self;
}

var level_0 ={
  id: 0,
  name: 'prototype',
  height:600,
  width:960,
  platforms:[
    {y:580,x:0,x_end:960},
    {y:400,x:0,x_end:300},
    {y:380,x:770,x_end:960},
    {y:180,x:400,x_end:600} 
  ],
  html:  " <div id='platform1' class='floor'></div> <div id='platform2' class='floor'></div> <div id='platform3' class='floor'></div> <div id='platform4' class='floor'></div> <div id='candy1' ><img src='/images/cheeseburger.jpg' height='200' width='150'/></div> <div id='candy2' >CLOUD</div> <div id='candy3' >CLOUD</div> <div id='candy4' >CLOUD</div> <div class='tube' id='rdtube' ></div>"
};
