const API_BASE_URL = 'https://demo-api-skills.vercel.app/api/EventOrganizer';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const registerButton = document.getElementById('registerButton');
    const spinner = registerButton.querySelector('.spinner');
    const buttonText = registerButton.querySelector('span:not(.spinner)');

    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    registerButton.disabled = true;

    const name = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        buttonText.style.display = 'inline-block';
        spinner.style.display = 'none';
        registerButton.disabled = false;
        return;
    }

    try {
        await axios.post(`${API_BASE_URL}/users`, {
            name,
            email,
            password
        });

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration successful! Please log in.'
        });
        window.location.href = "../login/index.html";

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Registration failed.'
        });
        console.error('Error during registration:', error);
    } finally {
        buttonText.style.display = 'inline-block';
        spinner.style.display = 'none';
        registerButton.disabled = false;
    }
});
