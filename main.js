document.addEventListener("DOMContentLoaded", start);

function start(){
    var gameManager = new GameManager();
    var body = document.body;
    
    body.appendChild(gameManager.getElement());
}