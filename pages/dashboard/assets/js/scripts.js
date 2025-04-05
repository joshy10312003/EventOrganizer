const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

function fetchDashboardData() {
    document.querySelectorAll('.card-value').forEach(el => {
        el.innerHTML = '<span class="loading">Loading...</span>';
    });

    const fetchEvents = axios.get(`${API_BASE_URL}/events`);
    const fetchTasks = axios.get(`${API_BASE_URL}/tasks`);
    const fetchGuests = axios.get(`${API_BASE_URL}/guests`);

    Promise.all([fetchEvents, fetchTasks, fetchGuests])
        .then(([eventsRes, tasksRes, guestsRes]) => {
            const events = eventsRes.data;
            const tasks = tasksRes.data;
            const guests = guestsRes.data;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const activeEvents = events.filter(event => {
                const eventDate = new Date(event.event_date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate >= today;
            }).length;

            const pendingTasks = tasks.filter(task =>
                task.status === 'pending' || task.status === 'in_progress'
            ).length;

            const totalGuests = guests.length;
            const confirmedGuests = guests.filter(g => g.status === 'confirmed').length;

            updateCardValue('Active Events', activeEvents);
            updateCardValue('Pending Tasks', pendingTasks);
            updateCardValue('Total Guests', totalGuests);
            updateCardValue('Confirmed Guests', confirmedGuests);
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
            document.querySelectorAll('.card-value').forEach(el => {
                el.innerHTML = '<span class="error">Error loading data</span>';
            });
        });
}

function updateCardValue(cardTitle, value) {
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('h3');
        const valueEl = card.querySelector('.card-value');
        if (title && title.textContent === cardTitle && valueEl) {
            valueEl.classList.add('updated');
            valueEl.textContent = value;
            setTimeout(() => valueEl.classList.remove('updated'), 1000);
        }
    });
}

function addDashboardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .loading { opacity: 0.6; }
        .error { color: #ff3333; }
        .updated { animation: fadeUpdate 1s ease; }
        @keyframes fadeUpdate {
            0% { opacity: 0.4; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

function initDashboard() {
    addDashboardStyles();
    fetchDashboardData();
    setInterval(fetchDashboardData, 300000); 
}

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (userName) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.innerHTML = userName;
    }

    const isAdmin = userEmail === 'admin@gmail.com';
    const adminOnly = document.getElementById('adminOnly');
    const mobileAdminOnly = document.getElementById('mobileAdminOnly');

    if (adminOnly) adminOnly.style.display = isAdmin ? 'block' : 'none';
    if (mobileAdminOnly) mobileAdminOnly.style.display = isAdmin ? 'block' : 'none';

    if (document.getElementById("dashboard")) {
        initDashboard();
    }

    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileNavMenu');
    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = '../login/index.html';
    };

    const logoutConfirm = {
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    };

    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Swal.fire(logoutConfirm).then(result => {
                if (result.isConfirmed) logout();
            });
        });
    }

    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
            Swal.fire({ ...logoutConfirm, confirmButtonColor: 'rgba(0,150,136,1)' }).then(result => {
                if (result.isConfirmed) logout();
            });
        });
    }
});
