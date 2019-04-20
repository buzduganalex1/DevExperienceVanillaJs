    let GameManager = (function () {
        function GameManager() {
            this.invaders = [];

            this.element = document.createElement("div");
            this.element.className = "board";

            this.alienColumns = 11;
            this.alienRows = 5;

            this.boardWidth = 750;
            this.boardHeight = 800;

            this.distanceX = 50;
            this.distanceY = 50;

            this.stepTime = 500,
            this.interval = undefined;
            this.direction = 1;

            this.stepSize = 20;
            this.offsetY = 50;
            this.currentStep = 0;
        }

        GameManager.prototype = {
            createInvaders: function () {
                var invader;
                var invaders = this.invaders;
                var alien;
                var body = document.body;

                for (var i = 0; i < this.alienRows; i++) {
                    invaders[i] = [];
                    for (var j = 0; j < this.alienColumns; j++) {
                        alien = AlienFactory.getAlien(i);
                        invader = new MultiStateSprite(alien.class, alien.width, alien.height);
                        invader.position({
                            x: 1 + j * this.distanceX,
                            y: i * this.distanceY
                        });
                        invaders[i][j] = invader;
                        body.appendChild(invader.getElement());
                    }
                }
            },

            getElement: function () {
                return this.element;
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
                    this.direction *= -1;
                } else if (this.exitLeft()) {
                    this.currentStep += 2;
                    this.direction *= -1;
                }

                for (var i = 0; i < this.alienRows; i++) {
                    for (var j = 0; j < this.alienColumns; j++) {
                        invader = invaders[i][j];
                        invader.position({
                            x: (j * this.distanceX) + this.currentStep * this.stepSize,
                            y: i * this.distanceY + this.offsetYs
                        })
                    }
                }
            },

            exitRight: function () {
                var invaders = this.invaders;
                var invader;
                for (var i = 0; i < this.alienRows; i++) {
                    for (var j = 0; j < this.alienColumns; j++) {
                        invader = invaders[i][j];
                        if (invader.getBoundingBox().x + invader.getBoundingBox().width >= this.boardWidth) {
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
            }
        }

        return GameManager;
    })();