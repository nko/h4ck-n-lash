describe("Player", function() {
  var player, game;
  var $game_container;

  describe("when a player is created", function() {
    beforeEach(function() {
      spyOn(window, 'prompt').andReturn('Sam');
      game = new Game();
      player = new Player();
      $game_container =  $('body');
    });
    

    it("should ask for a name", function() {
      expect(player.name).toEqual('Sam');
    });

    it("should announce the player entry event to the Game", function() {
      expect(game.sprites.length).toEqual(1);
    });

    xit("should display the player's name in #hello div", function() {
      $('#jasmine_content').html('<div id="hello"></div>');
    
    });
  });
  
});
