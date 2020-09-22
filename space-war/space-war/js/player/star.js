function createStarts() {
  let wrapper = document.querySelector("#wrapper");
  for (let i = 0; i < 100; i++) {
    // create star
    let star = document.createElement("div");

    star.className = "star";

    // set star position
    let positionX = Math.floor(Math.random() * 500);
    let positionY = Math.floor(Math.random() * 500);

    star.style.top = positionY + "px";
    star.style.left = positionX + "px";

    // append star to playing area
    wrapper.appendChild(star);
  }
}

export { createStarts };
