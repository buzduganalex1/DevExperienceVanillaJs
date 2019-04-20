# DevExperienceVanillaJs summary

This is a repository for dev experience vanilla js where we should learn about how to use simple javascript to create games in browsers.

## Project structure

- styles (Where the css styles are  )
- images (Location of sprites)
- sounds (Location of sounds)
- index.html (index.html)
- main.js   (starting point)
- Sprite.js (object used for representing an alien/sprite)
- GameManager.js (object used for holding the game logic)
- AlienFactory.js (Factory used for instantiating random aliens)
- MultiStateSprite.js (Used for handling the state of sprites better)

Create invaders

```js
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
```

Alien Factory for getting an alien instance
```js
let AlienFactory = (function () {
    var aliens = {
        smallAlien: ["smallAlien1", "smallAlien2"],
        mediumAlien: ["mediumAlien1", "mediumAlien2"],
        bigAlien: ["bigAlien1", "bigAlien2"]
    }

    function AlienFactory() {

    }

    AlienFactory.prototype = {
        getAlien: function (type) {
            randomEnemy = Math.floor(Math.random() * 3) + 0;

            switch (randomEnemy) {
                case 0:
                    return {
                        class: aliens.smallAlien,
                        width: 24,
                        height: 24
                    }
                case 1:
                case 2:
                    return {
                        class: aliens.mediumAlien,
                        width: 33,
                        height: 24
                    }
                case 3:
                case 4:
                    return {
                        class: aliens.bigAlien,
                        width: 36,
                        height: 24
                    }
            }
        }
    }

    return new AlienFactory();
})();
```

Move aliens
```js
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
```

Create a sprite representing visually an alien

```js
let Sprite = (function(){
    function Sprite(className, width, height){
        this.element = document.createElement("div");
        this.element.className = className;
        this.x = 0;
        this.y = 0;
        this.width = width || 50;
        this.height = height || 50
    }

    Sprite.prototype = {
        getElement: function(){
            return this.element;
        },

        position: function(positionObject) {
            if(positionObject.x == undefined){
                positionObject.y = this.x;
            }

            if(positionObject.y == undefined){
                positionObject.y = this.x;
            }

            this.x = positionObject.x;
            this.y = positionObject.y;
            this.element.style.left = `${positionObject.x}px`;
            this.element.style.top = `${positionObject.y}px`;
        },

        getBoundingBox: function(){
            return{
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        },

        getPosition: function(){
            return{
                x: this.x,
                y: this.y,
            }
        }
    }

    return Sprite;
})();
```

Moving left and right

```js
// function for checking if we should exit right and go left
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

// function for checking if we should exit left and should go right
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
```

Example of how we use it in the Game manager

```js

if (this.exitRight()) {
    this.currentStep -= 2;
    this.direction *= -1;
} else if (this.exitLeft()) {
    this.currentStep += 2;
    this.direction *= -1;
}

```

Prototype using multi sprite

```js
    // Sprite.call is calling the constructor from sprite
    function MultiStateSprite(classNames, width, height) {
        Sprite.call(this, classNames[0], width, height);
        this.currentState = 0;
        this.classNames = classNames;
        this.lastState = classNames.length - 1;
    }

    // We are establishing the inheritance by setting the prototype
    MultiStateSprite.prototype = Object.create(Sprite.prototype);
```