const todoList = JSON.parse(localStorage.getItem('todoList')) || []; // Array to store the todo list items

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    // const { dueDate } = todoObject;
    // or const dueDate = todoObject.dueDate;
    const html = `
      
      <div>
        ${name} 
      </div>
      <div>
        ${dueDate}
      </div>
      <button class="delete-btn" onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
        localStorage.setItem('todoList', JSON.stringify(todoList));
      ">Delete</button>
      `;
    todoListHTML += html;
  }
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}
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