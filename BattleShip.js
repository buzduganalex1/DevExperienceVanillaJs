let BattleShip = (function () {
    function BattleShip(fireCallBack, limitLeft, limitRight) {
        Sprite.call(this, "battleShip", 39, 24);

        this.moveSpeed = 5;
        this.direction = 1;
        this.limitLeft = limitLeft;
        this.limitRight = limitRight;

        this.addListeners();
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
                    break;
            }

            x = this.x;
            x += this.moveSpeed * this.moveDirection;
            this.move(x);
        },

        move: function (newX) {
            console.log(newX);
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
        }
    })


    return BattleShip;
})();