"use strict";

import { createCanvasWithContext } from "./modules/canvas.js";
import { detectCollision } from "./modules/collision.js";
import HUD from "./modules/Hud.js";
import { MovementKeyboard, MovementButtons } from "./modules/Movement.js";
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
    snakeLength: 4,
    autoTurn: true,
    cpuSnakesActive: false,
    cpuSnakes: [
        {
            startPos: {
                x: 224,
                y: 320
            },
            length: 6
        },
        {
            startPos: {
                x: 320,
                y: 288
            },
            length: 2
        },
    ]

}

const mainTag = document.querySelector("main");
let gamePaused = false;

// create canvas/playground and context
const [playgroundCanvas, ctx] = createCanvasWithContext(config.canvas, mainTag);
// create HUD
const hud = new HUD(mainTag, config.frameRate);

let position, snakeElements, dotFoodPos;
let cpuSnakes = [];

// get movement (keyboard input and buttons) and set snake movement
const movementKeyboard = new MovementKeyboard();
// movement object stores current movement
const movement = movementKeyboard.movement;
// transfer movement object for same reference
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

    // get start position, spread to overwrite last position in case of "game over"
    position = { ...config.startPos }; //getRandomPosition() ???

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

    // clean "CPU" snakes
    cpuSnakes = [];

    // create "CPU" snakes (if activated) 
    if (config.cpuSnakesActive) {
        config.cpuSnakes.forEach(snake => {
            cpuSnakes.push(
                new Snake(
                    snake.startPos,
                    snake.length,
                    config.pixelSize
                ).elements
            )
        })
    }

    // get random "food" position
    dotFoodPos = foodPosRandomizerStart.getRandomPosition(snakeElements.concat(...cpuSnakes));

}

const init = () => {

    // insert movement buttons
    mainTag.appendChild(movementButtons.group);

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
        } else {

            // block movement changes on current movement axis
            if (snakeMovement.x === 0 && movement.x !== 0) {
                snakeMovement.x = movement.x * snakeMovement.speed;
                snakeMovement.y = 0;
            } else if (snakeMovement.y === 0 && movement.y !== 0) {
                snakeMovement.x = 0;
                snakeMovement.y = movement.y * snakeMovement.speed;
            }
            position.x += snakeMovement.x;
            position.y += snakeMovement.y;

            // check collision or snakeBite
            const [snakeBite, snakeBiteOther] = detectCollision({
                snakeElements: snakeElements,
                position: position,
                movement: movement,
                xMax: config.canvas.x - config.pixelSize,
                yMax: config.canvas.y - config.pixelSize,
                otherSnakes: cpuSnakes,
                automaticTurn: config.autoTurn
            });

            if (snakeBite || snakeBiteOther) {
                setStorageHighestScore(snakeElements.length - config.snakeLength);
                if (snakeBite) {
                    alert(`GAME OVER - DON'T BITE YOURSELF – Score: ${snakeElements.length - config.snakeLength}`);
                } else if (snakeBiteOther) {
                    alert(`GAME OVER - WATCH OUT FOR OTHER SNAKES – Score: ${snakeElements.length - config.snakeLength}`);
                }
                initSettings();
            }

            if (snakeMovement.x || snakeMovement.y) {
                snakeElements.push({ x: position.x, y: position.y });
                // check collision with food
                if (position.x === dotFoodPos.x && position.y === dotFoodPos.y) {
                    // new "food"
                    dotFoodPos = randomizer.getRandomPosition(snakeElements);
                } else {
                    // delete last snake part
                    snakeElements.shift();
                }
            }

            // draw snake
            snakeElements.forEach(
                (el) => ctx.fillRect(el.x, el.y, config.pixelSize, config.pixelSize)
            );

            if (config.cpuSnakesActive) {
                // draw cpuSnake
                cpuSnakes.forEach(snake => {
                    snake.forEach(
                        el => ctx.fillRect(el.x, el.y, config.pixelSize, config.pixelSize)
                    )
                }
                );
            }

            // draw "food"
            ctx.fillRect(dotFoodPos.x, dotFoodPos.y, config.pixelSize, config.pixelSize);

        }

    }, 1000 / config.frameRate);

    // event listeners "pause game"
    window.addEventListener("keydown", (event) => {
        if (event.key === "p") {
            if (gamePaused) {
                gamePaused = false;
            } else {
                gamePaused = true;
            }
            //gamePaused = !gamePaused;
        }
    })
    playgroundCanvas.addEventListener("click", () => {
        if (gamePaused) {
            gamePaused = false;
        } else {
            gamePaused = true;
        }
        //gamePaused = !gamePaused;
    })
}

// init
init();