# dom-helper

Pure-javascript functions that make it easier to select, manipulate and traverse the dom.

Considering these variables...

``` javascript
var element = document.getElementById("#someId");
var collection = document.querySelectorAll(".some-class");
```

You can do things like:

``` javascript
element.find(".with-some-class")
  .addClass("another-class")
  .on("click", function (e) {});
  
element.parents(".some-parent")
  .trigger("click");
  
collection.each(function () {
  console.log(this.attr("href");
});

```

## Quick reference

``` javascript
addClass("my-class");
removeClass("my-class");
hasClass("my-class");

on("click", myEventHandler);
off("click", myEventHandler);
trigger("click");
trigger("custom-event", { some: data });

after("<p>some content</p>");
before("<p>some content</p>");
append(anotherElement);
prepend(anotherElement);
clone();
fadeIn();
hide();
html();
html("<p>some content</p>");
text();
text("some content");
attr("href");
attr("href", "https://www.example.com");
prop("disabled");
prop("disabled", true);
show();

contains(element || "selector");
find("selector");
is(sameElement || "selector");

next();
prev();
parent();
parents("selector");

each(function (element, index) {});
filter(function (element, index) { return true|false; })
```

## CSS

``` javascript
// Add a class
element.addClass("my-class");
collection.addClass("my-class");

// Remove a class
element.removeClass("my-class");
collection.removeClass("my-class");

// Check whether an element has the specified class
var hasClass = element.hasClass("my-class");
var hasClass = collection.hasClass("my-class"); // all elements must satisfy the condition
```

## Events

``` javascript
// Attach an event handler
element.on("click", myEventHandler);
collection.on("click", myEventHandler);

// Remove an event handler
element.off("click", myEventHandler);
collection.off("click", myEventHandler);

// Trigger a native event
element.trigger("click");
collection.trigger("click");

// Trigger a custom event
element.trigger("my-event", { some: data });
collection.trigger("my-event", { some: data });
```

## Manipulation

``` javascript
// Insert HTML after the element or after each element in the collection
element.after("<p>some content</p>");
collection.after("<p>some content</p>");

// Insert HTML before the element or before each element in the collection
element.before("<p>some content</p>");
collection.before("<p>some content</p>");

// Append an element
element.append(anotherElement);
collection.append(anotherElement);

// Prepend an element
element.prepend(anotherElement);
collection.prepend(anotherElement);

// Clone
element.clone();
collection.clone(); // returns an Array with the clone of the first element, or an empty Array

// Fade-in
element.fadeIn();
collection.fadeIn();

// Hide
element.hide();
collection.hide();

// Read the HTML content
element.html();
collection.html(); // the HTML of the first element

// Set the HTML content
element.html("<p>some content</p>");
collection.html("<p>some content</p>");

// Read the Text content
element.text();
collection.text(); // reads the first element

// Set the Text content
element.text("some content");
collection.text("some content");

// Read an attribute
element.attr("href");
collection.attr("href"); // reads the first element

// Set an attribute
element.attr("href", "https://www.example.com");
collection.attr("href", "https://www.example.com"); // sets all elements

// Read an property
element.prop("href");
collection.prop("href"); // reads the first element

// Set a property
element.prop("disabled", true);
collection.prop("disabled", true); // sets all elements

// Show
element.show();
collection.show();
```

``` javascript

// Contains
element.contains(anotherElement || "selector");
collection.contains(anotherElement || "selector"); // all elements must satisfy the condition

// Find in the tree on child elements
element.find(".some-child");
collection.find(".some-child"); checks the children of all elements in the collection and returns a single resulting Array

// Is
element.is(sameElement || "selector");
collection.is(sameElement || "selector"); // all elements must satisfy the condition
```

## Traversal

``` javascript

// Get the next element
element.next();
collection.next(); // builds an Array with the next() of each element in the collecition

// Get the previous element
element.prev();
collection.prev(); // builds an Array with the prev() of each element in the collecition

// Get the parent element
element.parent();
collection.parent(); // builds an Array with the parent() of each element in the collecition

// Recursively test each parent until a match is found and returned
element.parents("selector");
collection.parents("selector"); // builds an Array with the parents() of each element in the collecition
```

## Utilities

``` javascript

// Execute a function for each element.
collection.each(function (element, index) {});

// Filter a colleciton of elements
collection.filter(function (element, index) { return true | false; });
```

----------

**Motivation**: dom-helper can be seen as a subset of jQuery, so why use it? First, because it is very tiny (about 8kb minified), and second because not always you can use jQuery (e.g. project restrictions). But, depending on the job, you'll find yourself writing a lot of code to accomplish basic things in javascript, so this library helps with that.
