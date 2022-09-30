const canvas = document.querySelector("#gamefield")
const reset_btn = document.querySelector("#reset");
const pause_btn = document.querySelector("#pause");
const start_btn = document.querySelector("#start");
const start_rand_btn = document.querySelector("#start-random");
const speed_slider = document.querySelector(".speed-slider input")
const ctx = canvas.getContext("2d")


const game = new GameOfLife()
game.gameSetUp()
game.fillArray();


let MAX_SIMULATION_SPEED = 1700; // Higher value is slower, set <input> max at index.html.
let SIMULATION_SPEED = MAX_SIMULATION_SPEED;
let isPlaying = false;
let interval_id = 0;

// wrapper for play/pause simulation
function playSimulation() {
  interval_id = window.setInterval(() => {
    if (isPlaying) {
      game.runGame();
    }
  }, SIMULATION_SPEED)
}

window.onload = () => {

  // drawing cells
  canvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    game.makeAlive(x,y);
    isDrawing = true;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
      x = e.offsetX;
      y = e.offsetY;
      game.makeAlive(x,y);
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawing) {
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });

  // start simulation
  start_btn.addEventListener("click", () => {
    isPlaying = true;
    if (interval_id)
      clearInterval(interval_id);
    playSimulation()
  })

  // default, start random
  // to-do: add percentage of cells to randomise, 
  // e.g. 80% will be either 1 or 0, 20% will be 0
  start_rand_btn.addEventListener("click", () => {
    isPlaying = true;
    game.arrayRandomize();
    game.fillArray();

    playSimulation()
  })

  // pause board
  pause_btn.addEventListener("click", () => {
    if (isPlaying) {
      isPlaying = false;
    }
    clearInterval(interval_id);
  })
  // pause_btn.addEventListener("click", () => {
  //     reset_btn.style.backgroundColor = "#9ebe78d7"
  // })


  // reset board
  reset_btn.addEventListener("click", () => {
    if (isPlaying) {
      isPlaying = false;
    }
    game.gameSetUp();
    game.fillArray();
  })
  // reset_btn.addEventListener("mousedown", () => {
  //     reset_btn.style.backgroundColor = "#9ebe78d7"
  // })
  // reset_btn.addEventListener("mouseup", () => {
  //     reset_btn.style.backgroundColor = "#ffffff99"
  // })
  speed_slider.addEventListener("change", (event) => {
    SIMULATION_SPEED = MAX_SIMULATION_SPEED - event.target.value;
    clearInterval(interval_id);
    playSimulation();
  })
}
