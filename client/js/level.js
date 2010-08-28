var Level = function(level_id) {
  var self = this;
  var level_id = level_id;
  if(!level_id) level_id = 0;
  
  self.load_level = function(){
    self.id = level_id;
    self.name = 'prototype';
    self.html = level0html;
    return self;
  };

  self.load_level(level_id);
  return self;
}

var level0html = " <div id='platform1' class='floor'></div> <div id='platform2' class='floor'></div> <div id='platform3' class='floor'></div> <div id='platform4' class='floor'></div> <div id='candy1' ><img src='/images/cheeseburger.jpg' height='200' width='150'/></div> <div id='candy2' >CLOUD</div> <div id='candy3' >CLOUD</div> <div id='candy4' >CLOUD</div> <div class='tube' id='rdtube' ></div>";
