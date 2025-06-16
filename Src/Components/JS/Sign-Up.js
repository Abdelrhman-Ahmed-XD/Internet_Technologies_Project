document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('uname').value;
    const lastName = document.getElementById('uname2').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('pass').value;
    const checkbox = document.getElementById('checkbox').checked;

    if (firstName.length < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'First Name must be at least 2 characters long!',
            confirmButtonColor: '#205781'
        });
        return;
    }

    if (lastName.length < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Last Name must be at least 2 characters long!',
            confirmButtonColor: '#205781'
        });
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid email address!',
            confirmButtonColor: '#205781'
        });
        return;
    }

    if (password.length < 4) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password must be at least 4 characters long!',
            confirmButtonColor: '#205781'
        });
        return;
    }

    if (!checkbox) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must agree to the terms!',
            confirmButtonColor: '#205781'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to TravelVista!',
        confirmButtonColor: '#205781',
        timer: 2000,
        timerProgressBar: true
    }).then(() => {
        window.location.href = '../../Html/Travel-Portal(HTML)/Home-Page.html';
    });
});