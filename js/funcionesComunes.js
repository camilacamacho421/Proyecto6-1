//Función para cerrar sesión t redirección al login
function Desafiante() {
    const logoutButton = document.getElementById('logout-button');
    const perfilButton = document.getElementById('perfil-button');
    const carritoButton = document.getElementById('carrito-button');
    const loggedIn = localStorage.getItem('loggedIn');
    const userButton = document.getElementById('username');
    const username = localStorage.getItem('username');

    if (loggedIn === 'true') {
        if (userButton) {
            userButton.textContent = `${username}`;
        }

        if (logoutButton) {
            logoutButton.onclick = () => {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('username');
                window.location.href = 'login.html';
            };
        }

        if (perfilButton) {
            perfilButton.onclick = () => {
                window.location.href = 'my-profile.html';
            };
        }

        if (carritoButton) {
            carritoButton.onclick = () => {
                window.location.href = 'cart.html';
            };
        }

    } else {
        window.location.href = 'login.html';
    }
}