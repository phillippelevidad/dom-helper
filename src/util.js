HTMLCollection.prototype.each = NodeList.prototype.each = function (callback) {
    Array.prototype.forEach.call(this, callback);
    return this;
};

HTMLCollection.prototype.filter = NodeList.prototype.filter = function (fnFilter) {
    return Array.prototype.filter.call(this, fnFilter);
};

document.parseHTML = function (htmlString) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = htmlString;
    return tmp.body.children;
};
