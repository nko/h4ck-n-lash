describe('Avatar', function() {
  var player, avatar;
  
  beforeEach(function(){
    spyOn(window, 'prompt').andReturn('Sam');
  });

  describe('accelerate_up', function() {
    beforeEach(function() {
      player = new Player('fred');
      avatar = player.avatar;
    });
    it('should add 1 to the velocity.y', function() {
      avatar.accelerate_up();
      expect(avatar.velocity.y).toEqual(1);
    });
  });
});
