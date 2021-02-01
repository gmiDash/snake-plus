"use strict";

const createCanvasWithContext = (canvasSize = { x, y }, parent = document.body, contextId = "2d", className = "gmi-canvas") => {
    const { x, y } = canvasSize;
    const canvas = document.createElement("canvas")
    canvas.width = x;
    canvas.height = y;
    canvas.className = className;
    parent.appendChild(canvas);
    const context = canvas.getContext(contextId);
    return [canvas, context];
    /* return canvas.getContext(contextId); */
}

export { createCanvasWithContext };