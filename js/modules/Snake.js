"use strict";

class Snake {
    constructor(headPosition, length, elementSize) {
        this.elements = this.createSnakeElements(headPosition, length, elementSize);
    }
    createSnakeElements = ({ x, y }, length, elementSize) => {
        // set snake head as first element in new array
        const snakeElements = [{ x, y }];
        for (let i = 1; i < length; i++) {
            // add further elements before the head (head is always the last element)
            snakeElements.splice(0, 0, {
                x: x - i * elementSize,
                y: y
            });
        }
        return snakeElements;
    }
}

export default Snake;