function ArrayOfHTMLElements() {
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.__proto__ = SubArray.prototype;
    return arr;
}

ArrayOfHTMLElements.prototype = new Array;
