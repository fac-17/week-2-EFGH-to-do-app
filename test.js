var test = require('tape');
var logic = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

test('Testing that addTodo returns an array ', function(t) {
  const actual = typeof logic.addTodo([1, 2, 3], 4);
  const expected = typeof [];
  t.equal(actual, expected, 'addTodo should return an array');
  t.end();
});

test('Testing that addTodo return an array with one new item', function(t) {
  const actual = logic.addTodo([1, 2, 3], 4);
  const expected = [1, 2, 3, 4];
  t.deepEqual(actual, expected, 'addTodo should return an array with one new item');
  t.end();
})

/*test('Testing that the todos array is cloned', function(t) {
  const actual = logic.addTodo([1, 2, 3], 4).length;
  const expected = 4;
  t.equal(actual, expected, 'Testing that the todos array is cloned');
  t.end();
})*/

test('Testing that addTodo generates an id for newTodo', function(t) {
  const result = logic.addTodo([{
    id: 1,
    description: 'Go to shop',
    done: true
  },
  {
    id: 2,
    description: 'Call mum',
    done: false
  }
],

{
  description: 'Call dad',
  done: false

});

const actual = result[result.length - 1].id;
const expected = 3;
t.deepEqual(actual, expected, "newTodo should have an id")
t.end();
});
