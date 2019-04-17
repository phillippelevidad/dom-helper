ArrayOfHTMLElements.prototype.each = HTMLCollection.prototype.each = NodeList.prototype.each = function (fnEach) {
    Array.prototype.forEach.call(this, fnEach);
    return this;
};

ArrayOfHTMLElements.prototype.filter = HTMLCollection.prototype.filter = NodeList.prototype.filter = function (fnFilter) {
    return Array.prototype.filter.call(this, fnFilter);
};

ArrayOfHTMLElements.prototype.map = HTMLCollection.prototype.map = NodeList.prototype.map = function (fnMap) {
    var mapped = Array.prototype.map.call(this, fnMap);
    var results = new ArrayOfHTMLElements(mapped.length);
    for (var i = 0; i < mapped.length; i++)
        results[i] = mapped[i];
    return this;
};
