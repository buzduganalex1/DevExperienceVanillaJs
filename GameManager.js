let GameManager = (function () {
    function GameManager() {
        this.invaders = [];
        this.element = document.createElement("div");
        this.element.className = "board";
        this.alienColumns = 11;
        this.alienRows = 5;
        this.invadersModel = [];
        this.boardWidht = 750;
        this.boardHeight = 800;

        this.distanceX = 50;
        this.distanceY = 50;

        this.stepTime = 200;
        this.interval = undefined;
        this.direction = 1;
        this.stepSize = 10;
        this.offsetY = 50;
        this.currentStep = 0;
        this.difficulty = 0;
        this.battleShip;

        this.firing = false;
        this.fireFrame = null;
        this.fireSpeed = -13;
        this.createInvaders();
        this.createBattleShip();
        this.startGame();
    };

    GameManager.prototype = {
        createInvaders: function () {
            var invader;
            var invaders = this.invaders;
            var alien;
            var body = document.body;

            for (var i = 0; i < this.alienRows; i++) {
                invaders[i] = [];
                this.invadersModel[i] = [];
                for (var j = 0; j < this.alienColumns; j++) {
                    alien = AlienFactory.getAlien(i)
                    invader = new MultiStateSprite(alien.class, alien.width, alien.height);
                    invader.position({
                        x: 1 + j * this.distanceX,
                        y: i * this.distanceY
                    });

                    invaders[i][j] = invader;
                    this.invadersModel[i][j] = 1;
                    body.appendChild(invader.getElement());
                }
            }
        },

        createBattleShip: function () {
            this.battleShip = new BattleShip(this.fire.bind(this), 0, this.boardWidht);

            this.fireSprite = new Sprite("bullet", 1, 5);

            var body = document.body;
            body.appendChild(this.battleShip.getElement());
            body.appendChild(this.fireSprite.getElement());

            this.fireSprite.position({
                x: -1000,
                y: -1000
            });

            this.battleShip.position({
                x: 1000 / 2 - 50 / 2,
                y: 800 - 50
            })
        },

        fire: function () {
            if (!this.firing) {
                this.initiateFire();
                this.firing = true;
            }
        },

        initiateFire: function () {
            this.fireSprite.position({
                x: this.battleShip.getPosition().x + 19,
                y: 800 - 50
            })

            this.moveFire();
        },

        moveFire: function () {
            var fireY = this.fireSprite.getPosition().y;
            var hitInvader;

            if (fireY >= -10) {
                fireY += this.fireSpeed;
                this.fireSprite.position({
                    x: this.fireSprite.getPosition().x,
                    y: fireY
                });
                this.fireFrame = requestAnimationFrame(() => {
                    this.moveFire();
                })

                hitInvader = this.testHitAlien();
                if (hitInvader) {
                    this.invaderDie(hitInvader);
                    this.cancelFire();
                }
            } else {
                this.cancelFire();
            }
        },

        cancelFire: function () {
            this.firing = false;
            cancelAnimationFrame(this.fireFrame);
            this.fireFrame = null;
            this.fireSprite.position({
                x: -1000,
                y: -1000
            });
        },

        invaderDie: function (invader) {
            invader.position({
                x: -1000,
                y: -1000
            });
        },

        testHitAlien: function () {
            var alienBox;
            var bulletBox = this.fireSprite.getBoundingBox();

            for (var i = 0; i < this.alienRows; i++) {
                for (var j = 0; j < this.alienColumns; j++) {
                    alienBox = this.invaders[i][j].getBoundingBox();
                    if (this.isHit(bulletBox, alienBox)) {
                        this.invadersModel[i][j] = 0;
                        return this.invaders[i][j];
                    }
                }
            }

            return null;
        },

        isHit: function (box1, box2) {
            if (!((box1.x + box1.width < box2.x) ||
                    (box1.x > box2.x + box2.width) ||
                    (box1.y > box2.y + box2.height) ||
                    (box1.y + box1.width < box2.y))) {
                return true;
            }

            return false;
        },

        startGame: function () {
            clearInterval(this.interval);

            this.interval = setInterval(this.moveAliens.bind(this), this.stepTime)
        },

        moveAliens: function () {
            var invaders = this.invaders;
            var invader;

            this.currentStep += this.direction;

            if (this.exitRight()) {
                this.currentStep -= 2;
                this.direction = this.direction * -1;
            } else if (this.exitLeft()) {
                this.currentStep += 2;
                this.direction = this.direction * -1;
            }

            for (var i = 0; i < this.alienRows; i++) {
                for (var j = 0; j < this.alienColumns; j++) {
                    invader = invaders[i][j];
                    if (this.invadersModel[i][j]) {
                        invader.position({
                            x: (j * this.distanceX) + this.currentStep * this.stepSize,
                            y: i * this.distanceY + this.difficulty * this.offsetY
                        });
                    }
                    invader.nextState();
                }
            }
        },

        exitRight: function () {
            var invaders = this.invaders;
            var invader;
            for (var i = 0; i < this.alienRows; i++) {
                for (var j = 0; j < this.alienColumns; j++) {
                    invader = invaders[i][j];
                    if (invader.getBoundingBox().x + invader.getBoundingBox().width >= this.boardWidht && this.invadersModel[i][j]) {
                        return true;
                    }
                }
            }
            return false;
        },

        exitLeft: function () {
            var invaders = this.invaders;
            var invader;
            for (var i = 0; i < this.alienRows; i++) {
                for (var j = 0; j < this.alienColumns; j++) {
                    invader = invaders[i][j];
                    if (invader.getBoundingBox().x <= 0 && this.invadersModel[i][j]) {
                        return true;
                    }
                }
            }
            return false;
        },

        getElement: function () {
            return this.element;
        }
    }

    return GameManager;
})();