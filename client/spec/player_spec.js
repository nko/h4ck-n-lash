describe("Player", function() {
  var player, game=null, avatar;

  describe("when a player is created", function() {
    beforeEach(function() {
      game = new Game();
      player = new Player({name: 'Sam'});
    });

    it("should ask for a name", function() {
      expect(player.name).toEqual('Sam');
    });

    it("should announce the player entry event to the Game", function() {
      expect(game.avatars[player.name]).toEqual(player.avatar);
    });

    it("should have an avatar", function() {
      expect(player.avatar).toBeDefined();
    });

    it('should start in position 0', function() {
      expect(player.avatar.position.x).toEqual(0);
    });

    it("should be possible to define the initial position", function() {
        player = new Player({position: {x:360, y:550}});
        expect(player.avatar.position.x).toEqual(360);
        expect(player.avatar.position.y).toEqual(550);
   });
   
    it("should display the player's name in #hello div", function() {
      $('#jasmine_content').html('<div id="hello"></div>');
    });
  });
 describe('Player Controls', function(){ 
    beforeEach(function() {
      game = new Game();
      starting_position = {x:200,y:200};
      player = new Player({position:{x:200, y:200}});
      avatar = player.avatar;
    });
    describe('not pressing any arrow keys', function(){
      it('should eventaully return x velocity to 0', function(){
        game.start();
        avatar.velocity.x = 5;
        jasmine.Clock.tick( ONE_GAME_TICK*50 );
        expect(avatar.velocity.x).toEqual(0);
      });
    });
    describe("presses left arrow", function() {
      beforeEach(function() {
        simulate_left_key_press();
        game.next_tick();
      });
      
      it('should change velocity on keydown', function(){
        expect(avatar.velocity.x).toEqual(-AVATAR_RUN_ACCEL);
      });

      it('should move left', function(){
        expect(avatar.position.x).toEqual(starting_position.x-AVATAR_RUN_ACCEL);
      });
    });
    describe("presses right arrow", function() {
      beforeEach(function() {
        simulate_right_key_press();
        game.next_tick();
      });
      
      it('should change velocity on keydown', function(){
        expect(avatar.velocity.x).toEqual(AVATAR_RUN_ACCEL);
      });

      it('should move right', function(){
        expect(avatar.position.x).toEqual(starting_position.x+AVATAR_RUN_ACCEL);
      });

    });

    describe("on jump", function() {
      
      it('should change velocity on keydown', function(){
        simulate_jump_key_press();
        expect(avatar.velocity.y).toEqual(AVATAR_JUMP_ACCEL);
      });

      it('should move up', function(){
        avatar.position.y = 200;
        simulate_jump_key_press();
        game.next_tick();
        expect(avatar.position.y).toEqual(200+AVATAR_JUMP_ACCEL + GRAVITY);
      });

    });
    describe("on fire", function() {
      it("should add a bullet to the game", function() {
        expect(game.bullets.length).toEqual(0);
        simulate_shoot_key_press();
        expect(game.bullets.length).toEqual(1);
      });
    });
  });
});
