function shootBullet(playerSpecs) {
  document.addEventListener("keypress", (e) => {
    let wrapper = document.querySelector("#wrapper");

    // get player position
    let playerPosition = getPlayerPosition(playerSpecs);

    // check key pressed
    // if key pressed is 'f', then shoot
    if (e.key === " ") {
      // initiate bullet create as well as animation and deletion process
      initiateBullet(playerPosition, playerSpecs, wrapper);

      let shot = new Audio("./audio/shot.mp3");

      // shot sound
      shot.volume = 0.2;
      shot.play();
    }
  });
}

// initiate bullet create as well as animation and deletion process
function initiateBullet(playerPosition, playerSpecs, wrapper) {
  // create new bullet
  let bullet = createNewBullet(playerPosition);

  // append bullet to wrapper
  wrapper.appendChild(bullet);

  // animate bullet so it moves upwards
  animateBullet(bullet);

  // kill enemy
  killEnemy(bullet, playerSpecs);

  // delete bullet
  deleteBullet(bullet, wrapper);
}

// get player position
function getPlayerPosition(playerSpecs) {
  let playerX = playerSpecs.position.left + 10;
  let playerY = playerSpecs.position.top;

  return {
    playerX,
    playerY,
  };
}

// create a new bullet
function createNewBullet(playerPosition) {
  let bullet = document.createElement("div");
  bullet.className = "bullet";

  // set bullet position on creation
  bullet.style.position = "absolute";
  bullet.style.top = playerPosition.playerY + "px";
  bullet.style.left = playerPosition.playerX + "px";

  return bullet;
}

// animate bullet so it moves towards the enemies
function animateBullet(bullet) {
  // let height = document.body.style.height;

  let distanceToTop = bullet.offsetTop - document.body.style.height;

  bullet.animate(
    [
      // keyframes
      { transform: `translateY(0px)` },
      { transform: `translateY(${-distanceToTop}px)` },
    ],
    {
      // timing options
      duration: 500,
      iterations: 1,
    }
  );
}

// delete bullet
function deleteBullet(bullet, wrapper) {
  setTimeout(() => {
    bullet.remove();
  }, 490);
}

// kill enemy
function killEnemy(bullet, playerSpecs) {
  let powerBar = document.querySelector("#power-load");
  // let explosion = document.querySelector("#explosion");

  // start checking enemy and bullet position
  const interval = setInterval(() => {
    let enemy = document.querySelectorAll(".enemy-player");
    for (let i = 0; i < enemy.length; i++) {
      if (
        // check if there's a collision between bullet and enemy
        enemy[i].getBoundingClientRect().bottom >=
          bullet.getBoundingClientRect().top &&
        enemy[i].getBoundingClientRect().left <=
          bullet.getBoundingClientRect().left &&
        enemy[i].getBoundingClientRect().right >=
          bullet.getBoundingClientRect().right
      ) {
        // define score based on the bullet y position at the moment it hits the enemy
        let points = Math.round(bullet.getBoundingClientRect().top);
        points = Math.round(2500 / points);
        if (points > 10) {
          points = 10;
        }

        // stop checking enemy and bullet positions
        clearInterval(interval);

        setTimeout(() => {
          enemy[i].parentNode.removeChild(enemy[i]);
        }, 150);

        // ===== explosion
        // gif
        enemy[i].innerHTML = `<img src="./img/explosion.gif">`;
        enemy[i].querySelector("img").style.width = "20px";

        // audio
        // shot sound
        let explosion = new Audio("./audio/explosion.mp3");
        // shot sound
        explosion.volume = 0.5;
        explosion.play();

        // destoy enemy

        // destroy bullet
        bullet.parentNode.removeChild(bullet);

        // renew player status on enemy kill
        updateOverPower(playerSpecs, powerBar);

        // update medium weapon
        updateMediumWeapon(playerSpecs);

        // update heavy weapon
        updateHeavyWeapon(playerSpecs);

        // update player score
        updateStatus(playerSpecs, "score", points);

        // update killed enemies
        updateStatus(playerSpecs, "enemies", 1);

        // add life
        addLife(playerSpecs);
      }
    }
  }, 1000 / 120);
}

// add life every time player kills 100 enemies
function addLife(playerSpecs) {
  if (playerSpecs.enemies % 100 === 0) {
    playerSpecs.life += 1;
    document.querySelector("#life").innerHTML = playerSpecs.life;
  }
}

// update killed enemies/player score in the status bar
function updateStatus(playerSpecs, el, val) {
  // add score
  playerSpecs[el] += val;
  document.querySelector(`#${el}`).innerHTML = playerSpecs[el];
}

// renew player status on enemy kill
function updateOverPower(playerSpecs, powerBar) {
  // add power bar
  playerSpecs.power += 5; // todo back to 5

  if (playerSpecs.power === 100) {
    // restart playerSpecs power object
    playerSpecs.power = 0;
    // empty status power bar
    powerBar.style.width = "0%";
    // increment playerSpecs overpower object
    playerSpecs.overpower += 1;
    // update player overpower in the status bar
    document.querySelector("#overpower").innerHTML = playerSpecs.overpower;
  }

  // update power bar in the status bar
  powerBar.style.width = playerSpecs.power + "%";
}

// update player medium weapon
function updateMediumWeapon(playerSpecs) {
  if (playerSpecs.enemies % 25 === 0 && playerSpecs.enemies > 0) {
    playerSpecs.weapons.medium += 1;
    document.querySelector("#medium").innerHTML = playerSpecs.weapons.medium;
  }
}

// update player heavy weapon
function updateHeavyWeapon(playerSpecs) {
  if (playerSpecs.enemies % 50 === 0 && playerSpecs.enemies > 0) {
    playerSpecs.weapons.heavy += 1;
    document.querySelector("#heavy").innerHTML = playerSpecs.weapons.heavy;
  }
}

export { shootBullet };
