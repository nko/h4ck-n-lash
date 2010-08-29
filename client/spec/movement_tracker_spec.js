describe('MovementTracker', function(){
  var direction;
  beforeEach(function(){
    game = new Game();
    player = new Player({name: 'Sam'});
    player.avatar.move.top = false;
    player.avatar.move.right = false;
    player.avatar.move.bottom = false;
    player.avatar.move.left = false;
    direction = player.avatar.direction;
  });

  describe('if pressing nothing', function(){
    it('direction should be left if most recent press was left',function(){
      simulate_left_key_press();
      game.next_tick();
      simulate_left_key_up();
      expect(direction).toEqual({x:-1, y:0});
    });
    it('direction should be right if most recent press was right',function(){
      simulate_right_key_press();
      game.next_tick();
      simulate_right_key_up();
      expect(direction).toEqual({x:1, y:0});
    });
  });
  describe('after pressing another direction', function(){
    describe('after pressing up and then pressing left', function() {
      it("direction should be left", function() {
        simulate_up_key_press();
        simulate_up_key_up();
        simulate_left_key_press();
        expect(direction).toEqual({x:-1, y:0});

      });
    });
    describe('after pressing down and then pressing right ', function() {
      it("direction should be right", function() {
        simulate_down_key_press();
        simulate_down_key_up();
        simulate_right_key_press();
        expect(direction).toEqual({x:1, y:0});
      });
    });
  });

  it('should set direction to left if pressing only left', function(){
      simulate_left_key_press();
      expect(player.avatar.direction).toEqual({x:-1,y:0});
  });

  it('should set direction to right if pressing only right', function(){
      simulate_right_key_press();
      expect(player.avatar.direction).toEqual({x:1,y:0});
  });

  it('should set direction to down if pressing only down', function(){
      simulate_down_key_press();
      expect(player.avatar.direction).toEqual({x:0,y:1});
  });

  it('should set direction to up if pressing only up', function(){
      simulate_up_key_press();
      expect(player.avatar.direction).toEqual({x:0,y:-1});
  });

  it('should set direction to top-left if pressing left and up', function(){
    simulate_up_key_press();
    simulate_left_key_press();
    expect(player.avatar.direction).toEqual({x:-1,y:-1});
  });
  it('should set direction to top-right if pressing right and up', function(){
    simulate_up_key_press();
    simulate_right_key_press();
    expect(player.avatar.direction).toEqual({x:1,y:-1});
  });
  it('should set direction to bottom-left if pre-ssing left and down', function(){
    simulate_down_key_press();
    simulate_left_key_press();
    expect(player.avatar.direction).toEqual({x:-1,y:1});
  });
  it('should set direction to bottom-right if pressing right and down', function(){
    simulate_down_key_press();
    simulate_right_key_press();
    expect(player.avatar.direction).toEqual({x:1,y:1});
  });
});

