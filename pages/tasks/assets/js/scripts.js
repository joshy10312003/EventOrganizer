const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        axios.delete(`${API_BASE_URL}/tasks/${taskId}`)
            .then(() => {
                alert('Task deleted successfully!');
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting task:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error deleting task',
                    text: error.response?.data?.message || 'Failed to delete task.'
                });
            });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        window.location.href = '../login/index.html';
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/tasks?user_id=${userId}`);

        const tasks = response.data;
        const tableBody = document.getElementById("taskTableBody");
        tableBody.innerHTML = "";

        tasks.forEach(task => {
            if (task.user_id == userId) { 
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.status}</td>
                    <td>
                        <button class="action-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    } catch (error) {
        console.error("Error fetching task:", error);
        alert(error.response?.data?.message || 'Error fetching task.');
    }

    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const taskId = document.getElementById('taskId').value;
        const taskData = {
            userId : userId,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            dueDate: Date(document.getElementById('dueDate').value),
            status: document.getElementById('status').value
        };
        console.log(taskData);

        try {
            if(taskId) {
                await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
                Swal.fire({
                    icon: 'success',
                    title: 'Task updated successfully!',
                    showConfirmButton: false
                });
            } else {
                await axios.post(`${API_BASE_URL}/tasks`, taskData);
                Swal.fire({
                    icon: 'success',
                    title: 'Task added successfully!',
                    showConfirmButton: false
                });
            }
            window.location.reload();
        } catch (error) {
            console.error(taskId ? 'Failed to update task:' : 'Failed to add task:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to process task.',
                showConfirmButton: true
            });
        }
    });
});
















document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'block';
        button.classList.add('active');
    });
});
document.getElementById('addTaskBtn').addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('[data-tab="createTask"]').classList.add('active');
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('createTask').style.display = 'block';
});
document.getElementById('cancelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('[data-tab="taskList"]').classList.add('active');
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('taskList').style.display = 'block';
});




document.addEventListener("DOMContentLoaded", function () {
    let userEmail = localStorage.getItem("userEmail");
    
    if (userEmail == "admin@gmail.com") {
        document.getElementById("adminOnly").style.display = "block";
    }else{
        document.getElementById("mobileAdminOnly").style.display = "none";
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    
    mobileMenuToggle.addEventListener('click', function() {
      mobileNavMenu.classList.toggle('active');
    });
  });
document.getElementById('mobileLogoutBtn').addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(0,150,136,1)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');

            window.location.href = '../login/index.html';
        }
    }
    );
});
document.getElementById('logoutBtn').addEventListener('click', () => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');

            window.location.href = '../login/index.html';
        }
    });
});