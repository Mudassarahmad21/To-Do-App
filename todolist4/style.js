// ====== DOM Elements ======
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// ====== Load tasks on startup ======
document.addEventListener("DOMContentLoaded", loadTasks);

// ====== Add event listeners ======
addButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddTask();
});

// ====== Functions ======

function handleAddTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return showToast("Please enter a task.");

  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = "";
}

function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

function saveTasks() {
  const tasks = [...taskList.querySelectorAll(".task-item")].map(
    (item) => item.firstChild.textContent.trim()
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToDOM);
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}
