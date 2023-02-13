class Storage {
  static getIncompleteTasks() {
    let inCompleteTasks;
    if (localStorage.getItem("inCompleteTasks") === null) {
      inCompleteTasks = [];
    } else {
      inCompleteTasks = JSON.parse(localStorage.getItem("inCompleteTasks"));
    }

    return inCompleteTasks;
  }
  static getCompleteTasks() {
    let completeTasks;
    if (localStorage.getItem("completeTasks") === null) {
      completeTasks = [];
    } else {
      completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
    }

    return completeTasks;
  }
  static addIncompleteTasks(task) {
    const inCompleteTasks = Storage.getIncompleteTasks();
    inCompleteTasks.push(task);
    localStorage.setItem("inCompleteTasks", JSON.stringify(inCompleteTasks));
  }
  static addCompleteTasks(task) {
    const completeTasks = Storage.getCompleteTasks();
    completeTasks.push(task);
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
  }
  static removeIncompleteTasks(task) {
    const inCompleteTasks = Storage.getIncompleteTasks();
    inCompleteTasks.forEach((inCompleteTask, idx) => {
      if (inCompleteTask === task) {
        inCompleteTasks.splice(idx, 1);
      }
    });
    localStorage.setItem("inCompleteTasks", JSON.stringify(inCompleteTasks));
  }
  static removeCompleteTasks(task) {
    const completeTasks = Storage.getCompleteTasks();
    completeTasks.forEach((completeTask, idx) => {
      if (completeTask === task) {
        completeTasks.splice(idx, 1);
      }
    });
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
  }
}

//
// Function to call when Displaying
//

const tasksdisplay = document.querySelector(".tasks-display");

function displayInCompleteTasksFunc(task) {
  const row = document.createElement("div");
  row.classList.add("task-rows");
  row.innerHTML = `<span class="tasks-in-span">${task}</span><span><i class="checkButton fa-solid fa-check"></i></span><span><i class="deleteButton fa-solid fa-trash"></i></span>`;
  tasksdisplay.appendChild(row);
}
function displayCompleteTasksFunc(task) {
  const row = document.createElement("div");
  row.classList.add("task-rows");
  row.innerHTML = `<span class="completed-tasks">${task}</span><span></span><span><i class="deleteButton fa-solid fa-trash"></i></span>`;
  tasksdisplay.appendChild(row);
}

//
//Displaying Existing Tasks
//
function callingPendingTask() {
  let inCompleteTasks = [...Storage.getIncompleteTasks()];
  for (let task of inCompleteTasks) {
    displayInCompleteTasksFunc(task);
  }
}
function callingComlpletedTask() {
  let completeTasks = [...Storage.getCompleteTasks()];
  for (let task of completeTasks) {
    displayCompleteTasksFunc(task);
  }
}

function callingAllTasks() {
  allTasksClick.style.backgroundColor = "#6096B4";
  tasksdisplay.innerHTML = "";
  callingPendingTask();
  callingComlpletedTask();
}

document.addEventListener("DOMContentLoaded", callingAllTasks);

//
// Adding Tasks from Input
//
let submit = document.querySelector(".submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputTask = document.querySelector(".inputTask");
  let task = inputTask.value;
  if (task) {
    Storage.addIncompleteTasks(task);
    displayInCompleteTasksFunc(task);
    inputTask.value = "";
    tasksdisplay.innerHTML = "";
    callingAllTasks();
    backGroundReset();
    allTasksClick.style.backgroundColor = "#6096B4";
  } else {
    alert("enter task, please");
  }
});

//
//DOM events for check and delete Icons
//

tasksdisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkButton")) {
    // console.log(e.target.parentElement.previousElementSibling);
    e.target.parentElement.previousElementSibling.classList.add("completed-tasks");
    Storage.removeIncompleteTasks(e.target.parentElement.parentElement.textContent);
    Storage.addCompleteTasks(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.innerHTML = "";
  }
  if (e.target.classList.contains("deleteButton")) {
    e.target.parentElement.parentElement.remove();
    Storage.removeIncompleteTasks(e.target.parentElement.parentElement.textContent);
    Storage.removeCompleteTasks(e.target.parentElement.parentElement.textContent);
  }
});

//
// DOM events for Filtering List
//

const allTasksClick = document.querySelector(".all-tasks-click");
const pendingClick = document.querySelector(".pending-click");
const completedClick = document.querySelector(".completed-click");
const allPs = document.querySelectorAll("p");

function backGroundReset() {
  allPs.forEach((Ps) => {
    Ps.style.backgroundColor = "teal";
  });
}

pendingClick.addEventListener("click", () => {
  backGroundReset();
  pendingClick.style.backgroundColor = "#6096B4";
  tasksdisplay.innerHTML = "";
  callingPendingTask();
});
completedClick.addEventListener("click", () => {
  backGroundReset();
  completedClick.style.backgroundColor = "#6096B4";
  tasksdisplay.innerHTML = "";
  callingComlpletedTask();
});
allTasksClick.addEventListener("click", () => {
  backGroundReset();
  allTasksClick.style.backgroundColor = "#6096B4";
  tasksdisplay.innerHTML = "";
  callingAllTasks();
});
//
// deleting all tasks
//
const deleteAll = document.querySelector(".delete-all");
deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  const resp = window.prompt(`you sure want to delete all, if yes type "YES"`);
  if (resp === "YES") {
    let inCompleteTasks = [];
    localStorage.setItem("inCompleteTasks", JSON.stringify(inCompleteTasks));
    localStorage.setItem("completeTasks", JSON.stringify(inCompleteTasks));
    tasksdisplay.innerHTML = "";
  } else {
    alert("Nothing is Deleted");
  }
});
