HTMLElement.prototype.containsOriginal = HTMLElement.prototype.contains;
HTMLElement.prototype.contains = function (childOrSelector) {
    if (typeof childOrSelector === "string") return this.querySelector(childOrSelector) !== null;
    return this !== childOrSelector && this.containsOriginal(childOrSelector);
};

Array.prototype.contains = HTMLCollection.prototype.contains = NodeList.prototype.contains = function (childOrSelector) {
    return Array.prototype.every.call(this, function (item) {
        return item && item.contains && item.contains(childOrSelector);
    });
};

HTMLElement.prototype.find = function (selector) {
    return this.querySelectorAll(selector);
};

Array.prototype.find = HTMLCollection.prototype.find = NodeList.prototype.find = function (selector) {
    var found = new Array();
    Array.prototype.forEach.call(this, function (item) {
        item.find && found.push(item.find(selector));
    });
    return found;
};

HTMLElement.prototype.is = function (elementOrSelector) {
    if (typeof elementOrSelector === "string")
        return (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector)
            .call(el, elementOrSelector);
    return this === elementOrSelector;
};

Array.prototype.is = HTMLCollection.prototype.is = NodeList.prototype.is = function (elementOrSelector) {
    return Array.prototype.every.call(this, function (item) {
        return item && item.is && item.is(elementOrSelector);
    });
};
