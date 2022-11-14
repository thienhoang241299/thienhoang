class todo {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
const KEY = "TODO_ARRAY";
const todoArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = JSON.parse(getFromStorage("CURRENT_USER")) || [];

const btnAdd = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
btnAdd.addEventListener("click", function (e) {
  const data = {
    task: taskInput.value,
    owner: currentUser.userName,
    isDone: false,
  };
  todoArr.push(data);
  saveToStorage("TODO_ARRAY", JSON.stringify(todoArr));
  renderTodo();
});
renderTodo();
function renderTodo() {
  todoList.innerHTML = "";
  let i = 0;
  todoArr.forEach((todo) => {
    const row = document.createElement("li");
    if (todo.isDone) {
      row.innerHTML = `<li onclick="toggleCheck(${i})" class="checked"><p>${todo.task}</p><p class="close" onclick="deleteTask(${i})">×</p></li>`;
    } else {
      row.innerHTML = `<li onclick="toggleCheck(${i})"><p>${todo.task}</p><p class="close" onclick="deleteTask(${i})">×</p></li>`;
    }
    todoList.appendChild(row);
    i++;
  });
}
function deleteTask(a) {
  todoArr.splice(a, 1);
  if (a != todoArr.length) {
    toggleCheck(a);
  }
  saveToStorage("TODO_ARRAY", JSON.stringify(todoArr));
  renderTodo();
}
function toggleCheck(a) {
  todoArr[parseInt(a)].isDone = !todoArr[parseInt(a)].isDone;
  saveToStorage("TODO_ARRAY", JSON.stringify(todoArr));
  renderTodo();
}
