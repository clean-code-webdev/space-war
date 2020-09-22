// set player health
function setPlayerHealth(playerSpecs) {
  let health = document.querySelector("#health");
  // multiply player health by 10 and set it as the player health bar width
  health.style.width = playerSpecs.health * 10 + "%";
}

// set power bar
function setPowerBar(playerSpecs) {
  let power = document.querySelector("#power-load");
  // multiply player health by 10 and set it as the player health bar width
  power.style.width = playerSpecs.power * 10 + "%";
}

// set player lives
function setPlayerLives(playerSpecs) {
  setStatus(playerSpecs, "life");
}

// set player overpower
function setPlayerOverpower(playerSpecs) {
  setStatus(playerSpecs, "overpower");
}

// count killer enemies
function countKilledEnemies(playerSpecs) {
  setStatus(playerSpecs, "enemies");
}

// count medium weapons
function countMediumWeapons(playerSpecs) {
  setStatus(playerSpecs, "medium");
}

// count heavy weapons
function countHeavyWeapons(playerSpecs) {
  setStatus(playerSpecs, "heavy");
}

// set score
function setScore(playerSpecs) {
  setStatus(playerSpecs, "score");
}

function setStatus(playerSpecs, el) {
  let x = document.querySelector(`#${el}`);

  if (el === "heavy" || el === "medium") {
    x.innerText = playerSpecs.weapons[`${el}`];
    return;
  }

  x.innerText = playerSpecs[`${el}`];
}

export {
  setPlayerLives,
  setPlayerHealth,
  setPowerBar,
  setPlayerOverpower,
  countKilledEnemies,
  countMediumWeapons,
  countHeavyWeapons,
  setScore,
};
