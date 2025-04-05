const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';


document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        window.location.href = '../login/index.html';
        return;
    }
    document.getElementById('submittedBy').value = userId;

    try {
        const response = await axios.get(`${API_BASE_URL}/providers`);

        const providers = response.data;
        const tableBody = document.getElementById("taskTableBody");
        tableBody.innerHTML = "";

        providers.forEach(provider => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${provider.name}</td>
                <td>${provider.serviceType}</td>
                <td>${provider.contactInfo}</td>
                <td>${provider.submittedBy}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching provider:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Failed to fetch providers.'
        });
    }

    // POST
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const providerData = {
            name: document.getElementById('name').value,
            serviceType: document.getElementById('service').value,
            contactInfo: document.getElementById('contact').value,
            submittedBy: document.getElementById('submittedBy').value
        };
        try{
            await axios.post(`${API_BASE_URL}/providers`, providerData);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Provider added successfully!'
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to add a provider:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to add provider.'
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