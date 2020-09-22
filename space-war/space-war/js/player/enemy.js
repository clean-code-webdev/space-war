function createEnemyLevelOne(playerSpecs) {
  // create a new enemy
  let enemy = document.createElement("div");

  // destroy the enemy when it reaches the bottom of the playing area
  setTimeout(() => {
    loseHealthIfEnemyReachesTheBottomOfPlayingArea(playerSpecs, enemy);
    enemy.remove();
  }, 10000);

  enemy.className = "enemy-player";

  let randomNumber = Math.floor(Math.random() * 4) + 1;
  // add icon to enemy
  // enemy.innerHTML = '<i class="fas fa-pastafarianism"></i>';
  enemy.innerHTML = `<div><img src="./img/enemy-${randomNumber}.png"></div>`;
  enemy.style.width = "30px";
  enemy.style.height = "30px";
  enemy.querySelector("img").style.width = "100%";
  enemy.querySelector("img").style.height = "30px";

  // set a random x position for the enemy
  let positionX = Math.floor(Math.random() * 480.5);
  enemy.style.left = positionX + "px";

  // add movement (downwards) to enemy
  enemy.classList.add("animate");

  // add enemy in the screen
  document.querySelector("#wrapper").appendChild(enemy);
}

// create enemy
let counter = 2000;
function createEnemy(playerSpecs) {
  createEnemyLevelOne(playerSpecs);
  let x = setInterval(() => {
    counter -= 50;
    createEnemy(playerSpecs);
    if (counter === 300) counter = 2000;
    clearInterval(x);
  }, counter);
}

function loseHealthIfEnemyReachesTheBottomOfPlayingArea(playerSpecs, enemy) {
  if (enemy.getBoundingClientRect().top >= 595) {
    // enemy.color = "yellow";
    playerSpecs.health -= 2;
    document.querySelector("#health").style.width =
      playerSpecs.health * 10 + "%";

    // lose one life if health bar === 0
    if (playerSpecs.health === 0) {
      playerSpecs.life -= 1;
    }

    if (playerSpecs.life < 0) {
      // clearInterval(interval);
      // check if game is over
      gameOver(playerSpecs, player);
    }
  }
}

// todo this function is a repetition of the function gameOver() in the collins.js file
// check if game is over
function gameOver(playerSpecs, player) {
  if (playerSpecs.life < 0) {
    playerSpecs.life = "dead";
    document.querySelector("#life").innerHTML = playerSpecs.life;

    let wrapper = document.querySelector("#wrapper");

    finalMessage(wrapper);

    player.remove();
    wrapper.classList.add("dye-animation");
  }

  function finalMessage(wrapper) {
    setTimeout(() => {
      document.querySelector("#final-message").style.display = "block";
      document.querySelector("#final-point").innerHTML = playerSpecs.score;
      document.querySelector("#enemy-killed").innerHTML = playerSpecs.enemies;
      document.querySelector("#time-played").innerHTML =
        Math.floor(playerSpecs.time / 60) + ":" + (playerSpecs.time % 60);
    }, 1000);
  }
}
export { createEnemy };
