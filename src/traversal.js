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
        item.parentNode && collection.push(item.parentNode);
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
