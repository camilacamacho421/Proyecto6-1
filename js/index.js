document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//DESAFIATE - VERIFICA SI YA SE HA INICIADO SESIÓN O NO
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const loggedIn = localStorage.getItem('loggedIn');
    const userButton = document.getElementById('username'); //DESAFIATE 2
    const username = localStorage.getItem('username'); //DESAFIATE 2

    if (loggedIn === 'true') {
        userButton.textContent = `${username}`; // Muestra el nombre del usuario DESAFIATE 2
    
        logoutButton.onclick = () => {
            localStorage.removeItem('loggedIn'); // Eliminar sesión
            localStorage.removeItem('username'); // Eliminar nombre de usuario DESAFIATE 2
            window.location.href = 'login.html'; // Redirigir al login
        };
    } else {
        window.location.href = 'login.html'; // Redirigir al login
    }
});