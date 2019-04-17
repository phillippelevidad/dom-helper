function ArrayOfHTMLElements() {
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.__proto__ = ArrayOfHTMLElements.prototype;
    return arr;
}

ArrayOfHTMLElements.prototype = new Array;

HTMLElement.prototype.addClass = function (className) {
    if (this.classList) this.classList.add(className);
    else this.className += " " + className;
    return this;
};

ArrayOfHTMLElements.prototype.addClass = HTMLCollection.prototype.addClass = NodeList.prototype.addClass = function (className) {
    Array.prototype.forEach.call(this, function (item) {
        item.addClass && item.addClass(className);
    });
    return this;
};

HTMLElement.prototype.hasClass = function (className) {
    if (this.classList) return this.classList.contains(className);
    else return new RegExp("(^| )" + className + "( |$)", "gi").test(this.className);
};

ArrayOfHTMLElements.prototype.hasClass = HTMLCollection.prototype.hasClass = NodeList.prototype.hasClass = function (className) {
    return Array.prototype.every.call(this, function (item) {
        return item.hasClass && item.hasClass(className);
    });
};

HTMLElement.prototype.removeClass = function (className) {
    if (this.classList) this.classList.remove(className);
    else this.className = this.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    return this;
};

ArrayOfHTMLElements.prototype.removeClass = HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass = function (className) {
    Array.prototype.forEach.call(this, function (item) {
        item.removeClass && item.removeClass(className);
    });
    return this;
};

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

HTMLElement.prototype.after = function (htmlString) {
    this.insertAdjacentHTML("afterend", htmlString);
    return this;
};

ArrayOfHTMLElements.prototype.after = HTMLCollection.prototype.after = NodeList.prototype.after = function (htmlString) {
    Array.prototype.forEach.call(this, function (item) {
        item.after && item.after(htmlString);
    });
    return this;
};

HTMLElement.prototype.append = function (element) {
    this.appendChild(element);
    return this;
};

ArrayOfHTMLElements.prototype.append = HTMLCollection.prototype.append = NodeList.prototype.append = function (element) {
    Array.prototype.forEach.call(this, function (item) {
        item.append && item.append(element);
    });
    return this;
};

HTMLElement.prototype.attr = function () {
    if (arguments.length === 1 && typeof arguments[0] === "string") return this.getAttribute(arguments[0]);
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        this.setAttribute(arguments[0], arguments[1]);
        return this;
    }
};

ArrayOfHTMLElements.prototype.attr = HTMLCollection.prototype.attr = NodeList.prototype.attr = function () {
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

ArrayOfHTMLElements.prototype.before = HTMLCollection.prototype.before = NodeList.prototype.before = function (htmlString) {
    Array.prototype.forEach.call(this, function (item) {
        item.before && item.before(htmlString);
    });
    return this;
};

HTMLElement.prototype.clone = function () {
    return this.cloneNode(true);
};

ArrayOfHTMLElements.prototype.clone = HTMLCollection.prototype.clone = NodeList.prototype.clone = function (htmlString) {
    if (this.length === 0 || !this[0].clone) return new ArrayOfHTMLElements();
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

ArrayOfHTMLElements.prototype.fadeIn = HTMLCollection.prototype.fadeIn = NodeList.prototype.fadeIn = function (callback) {
    Array.prototype.forEach.call(this, function (item) {
        item.fadeIn && item.fadeIn(callback);
    });
    return this;
};

HTMLElement.prototype.html = function () {
    if (arguments.length === 0) return this.innerHTML;
    if (arguments.length === 1) {
        this.innerHTML = arguments[1] || "";
        return this;
    }
};

ArrayOfHTMLElements.prototype.html = HTMLCollection.prototype.html = NodeList.prototype.html = function () {
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

HTMLElement.prototype.hide = function () {
    this.style.display = "none";
    return this;
};

ArrayOfHTMLElements.prototype.hide = HTMLCollection.prototype.hide = NodeList.prototype.hide = function () {
    Array.prototype.forEach.call(this, function (item) {
        item.hide();
    });
    return this;
};

HTMLElement.prototype.prepend = function (element) {
    if (this.firstChild !== null) this.insertBefore(element, this.firstChild);
    else this.appendChild(element);
    return this;
};

ArrayOfHTMLElements.prototype.prepend = HTMLCollection.prototype.prepend = NodeList.prototype.prepend = function (element) {
    Array.prototype.forEach.call(this, function (item) {
        item.prepend && item.prepend(element);
    });
    return this;
};

HTMLElement.prototype.prop = function () {
    if (arguments.length === 1 && typeof arguments[0] === "string") return this[arguments[0]];
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        this[arguments[0]] = arguments[1];
        return this;
    }
};

ArrayOfHTMLElements.prototype.prop = HTMLCollection.prototype.prop = NodeList.prototype.prop = function () {
    if (arguments.length === 1 && typeof arguments[0] === "string") {
        if (this.length === 0) return null;
        return this[0].prop ? this[0].prop(arguments[0]) : null;
    }
    if (arguments.length === 2 && typeof arguments[0] === "string") {
        var args = arguments;
        Array.prototype.forEach.call(this, function (item) {
            item.prop && item.prop(args[0], args[1]);
        });
        return this;
    }
};

HTMLElement.prototype.remove = function () {
    this.parentNode.removeChild(this);
    return this;
};

ArrayOfHTMLElements.prototype.remove = HTMLCollection.prototype.remove = NodeList.prototype.remove = function () {
    Array.prototype.forEach.call(this, function (item) {
        item.remove && item.remove();
    });
    return this;
};

HTMLElement.prototype.show = function () {
    this.style.display = "";
    return this;
};

ArrayOfHTMLElements.prototype.show = HTMLCollection.prototype.show = NodeList.prototype.show = function () {
    Array.prototype.forEach.call(this, function (item) {
        item.show();
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

ArrayOfHTMLElements.prototype.text = HTMLCollection.prototype.text = NodeList.prototype.text = function () {
    if (arguments.length === 0)
        return this.length === 0 ? null : this[0].textContent;

    if (arguments.length === 1) {
        var args = arguments;
        Array.prototype.forEach.call(this, function (item) {
            item.text(args[0]);
        });
        return this;
    }
};

HTMLElement.prototype.containsOriginal = HTMLElement.prototype.contains;
HTMLElement.prototype.contains = function (childOrSelector) {
    if (typeof childOrSelector === "string") return this.querySelector(childOrSelector) !== null;
    return this !== childOrSelector && this.containsOriginal(childOrSelector);
};

HTMLDocument.prototype.contains = function (childOrSelector) {
    return document.body.contains(childOrSelector);
};

ArrayOfHTMLElements.prototype.contains = HTMLCollection.prototype.contains = NodeList.prototype.contains = function (childOrSelector) {
    return Array.prototype.every.call(this, function (item) {
        return item.contains(childOrSelector);
    });
};

HTMLElement.prototype.find = function (selector) {
    return this.querySelectorAll(selector);
};

HTMLDocument.prototype.find = function (selector) {
    return document.body.find(selector);
};

ArrayOfHTMLElements.prototype.find = HTMLCollection.prototype.find = NodeList.prototype.find = function (selector) {
    var found = new ArrayOfHTMLElements();
    Array.prototype.forEach.call(this, function (item) {
        var partial = item.find(selector);
        for (var i = 0; i < partial.length; i++)
            found.push(partial[i]);
    });
    return found;
};

HTMLElement.prototype.is = function (elementOrSelector) {
    if (typeof elementOrSelector === "string")
        return (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector)
            .call(this, elementOrSelector);
    return this === elementOrSelector;
};

ArrayOfHTMLElements.prototype.is = HTMLCollection.prototype.is = NodeList.prototype.is = function (elementOrSelector) {
    return Array.prototype.every.call(this, function (item) {
        return item.is(elementOrSelector);
    });
};

HTMLElement.prototype.next = function () {
    return this.nextElementSibling;
};

ArrayOfHTMLElements.prototype.next = HTMLCollection.prototype.next = NodeList.prototype.next = function () {
    var collection = new ArrayOfHTMLElements();
    Array.prototype.forEach.call(this, function (item) {
        item.nextElementSibling && collection.push(nextElementSibling);
    });
    return collection;
};

HTMLElement.prototype.prev = function () {
    return this.previousElementSibling;
};

ArrayOfHTMLElements.prototype.prev = HTMLCollection.prototype.prev = NodeList.prototype.prev = function () {
    var collection = new ArrayOfHTMLElements();
    Array.prototype.forEach.call(this, function (item) {
        item.previousElementSibling && collection.push(previousElementSibling);
    });
    return collection;
};

HTMLElement.prototype.parent = function () {
    return this.parentNode;
};

ArrayOfHTMLElements.prototype.parent = HTMLCollection.prototype.parent = NodeList.prototype.parent = function () {
    var collection = new ArrayOfHTMLElements();
    Array.prototype.forEach.call(this, function (item) {
        item.parentNode && collection.push(parentNode);
    });
    return collection;
};

HTMLElement.prototype.parents = function (selector) {
    if (this.parentNode === null) return null;
    if ((this.parentNode.matches || this.parentNode.matchesSelector ||
        this.parentNode.msMatchesSelector || this.parentNode.mozMatchesSelector ||
        this.parentNode.webkitMatchesSelector || this.parentNode.oMatchesSelector).call(this.parentNode, selector)) return this.parentNode;
    return this.parentNode.parents(selector);
};

ArrayOfHTMLElements.prototype.parents = HTMLCollection.prototype.parents = NodeList.prototype.parents = function (selector) {
    var collection = new ArrayOfHTMLElements();
    Array.prototype.forEach.call(this, function (item) {
        if (item.parents) {
            var p = item.parents(selector);
            p && collection.push(p);
        }
    });
    return collection;
};

ArrayOfHTMLElements.prototype.each = HTMLCollection.prototype.each = NodeList.prototype.each = function (fnEach) {
    Array.prototype.forEach.call(this, fnEach);
    return this;
};

ArrayOfHTMLElements.prototype.filter = HTMLCollection.prototype.filter = NodeList.prototype.filter = function (fnFilter) {
    return Array.prototype.filter.call(this, fnFilter);
};

ArrayOfHTMLElements.prototype.map = HTMLCollection.prototype.map = NodeList.prototype.map = function (fnMap) {
    var mapped = new ArrayOfHTMLElements();
    for (var i = 0; i < this.length; i++)
        mapped.push(fnMap.call(this[i], this[i], i));
    return mapped;
};