const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'Buy groceries',
  dueDate: '2021-12-31'
}, {
  name: 'Clean the house',
  dueDate: '2021-12-31'
}]; // Array to store the todo list items

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>
        ${name} 
      </div>
      <div>
        ${dueDate}
      </div>
      <button class="delete-btn js-delete-todo-button" >Delete</button>
      `;
    todoListHTML += html;
  });
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        localStorage.setItem('todoList', JSON.stringify(todoList));
      })
    });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const name = document.querySelector('.js-task');
  const dueDate = document.querySelector('.js-date');
  if (name.value === '' || dueDate.value === '') {
    alert('Please enter a task and a due date');
    return;

  }
  todoList.push({
    name: name.value,
    dueDate: dueDate.value
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  name.value = '';
  dueDate.value = '';
  renderTodoList();
}

function clearList() {
  todoList.length = 0;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  console.log('List cleared');
  renderTodoList();
}