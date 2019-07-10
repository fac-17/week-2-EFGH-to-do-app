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

test("markTodo should return an array",function(t){
  let todos = [
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
  t.equal(typeof logic.markTodo(todos,1),typeof [],"markTodo should return an array");
  t.end();
})

test("check existing id is toggled from false to true", function(t) {
  let todos = [
    {
      id: 0,
      description: 'smash avocados',
      done: false,
    }];
  let actual = logic.markTodo(todos,0);
  let expected = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    }];
  t.deepEqual(actual, expected);
  t.end();
})
test("check if done is toggled from true to false",function(t){
  let todos = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    }];
  let actual = logic.markTodo(todos,0);
  let expected = [
    {
      id: 0,
      description: 'smash avocados',
      done: false,
    }];
  t.deepEqual(actual, expected);
  t.end();
})