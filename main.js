const elForm = document.querySelector(".todo-form");
const elInput = elForm.querySelector(".todo-input");
const elTodoList = document.querySelector(".todo-list");

const elTemplate = document.querySelector("#todo-item--template").content;

// async array

// const todosArr = fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then(data);

async function fetchTodos() {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await reponse.json();
  renderTemplate(data, elTodoList);
}
fetchTodos();
let newArrey = [];
// render
function renderTemplate(todoArr, element) {
  newArrey = todoArr;
  todoArr.forEach((row) => {
    const todoTemplate = elTemplate.cloneNode(true);
    const elTodoSpan = todoTemplate.querySelector(".todo-item-complete-text");
    const eltodoChecked = todoTemplate.querySelector(".todo-input-complete");
    const eltodoDeleteBtn = todoTemplate.querySelector(".todo-item-delete-btn");

    elTodoSpan.textContent = row.title;
    eltodoChecked.dataset.todoId = row.id;
    eltodoDeleteBtn.dataset.todoId = row.id;
    eltodoChecked.checked = row.completed;

    element.appendChild(todoTemplate);

    eltodoChecked.addEventListener("click", (evt) => {
      const todoId = evt.target.dataset.todoId;
      const checkedTodo = todoArr.find((row) => row.id == todoId);
      checkedTodo.checked = !checkedTodo.checked;
    });
    if (eltodoChecked.checked === true) {
      elTodoSpan.classList.add("done");
    }
  });
}
