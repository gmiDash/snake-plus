"use strict";

import dom from "./dom.js";

class HUD {
    constructor(parent = document.body, frameRate = null, hints = false) {
        this.parent = parent;
        this.frameRate = frameRate;
        //this.hint = "Move with ▲ ▼ ◄ ► or W, S, A, D | pause by pressing P";

        // counter variable for frame rate
        frameRate && (this.frameCount = 0);

        // create dom elements
        this.highestScoreField = dom.createDOMElement({
            type: "span",
            classNames: ["gmi-hint", "gmi-hint--score", "gmi-hint--highscore"],
            content: "-",
            parent: this.parent,
        });
        this.currentScoreField = dom.createDOMElement({
            type: "span",
            classNames: ["gmi-hint", "gmi-hint--score", "gmi-hint--currentscore"],
            parent: this.parent,
        });
        if (hints) this.frameRateField = dom.createDOMElement({
            type: "p",
            classNames: ["gmi-hint"],
            parent: this.parent,
        });
        if (hints) this.foodPosField = dom.createDOMElement({
            type: "p",
            classNames: ["gmi-hint"],
            parent: this.parent,
        });
    }
    setCurrentFrameNum = () => {
        (this.frameCount > this.frameRate) && (this.frameCount = 0);
        this.frameRateField.textContent = "FRAME RATE: " + this.frameCount + "/" + this.frameRate;
        this.frameCount++;
    }
    setFoodPosition = position => {
        this.foodPosField.textContent = "FOOD POSITION x:" + position.x + " y:" + position.y;
    }
    setHighestScore = highestScore => {
        this.highestScoreField.textContent = highestScore;
    }
    setCurrentScore = length => {
        this.currentScoreField.textContent = length;
    }

}

export default HUD;



