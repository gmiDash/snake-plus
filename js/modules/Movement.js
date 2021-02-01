"use strict";

import dom from "./dom.js";

class Movement {
    constructor(lockMove = false) {
        // properties
        this.lockMove = lockMove;
        this.x = 0;
        this.y = 0;

        // event listeners
        window.addEventListener("keydown", this.handleMovementStart);
        if (!this.lockMove) window.addEventListener("keyup", this.handleMovementStop);
    }
    handleMovementStart = event => {
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                this.x = -1;
                this.y = 0;
                break;
            case "d":
            case "ArrowRight":
                this.x = 1;
                this.y = 0;
                break;
            case "w":
            case "ArrowUp":
                this.x = 0;
                this.y = -1;
                break;
            case "s":
            case "ArrowDown":
                this.x = 0;
                this.y = 1;
                break;
            /* default: can be ignored */
        }
    }
    handleMovementStop = event => {
        // if movement gets locked after construction
        if (!this.lockMove) {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                case "d":
                case "ArrowRight":
                    this.x = 0;
                    break;
                case "w":
                case "ArrowUp":
                case "s":
                case "ArrowDown":
                    this.y = 0;
                    break;
                /* default: can be ignored */
            }
        }
    }
}

class MovementButtons {
    constructor(movement) {
        // properties
        this.movement = movement;
        this.dbtnGroup = this.createDirectionalButtons();
    }
    createDirectionalButtons = () => {
        // create directional buttons
        const dbtnGroup = dom.createDOMElement({
            type: "div",
            classNames: ["gmi-dbtngroup"],
            parent: false,
        });
        dom.createDOMElement({
            type: "button",
            classNames: ["gmi-dbtn", "gmi-dbtn--up"],
            parent: dbtnGroup,
            content: "▲",
            events: { "pointerover": () => this.setMovement("up") }
        });
        dom.createDOMElement({
            type: "button",
            classNames: ["gmi-dbtn", "gmi-dbtn--left"],
            parent: dbtnGroup,
            content: "◄",
            events: { "pointerover": () => this.setMovement("left") }
        });
        dom.createDOMElement({
            type: "button",
            classNames: ["gmi-dbtn", "gmi-dbtn--right"],
            parent: dbtnGroup,
            content: "►",
            events: { "pointerover": () => this.setMovement("right") }
        });
        dom.createDOMElement({
            type: "button",
            classNames: ["gmi-dbtn", "gmi-dbtn--down"],
            parent: dbtnGroup,
            content: "▼",
            events: { "pointerover": () => this.setMovement("down") }
        });

        return dbtnGroup;
    }
    setMovement = direction => {
        switch (direction) {
            case "up":
                this.movement.x = 0;
                this.movement.y = -1;
                break;
            case "left":
                this.movement.x = -1;
                this.movement.y = 0;
                break;
            case "right":
                this.movement.x = 1;
                this.movement.y = 0;
                break;
            case "down":
                this.movement.x = 0;
                this.movement.y = 1;
                break;
            /* default: can be ignored */
        }
    }
}

export default Movement;
export { MovementButtons };