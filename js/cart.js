document.addEventListener('DOMContentLoaded', () => {
    const productosComprados = localStorage.getItem('productosComprados');
    const contenedor = document.querySelector('.texto_producto');
    const carritoBadge = document.getElementById('carrito-badge');
    const subtotal_carrito = document.getElementById('subtotal_carrito');

    //Mensaje si el carrito está vacío
    if (!productosComprados) {
        contenedor.innerHTML = `<h5>No hay productos</h5>`;
        carritoBadge.style.display = 'none';
        return;
    }

    //Procesar los productos comprados, crea un arreglo de objetos JS
    const listaProductos = JSON.parse(productosComprados);

    // Actualiza el badge con la cantidad total de productos
    const cantidadTotal = listaProductos.reduce((total, producto) => total + producto.quantity, 0);
    carritoBadge.textContent = cantidadTotal > 0 ? cantidadTotal : "";

    if (listaProductos && listaProductos.length > 0) {
        let htmlContentToAppend = '';
        let sumaSubTotal = 0;

        listaProductos.forEach(producto => {
            const subtotalProducto = producto.cost * producto.quantity; 
            sumaSubTotal += subtotalProducto;

            htmlContentToAppend += `
                <div class="row">
                    <div class="col-2"><img class="img-fluid" src="${producto.image}" alt="${producto.name}"></div>
                    <div class="col">
                        <div class="row text-muted">${producto.name}</div>
                    </div>
                    <div class="col">
                        <button class="border" onclick="decrementarQuantity(${producto.id})">-</button>
                        <span id="quantity-${producto.id}" class="border">${producto.quantity}</span>
                        <button class="border" onclick="incrementarQuantity(${producto.id})">+</button>
                    </div>
                    <div class="col"> 
                        Subtotal: <span id="subtotal-${producto.id}">${producto.currency} ${subtotalProducto}</span>
                        <span class="close">&#10005;</span>
                    </div>
                    <div class="col">
                        <button id="eliminarProducto"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });

        subtotal_carrito.textContent = `${listaProductos[0].currency} ${sumaSubTotal}`;
        contenedor.innerHTML = htmlContentToAppend;
    } else {
        contenedor.innerHTML = `<h5>No hay productos</h5>`; //Si listaProductos está vacío muestra el mensaje.
    }
});

// Función para incrementar la cantidad
function incrementarQuantity(id) {
    let obtenerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = obtenerListaProducto.find(p => p.id === id);
    if (producto) {
        producto.quantity++;
        updateDisplay(producto);
        localStorage.setItem('productosComprados', JSON.stringify(obtenerListaProducto));
        updateBadge();
        actualizarSumaTotal(obtenerListaProducto); // Actualiza el subtotal total
    }
}

// Función para decrementar la cantidad
function decrementarQuantity(id) {
    let obtenerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = obtenerListaProducto.find(p => p.id === id);
    if (producto && producto.quantity > 1) {
        producto.quantity--;
        updateDisplay(producto);
        localStorage.setItem('productosComprados', JSON.stringify(obtenerListaProducto));
        updateBadge();
        actualizarSumaTotal(obtenerListaProducto); // Actualiza el subtotal total
    }
}

// Función para actualizar el subtotal en la interfaz
function updateDisplay(producto) {
    document.getElementById(`quantity-${producto.id}`).textContent = producto.quantity;
    const subtotal = producto.cost * producto.quantity;
    document.getElementById(`subtotal-${producto.id}`).textContent = `${producto.currency} ${subtotal}`;
    localStorage.setItem('productoComprado', JSON.stringify(producto));
}

// Función para actualizar el subtotal total
function actualizarSumaTotal(listaProductos) {
    let sumaSubTotal = listaProductos.reduce((total, producto) => total + (producto.cost * producto.quantity), 0);
    const currency = listaProductos[0].currency; // Asume que todos los productos tienen la misma moneda
    subtotal_carrito.textContent = `${currency} ${sumaSubTotal}`; // Muestra el subtotal total actualizado
}

// Función para actualizar el badge
function updateBadge() {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados'));
    const carritoBadge = document.getElementById('carrito-badge');
    const cantidadTotal = productosComprados.reduce((total, producto) => total + producto.quantity, 0);
    carritoBadge.textContent = cantidadTotal;
}


// Mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});
