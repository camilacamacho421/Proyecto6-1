//Función para cerrar sesión y redirección al login
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

//Entrega 5 - Función para establecer el modo
function cambiarModo() {
    const modo = localStorage.getItem('modo');
    if (modo === 'noche') {
        document.body.classList.remove('modo-dia');
        document.body.classList.add('modo-noche');
        document.getElementById('modoSwitch').checked = true;
    } else {
        document.body.classList.remove('modo-noche');
        document.body.classList.add('modo-dia');
        document.getElementById('modoSwitch').checked = false;
    }
}

//Entrega 5 - Establecer el modo
cambiarModo();

//Entrega 5 - Evento para cambiar el modo
document.getElementById('modoSwitch').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.remove('modo-dia');
        document.body.classList.add('modo-noche');
        localStorage.setItem('modo', 'noche'); // Guardar en localStorage
    } else {
        document.body.classList.remove('modo-noche');
        document.body.classList.add('modo-dia');
        localStorage.setItem('modo', 'dia'); // Guardar en localStorage
    }
});

//Entrega 6 - Badge carrito

function manejarBadgeCarrito() {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const carritoBadge = document.getElementById('carrito-badge');

    // Calcula la cantidad total de productos en el carrito
    const cantidadTotal = productosComprados.reduce((total, producto) => total + producto.quantity, 0);

    // Muestra la cantidad en el badge si es mayor a 0, si no, lo oculta
    if (cantidadTotal > 0) {
        carritoBadge.textContent = cantidadTotal;
        carritoBadge.style.display = ''; // Muestra el badge si estaba oculto
    } else {
        carritoBadge.style.display = 'none'; // Oculta el badge si la cantidad es 0
    }
}

function incrementarQuantity(id) {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const producto = productosComprados.find(p => p.id === id);
    if (producto) {
        producto.quantity++;
        localStorage.setItem('productosComprados', JSON.stringify(productosComprados));  // Actualiza en el localStorage
        actualizarBadgeCarrito();  // Llama a la función para actualizar el badge
    }
}

function decrementarQuantity(id) {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados')) || [];
    const producto = productosComprados.find(p => p.id === id);
    if (producto && producto.quantity > 1) {
        producto.quantity--;
        localStorage.setItem('productosComprados', JSON.stringify(productosComprados));  // Actualiza en el localStorage
        actualizarBadgeCarrito();  // Llama a la función para actualizar el badge
    }
}