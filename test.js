var test = require('tape');
var logic = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

test("deleteTodo should return an array", function(t) {
  let expected = typeof [];
  let dummyDeleteTodo = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    },
    {
      id: 1,
      description: 'make coffee',
      done: false,
    },
  ];
  let returnedValue = logic.deleteTodo(dummyDeleteTodo,0);
  let actual = typeof returnedValue;
  t.equal(expected,actual);
  t.end();
});

test("deleteTodo should return array without element with id",function(t){
  let dummyDeleteTodo = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    },
    {
      id: 1,
      description: 'make coffee',
      done: false,
    },
  ];
  let expected=[
    {
      id: 1,
      description: 'make coffee',
      done: false,
    }
  ];
  let actual=logic.deleteTodo(dummyDeleteTodo,0);
  t.deepEqual(expected,actual);
  t.end();
})

test("delete should return equivalent array if no todo matches the id",function(t){
  let dummyDeleteTodo = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    },
    {
      id: 1,
      description: 'make coffee',
      done: false,
    },
  ];
  let expected=[
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    },
    {
      id: 1,
      description: 'make coffee',
      done: false,
    },
  ];
  let actual=logic.deleteTodo(dummyDeleteTodo,4);
  t.deepEqual(expected,actual);
  t.end();
})