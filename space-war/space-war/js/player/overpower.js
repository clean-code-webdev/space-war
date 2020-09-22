// make player invisible
function makePlayerInvisible(playerSpecs, status) {
  if (playerSpecs.overpower > 0) {
    let player = document.querySelector("#player");

    // cancel player invisibility after 3 seconds
    setTimeout(() => {
      player.style.opacity = "1";
    }, 3000);

    // make player invisible
    player.style.opacity = "0.2";

    // reduce overpower by 1
    playerSpecs.overpower -= 1;
    let op = document.querySelector("#overpower");
    op.innerHTML = playerSpecs.overpower;
  }
}

// boost player speed by 4
function boostPlayerSpeed(playerSpecs, status) {
  setTimeout(() => {
    playerSpecs.speed = 10;
  }, 3000);

  // boost player speed by 4
  playerSpecs.speed = 20;

  // reduce overpower by 1
  playerSpecs.overpower -= 1;
  let op = document.querySelector("#overpower");
  op.innerHTML = playerSpecs.overpower;
}

function overpower(playerSpecs) {
  document.addEventListener("keypress", (e) => {
    if (playerSpecs.overpower > 0) {
      // if (e.key === "i") {
      //   makePlayerInvisible(playerSpecs);
      // } else
      if (e.key === "s") {
        boostPlayerSpeed(playerSpecs);
      }
    }
  });
}

export { overpower };
