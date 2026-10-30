let form = document.createElement("form");
let inputTask = document.createElement("input");
inputTask.type = "text";
inputTask.placeholder = "Masukkan tugas baru...";
inputTask.id = "task-input";
inputTask.setAttribute("aria-label", "Tugas baru");

let btnAdd = document.createElement("button");
btnAdd.type = "submit";
btnAdd.textContent = "Tambah";
btnAdd.id = "add-task";

let taskList = document.createElement("ul");
taskList.id = "task-list";

let message = document.createElement("p");
message.id = "task-message";
message.setAttribute("role", "status");

form.appendChild(inputTask);
form.appendChild(btnAdd);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let taskText = inputTask.value.trim();
    if (taskText === "") {
        message.textContent = "Tulis tugas terlebih dahulu.";
        message.className = "error";
        inputTask.focus();
        return;
    }

    addTask(taskText);
    inputTask.value = "";
    message.textContent = "";
    saveTasks();
    inputTask.focus();
});

function addTask(taskText, isCompleted = false) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.setAttribute("aria-label", "Tandai tugas selesai");

    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    if (isCompleted) {
        taskSpan.classList.add("completed");
    }

    checkbox.addEventListener("change", function() {
        taskSpan.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "delete-task";
    deleteBtn.setAttribute("aria-label", "Hapus tugas: " + taskText);
    deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(function(li) {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input[type='checkbox']").checked
        });
    });

    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        message.textContent = "";
        message.className = "";
    } catch (error) {
        message.textContent = "Tugas berubah, tetapi gagal disimpan di browser.";
        message.className = "error";
        console.error("Gagal menyimpan tugas ke localStorage:", error);
    }
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks === null) {
        return;
    }

    let tasks;
    try {
        tasks = JSON.parse(savedTasks);
    } catch (error) {
        message.textContent = "Data tugas tersimpan tidak dapat dibaca.";
        message.className = "error";
        console.error("Data tugas di localStorage bukan JSON yang valid:", error);
        return;
    }

    if (!Array.isArray(tasks)) {
        message.textContent = "Data tugas tersimpan tidak memiliki format yang benar.";
        message.className = "error";
        return;
    }

    tasks.forEach(function(task) {
        if (task && typeof task.text === "string" && typeof task.completed === "boolean") {
            addTask(task.text, task.completed);
        }
    });
}

let outputDiv = document.getElementById("output5");
outputDiv.appendChild(form);
outputDiv.appendChild(message);
outputDiv.appendChild(taskList);

loadTasks();