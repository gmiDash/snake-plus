"use strict";

const detectCollision = ({
    snakeElements,
    position,
    movement,
    xMax,
    yMax,
    otherSnakes = null,
    automaticTurn = false
}) => {
    let snakeBite = false;
    let snakeBiteOther = false;

    // it's important to check collision with canvas edges before checking for snakeBites
    // otherwise you'll move through the edges without detecting a collision on the opposite side

    // check collision with canvas edges (automaticTurn: true = turn/move right or down, false = move to opposite edge
    if (automaticTurn) {
        // move right or down
        if (position.x < 0) {
            position.x = 0;
            movement.x = 0;
            movement.y = 1;
        } else if (position.x > xMax) {
            position.x = xMax;
            movement.x = 0;
            movement.y = 1;
        } else if (position.y < 0) {
            position.y = 0;
            movement.x = 1;
            movement.y = 0;
        } else if (position.y > yMax) {
            position.y = yMax;
            movement.x = 1;
            movement.y = 0;
        }
    } else {
        // move to opposite edge
        if (position.x < 0) {
            position.x = xMax;
        } else if (position.x > xMax) {
            position.x = 0;
        } else if (position.y < 0) {
            position.y = yMax;
        } else if (position.y > yMax) {
            position.y = 0;
        }
    }

    // check collision with snake elements - exclude head (last element in array)
    for (let i = 0; i < snakeElements.length - 1; i++) {
        if (snakeElements[i].x === position.x && snakeElements[i].y === position.y) {
            snakeBite = true;
            break;
        }
    }

    // check collision with other snakes
    if (otherSnakes) {
        otherSnakes.forEach(snake => {
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === position.x && snake[i].y === position.y) {
                    snakeBiteOther = true;
                    break;
                }
            }
        }
        )
    }

    return [snakeBite, snakeBiteOther];
}

export { detectCollision };