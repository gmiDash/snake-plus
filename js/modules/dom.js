"use strict"

const dom = {
    createDOMElement({
        type = "div",
        parent = document.body,
        id = false,
        classNames = [],
        content = false,
        attr = {},
        styles = {},
        events = {},
    } = {}) {
        const newEl = document.createElement(type)
        if (id) newEl.id = id;
        if (classNames.length) newEl.className = classNames.join(" ")
        if (content) newEl.innerHTML = content;
        Object.entries(attr).forEach(a => newEl.setAttribute(...a));
        Object.entries(styles).forEach(st => newEl.style[st[0]] = st[1]);
        Object.entries(events).forEach(event => newEl.addEventListener(...event));
        if (parent) parent.append(newEl);
        return newEl;
    },
}

export default dom;
