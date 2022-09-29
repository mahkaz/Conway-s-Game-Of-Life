const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")


const game = new GameOfLife()
game.gameSetUp()
game.fillArray();


let SIMULATION_SPEED = 300;
let isPlaying = false;

// wrapper for play/pause simulation
function playSimulation() {
    window.setInterval(() => {
        if (isPlaying) {
            game.runGame();
        }
    }, SIMULATION_SPEED)
}

window.onload = () => {
    
    // default, start random
    // to-do: add percentage of cells to randomise, 
    // e.g. 80% will be either 1 or 0, 20% will be 0
    document.querySelector("#start-random").addEventListener("click", () => {
        isPlaying = true;
        game.arrayRandomize();
        game.fillArray();
        
        playSimulation()
    })
    
    // drawing
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
    
    // reset board
    document.querySelector("#reset").addEventListener("click", () => {
        if (isPlaying) {
            isPlaying = false;
        }
        game.gameSetUp();
        game.fillArray();
    })
    
    // pause board
    document.querySelector("#pause").addEventListener("click", () => {
        if (isPlaying) {
            isPlaying = false;
        }
    })
    
    // run simulation
    document.querySelector("#start").addEventListener("click", () => {
        isPlaying = true;
        playSimulation()
    })
}


