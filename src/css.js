HTMLElement.prototype.addClass = function (className) {
    if (this.classList) this.classList.add(className);
    else this.className += " " + className;
    return this;
};

Array.prototype.addClass = HTMLCollection.prototype.addClass = NodeList.prototype.addClass = function (className) {
    Array.prototype.forEach.call(this, function (item) {
        item.addClass && item.addClass(className);
    });
    return this;
};

HTMLElement.prototype.hasClass = function (className) {
    if (this.classList) return this.classList.contains(className);
    else return new RegExp("(^| )" + className + "( |$)", "gi").test(this.className);
};

Array.prototype.hasClass = HTMLCollection.prototype.hasClass = NodeList.prototype.hasClass = function (className) {
    return Array.prototype.every.call(this, function (item) {
        return item.hasClass && item.hasClass(className);
    });
};

HTMLElement.prototype.removeClass = function (className) {
    if (this.classList) this.classList.remove(className);
    else this.className = this.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    return this;
};

Array.prototype.removeClass = HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass = function (className) {
    Array.prototype.forEach.call(this, function (item) {
        item.removeClass && item.removeClass(className);
    });
    return this;
};
