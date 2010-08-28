describe('Avatar', function() {
  var player, avatar;
  beforeEach(function() {
    game = new Game();
    player = new Player('fred');
    avatar = player.avatar;
    game.start();
  });
  
  describe('accelerate_up', function() {
    it('should subtract from the velocity.y', function() {
      avatar.accelerate_up();
      expect(avatar.velocity.y).toEqual(AVATAR_JUMP_ACCEL);
    });
    it("velocity.y should not exceed the max", function() {
      expect(avatar.velocity.y).toEqual(0);
      repeat(10, function() { avatar.accelerate_up(); });
      game.next_tick();
      expect(avatar.velocity.y).toEqual(-1 * MAX_Y_VELOCITY);
    });
  });
  describe('gravity', function() {
    it("every game tick should add to velocity.y", function() {
      expect(avatar.velocity.y).toEqual(0);
      jasmine.Clock.tick(ONE_GAME_TICK);
      expect(avatar.velocity.y).toEqual(GRAVITY);
      jasmine.Clock.tick(ONE_GAME_TICK);
      expect(avatar.velocity.y).toEqual(GRAVITY * 2);
    });
    it("velocity.y should not exceed the max", function() {
      expect(avatar.velocity.y).toEqual(0);
      jasmine.Clock.tick(ONE_GAME_TICK * 1000);
      expect(avatar.velocity.y).toEqual(MAX_Y_VELOCITY);
    });
  });

  describe('collision detection', function(){
    describe('game boundaries', function(){
      it('should not move off left side of screen', function(){
        avatar.position.x = 0;
        simulate_left_key_press();
        game.next_tick();
        expect(avatar.position.x).toEqual(0);
      });
      it('should not move off right side of screen', function(){
        avatar.position.x = game.current_level.width - AVATAR_WIDTH;
        simulate_right_key_press();
        game.next_tick();
        expect(avatar.position.x).toEqual(game.current_level.width - AVATAR_WIDTH);
      });

    });
  });
});
