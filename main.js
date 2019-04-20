document.addEventListener("DOMContentLoaded", start);

function start(){
    var body = document.body;
    var mediumAlien = new Sprite("mediumAlien1", 33, 24);
    var mediumAlien2 = new Sprite("mediumAlien2", 33, 24);
    
    mediumAlien2.position({
        x: 200,
        y: 200
    });

    body.appendChild(mediumAlien.getElement())
    body.appendChild(mediumAlien2.getElement())
}