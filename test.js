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

test('Testing that addTodo return an array which is different from the original', function(t) {
  const actual = logic.addTodo([1, 2, 3], 4);
  const expected = [1, 2, 3, 4];
  t.deepEqual(actual, expected, 'addTodo should return an array which is different from the original');
  t.end();
})
