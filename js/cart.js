// Definimos la tasa de cambio (ejemplo)
const tasaCambio = {
    'USD': 1,      // 1 USD = 1 USD
    'UYU': 40      // 1 USD = 39 UYU (ejemplo, actualiza según la tasa real)
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
                <div class="row">
                    <div class="col-2"><img class="img-fluid" src="${producto.image}" alt="${producto.name}"></div>
                    <div class="col">
                        <div class="row text-muted">${producto.name}</div>
                    </div>
                    <div class="col">
                        <button class="border boton-circular" onclick="decrementarQuantity(${producto.id})">-</button>
                        <span id="quantity-${producto.id}" class="border">${producto.quantity}</span>
                        <button class="border boton-circular" onclick="incrementarQuantity(${producto.id})">+</button>
                    </div>
                    <div class="col"> 
                        <div class="subtotal-container">
                            <span>Subtotal</span>
                            <span id="subtotal-${producto.id}">${subtotalEnUYU}</span>
                            <span>UYU</span>
                        </div>
                    </div>
                    <div class="col">
                        <button id="eliminarProducto" class="btn-eliminar"> X </button>
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
