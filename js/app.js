
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var obj = {
    a: 'Apple',
    b: 'Banana',
    c: 'Cherry',
    d: 'Durian',
    e: 'Elder Berry'
}
var inputText = "empty";
var onInputChange = function(e) {
    inputText = e.target.value;
    onChange(inputText);
};
var tdClick = function(e) {
    inputText = e.target.innerText;
    onChange(inputText);
};
// 1: Create a function that declares what the DOM should look like
function render()  {
    return h('div', [
        h('span', 'some text'),
        h('input', {
          type: 'text',
          onchange: onInputChange
        }),
        h('div', inputText),
        h('table',
           h('tr', h('th', 'letter'), h('th', 'fruit')),
           Object.keys(obj).map(function (k) {
               return h('tr',
                   h('th', k),
                   h('td', {onclick: tdClick},obj[k])
               )
           })
        )
    ]);
}

var tree = render(); // We need an initial tree 
var rootNode = createElement(tree); // Create an initial root DOM node ... 
document.body.appendChild(rootNode);
var onChange = function() {
    var newTree = render();
    var patches = diff(tree, newTree);
    rootNode = patch(rootNode, patches);
    tree = newTree;
};

