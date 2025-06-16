document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('uname').value;
    const password = document.getElementById('pass').value;

    if (username.length < 4) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username must be at least 4 characters long!',
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

    Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: 'You have successfully signed in.',
        confirmButtonColor: '#205781',
        timer: 2000,
        timerProgressBar: true
    }).then(() => {
        window.location.href = '../../Html/Travel-Portal(HTML)/Home-Page.html';
    });
});