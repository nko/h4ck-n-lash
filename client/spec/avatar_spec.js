describe('Avatar', function() {
  var player, avatar;
  beforeEach(function() {
    game = new Game();
    player = new Player('fred');
    avatar = player.avatar;
  });
  
  describe('accelerate_up', function() {
    it('should subtract 1 from the velocity.y', function() {
      avatar.accelerate_up();
      expect(avatar.velocity.y).toEqual(AVATAR_JUMP_ACCEL);
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
  });
});
