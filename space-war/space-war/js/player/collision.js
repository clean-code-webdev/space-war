function playerEnemyCollision(playerSpecs) {
  let player = document.querySelector("#player");

  // start checking enemy and player position
  const interval = setInterval(() => {
    let enemy = document.querySelectorAll(".enemy-player");

    for (let i = 0; i < enemy.length; i++) {
      // check if there's a collision between player and enemy
      if (
        // check collision: player bottom / enemy top
        player.offsetTop === enemy[i].offsetTop &&
        player.offsetLeft <= enemy[i].offsetLeft + 15 &&
        player.offsetLeft + 15 >= enemy[i].offsetLeft
      ) {
        // delete enemy on crash
        enemy[i].parentNode.removeChild(enemy[i]);
        let explosion = new Audio("../audio/explosion.mp3");

        // remove class blink after 1 second
        setTimeout(() => {
          player.classList.remove("blink");
        }, 1000);

        // add class blink on crash with enemy
        player.classList.add("blink");
        explosion.play();

        // update player health
        updatePlayerHealth(playerSpecs);

        if (playerSpecs.health === 0) {
          // lose one life
          loseOneLife(playerSpecs, player);

          if (playerSpecs.life < 0) {
            clearInterval(interval);
            // check if game is over
            gameOver(playerSpecs, player);
          }
        }
      }
    }
  }, 0);
}

// update player health
function updatePlayerHealth(playerSpecs) {
  // update player health object
  playerSpecs.health -= 2;
  // update player health on status
  document.querySelector("#health").style.width = playerSpecs.health * 10 + "%";
}

// lose one life when player and enemy crash
function loseOneLife(playerSpecs, player) {
  player.classList.remove("blink");

  // reset health bar
  if (playerSpecs.life > 0) playerSpecs.health = 10;

  document.querySelector("#health").style.width = playerSpecs.health * 10 + "%";

  // update player life object
  playerSpecs.life -= 1;
  // update player life on status
  document.querySelector("#life").innerHTML = playerSpecs.life;
}

// check if game is over
function gameOver(playerSpecs, player) {
  setInterval(() => {
    if (playerSpecs.life <= 0) {
      playerSpecs.life = "dead";
      document.querySelector("#life").innerHTML = playerSpecs.life;

      let wrapper = document.querySelector("#wrapper");

      setTimeout(() => {
        document.querySelector("#final-message").style.display = "block";
        document.querySelector("#final-point").innerHTML = playerSpecs.score;
        document.querySelector("#enemy-killed").innerHTML = playerSpecs.enemies;
        document.querySelector("#time-played").innerHTML =
          Math.floor(playerSpecs.time / 60) + ":" + (playerSpecs.time % 60);
      }, 1000);

      player.remove();
      wrapper.classList.add("dye-animation");
    }
  }, 0);
}

export { playerEnemyCollision };
