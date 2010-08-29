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
    self.platforms = new_level.platforms || [];
    $.ajax({
      url: self.html_file,
      success: function(data){
        self.html = data;
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
  width:1160,
  platforms:[{"y":171,"x":172,"x_end":622},{"y":171,"x":642,"x_end":1092},{"y":281,"x":172,"x_end":622},{"y":311,"x":172,"x_end":600},{"y":445,"x":172,"x_end":600},{"y":579,"x":172,"x_end":600},{"y":713,"x":172,"x_end":600},{"y":847,"x":172,"x_end":600},{"y":1000,"x":172,"x_end":600},{"y":1134,"x":172,"x_end":600},{"y":1287,"x":172,"x_end":600},{"y":1421,"x":172,"x_end":600},{"y":281,"x":642,"x_end":1092},{"y":312,"x":642,"x_end":1050},{"y":355,"x":642,"x_end":1050},{"y":398,"x":642,"x_end":1050},{"y":441,"x":642,"x_end":1050},{"y":484,"x":642,"x_end":1050},{"y":527,"x":642,"x_end":1050},{"y":570,"x":642,"x_end":1050},{"y":613,"x":642,"x_end":1050},{"y":656,"x":642,"x_end":1050},{"y":699,"x":642,"x_end":1050},{"y":742,"x":642,"x_end":1050},{"y":785,"x":642,"x_end":1050},{"y":828,"x":642,"x_end":1050},{"y":871,"x":642,"x_end":1050},{"y":914,"x":642,"x_end":1050},{"y":957,"x":642,"x_end":1050},{"y":1000,"x":642,"x_end":1050},{"y":1043,"x":642,"x_end":1050},{"y":1086,"x":642,"x_end":1050},{"y":1129,"x":642,"x_end":1050},{"y":1172,"x":642,"x_end":1050},{"y":1215,"x":642,"x_end":1050},{"y":1258,"x":642,"x_end":1050},{"y":1301,"x":642,"x_end":1050},{"y":1344,"x":642,"x_end":1050},{"y":1387,"x":642,"x_end":1050},{"y":1430,"x":642,"x_end":1050},{"y":1473,"x":642,"x_end":1050},{"y":1516,"x":642,"x_end":1050},{"y":1559,"x":642,"x_end":1050},{"y":1602,"x":642,"x_end":1050},{"y":1645,"x":642,"x_end":1050},{"y":1688,"x":642,"x_end":1050},{"y":1731,"x":642,"x_end":1050},{"y":1774,"x":642,"x_end":1050},{"y":1817,"x":642,"x_end":1050},{"y":1860,"x":642,"x_end":1050},{"y":1903,"x":642,"x_end":1050},{"y":1946,"x":642,"x_end":1050},{"y":1989,"x":642,"x_end":1050},{"y":2032,"x":642,"x_end":1050},{"y":2075,"x":642,"x_end":1050},{"y":2118,"x":642,"x_end":1050},{"y":2161,"x":642,"x_end":1050},{"y":2204,"x":642,"x_end":1050},{"y":2247,"x":642,"x_end":1050},{"y":2290,"x":642,"x_end":1050},{"y":2333,"x":642,"x_end":1050}],
  html_file:'/levels/github.html'
};
