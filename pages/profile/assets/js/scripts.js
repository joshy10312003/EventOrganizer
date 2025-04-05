const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';


document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    if (!userId) {
        window.location.href = '../login/index.html';
        return;
    }
    console.log(userEmail);
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const profileForm = document.getElementById('profileForm');
    const passwordSections = document.querySelectorAll('.password-section');
    const profileStatus = document.getElementById('profileStatus');

    async function fetchUserData() {
        try {
            showLoader();
            const response = await axios.get(`${API_BASE_URL}/users/login/${userEmail}`);
            
            nameInput.value = response.data.name;
            emailInput.value = response.data.email;
            hideLoader();
        } catch (error) {
            hideLoader();
            Swal.fire({
                icon: 'error',
                title: 'Error fetching user data',
                text: error.response?.data?.message || 'Failed to fetch user data.'
            });
            console.error('Error fetching user:', error);
        }
    }

    fetchUserData();

    editProfileBtn.addEventListener('click', () => {
        nameInput.removeAttribute('disabled');
        emailInput.removeAttribute('disabled');
        
        passwordSections.forEach(section => section.style.display = 'block');
        saveProfileBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        editProfileBtn.style.display = 'none';
        
        nameInput.focus();
    });

    cancelBtn.addEventListener('click', () => {
        resetForm();
        fetchUserData(); 
    });

    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        if (!nameInput.value.trim()) {
            showAlert('Name is required', 'error');
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            showAlert('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        if (passwordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            showAlert('Passwords do not match', 'error');
            passwordInput.focus();
            return;
        }
        
        const updateData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim()
        };
        
        if (passwordInput.value) {
            updateData.password = passwordInput.value;
        }
        try {
            showLoader();
            await axios.put(`${API_BASE_URL}/users/${userId}`, updateData);
            
            hideLoader();
            Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            resetForm();
        } catch (error) {
            hideLoader();
            showAlert('Failed to update profile. Please try again.', 'error');
            console.error('Error updating profile:', error);
        }
    });

    function resetForm() {
        nameInput.setAttribute('disabled', true);
        emailInput.setAttribute('disabled', true);
        
        passwordSections.forEach(section => section.style.display = 'none');
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        
        saveProfileBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        editProfileBtn.style.display = 'inline-block';
    }

    function showLoader() {
        document.body.style.cursor = 'wait';
    }

    function hideLoader() {
        document.body.style.cursor = 'default';
    }

    function showAlert(message, type = 'info') {
        profileStatus.textContent = message;
        profileStatus.className = 'alert';
        profileStatus.classList.add(`alert-${type}`);
        profileStatus.style.display = 'block';
        
        setTimeout(() => {
            profileStatus.style.display = 'none';
        }, 5000);
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
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