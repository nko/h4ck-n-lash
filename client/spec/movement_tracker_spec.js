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

  it('should set direction to left if pressing only left', function(){
      simulate_left_key_press();
      expect(player.avatar.direction).toEqual({x:-1,y:0});
  });
  it('should set direction to right if pressing only right', function(){
  });
  it('should set direction to down if pressing only down', function(){
  });
  it('should set direction to up if pressing only up', function(){
  });

  it('should set direction to top-left if pressing left and up', function(){
  });
  it('should set direction to top-right if pressing right and up', function(){
  });
  it('should set direction to bottom-left if pressing left and down', function(){
  });
  it('should set direction to bottom-right if pressing right and down', function(){
  });
});

