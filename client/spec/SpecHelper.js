var ONE_GAME_TICK = 50;

beforeEach(function() {
  jasmine.Clock.useMock();
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong
          && player.isPlaying;
    }
  })
});
