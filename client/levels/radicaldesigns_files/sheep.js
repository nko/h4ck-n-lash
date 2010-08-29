/*
 * SHEEP!
 *
 * By Byron Young 05-2010
 *
 * Requires Prototype v1.6 and YUI2's YAHOO.lang.extend()
 * 
 * Creating sheep is easy!  Just do something like this:
 * 
 * <a href="#" onclick="doSheep()" id="sheeplink">&nbsp;</a>
 * <div id="sheepContainer"></div>
 * <script>
 * function doSheep() {
 *    var sheep;
 *    var elements = $$("div.menu,div.form-container,div.heading,table,tr,input,textarea");
 *    SheepVille.sheepSpriteUrl = "/static/images/SHEEP.png";
 *    SheepVille.ufoSpriteUrl = "/static/images/UFO.png";
 *    SheepVille.sheepContainer = "sheepContainer";
 *    for (var i = 0; i < 25; i++) {
 *        sheep = new SheepVille.Sheep(elements, "footer");
 *        sheep.animate();
 *    }
 * }
 * </script>
 *
 * The 'elements' array is the list of elements the sheep will pick from to
 * use as their ledge, which they roam around on and can jump off of.
 * 
 * An element with id "sheepContainer" is required.
 * 
 */

if (typeof SheepVille == "undefined" || !SheepVille) {
    var SheepVille = {};
}

(function() {
    SheepVille.sheepSpriteUrl = "/static/images/SHEEP.png";
    SheepVille.ufoSpriteUrl = "/static/images/UFO.png";
     
    SheepVille.Sprite = function(containerEl, config) {
        this.init.apply(this, arguments);
    };

    SheepVille.Sprite.prototype = {
        init: function(containerEl, config) {
            this.containerEl = $(containerEl);
            
            this.spriteURL = config.spriteURL;
            this.frameWidth = config.frameWidth;
            this.frameHeight = config.frameHeight;
            this.frameRows = config.frameRows;
            this.frameCols = config.frameCols;
            this.numFrames = config.numFrames;
            
            this.frameIndex = 0;
            this._x = 0;
            this._y = 0;
            
            this.containerEl.setStyle({ backgroundImage:
                                            "url(" + this.spriteURL + ")",
                                        width: this.frameWidth + "px",
                                        height: this.frameHeight + "px"});
        },
        
        setCurrAnimationCycle: function(startFrame, endFrame) {
            this.currCycleStartFrame = startFrame;
            this.currCycleEndFrame = endFrame;
        },
        
        startAnimationCycle: function() {
            this.setFrame(this.currCycleStartFrame);
        },
        
        setFrame: function(frameIndex) {
            this.frameIndex = frameIndex;

            var rowNum = Math.floor(frameIndex / this.frameCols);
            this._y = (this.frameHeight * rowNum);
            
            var colNum = frameIndex - (rowNum * this.frameCols);
            this._x = (this.frameWidth * colNum);
            
            this.updateSprite();
        },
        
        nextFrame: function() {
            var newFrame = this.frameIndex + 1;
            if (newFrame > this.currCycleEndFrame) {
                newFrame = this.currCycleStartFrame;
            } else if (newFrame < this.currCycleStartFrame) {
                newFrame = this.currCycleStartFrame;
            }
            
            this.setFrame(newFrame);
        },
        
        updateSprite: function() {
            this.containerEl.setStyle({ backgroundPosition: -this._x + "px "
                                        + -this._y + "px"});
        }
        
    };
     
    SheepVille.AnimatedEntity = function() {
        this.init.apply(this, arguments);
    };
     
    SheepVille.AnimatedEntity.prototype = {
        init: function(id, containerParent, spriteConfig, zIndex) {
            this.id = id;
            this.containerEl = new Element("div", { id: id });
            $(containerParent).insert({ bottom: this.containerEl });
            this.spriteConfig = spriteConfig;
            this.containerEl.setStyle({
                display: "block",
                position: "absolute",
                top: this.yPos + "px",
                left: this.xPos + "px",
                zIndex: zIndex
            });
            
            this.sprite = new SheepVille.Sprite(this.containerEl, this.spriteConfig);
            
            this.walkDir = 1;
            
            this.lastUpdate = new Date().getTime();
        },
        
        setAnimation: function(name) {
            var i;
            for (i = 0; i < this.animations.length; i++) {
                var anim = this.animations[i];
                if (anim.name == name) {
                    this.currAnimation = anim;
                    (anim.start.bind(this))();
                    this.updateDirection();
                    return;
                }
            }
        },

        animateFrame: function() {
            var now = new Date();
            var delta = now.getTime() - this.lastUpdate;
            var frameDelta = now.getTime() - this.lastFrameTime;
            while(frameDelta > this.currAnimation.frameInterval) {
                this.sprite.nextFrame();
                this.lastFrameTime = now.getTime();
                frameDelta = frameDelta - this.currAnimation.frameInterval;
            }

            this.yVelocity = this.yVelocity +
                (this.yAccel * (delta/1000));
            this.yPos = this.yPos + (this.yVelocity * (delta/1000));
            
            
            if (this.groundBoxEl) {
                var top = this.groundBoxTop;
                if (this.onLedge) {
                    top = this.ledgeBoxTop;
                }

                if ((this.yPos + this.spriteConfig.frameHeight) > top) {
                    this.yPos = top -
                        this.spriteConfig.frameHeight;
                    this.landVelocity = this.yVelocity;
                    this.yVelocity = 0;
                }
            }
            
            this.xVelocity = this.xVelocity + (this.xAccel * (delta/1000));
            this.xPos = this.xPos + (this.xVelocity * (delta/1000));

            this.containerEl.setStyle({
                top: this.yPos + "px",
                left: this.xPos + "px"
            });

            (this.currAnimation.animate.bind(this))(now);

            this.lastUpdate = now.getTime();
        },
        
        animate: function() {
            this.lastFrameTime = new Date().getTime();
            this.intervalId = setInterval(this.animateFrame.bind(this), 1);
        },
        
        stopAnimation: function() {
            clearInterval(this.intervalId);
        },
        
        updateDirection: function() {
            if (this.walkDir < 0) {
                this.sprite.setCurrAnimationCycle(
                    this.currAnimation.startFrameLeft,
                    this.currAnimation.endFrameLeft
                );
            } else {
                this.sprite.setCurrAnimationCycle(
                    this.currAnimation.startFrameRight,
                    this.currAnimation.endFrameRight
                );
            }
            
            if (this.currAnimation.randomStartFrame) {
                this.sprite.frameIndex = this.sprite.currCycleStartFrame +
                    Math.round(Math.random() * 
                               (this.sprite.currCycleEndFrame -
                                this.sprite.currCycleStartFrame));
            } else {
                this.sprite.frameIndex = this.sprite.currCycleStartFrame;
            }
            
            this.sprite.setFrame(this.sprite.frameIndex);
        }
    };
     
    var sheep = [];
     
    SheepVille.Sheep = function() {
        this.init.apply(this, arguments);
    };

    YAHOO.lang.extend(SheepVille.Sheep, SheepVille.AnimatedEntity);
     
    SheepVille.Sheep.prototype.init = function(ledgeElements, groundBoxEl) {
        var len = ledgeElements.length;

        this.ledgeBoxEl = ledgeElements[Math.floor(Math.random()*len)];
        while (!this.ledgeBoxEl.visible() ||
               this.ledgeBoxEl.getWidth() < 60) {
            this.ledgeBoxEl = ledgeElements[Math.floor(Math.random()*len)];
        }

        this.groundBoxEl = $(groundBoxEl);

        var offset = this.groundBoxEl.cumulativeOffset();
        this.groundBoxTop = offset.top;
        var ledgeOffset = this.ledgeBoxEl.cumulativeOffset();
        var startX = ledgeOffset.left;
        var width = this.ledgeBoxEl.getWidth();

        this.ledgeBoxTop = ledgeOffset.top;
        this.ledgeBoxLeft = ledgeOffset.left;
        this.ledgeBoxRight = ledgeOffset.left + width;

        this.onLedge = true;

        this.xPos = startX + Math.random() * width;
        this.yPos = -60 - Math.random() * 200;

        this.yVelocity = 0; // pixels per second
        this.yAccel = 300; // pixels per second
        this.xAccel = 0;
        this.xVelocity = 0;
        
        var id = "sheep"+sheep.length;
        SheepVille.Sheep.superclass.init.call(this,
            id, SheepVille.sheepContainer, {
                spriteURL: SheepVille.sheepSpriteUrl,
                frameWidth: 60,
                frameHeight: 60,
                frameRows: 4,
                frameCols: 4,
                numFrames: 16
            }, this.ledgeBoxTop);

        this.walkDir = Math.random();
        if (this.walkDir < 0.5) {
            this.walkDir = -1;
        } else {
            this.walkDir = 1;
        }

        this.setAnimation("fall");

        this.containerEl.observe("mouseover", function() {
            if (this.currAnimation.name == "walk") {
                this.setAnimation("startHop");
            }
        }.bind(this));

        sheep[id] = this;
    };
        
    SheepVille.Sheep.prototype.animations = [
        {
            name: "walk",
            startFrameRight: 0,
            endFrameRight: 3,
            startFrameLeft: 8,
            endFrameLeft: 11,
            randomStartFrame: true,
            frameInterval: 200,
            start: function() {
                this.walkDir = Math.random();
                if (this.walkDir < 0.5) {
                    this.walkDir = -1;
                } else {
                    this.walkDir = 1;
                }

                this.walkSpeed = 10 + Math.random()*20;
                this.walkDuration = Math.random()*5000 + 2000;
                this.walkStart = this.lastUpdate;
            },
            animate: function(now, delta) {
                var switchDir =
                    ((now.getTime() - this.walkStart) > this.walkDuration);
                if (switchDir) {
                    if (Math.random() < 0.05) {
                        this.setAnimation("ufo");
                        return;
                    }
                    if (Math.random() < 0.3) {
                        this.setAnimation("startHop");
                        return;
                    }
                    this.walkDir = -this.walkDir;
                    this.walkStart = now.getTime();
                    this.updateDirection();
                }

                if (this.onLedge) {
                    if (this.xPos < this.ledgeBoxLeft) {
                        this.walkDir = 1;
                        this.updateDirection();
                    } else if ((this.xPos + this.sprite.frameWidth)
                               > this.ledgeBoxRight) {
                        this.walkDir = -1;
                        this.updateDirection();
                    }
                }

                this.xVelocity = this.walkSpeed * this.walkDir;
            }
        }, {
            name: "fall",
            startFrameRight: 6,
            endFrameRight: 7,
            startFrameLeft: 14,
            endFrameLeft: 15,
            frameInterval: 60,
            start: function() {
            },
            animate: function(now, delta) {
                var top = this.groundBoxTop;
                if (this.onLedge) {
                    top = this.ledgeBoxTop;
                }

                if ((this.yPos + this.spriteConfig.frameHeight) >= top) {
                    this.setAnimation("land");
                }
            }
        }, {
            name: "land",
            startFrameRight: 4,
            endFrameRight: 4,
            startFrameLeft: 12,
            endFrameLeft: 12,
            frameInterval: 300,
            start: function() {
                this.landStart = new Date().getTime();
                this.xVelocity = 0;
            },
            animate: function(now, delta) {
                if ((now.getTime() - this.landStart) > 300) {
                    this.setAnimation("walk");
                }
            }
        }, {
            name: "startHop",
            startFrameRight: 4,
            endFrameRight: 4,
            startFrameLeft: 12,
            endFrameLeft: 12,
            frameInterval: 300,
            start: function() {
                this.hopStart = new Date().getTime();
                this.xVelocity = 0;
            },
            animate: function(now, delta) {
                if ((now.getTime() - this.hopStart) > 300) {
                    this.setAnimation("hop");
                }
            }
        }, {
            name: "hop",
            startFrameRight: 5,
            endFrameRight: 5,
            startFrameLeft: 13,
            endFrameLeft: 13,
            frameInterval: 300,
            start: function() {
                this.yVelocity = -(100 + Math.random()*150);
                this.xVelocity = (100 + Math.random()*10) * this.walkDir;
                this.firstCheck = true;
            },
            animate: function(now, delta) {
                var top = this.ledgeBoxTop;
                if (this.onLedge &&
                    ((this.xPos + this.sprite.frameWidth) < this.ledgeBoxLeft
                     || this.xPos > this.ledgeBoxRight)) {
                    this.onLedge = false;
                    this.setAnimation("fall");
                    return;
                }

                if (!this.onLedge) {
                    top = this.groundBoxTop;
                }

                if (!this.firstCheck && 
                    (this.yPos + this.spriteConfig.frameHeight) >= top) {
                    this.setAnimation("land");
                }

                this.firstCheck = false;
            }
        }, {
            name: "ufo",
            startFrameRight: 0,
            endFrameRight: 0,
            startFrameLeft: 8,
            endFrameLeft: 8,
            start: function() {
                this.xVelocity = 0;
                var ufo = new SheepVille.UFO(this);
                ufo.animate();
            },
            animate: function(now, delta) {

            }
        }
    ];
     
    var ufos = [];
    SheepVille.UFO = function(abductee) {
        this.init.apply(this, arguments);
    };

    YAHOO.lang.extend(SheepVille.UFO, SheepVille.AnimatedEntity);
     
    SheepVille.UFO.prototype.init = function(abductee) {
        this.abductee = abductee;
        
        if (Math.round(Math.random()) == 0) {
            this.xPos = -300;
        } else {
            this.xPos = document.viewport.getWidth() + 300;
        }
        
        this.yPos = -300 + Math.random() * 600;

        this.yVelocity = 0; // pixels per second
        this.yAccel = 0; // pixels per second
        this.xAccel = 0;
        this.xVelocity = 0;
        
        var id = "ufo"+ufos.length;
        SheepVille.UFO.superclass.init.call(this,
            id, SheepVille.sheepContainer, {
                spriteURL: SheepVille.ufoSpriteUrl,
                frameWidth: 180,
                frameHeight: 180,
                frameRows: 5,
                frameCols: 5,
                numFrames: 24
            }, this.abductee.ledgeBoxTop + 1000
        );
        this.setAnimation("goToSheep");

        ufos[id] = this;
    };
        
    SheepVille.UFO.prototype.animations = [
        {
            name: "goToSheep",
            startFrameRight: 12,
            endFrameRight: 15,
            startFrameLeft: 0,
            endFrameLeft: 3,
            frameInterval: 100,
            start: function() {
                var xDistance = this.abductee.xPos - this.xPos;
                this.xVelocity = xDistance/10;
                this.yVelocity = 20 + Math.random()*20;

                if (xDistance < 0) {
                    this.walkDir = -1;
                } else {
                    this.walkDir = 1;
                }
            },
            animate: function(now, delta) {
                if (this.xVelocity < 0 && this.walkDir > 0) {
                    this.walkDir = -1;
                    this.updateDirection();
                } else if (this.xVelocity > 0 && this.walkDir < 0) {
                    this.walkDir = 1;
                    this.updateDirection();
                }
                           
                var xDistance = (this.abductee.xPos - 60) - this.xPos;
                var yDistance = (this.abductee.yPos - 120) - this.yPos;

                this.yVelocity = yDistance;
                this.xVelocity = xDistance;
                if (Math.abs(xDistance) < 10) {
                    if (xDistance < 0) {
                        this.xVelocity = -10;
                    } else {
                        this.xVelocity = 10;
                    }
                }

                if (Math.abs(yDistance) < 10) {
                    if (yDistance < 0) {
                        this.yVelocity = -10;
                    } else {
                        this.yVelocity = 10;
                    }
                }
                
                if (Math.abs(xDistance) < 3 && Math.abs(yDistance) < 3) {
                    this.setAnimation("tractorBeam");
                    return;
                }
            }
        }, {
            name: "tractorBeam",
            startFrameRight: 16,
            endFrameRight: 19,
            startFrameLeft: 4,
            endFrameLeft: 7,
            frameInterval: 100,
            start: function() {
                this.xPos = this.abductee.xPos - 60;
                this.yPos = this.abductee.yPos - 120;
                this.xVelocity = 0;
                this.yVelocity = 0;
                
                this.walkDir = this.abductee.walkDir;

                this.abductee.stopAnimation();
                this.abductee.containerEl.remove();
                delete sheep[this.abductee.id];
                delete this.abductee;
                
                this.tractorStart = new Date().getTime();
            },
            animate: function(now, delta) {
                if ((now.getTime() - this.tractorStart) > 300) {
                    this.setAnimation("flyAway");
                    return;
                }
            }
        }, {
            name: "flyAway",
            startFrameRight: 20,
            endFrameRight: 23,
            startFrameLeft: 8,
            endFrameLeft: 11,
            frameInterval: 100,
            start: function() {
                this.xAccel = Math.random() * 1000 *
                    (Math.round(Math.random() * 2 - 1));
                this.yAccel = Math.random() * -1000;

                this.walkDir = 1;
                if (this.xAccel < 0) {
                    this.walkDir = -1;
                }
            },
            animate: function(now, delta) {
                if ((this.xPos + 180) < 0 ||
                    this.xPos > document.viewport.getWidth() ||
                    (this.yPos + 180) < 0) {
                    this.stopAnimation();
                    this.containerEl.remove();
                    delete ufos[this.id];
                }
            }
        }
    ];
})();

