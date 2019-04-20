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

        this.stepSize = 10;
        this.offsetY = 50;
        this.currentStep = 0;
    }

    GameManager.prototype = {
        createInvaders: function () {
            var invader;
            var alien;
            var invaders = this.invaders;
            var body = document.body;

            for (var i = 0; i < this.alienRows; i++) {
                invaders[i] = [];
                console.log('i:' + i);
                for (var j = 0; j <= this.alienColumns; j++) {
                    
                    alien = AlienFactory.getAlien(i);
                    invader = new Sprite(alien.class[0], alien.width, alien.height);

                    console.log('j: ' + j);
                    invader.position({
                        x: 1 + j * this.distanceX,
                        y: i * this.distanceY
                    })

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

            for (var i = 0; i < this.alienRows; i++) {
                for (var j = 0; j < this.alienColumns; j++) {
                    invader = invaders[i][j];
                    invader.position({
                        x: (j * this.distanceX) + this.currentStep * this.stepSize,
                        y: i * this.distanceY +  this.offsetYs
                    })
                }
            }
        }
    }

    return GameManager;
})();