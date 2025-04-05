const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginButton = document.getElementById('loginButton');
        const spinner = loginButton.querySelector('.spinner');
        const buttonText = loginButton.querySelector('span:not(.spinner)');

        buttonText.style.display = 'none';
        spinner.style.display = 'inline-block';
        loginButton.disabled = true;

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const success = await login(email, password);
            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login successful!'
                });
                window.location.href = '../../../index.html';  
            }
        } catch (error) {
            buttonText.style.display = 'inline-block';
            spinner.style.display = 'none';
            loginButton.disabled = false;
        }
    });
});

async function login(email, password) {
    try {
        const userResponse = await axios.get(`${API_BASE_URL}/users/login/${email}`);
        
        if (!userResponse.data || !userResponse.data.email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email not registered'
            });
            return false;
        }

        const storedPassword = userResponse.data.password;
        if (password !== storedPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid password. Please try again.'
            });
            return false;
        }
        localStorage.setItem('userId', userResponse.data.id);
        localStorage.setItem('userName', userResponse.data.name);
        localStorage.setItem('userEmail', userResponse.data.email);

        return true; 
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || error.message || 'Login failed'
        });

        console.error('Error during login:', error);
        return false;
    }
}
