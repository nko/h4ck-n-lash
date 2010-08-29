describe("Game", function() {
  var game, player;

  beforeEach(function(){
    game = new Game();
    player = new Player();
    $('#jasmine_content').html('<div id="level-container"></div><div id="sprite-container"></div>');
  });

  it("should be able to return a level", function() {
    expect(game.current_level.id).toBeDefined();
    expect(game.current_level.name).toBeDefined();
    expect(game.current_level.html).toBeDefined();
  });
  
  it("should build the board after player name and level are loaded", function(){
    var before_html = $('#jasmine_content #level-container').html();
    game = new Game();
    player = new Player();
    expect(game.avatars).toBeDefined();
    expect(game.player).toBe(player);
    expect(game.current_level).toBeDefined();
    var after_html = $('#jasmine_content #level-container').html();
    expect(before_html).toNotEqual(after_html);
  });

  it('should start a game loop', function() {
    spyOn(game, 'next_tick').andCallThrough();
    game.start();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(1);
    jasmine.Clock.tick(ONE_GAME_TICK);    
    jasmine.Clock.tick(ONE_GAME_TICK);    
    jasmine.Clock.tick(ONE_GAME_TICK);    
    expect(game.next_tick.calls.length).toBe(4);
  });

  it('should be possible to stop the game loop', function() {
    spyOn(game, 'next_tick').andCallThrough();
    game.start();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(2);
    game.pause();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(2);
  });


  describe('on next_tick', function(){
    describe('refresh_display',function(){
      describe("moves the .avatar div", function(){
        beforeEach(function(){
          game = new Game();
          player = new Player({position:{x:200,y:200}});
          avatar = player.avatar;
          game.next_tick();
        });    
  
        it('should move left when player presses left', function(){
          var before_position = $(avatar.html).css('left');
          simulate_left_key_press();
          game.next_tick();
          var after_position = $(avatar.html).css('left');
          expect(before_position).toBeGreaterThan(after_position);
        });

        it('should move right when player presses right', function(){
          var before_position = $(avatar.html).css('left');
          simulate_right_key_press();
          game.next_tick();
          var after_position = $(avatar.html).css('left');
          expect(before_position).toBeLessThan(after_position);
        });

      });
    });

    describe('detect collisions', function() {
      var bullet;
      beforeEach(function() {
        bullet = game.create_bullet({
          position: { x:AVATAR_WIDTH + BULLET_VELOCITY, y: GRAVITY * 8},   
          direction: { x: -1, y:0},
          owner_id: 1337
        });
      });
      it("should not do anythinig for bullets that don't overlap with the player avatar", function() {
        game.detect_collisions();
        expect(game.bullets).toContain(bullet);
        expect(player.hits).toEqual(0);
      });

      it("fires a collision event when execution-style killing occurs", function() {
        bullet.position = { x: player.avatar.position.x + 1, y: player.avatar.position.y + 1 }
        game.detect_collisions();
        expect(game.bullets).not.toContain(bullet);
        expect(player.hits).toEqual(1);
      });

      it("should fire a collision event when a bullet overlaps with the player avatar", function() {
        repeat(2, function(){ game.next_tick(); });
        expect(game.bullets).not.toContain(bullet);
        expect(player.hits).toEqual(1);
      });
      it("should not fire a collision event when a player shoots herself", function() {
        game.player_id = 69;
        bullet.owner_id  = game.player_id;
        repeat(2, function(){ game.next_tick(); });
        expect(game.bullets).toContain(bullet);
        expect(player.hits).toEqual(0);
      });

    });
  });

  describe('creates a websocket connection', function() {
    it('should create a websocket', function() {
      expect(window.create_websocket).toHaveBeenCalled();
    });

    it("sends a position for each tick", function() {
      socket_spy.send = jasmine.createSpy('sender');
      game.next_tick();
      expect(socket_spy.send).toHaveBeenCalled();
      expect(JSON.parse(socket_spy.send.mostRecentCall.args[0])).toEqual({name:'anonymous',position: {x:0, y:GRAVITY}, id:0});
    });

    it("listens to the socket for new avatars and adds them to the avatars array", function() {
      $('body').trigger('ws_message', JSON.stringify({id: '123', name:'opponent', position: { x: 10, y:10 }}));
      expect(game.avatars['123'].position.x).toEqual(10);
    });

  });
});
