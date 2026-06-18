const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const welcome = document.getElementById("welcome");

const nameSection = document.getElementById("nameSection");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const todoContainer = document.getElementById("todoContainer");


const clearAllBtn = document.getElementById("clearAllBtn");
const resetAppBtn = document.getElementById("resetAppBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let username = localStorage.getItem("username");

// Greeting
function updateGreeting() {
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    welcome.textContent =
        `👋 ${greeting}, ${username}! Let's get things done today.`;
}

// Show To-Do App
function showTodoApp() {
    nameSection.style.display = "none";
    todoContainer.style.display = "block";
    updateGreeting();
}

// Check if user already exists
if (username) {
    showTodoApp();
}

// Save Name
saveNameBtn.addEventListener("click", () => {

    const enteredName = nameInput.value.trim();

    if (enteredName === "") {
        alert("Please enter your name");
        return;
    }

    username = enteredName;

    localStorage.setItem("username", username);

    showTodoApp();
});

// Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update Counter
function updateCount() {
    const completed = tasks.filter(task => task.completed).length;

    taskCount.textContent =
        `Total: ${tasks.length} | Completed: ${completed}`;
}

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            "<li>No tasks yet. Add one above!</li>";

        updateCount();
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        deleteBtn.addEventListener("click", () => {
            if (confirm("Delete this task?")) {
                tasks.splice(index, 1);
                saveTasks();
                displayTasks();
            }
        });

        taskList.appendChild(li);
    });

    updateCount();
}

// Add Task
function addTask() {
    const taskText = taskInput.value
        .replace(/\s+/g, " ")
        .trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Add Button
addBtn.addEventListener("click", addTask);

// Enter Key
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});



// Clear All Tasks
clearAllBtn.addEventListener("click", () => {
    if (tasks.length === 0) {
        alert("No tasks to clear.");
        return;
    }

    if (confirm("Clear all tasks?")) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

// Initial Load
displayTasks();
/*
resetAppBtn.addEventListener("click", () => {
    if(confirm("Reset the entire app?")) {
        localStorage.clear();
        location.reload();
    }
});*/