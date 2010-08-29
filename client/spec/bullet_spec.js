describe('Bullet', function(){
  var game, player, bullet;
  beforeEach(function(){
    game = new Game();
    player = new Player();
    simulate_shoot_key_press();
    bullet = game.bullets[0];
  });

  describe('lifecycle', function() {
    it("should live for a limited time", function() {
      jasmine.Clock.tick(BULLET_TIMEOUT+1);
      expect(game.sprites.indexOf(bullet)).toEqual(-1);
    });
  });

  describe('moving the bullet', function(){
    it('should have a position and velocity', function(){
      expect(bullet.position).toBeDefined();
      expect(bullet.velocity).toBeDefined();
    });
    
    it('should move with each frame', function(){
      game.next_tick();
      expect(bullet.position.x).toEqual( AVATAR_WIDTH / 2 + BULLET_VELOCITY );
    });

    it('should shoot right when the player has no direction', function() {
      player.avatar.move.left = false;
      player.avatar.move.right = false;
      player.avatar.move.up = false;
      player.avatar.move.down = false;
      simulate_shoot_key_press();
      var bullets = game.bullets;
      bullet = bullets[bullets.length-1];
      game.next_tick();
      expect(bullet.position.x).toEqual( AVATAR_WIDTH / 2 + BULLET_VELOCITY );
    });

    it('should have an html source containing the top and left positions', function() {
      expect(bullet.html).toMatch(/class=.bullet./);
      expect(bullet.html).toMatch(/top:\d+px./);
      expect(bullet.html).toMatch(/left:\d+px./);
    });

    describe('when the player is moving left', function() {
      it("should shoot left", function() {
        simulate_left_key_press();
        simulate_shoot_key_press();
        var bullets = game.bullets;
        bullet = bullets[bullets.length-1];
        game.next_tick();
        expect(bullet.position.x).toEqual( (AVATAR_WIDTH / 2) - BULLET_VELOCITY );
      });
    });

    describe('vertical shooting', function() {
      it("the bullet should shoot straight up", function() {
        simulate_up_key_press();
        simulate_shoot_key_press();
        var bullets = game.bullets;
        bullet = bullets[bullets.length-1];
        game.next_tick();
        expect(bullet.position.x).toEqual( (AVATAR_WIDTH / 2) );
        expect(bullet.position.y).toEqual( (AVATAR_HEIGHT / 3) - BULLET_VELOCITY );
      });
      it("the bullet should shoot straight down", function() {
        simulate_down_key_press();
        simulate_shoot_key_press();
        var bullets = game.bullets;
        bullet = bullets[bullets.length-1];
        game.next_tick();
        expect(bullet.position.x).toEqual( (AVATAR_WIDTH / 2) );
        expect(bullet.position.y).toEqual( ((AVATAR_HEIGHT / 3) + BULLET_VELOCITY ));
      });
    });
  });



});
