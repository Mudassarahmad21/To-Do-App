const taskInp = document.getElementById("inp-text");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("text-list");
loadTask();

function addTask() {
    const task = taskInp.value.trim();

    if (task) {
        createElementTask(task);
        taskInp.value = "";
        saveTasks();
    } else {
        showToast("Please enter a task.");
    }
}

addButton.addEventListener("click", addTask)

taskInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask()
    }
})

function createElementTask(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    listItem.style.backgroundColor = "rgb(189, 189, 189)";
    listItem.style.color = "black";
    listItem.style.width = "240px";
    listItem.style.marginRight = "25px";
    listItem.style.padding = "2px";
    listItem.style.paddingLeft = "10px";
    listItem.style.marginTop = "3px";

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.style.cssText = `
    margin: 0 10px 0 30px;
    background-color: red;
    color: black;
    cursor: pointer;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
`;


    deletBtn.addEventListener("click", () => {
        listItem.remove();
        saveTasks();
    })
    listItem.appendChild(deletBtn);
    taskList.appendChild(listItem);
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.top = "25px";
    toast.style.left = "20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "5px";
    toast.style.borderRadius = "10px";
    toast.style.zIndex = "1000";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove after 2 seconds
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(function (item) {
        tasks.push(item.firstChild.textContent.trim());
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTask() {
    try {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(createElementTask);
    }
    catch(error){
        console.error("Failed to load task from localStorage", error);
    }
}