// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  const container = document.getElementById('todo-container');
  const addTodoForm = document.getElementById('add-todo');

  let state = [
    { id: -3, description: 'first todo' },
    { id: -2, description: 'second todo' },
    { id: -1, description: 'third todo' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function(todo) {
    const todoNode = document.createElement('li');
    todoNode.setAttribute('class', 'todo');

    let span = document.createElement('span');
    span.setAttribute('class', 'description');
    span.textContent = todo.description;
    todoNode.appendChild(span);
    span.setAttribute("tabindex", 0);
    span.addEventListener("click",function(event) {
      let newState = todoFunctions.markTodo(state,todo.id);
      update(newState);
    });

    //Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.setAttribute('class', 'edit-button');
    todoNode.appendChild(editButton);
    editButton.addEventListener('click', function(event) {
    let userInput = prompt("Update your todo: ", todo.description);
    //set a default value as todo.description
    let newState = todoFunctions.editTodo(state, todo.id, userInput || todo.description);
    update(newState);
    });

    if(todo.done) {
      span.classList.add('done');
    }


    // this adds the delete button
    let deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent='Delete';
    deleteButtonNode.setAttribute('class', 'delete-button');
    deleteButtonNode.addEventListener('click', function(event) {
      if (confirm('Are you sure you want to delete this todo?')) {
        let newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      }
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    let markButtonNode = document.createElement('button');
    markButtonNode.classList.add('mark-button');
    if(todo.done) {
      markButtonNode.textContent = 'Undo';
    } else {
      markButtonNode.textContent ='Done';
    };


    markButtonNode.addEventListener('click',function(event) {





      let newState = todoFunctions.markTodo(state,todo.id);

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
      if(description != '') {
        var newState = todoFunctions.addTodo(state,
        {
          description: description
        }
      )
      event.target.reset();
      update(newState);
      }
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
