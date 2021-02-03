"use strict";

class Randomizer {

    constructor(maxSize = { x, y }, stepSize = 1, minX = 0, minY = 0) {
        this.maxX = maxSize.x;
        this.maxY = maxSize.y;
        this.stepSize = stepSize;
        this.minX = minX;
        this.minY = minY;
    }
    getRandomValue = (maxValue, minValue, stepSize = this.stepSize) => {
        // get randomValue between minValue and maxValue with specific stepSize and no decimals
        return (Math.floor((Math.random() * (maxValue - minValue - stepSize)) / stepSize) * stepSize) + minValue;
    }
    getRandomPosition = (excludedPositions = []) => {
        let includesRandomPosition;
        let randomPosition;
        do {
            includesRandomPosition = false;
            randomPosition = {
                x: this.getRandomValue(this.maxX, this.minX),
                y: this.getRandomValue(this.maxY, this.minY)
            };
            if (excludedPositions.length) {
                for (let i = 0; i < excludedPositions.length; i++) {
                    if (excludedPositions[i].x === randomPosition.x) {
                        if (excludedPositions[i].y === randomPosition.y) {
                            includesRandomPosition = true;
                        }
                    }
                }
            }
        } while (includesRandomPosition)
        return randomPosition;
    }

}

export default Randomizer;
