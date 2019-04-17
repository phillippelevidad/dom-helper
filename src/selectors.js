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
