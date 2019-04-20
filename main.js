document.addEventListener("DOMContentLoaded", start);

function start(){
    var gameManager = new GameManager();

    gameManager.createInvaders();
    gameManager.startGame();
}