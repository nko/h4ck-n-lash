describe("Game", function() {
  var game=null, player;

  beforeEach(function(){
    spyOn(window, 'prompt').andReturn('Sam');
    if(game) $game_container.unbind('player.entry');
    game = new Game();
    player = new Player();
    $('#jasmine_content').html('<div id="level-container"></div><div id="sprite-container"></div>');
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
    var before_html = $('#jasmine_content').html();
    game = new Game();
    player = new Player();
    var after_html = $('#jasmine_content').html();
    expect(game.sprites).toBeDefined();
    expect(game.sprites.length).toBeGreaterThan(0);
    expect(game.current_level).toBeDefined();
    expect(after_html).toNotEqual(before_html); 
  });

  describe('on next_tick', function(){
    describe('refresh_display',function(){
      describe("moves the .avatar div", function(){
        beforeEach(function(){
          game = new Game();
          player = new Player();
        });    
  
        it('should move left when player presses left', function(){
          var before_position = $('.avatar').offset();
          simulate_left_key_press();
          game.next_tick();
          var after_position = $('.avatar').offset();
          console.log('before_position: ',before_position);
          console.log('after_position: ',after_position);
          expect(before_position.left).toBeGreaterThan(after_position.left);
        });

        it('should move right when player presses right', function(){
          var before_position = $('.avatar').offset();
          simulate_right_key_press();
          game.next_tick();
          var after_position = $('.avatar').offset();
          expect(before_position.left).toBeLessThan(after_position.left);
        });

      });
    })
  });
});
