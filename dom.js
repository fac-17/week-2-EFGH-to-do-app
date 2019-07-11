// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    { id: -3, description: 'first todo' },
    { id: -2, description: 'second todo' },
    { id: -1, description: 'third todo' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');


    let span = document.createElement('span');
    span.textContent = todo.description;
    todoNode.appendChild(span);


    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement('button');
    markButtonNode.classList.add('mark-button');
    markButtonNode.addEventListener('click',function(event) {
      var newState = todoFunctions.markTodo(state,todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);
    return todoNode;
  };
    // add classes for css



  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?

      event.preventDefault();
 
      var description = event.target.elements[0].value; // event.target ....

      var newState = todoFunctions.addTodo(state,
        {
          description: description
        }
      )
      update(newState);
    });
  }
  var sort = document.getElementById('sort');
  sort.setAttribute('class', 'sort-button');
  sort.addEventListener('click', function(event) {
    var newState = todoFunctions.sortTodos(state, (a, b) => (a.description > b.description) ? 1 : (a.description === b.description) ? ((a.done > b.done) ? 1 : -1) : -1 );
    update(newState);
  });

      // hint: todoFunctions.addTodo
  

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
