HTMLElement.prototype.off = function (eventName, eventHandler) {
    this.removeEventListener(eventName, eventHandler);
};

ArrayOfHTMLElements.prototype.off = HTMLCollection.prototype.off = NodeList.prototype.off = function (eventName, eventHandler) {
    Array.prototype.forEach.call(this, function (item) {
        item.off && item.off(eventName, eventHandler);
    });
    return this;
};

HTMLElement.prototype.on = function (eventName, eventHandler) {
    this.addEventListener(eventName, eventHandler);
    return this;
};

ArrayOfHTMLElements.prototype.on = HTMLCollection.prototype.on = NodeList.prototype.on = function (eventName, eventHandler) {
    Array.prototype.forEach.call(this, function (item) {
        item.on && item.on(eventName, eventHandler);
    });
    return this;
};

HTMLElement.prototype.trigger = function () {
    var event = null;
    if (arguments.length === 1) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(arguments[0], true, false);
        el.dispatchEvent(event);
        return this;
    }
    else if (arguments.length === 2) {
        if (window.CustomEvent) event = new CustomEvent(arguments[0], { detail: arguments[1] });
        else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(arguments[0], true, true, arguments[1]);
        }
        this.dispatchEvent(event);
    }
};

ArrayOfHTMLElements.prototype.trigger = HTMLCollection.prototype.trigger = NodeList.prototype.trigger = function () {
    var args = arguments;
    Array.prototype.forEach.call(this, function (item) {
        item.on && item.on.apply(item, args);
    });
    return this;
};
