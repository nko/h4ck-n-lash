describe("Player", function() {
  var player, game=null, avatar;

  describe("when a player is created", function() {
    beforeEach(function() {
      if(game) $game_container.unbind('player.entry');
      game = new Game();
      player = new Player();
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
      game = new Game();
      player = new Player();
    });

    describe("presses left arrow", function() {
      beforeEach(function() {
        simulate_left_key_press();
      });
      
      it('should change velocity on keydown', function(){
        expect(player.avatar.velocity.x).toEqual(-1);
      });

      it('should move left', function(){
        game.next_tick();
        expect(player.avatar.position.x).toEqual(-1);
      });

    });
    describe("presses right arrow", function() {
      beforeEach(function() {
        simulate_right_key_press();
      });
      
      it('should change velocity on keydown', function(){
        expect(player.avatar.velocity.x).toEqual(1);
      });

      it('should move right', function(){
        game.next_tick();
        expect(player.avatar.position.x).toEqual(1);
      });

    });

    describe("on_up_arrow", function() {
      beforeEach(function() {
        var event = jQuery.Event('keydown');
        event.keyCode = Config.key_codes.up;
        $game_container.trigger(event);
      });
      
      it('should change velocity on keydown', function(){
        expect(player.avatar.velocity.y).toEqual(1);
      });

      it('should move up', function(){
        game.next_tick();
        expect(player.avatar.position.y).toEqual(1);
      });

    });
  });
});
