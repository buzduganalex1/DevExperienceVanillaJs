let BattleShip = (function () {
    function BattleShip(fireCallBack, limitLeft, limitRight) {
        Sprite.call(this, "battleShip", 39, 24);

        this.moveSpeed = 5;
        this.direction = 1;
        this.limitLeft = limitLeft;
        this.limitRight = limitRight;
        this.fireFrameReference;
        this.fireCallBack = fireCallBack;
        this.animateMove();
        this.addListeners();
        this.requestFire();
    }

    BattleShip.prototype = Object.create(Sprite.prototype);
    
    Object.assign(BattleShip.prototype, {
        constructor: BattleShip,

        addListeners: function () {
            this.keyDownListener = this.keyDown.bind(this);
            this.keyUpListener = this.keyUp.bind(this);

            window.addEventListener("keydown", this.keyDownListener);
            window.addEventListener("keyup", this.keyUpListener);
        },

        keyDown: function (e) {
            switch (e.code) {
                case "ArrowLeft":
                    this.leftIsDown = true;
                    this.moveDirection = -1;
                    break;
                case "ArrowRight":
                    this.rightIsDown = true;
                    this.moveDirection = 1;
                    break;
                case "Space":
                    this.spaceIsDown = true;
                    this.moveDirection = 1;
                    break;
            }
        },

        move: function (newX) {
            if (newX <= this.limitLeft) {
                newX = 0;
            }
            if (newX + this.getBoundingBox().width >= this.limitRight) {
                newX = this.limitRight - this.getBoundingBox().width;
            }
            this.position({
                x: newX
            })
        },

        keyUp: function (e) {
            switch (e.code) {
                case "ArrowLeft":
                    this.leftIsDown = false;
                    break;
                case "ArrowRight":
                    this.rightIsDown = false;
                    break;
                case "Space":
                    this.spaceIsDown = false;
                    break;
            }
        },

        animateMove: function () {
            var x = this.x;
            this.frameReference = requestAnimationFrame(() => {
                x += this.moveSpeed * this.moveDirection;
                if ((this.leftIsDown || this.rightIsDown)) {
                    this.move(x);
                }
                this.animateMove();
            });
        },

        requestFire: function () {
            this.fireFrameReference = requestAnimationFrame(() => {
                if (this.spaceIsDown) {
                    this.fireCallBack();
                }
                this.requestFire();
            });
        },
    })

    return BattleShip;
})();