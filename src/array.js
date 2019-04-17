function ArrayOfHTMLElements() {
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.__proto__ = ArrayOfHTMLElements.prototype;
    return arr;
}

ArrayOfHTMLElements.prototype = new Array;
