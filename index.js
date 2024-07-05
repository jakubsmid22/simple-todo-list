const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const form = document.querySelector("form");
const taskTemplate = document.getElementById("task-template").content;
const tasksE = document.getElementById("tasks");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textInput.value;
    const date = dateInput.value;
    if (text) {
        tasks.push({text, date});
        localStorage.setItem("tasks", JSON.stringify(tasks))
        textInput.value = "";
        dateInput.value = "";
        renderTasks();
    }
    else {
        alert("Text is required.");
    }
})

const renderTasks = () => {
    tasksE.innerHTML = "";

    tasks.forEach((e, index) => {
        const {text, date} = e;
        const task = taskTemplate.cloneNode(true);
        task.getElementById("text").textContent = text;
        task.getElementById("date").textContent = date;
        task.getElementById("remove").addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });
        tasksE.append(task);
    });
};

renderTasks();