const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

function deleteUser(userId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently ban the user.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, ban it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${API_BASE_URL}/users/${userId}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User deleted successfully!'
                    });
                    const row = document.getElementById(`user-${userId}`);
                    if (row) {
                        row.remove();
                    }
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error deleting user',
                        text: error.response?.data?.message || 'Failed to delete user.'
                    });
                });
        }
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    if (!userId) {
        window.location.href = '../login/index.html';
        return;
    }

    const isAdmin = userEmail === 'admin@gmail.com';
    const adminOnly = document.getElementById("adminOnly");
    const mobileAdminOnly = document.getElementById("mobileAdminOnly");

    if (adminOnly) adminOnly.style.display = isAdmin ? "block" : "none";
    if (mobileAdminOnly) mobileAdminOnly.style.display = isAdmin ? "block" : "none";

    if (!isAdmin && window.location.pathname.includes("user")) {
        window.location.href = '../dashboard/index.html';
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        const users = response.data.filter(user => user.id != userId);
        const tableBody = document.getElementById("eventTableBody");
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.id = `user-${user.id}`;
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button class="action-btn" onclick="deleteUser('${user.id}')">Ban</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error fetching users',
            text: error.response?.data?.message || 'Failed to fetch users.'
        });
    }

    
    document.getElementById('mobileMenuToggle')?.addEventListener('click', function () {
        document.getElementById('mobileNavMenu')?.classList.toggle('active');
    });

    const logoutHandler = () => {
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
    };

    document.getElementById('logoutBtn')?.addEventListener('click', logoutHandler);
    document.getElementById('mobileLogoutBtn')?.addEventListener('click', logoutHandler);
});
