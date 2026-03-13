// Clock and Greeting
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('currentDate').textContent = dateString;
    
    const hour = now.getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    
    document.getElementById('greeting').textContent = greeting;
}

updateClock();
setInterval(updateClock, 1000);

// Focus Timer
let timerInterval;
let timeLeft = 25 * 60;
let isRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert('Focus session complete!');
            }
        }, 1000);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

// Tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <label>
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${index})">
                <span>${task.text}</span>
            </label>
            <button class="btn btn-delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

renderTasks();

// Quick Links
let links = JSON.parse(localStorage.getItem('links')) || [
    { name: 'Google', url: 'https://google.com' },
    { name: 'Gmail', url: 'https://gmail.com' },
    { name: 'Calendar', url: 'https://calendar.google.com' }
];

function renderLinks() {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';
    
    links.forEach((link, index) => {
        const linkItem = document.createElement('a');
        linkItem.className = 'link-item';
        linkItem.href = link.url;
        linkItem.target = '_blank';
        linkItem.innerHTML = `
            ${link.name}
            <button class="link-remove" onclick="event.preventDefault(); deleteLink(${index})">×</button>
        `;
        container.appendChild(linkItem);
    });
}

function addLink() {
    const nameInput = document.getElementById('linkName');
    const urlInput = document.getElementById('linkUrl');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name && url) {
        links.push({ name, url: url.startsWith('http') ? url : 'https://' + url });
        localStorage.setItem('links', JSON.stringify(links));
        nameInput.value = '';
        urlInput.value = '';
        renderLinks();
    }
}

function deleteLink(index) {
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
    renderLinks();
}

document.getElementById('addLinkBtn').addEventListener('click', addLink);

renderLinks();
