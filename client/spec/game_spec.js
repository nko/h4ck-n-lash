describe("Game", function() {
  var game=null, player;

  beforeEach(function(){
    spyOn(window, 'prompt').andReturn('Sam');
    if(game) $('body').unbind('player_entry');
    game = new Game();
    player = new Player();
  });

  it("should be able to return a level", function() {
    var level = game.get_level(0);
    expect(level.id).toEqual(0);
    expect(level.name).toEqual('prototype');
    expect(level.html).toBeDefined();
  });
  
  it("should be able to return a default level", function() {
    var level = game.get_level();
    expect(level.id).toEqual(0);
    expect(level.name).toEqual('prototype');
    expect(level.html).toBeDefined();
  });

  it("should build the board after player name and level are loaded", function(){
    $('#jasmine_content').html('<div id="level-container"></div><div id="sprite-container"></div>');
    var before_html = $('#jasmine_content').html();
    game = new Game();
    player = new Player();
    var after_html = $('#jasmine_content').html();
    expect(game.sprites).toBeDefined();
    expect(game.sprites.length).toBeGreaterThan(0);
    expect(game.current_level).toBeDefined();
    expect(after_html).toNotEqual(before_html); 
  });
});
