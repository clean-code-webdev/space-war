function countTime(playerSpecs) {
  let timer = setInterval(() => {
    playerSpecs.time += 1;
    // console.log("time: " + playerSpecs.time);

    if (playerSpecs.life === "dead") {
      clearInterval(timer);
    }
  }, 1000);
}

export { countTime };
