describe("Player", function() {
  var player, game=null, avatar;
  var $game_container;

  describe("when a player is created", function() {
    beforeEach(function() {
      spyOn(window, 'prompt').andReturn('Sam');
      if(game) $('body').unbind('player_entry');
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

    it("should have an avatar", function() {
      expect(player.avatar).toBeDefined();
    });

    it('should start in position 0', function() {
      expect(player.avatar.position.x).toEqual(0);
    });
   
    it("should display the player's name in #hello div", function() {
      $('#jasmine_content').html('<div id="hello"></div>');
    });
  });
 describe('Player Controls', function(){ 
    beforeEach(function() {
      spyOn(window, 'prompt').andReturn('Sam');
      game = new Game();
      player = new Player();

      $game_container =  $('body');
    });

    describe("onLeftArrow", function() {
      beforeEach(function() {
        // simulate left
        var event = jQuery.Event('keydown');
        event.keyCode = Config.key_codes.left;
        $game_container.trigger(event);
      });
      
      it('should change velocity on keydown', function(){
        expect(player.avatar.velocity.x).toEqual(-1);
      });

      it('should move left', function(){
        game.next_tick();
        expect(player.avatar.position.x).toEqual(-1);
      });

    });
    describe("onRightArrow", function() {
      beforeEach(function() {
        // simulate left
        var event = jQuery.Event('keydown');
        event.keyCode = Config.key_codes.right;
        $game_container.trigger(event);
      });
      
      it('should change velocity on keydown', function(){
        expect(player.avatar.velocity.x).toEqual(1);
      });

      it('should move right', function(){
        game.next_tick();
        expect(player.avatar.position.x).toEqual(1);
      });

    });

  });
});
