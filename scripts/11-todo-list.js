const todoList = JSON.parse(localStorage.getItem('todoList')) || []; // Array to store the todo list items

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  console.log(todoList);
  for (let i = 0; i < todoList.length; i++) {
    const value = todoList[i];
    const html = `<li>${value}</li>`;
    todoListHTML += html;
  }

  console.log(todoListHTML);

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}
function addTodo() {
  const item = document.querySelector('.js-task');
  todoList.push(item.value);
  console.log(todoList);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  item.value = '';
  renderTodoList();
}

function clearList() {
  todoList.length = 0;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  console.log(todoList);
  console.log('List cleared');
  renderTodoList();
}