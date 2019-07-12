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

test("markTodo - check existing id is toggled from false to true", function(t) {
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
test("markTodo - check if done is toggled from true to false",function(t){
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

test("markTodo - Check if todo array is not modified", function(t) {
  let todos = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    }];
    let actual = logic.markTodo(todos, 0);
    t.notEqual(actual, todos);
    t.end();
})

test("markTodo - Check if todo array elements are not modified", function(t){
  let todos=[
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    }];
  let todosBeforeStringified=JSON.stringify(todos);
  logic.markTodo(todos,0);
  let todosAfterRunningStringified=JSON.stringify(todos);
  t.equal(todosBeforeStringified,todosAfterRunningStringified);
  t.end();
})

//SORT TESTS
test('Testing sort function', function(t){
  const actual = logic.sortTodos([{
    id: 2,
    description: 'second todo',
    done: true
  },
  {
    id: 1,
    description: 'first todo',
    done: false
  }
],
(a, b) => (a.id > b.id) ? 1 : (a.id === b.id) ? ((a.done > b.done) ? 1 : -1) : -1 );
const expected =[{
  id: 1,
  description: 'first todo',
  done: false
},
{
  id: 2,
  description: 'second todo',
  done: true
}];
t.deepEqual(actual, expected, 'Should return sorted arr by obj id');
t.end();
});

test ("Testing sorting by A-Z of description, if equal, then by true/false value", function(t) {
  const actual = logic.sortTodos([{
    id: 1,
    description: 'ccccsadd',
    done: true
  },
{
  id: 2,
  description: 'bdbddf',
  done: true
},
{
  id: 3,
  description: 'zzzzff',
  done: false
}], (a, b) => (a.description > b.description) ? 1 : (a.description === b.description) ? ((a.done > b.done) ? 1 : -1) : -1 );
const expected = [{
id: 2,
description: 'bdbddf',
done: true
},
{
  id: 1,
  description: 'ccccsadd',
  done: true
},
{
id: 3,
description: 'zzzzff',
done: false
}]
t.deepEqual(actual, expected, "Testing sorting by A-Z of description, if equal, then by true/false value");
t.end();
});

test('Edit function returns an array', function(t) {
  const actual = typeof logic.editTodo([{
    id: 0,
    description: 'smash avocados',
    done: true,
  }], 0, 'new todo');
  const expected = typeof [];
  t.deepEqual(actual, expected, 'Edit function returns and array');
  t.end();
});

test ('Test edit function returns an updated description', function(t) {
  const actual = logic.editTodo([{
    id: 1,
    description: 'original text',
    done: true
  }, {
    id: 2,
    description: 'original text 2',
    done: false
  }], 1, 'updated text');

  const expected = [{
    id: 1,
    description: 'updated text',
    done: true
  }, {
    id: 2,
    description: 'original text 2',
    done: false
  }];
  t.deepEqual(actual, expected, 'editTodos should return an updated description');
  t.end();
});
