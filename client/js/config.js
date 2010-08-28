ONE_GAME_TICK = 50;

GRAVITY=4;
MAX_Y_VELOCITY = 50;

AVATAR_WIDTH = 90;
AVATAR_HEIGHT = 95;
AVATAR_RUN_ACCEL = 3;
AVATAR_JUMP_ACCEL = -40;
AVATAR_FRICTION = 0.3;

Config = {
  key_codes : {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    jump: 70,
    shoot: 32
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

