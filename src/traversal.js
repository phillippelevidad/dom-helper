HTMLElement.prototype.next = function () {
    return this.nextElementSibling;
};

Array.prototype.next = HTMLCollection.prototype.next = NodeList.prototype.next = function () {
    var collection = new Array();
    Array.prototype.forEach.call(this, function (item) {
        item.nextElementSibling && collection.push(nextElementSibling);
    });
    return collection;
};

HTMLElement.prototype.prev = function () {
    return this.previousElementSibling;
};

Array.prototype.prev = HTMLCollection.prototype.prev = NodeList.prototype.prev = function () {
    var collection = new Array();
    Array.prototype.forEach.call(this, function (item) {
        item.previousElementSibling && collection.push(previousElementSibling);
    });
    return collection;
};

HTMLElement.prototype.parent = function () {
    return this.parentNode;
};

Array.prototype.parent = HTMLCollection.prototype.parent = NodeList.prototype.parent = function () {
    var collection = new Array();
    Array.prototype.forEach.call(this, function (item) {
        item.parentNode && collection.push(parentNode);
    });
    return collection;
};

HTMLElement.prototype.parents = function (selector) {
    if (this.parentNode === null) return null;
    if (this.parentNode.matches(selector)) return this.parentNode;
    return this.parentNode.parents(selector);
};

Array.prototype.parents = HTMLCollection.prototype.parents = NodeList.prototype.parents = function (selector) {
    var collection = new Array();
    Array.prototype.forEach.call(this, function (item) {
        if (item.parents) {
            var p = item.parents(selector);
            p && collection.push(p);
        }
    });
    return collection;
};
