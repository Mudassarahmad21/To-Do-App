const taskInp = document.getElementById("inp-text");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("text-list");

function addTask() {
    const task = taskInp.value.trim();

    if (task) {
        createElementTask(task);
        taskInp.value = "";
    } else {
        showToast("Please enter a task.");
    }
}

addButton.addEventListener("click", addTask)

taskInp.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addTask()
    }
})

function createElementTask(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.addEventListener("click", () => {
        listItem.remove();
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
    }, 3000); // Remove after 3 seconds
}