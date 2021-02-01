"use strict";

class Snake {
    constructor(headPosition = { x, y }, length, elementSize) {
        this.elements = this.createSnakeElements(headPosition, length, elementSize);
    }
    createSnakeElements = (headPosition, length, elementSize) => {
        // set snake head as first element in new array
        const snakeElements = [headPosition];
        for (let i = 1; i < length; i++) {
            // add further elements before the head (head is always the last element)
            snakeElements.splice(0, 0, {
                x: headPosition.x - i * elementSize,
                y: headPosition.y
            });
        }
        return snakeElements;
    }
}

export default Snake;