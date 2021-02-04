"use strict";

import dom from "./dom.js";

class Movement {
    constructor() {
        this.movement = { x: 0, y: 0 }
    }
}

class MovementKeyboard extends Movement {
    constructor(lockMove = false, movement = { x: 0, y: 0 }) {
        super();
        this.movement = movement
        this.lockMove = lockMove;
        this.registerEventListeners();
    }
    registerEventListeners = () => {
        window.addEventListener("keydown", this.handleMovementStart);
        if (!this.lockMove) {
            window.addEventListener("keyup", this.handleMovementStop);
        }
    }
    handleMovementStart = event => {
        switch (event.key) {
            case "a":
            case "ArrowLeft":
                this.movement.x = -1;
                this.movement.y = 0;
                break;
            case "d":
            case "ArrowRight":
                this.movement.x = 1;
                this.movement.y = 0;
                break;
            case "w":
            case "ArrowUp":
                this.movement.x = 0;
                this.movement.y = -1;
                break;
            case "s":
            case "ArrowDown":
                this.movement.x = 0;
                this.movement.y = 1;
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
                    this.movement.x = 0;
                    break;
                case "w":
                case "ArrowUp":
                case "s":
                case "ArrowDown":
                    this.movement.y = 0;
                    break;
                /* default: can be ignored */
            }
        }
    }
}

class MovementButtons extends Movement {
    constructor(movement = { x: 0, y: 0 }) {
        super();
        this.movement = movement;
        this.group = this.createDirectionalButtons();
    }
    createDirectionalButtons = () => {
        // create directional buttons
        const buttonGroup = dom.createDOMElement({
            type: "div",
            classNames: ["gmi-dbtngroup"],
            parent: false
        });
        const buttons = [
            { direction: "up", content: "▲" },
            { direction: "left", content: "◄" },
            { direction: "right", content: "►" },
            { direction: "down", content: "▼" }
        ]
        buttons.forEach(button => this.createButtonDOMElement(button, buttonGroup));

        return buttonGroup;
    }
    createButtonDOMElement = ({ direction, content }, buttonGroup) => {
        dom.createDOMElement({
            type: "button",
            classNames: ["gmi-dbtn", "gmi-dbtn--" + direction],
            parent: buttonGroup,
            content: content,
            events: { "click": () => this.setMovement(direction) }
        });
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

//export default Movement;
export { Movement, MovementKeyboard, MovementButtons };