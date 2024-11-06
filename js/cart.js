// Tasa de cambio
const tasaCambio = {
    'USD': 1,
    'UYU': 40
};

// Función para convertir de una moneda a otra
function convertirMoneda(cantidad, origen, destino) {
    return (cantidad * tasaCambio[destino]) / tasaCambio[origen];
}

document.addEventListener('DOMContentLoaded', () => {
    const productosComprados = localStorage.getItem('productosComprados');
    const contenedor = document.querySelector('.texto_producto');
    const carritoBadge = document.getElementById('carrito-badge');
    const subtotal_carrito = document.getElementById('subtotal_carrito');

    if (!productosComprados) {
        contenedor.innerHTML = `<h5>No hay productos</h5>`;
        carritoBadge.style.display = 'none';
        return;
    }

    const listaProductos = JSON.parse(productosComprados);

    const cantidadTotal = listaProductos.reduce((total, producto) => total + producto.quantity, 0);
    carritoBadge.textContent = cantidadTotal > 0 ? cantidadTotal : "";

    if (listaProductos.length > 0) {
        let htmlContentToAppend = '';
        let sumaSubTotalUYU = 0;

        listaProductos.forEach(producto => {
            const subtotalProducto = producto.cost * producto.quantity;
            let subtotalEnUYU = producto.currency === 'USD'
                ? convertirMoneda(subtotalProducto, 'USD', 'UYU')
                : subtotalProducto;
            sumaSubTotalUYU += subtotalEnUYU;

            htmlContentToAppend += `
                <div class="row align-items-center mb-2">
                    <div class="col-3 col-md-2">
                        <img class="img-fluid" src="${producto.image}" alt="${producto.name}">
                    </div>
                    <div class="col-5 col-md-4">
                        <span class="text-muted">${producto.name}</span>
                    </div>
                    <div class="col-4 col-md-4 d-flex align-items-center justify-content-center">
                        <button class="border boton-circular" onclick="decrementarQuantity(${producto.id})">-</button>
                            <span id="quantity-${producto.id}" class="border mx-2">${producto.quantity}</span>
                        <button class="border boton-circular" onclick="incrementarQuantity(${producto.id})">+</button>
                    </div>
                    <div class="col-12 col-md-2 text-end d-flex justify-content-end">
                        <button id="eliminarProducto" class="btn-eliminar">X</button>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-12 text-end">
                        <span>Subtotal:</span>
                        <span class="ms-1">UYU</span>
                        <span id="subtotal-${producto.id}" class="ms-1">${subtotalEnUYU}</span>
                    </div>
                </div>
                <hr class="linea-separadora">
                `;

        });

        subtotal_carrito.textContent = `UYU ${sumaSubTotalUYU}`;
        contenedor.innerHTML = htmlContentToAppend;
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
        actualizarSumaTotal(obtenerListaProducto);
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
        actualizarSumaTotal(obtenerListaProducto);
    }
}

// Función para actualizar el subtotal en la interfaz
function updateDisplay(producto) {
    document.getElementById(`quantity-${producto.id}`).textContent = producto.quantity;
    const subtotal = producto.cost * producto.quantity;
    let subtotalEnUYU = producto.currency === 'USD'
        ? convertirMoneda(subtotal, 'USD', 'UYU')
        : subtotal;
    document.getElementById(`subtotal-${producto.id}`).textContent = `${subtotalEnUYU}`; // Muestra el subtotal en UYU
}

// Función para actualizar el subtotal total
function actualizarSumaTotal(listaProductos) {
    let sumaSubTotalUYU = listaProductos.reduce((total, producto) => {
        const subtotal = producto.cost * producto.quantity;
        return total + (producto.currency === 'USD' ? convertirMoneda(subtotal, 'USD', 'UYU') : subtotal);
    }, 0);
    subtotal_carrito.textContent = `UYU ${sumaSubTotalUYU}`; // Muestra el subtotal total actualizado
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