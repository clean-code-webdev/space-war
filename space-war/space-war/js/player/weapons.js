// destroy enemies when middle weapon is used
function destroyEnemies(enemies, potence) {
  for (let i = 0; i < enemies.length; i++) {
    // check where to stop
    if (potence === "medium") {
      if (i === 3) break;
    } else {
      if (i === 5) break;
    }

    // delete enemies
    if (enemies[i] !== undefined) {
        
      // ===== explosion
      // gif
      enemies[i].innerHTML = `<img src="./img/explosion.gif">`;
      enemies[i].querySelector("img").style.width = "20px";
      let audio = new Audio('./audio/explosion.mp3')
      
      audio.play()
      
      setInterval(() => {
      enemies[i].remove();
      }, 250);

      
    }
  }
}

// update score on middle weapon shot
function updateScore(playerSpecs, enemies, potence) {
  for (let i = 0; i < enemies.length; i++) {
    // check where to stop
    if (potence === "medium") {
      if (i === 3) break;
    } else {
      if (i === 5) break;
    }

    // update player object
    playerSpecs.score += 10;
    playerSpecs.enemies += 1;

    // update status bar
    document.querySelector("#score").innerHTML = playerSpecs.score;
    document.querySelector("#enemies").innerHTML = playerSpecs.enemies;
  }
}

// update weapons in status bar
function updateWeapon(playerSpecs, el) {
  // update player medium weapon
  playerSpecs.weapons[`${el}`] -= 1;

  // update player medium weapon in the status bar
  document.querySelector(`#${el}`).innerHTML = playerSpecs.weapons[`${el}`];
}

// initiate weapon shooting
function initiateWeaponShooting(playerSpecs, potence) {
  let enemies = document.querySelectorAll(".enemy-player");
  console.log(`${potence} weapon shot`);

  // update score on middle weapon shot
  updateScore(playerSpecs, enemies, potence);

  // destoy enemies
  destroyEnemies(enemies, potence);

  // update weapons in status bar
  updateWeapon(playerSpecs, potence);
}

// shot medium weapon
function shootMidleWeapon(playerSpecs) {
  document.addEventListener("keypress", (e) => {
    if (e.key === "d" && playerSpecs.weapons.medium > 0) {
      // initiate weapon shooting
      initiateWeaponShooting(playerSpecs, "medium");
      let wrapper = document.querySelector("#wrapper");
      let tripleExplosion = new Audio("./audio/triple-explosion.mp3");
      
    //   tripleExplosion.play();
      
      setTimeout(() => {
        wrapper.style.background = "black";
      }, 200);
      wrapper.style.background = "rgba(255,255,0, 0.3)";
    }
  });
}

// shot heavy weapon
function shootHeavyWeapon(playerSpecs) {
  document.addEventListener("keypress", (e) => {
    if (e.key === "e" && playerSpecs.weapons.heavy > 0) {
      // initiate weapon shooting
      initiateWeaponShooting(playerSpecs, "heavy");
      let wrapper = document.querySelector("#wrapper");
      let explosion = new Audio("./audio/five-explosions.mp3");
      
    //   explosion.play();
      setTimeout(() => {
        wrapper.style.background = "black";
      }, 200);
      wrapper.style.background = "rgb(250,0,0, 0.3)";
    }
  });
}

export { shootMidleWeapon, shootHeavyWeapon };
