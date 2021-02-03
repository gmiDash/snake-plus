"use strict"

const dom = {
    createDOMElement({
        type = "div",
        parent = document.body,
        id = false,
        classNames = [],
        content = false,
        attributes = {},
        styles = {},
        events = {},
    } = {}) {
        const newEl = document.createElement(type)
        if (id) {
            newEl.id = id;
        }
        if (classNames.length) {
            newEl.className = classNames.join(" ")
        }
        if (content) {
            newEl.innerHTML = content;
        }
        Object.entries(attributes).forEach(
            attribute => newEl.setAttribute(...attribute)
        );
        Object.entries(styles).forEach(
            style => newEl.style[style[0]] = style[1]
        );
        Object.entries(events).forEach(
            event => newEl.addEventListener(...event)
        );
        if (parent) {
            parent.append(newEl);
        }
        return newEl;
    },
}

export default dom;
