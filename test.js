var test = require('tape');
var logic = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

test('Testing that addTodo returns an array ', function(t) {
  const actual = typeof logic.addTodo();
  const expected = typeof [];
  t.equal(actual, expected, 'addTodo should return an array');
  t.end();
});
