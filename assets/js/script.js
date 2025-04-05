

document.addEventListener("DOMContentLoaded", function () {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

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
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '../login/index.html';
        }
    }
    );
});
document.getElementById('logout-btn').addEventListener('click', () => {

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
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '../login/index.html';
        }
    });
});