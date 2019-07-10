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

test("deleteTodo given todo with 2 elements should return array without element with id",function(t){
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
test("deleteTodo should return an array with length-1 if id matches a todo",function(t){
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
  let expected=dummyDeleteTodo.length-1;
  let actual=logic.deleteTodo(dummyDeleteTodo,1).length;
  t.deepEqual(expected,actual);
  t.end();
})

test("deleteTodo should not modify the arguments", function(t) {
  let dummyDeleteTodo = [
    {
      id: 0,
      description: "smash avocados",
      done: true
    },
    {
      id: 1,
      description: "make coffee",
      done: false
    }
  ];
  let id = 0;
  const dummyDeleteTodoJSON = JSON.stringify(dummyDeleteTodo);
  const idJSON = JSON.stringify(id);
  logic.deleteTodo(dummyDeleteTodo, id);
  t.equal(dummyDeleteTodoJSON, JSON.stringify(dummyDeleteTodo));
  t.equal(idJSON, idJSON);
  t.end();
});

