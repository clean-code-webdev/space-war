import * as move from "./movements.js";
import * as op from "./overpower.js";
import * as status from "./status.js";
import * as shoot from "./shoot.js";
import * as enemy from "./enemy.js";
import * as collision from "./collision.js";
import * as star from "./star.js";
import * as time from "./timer.js";
import * as weapons from "./weapons.js";

let playerSpecs = {
  life: 0,
  health: 10,
  score: 0,
  enemies: 0,
  speed: 10,
  power: 0,
  overpower: 1,
  weapons: {
    light: "infinite",
    medium: 1,
    heavy: 1,
  },
  position: {
    top: 460,
    left: 240,
  },
  time: 0,
};

function highlightWeaponNum(playerSpecs) {
  let heavyInfo = document.querySelector("#heavy-info");
  let middleInfo = document.querySelector("#middle-info");
  let speedInfo = document.querySelector("#speed-info");
  setInterval(
    (playerSpecs) => {
      let heavy = playerSpecs.weapons.heavy;
      let middle = playerSpecs.weapons.medium;
      let overpower = playerSpecs.overpower;
      heavy > 0
        ? (heavyInfo.style.color = "yellow")
        : (heavyInfo.style.color = "gray");

      middle > 0
        ? (middleInfo.style.color = "yellow")
        : (middleInfo.style.color = "gray");

      overpower > 0
        ? (speedInfo.style.color = "yellow")
        : (speedInfo.style.color = "gray");
    },
    10,
    playerSpecs
  );
}

function init(playerSpecs) {
  if (window.innerWidth < 1200) {
    playingNotPossible();
    return;
  }
  // highlight weapons and overpower info
  highlightWeaponNum(playerSpecs);

  // start player movements
  move.movePlayer(playerSpecs);

  // set player lives
  status.setPlayerLives(playerSpecs);

  // set player health
  status.setPlayerHealth(playerSpecs);

  // set player power bar
  status.setPowerBar(playerSpecs);

  // set player overpower
  status.setPlayerOverpower(playerSpecs);

  // count killed enimies
  status.countKilledEnemies(playerSpecs);

  // count medium weapon
  status.countMediumWeapons(playerSpecs);

  // count heavy weapons
  status.countHeavyWeapons(playerSpecs);

  // set score
  status.setScore(playerSpecs);

  // fix power bar
  // status.powerBar(playerSpecs);

  // overpower
  op.overpower(playerSpecs);

  // shoot bullets
  shoot.shootBullet(playerSpecs);

  // crate enemy lever one
  enemy.createEnemy(playerSpecs);

  // get collision between
  collision.playerEnemyCollision(playerSpecs);

  // create stars
  star.createStarts();

  // count time
  time.countTime(playerSpecs);

  /* --------- middle weapon
  ---------------------------------------- */
  weapons.shootMidleWeapon(playerSpecs);

  weapons.shootHeavyWeapon(playerSpecs);

  // playAudio();

  let x = setInterval(() => {
    let life = document.querySelector("#life");

    if (life.innerHTML === "dead") {
      (() => {
        let gameOver = new Audio("./audio/gameover.mp3");
        gameOver.play();
        clearInterval(x);
      })();
    }
    return;
  }, 0);
}

// window.onload = () => {};

document.addEventListener("keypress", (e) => {
  playAudio();
});

function playAudio() {
  var x = document.getElementById("music");
  x.play();
  x.loop = true;
  x.volume = 0.2;
}

function playingNotPossible() {
  document.body.innerHTML = `
  <div id="not-available">
    <h2>Notice! <br> This game is a demo of JavaScript code and does not focus on CSS. To play it, please, open it on a pc or mac.</h2>
  </div>`;
  return;
}

init(playerSpecs);
