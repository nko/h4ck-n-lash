describe('Bullet', function(){
  var game, player, bullet;
  beforeEach(function(){
    game = new Game();
    player = new Player();
    simulate_shoot_key_press();
    bullet = game.bullets[0];
  });

  describe('moving the bullet', function(){
    it('should have a position and velocity', function(){
      expect(bullet.position).toBeDefined();
      expect(bullet.velocity).toBeDefined();
    });
    
    it('should move with each frame', function(){
      var start_position = bullet.position;
      game.next_tick();
      var end_position = bullet.position;
      expect(bullet.position.x).toEqual( AVATAR_WIDTH / 2 + BULLET_VELOCITY );
    });

    it('should have an html source containing the top and left positions', function() {
      expect(bullet.html).toMatch(/class=.bullet./);
      expect(bullet.html).toMatch(/top:\d+px./);
      expect(bullet.html).toMatch(/left:\d+px./);
    });
  });
});
