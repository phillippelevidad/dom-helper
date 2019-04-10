﻿HTMLElement.prototype.after = function (htmlString) {
    this.insertAdjacentHTML("afterend", htmlString);
    return this;
};

Array.prototype.after = HTMLCollection.prototype.after = NodeList.prototype.after = function (htmlString) {
    Array.prototype.forEach.call(this, function (item) {
        item.after && item.after(htmlString);
    });
};

HTMLElement.prototype.append = function (element) {
    this.appendChild(element);
    return this;
};

Array.prototype.append = HTMLCollection.prototype.append = NodeList.prototype.append = function (element) {
    Array.prototype.forEach.call(this, function (item) {
        item.append && item.append(element);
    });
};

HTMLElement.prototype.attr = function () {
    if (arguments.length === 1 && typeof arguments[0] === "string") return this.getAttribute(arguments[0]);
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        this.setAttribute(arguments[0], arguments[1]);
        return this;
    }
};

Array.prototype.attr = HTMLCollection.prototype.attr = NodeList.prototype.attr = function () {
    if (arguments.length === 1 && typeof arguments[0] === "string") {
        if (this.length === 0) return null;
        return this[0].attr ? this[0].attr(arguments[0]) : null;
    }
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        var args = arguments;
        Array.prototype.forEach.call(this, function (item) {
            item.attr && item.attr(args[0], args[1]);
        });
        return this;
    }
};

HTMLElement.prototype.before = function (htmlString) {
    this.insertAdjacentHTML("beforebegin", htmlString);
    return this;
};

Array.prototype.before = HTMLCollection.prototype.before = NodeList.prototype.before = function (htmlString) {
    Array.prototype.forEach.call(this, function (item) {
        item.before && item.before(htmlString);
    });
};

HTMLElement.prototype.clone = function () {
    return this.cloneNode(true);
};

Array.prototype.clone = HTMLCollection.prototype.clone = NodeList.prototype.clone = function (htmlString) {
    if (this.length === 0 || !this[0].clone) return new Array();
    return [this[0].clone()];
};

HTMLElement.prototype.fadeIn = function (callback) {
    var el = this;
    el.style.opacity = 0;
    var last = +new Date();
    var tick = function () {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1)
            window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        else if (typeof callback === "function")
            callback.call(el);
    };
    tick();
    return this;
};

Array.prototype.fadeIn = HTMLCollection.prototype.fadeIn = NodeList.prototype.fadeIn = function (callback) {
    Array.prototype.forEach.call(this, function (item) {
        item.fadeIn && item.fadeIn(callback);
    });
};

HTMLElement.prototype.html = function () {
    if (arguments.length === 0) return this.innerHTML;
    if (arguments.length === 1) {
        this.innerHTML = arguments[1] || "";
        return this;
    }
};

Array.prototype.html = HTMLCollection.prototype.html = NodeList.prototype.html = function () {
    if (arguments.length === 0) {
        if (this.length === 0 || !this[0].html) return null;
        return this[0].html();
    }
    if (arguments.length === 1) {
        var args = arguments;
        Array.prototype.forEach.call(this, function (item) {
            item.html && item.html(args[0]);
        });
        return this;
    }
};

HTMLElement.prototype.prepend = function (element) {
    if (this.firstChild !== null) this.insertBefore(element, this.firstChild);
    else this.appendChild(element);
    return this;
};

Array.prototype.prepend = HTMLCollection.prototype.prepend = NodeList.prototype.prepend = function (element) {
    Array.prototype.forEach.call(this, function (item) {
        item.prepend && item.prepend(element);
    });
};

HTMLElement.prototype.remove = function () {
    this.parentNode.removeChild(this);
    return this;
};

Array.prototype.remove = HTMLCollection.prototype.remove = NodeList.prototype.remove = function () {
    Array.prototype.forEach.call(this, function (item) {
        item.remove && item.remove();
    });
    return this;
};

HTMLElement.prototype.text = function () {
    if (arguments.length === 0) return this.textContent;
    if (arguments.length === 1) {
        this.textContent = arguments[1] || "";
        return this;
    }
};

Array.prototype.text = HTMLCollection.prototype.text = NodeList.prototype.text = function () {
    if (arguments.length === 0) {
        if (this.length === 0 || !this[0].text) return null;
        return this[0].text();
    }
    if (arguments.length === 1) {
        var args = arguments;
        Array.prototype.forEach.call(this, function (item) {
            item.text && item.text(args[0]);
        });
        return this;
    }
};