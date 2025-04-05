const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '../login/index.html';
        return;
    }
    document.getElementById('submittedBy').value = userId;
    try {
        const response = await axios.get(`${API_BASE_URL}/venues`);

        const venues = response.data;
        const tableBody = document.getElementById("taskTableBody");
        tableBody.innerHTML = "";

        venues.forEach(venue => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${venue.name}</td>
                <td>${venue.location}</td>
                <td>${venue.capacity}</td>
                <td>${venue.amenities}</td>
                <td>${venue.submittedBy}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching task:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error fetching venues',
            text: error.response?.data?.message || 'Failed to fetch venues.'
        });
    }

    // POST
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const venueData = {
            name: document.getElementById('venue').value,
            location: document.getElementById('location').value,
            capacity: Number(document.getElementById('capacity').value),
            amenities: document.getElementById('amenities').value,
            submittedBy: document.getElementById('submittedBy').value
        };
        console.log(venueData);
        try{
            await axios.post(`${API_BASE_URL}/venues`, venueData);
            Swal.fire({
                icon: 'success',
                title: 'Venue added successfully',
                text: 'The venue has been added successfully.'
            });

            window.location.reload();
        } catch (error) {
            console.error('Failed to add venue:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error adding venue',
                text: error.response?.data?.message || 'Failed to add venue.'
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


