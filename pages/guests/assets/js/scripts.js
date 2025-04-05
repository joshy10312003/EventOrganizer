const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

function deleteEvent(guestId) {
    if (confirm("Are you sure you want to delete this guest?")) {
        axios.delete(`${API_BASE_URL}/guests/${guestId}`)
            .then(() => {
                alert('Guest deleted successfully!');
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting guest:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error deleting guest',
                    text: error.response?.data?.message || 'Failed to delete guest.'
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
        const response = await axios.get(`${API_BASE_URL}/guests`);
        
        const guests = response.data;
        const tableBody = document.getElementById("taskTableBody");
        tableBody.innerHTML = "";

        guests.forEach(guest => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${guest.id}</td>
                <td>${guest.event_id}</td>
                <td>${guest.name}</td>
                <td>${guest.email}</td>
                <td>${guest.phone}</td>
                <td>${guest.status}</td>
                <td>
                    <button class="action-btn" onclick="deleteEvent(${guest.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching task:", error);
        alert(error.response?.data?.message || 'Error fetching task.');
    }

    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const guestId = document.getElementById('guestId').value;
        const guestData = {
            eventId: null,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            status: document.getElementById('status').value
        };

        try {
            if(guestId) {
                await axios.put(`${API_BASE_URL}/guests/${guestId}`, guestData);
                Swal.fire({
                    icon: 'success',
                    title: 'Guest updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                await axios.post(`${API_BASE_URL}/guests`, guestData);
                Swal.fire({
                    icon: 'success',
                    title: 'Guest added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            window.location.reload();
        } catch (error) {
            console.error(guestId ? 'Failed to update guest:' : 'Failed to add guest:', error);
            Swal.fire({
                icon: 'error',
                title: guestId ? 'Error updating guest' : 'Error adding guest',
                text: error.response?.data?.message || 'Failed to process request.'
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