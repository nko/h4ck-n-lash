ONE_GAME_TICK = 50;
AVATAR_RUN_ACCEL = 3;
AVATAR_FRICTION = 0.5;

Config = {
  key_codes : {
    left: 37,
    right: 39,
    up:38,
    down: 40
  }
};


if (!window.console )
{
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i) {
      if(window.console[names[i]] == undefined) {
        window.console[names[i]] = function() {};
      }
    }
      
}

