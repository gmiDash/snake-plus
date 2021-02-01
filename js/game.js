"use strict";

import { createCanvasWithContext } from "./modules/canvas.js";
import HUD from "./modules/Hud.js";
import Movement, { MovementButtons } from "./modules/Movement.js";
import Randomizer from "./modules/Randomizer.js";
import { setStorageHighestScore } from "./modules/storage.js";
import Snake from "./modules/Snake.js";

// config
const config = {
    frameRate: 10,
    pixelSize: 16,
    canvas: {
        x: 384, //800,
        y: 384, //512
    },
    startPos: {
        x: 128,
        y: 160
    },
    snakeLength: 4
}

const mainTag = document.querySelector("main");
let gamePaused = false;

// create canvas/playground and context
const [playgroundCanvas, ctx] = createCanvasWithContext(config.canvas, mainTag);
// create HUD
const hud = new HUD(mainTag, config.frameRate);
let snakeElements = [{ x: 0, y: 0 }];
let xPos = 0, yPos = 0;
let dotFoodPos = [{ x: 0, y: 0 }];

// get movement (keyboard input and buttons) and set snake movement
const movement = new Movement(true);
const movementButtons = new MovementButtons(movement);
const snakeMovement = {
    x: 0,
    y: 0,
    speed: config.pixelSize,
};

// get randomizer
const foodPosRandomizerStart = new Randomizer(config.canvas, config.pixelSize, config.canvas.x / 2);
const randomizer = new Randomizer(config.canvas, config.pixelSize);


// functions

const initSettings = () => {

    // load highest score from local storage (if available) and write to HUD
    hud.setHighestScore(setStorageHighestScore());

    // get start position
    const startPosition = config.startPos; //getRandomPosition() ???
    // map x and y start position
    xPos = startPosition.x, yPos = startPosition.y;

    // movements stop
    movement.x = 0;
    movement.y = 0;
    snakeMovement.x = 0;
    snakeMovement.y = 0;

    // create snake
    snakeElements = new Snake(
        config.startPos,
        config.snakeLength,
        config.pixelSize
    ).elements;

    // get random "food" position
    dotFoodPos = foodPosRandomizerStart.getRandomPosition(snakeElements);
}

const init = () => {

    // insert movement buttons
    mainTag.appendChild(movementButtons.dbtnGroup);

    initSettings();

    let x = setInterval(() => {

        // HUD update
        //hud.setCurrentFrameNum();
        //hud.setFoodPosition(dotFoodPos);
        hud.setCurrentScore(snakeElements.length - config.snakeLength);

        ctx.clearRect(0, 0, config.canvas.x, config.canvas.y);

        if (gamePaused) {
            // write message on canvas
            ctx.font = "bold 24px Franklin Gothic Medium";
            ctx.textAlign = "center";
            ctx.fillText("GAME PAUSED", config.canvas.x / 2, config.canvas.y / 2);
        }

        if (!gamePaused) {

            // block movement changes on current movement axis
            if (snakeMovement.x === 0 && movement.x !== 0) {
                snakeMovement.x = movement.x * snakeMovement.speed;
                snakeMovement.y = 0;
            } else if (snakeMovement.y === 0 && movement.y !== 0) {
                snakeMovement.x = 0;
                snakeMovement.y = movement.y * snakeMovement.speed;
            }
            /* snakeMovement.x = movement.x * snakeMovement.speed;
            snakeMovement.y = movement.y * snakeMovement.speed; */
            xPos += snakeMovement.x;
            yPos += snakeMovement.y;

            // check collision
            {
                // check collision with snake elements - exclude head (last element in array)
                let snakeBite = false;
                for (let i = 0; i < snakeElements.length - 1; i++) {
                    if (snakeElements[i].x === xPos && snakeElements[i].y === yPos) {
                        snakeBite = true;
                        break;
                    }
                }
                // check collision with canvas edges and change movement
                if (xPos < 0) {
                    xPos = 0;
                    movement.x = 0;
                    movement.y = 1;
                } else if (xPos > config.canvas.x - config.pixelSize) {
                    xPos = config.canvas.x - config.pixelSize;
                    movement.x = 0;
                    movement.y = 1;
                } else if (yPos < 0) {
                    yPos = 0;
                    movement.x = 1;
                    movement.y = 0;
                } else if (yPos > config.canvas.y - config.pixelSize) {
                    yPos = config.canvas.y - config.pixelSize;
                    movement.x = 1;
                    movement.y = 0;
                } else if (snakeBite) {
                    setStorageHighestScore(snakeElements.length - config.snakeLength);
                    alert(`GAME OVER - DON'T BITE YOURSELF – Score: ${snakeElements.length - config.snakeLength}`);
                    initSettings();
                }
            }

            if (snakeMovement.x || snakeMovement.y) {
                // check collision with food
                if (xPos === dotFoodPos.x && yPos === dotFoodPos.y) {
                    snakeElements.push({ x: xPos, y: yPos });
                    // new "food"
                    dotFoodPos = randomizer.getRandomPosition(snakeElements);
                } else {
                    snakeElements.push({ x: xPos, y: yPos });
                    // delete last snake part
                    snakeElements.shift();
                }
            }

            // draw snake
            snakeElements.forEach(
                (el) => ctx.fillRect(el.x, el.y, config.pixelSize, config.pixelSize)
            );
            // draw "food"
            ctx.fillRect(dotFoodPos.x, dotFoodPos.y, config.pixelSize, config.pixelSize);

        }

    }, 1000 / config.frameRate);

    // event listeners "pause game"
    window.addEventListener("keydown", (event) => {
        if (event.key === "p") {
            if (!gamePaused) gamePaused = true;
            else gamePaused = false;
        }
    })
    playgroundCanvas.addEventListener("click", () => {
        if (!gamePaused) gamePaused = true;
        else gamePaused = false;
    })
}

// init
init();









