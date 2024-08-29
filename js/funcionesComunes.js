function Desafiante() {
    const logoutButton = document.getElementById('logout-button');
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
    } else {
        window.location.href = 'login.html';
    }
}