document.addEventListener('DOMContentLoaded', () => {
    const productosComprados = localStorage.getItem('productosComprados');
    const contenedor = document.querySelector('.texto_producto');
    const carritoBadge = document.getElementById('carrito-badge');

    if (!productosComprados) {
        contenedor.innerHTML = `<h5>No hay productos</h5>`;
        carritoBadge.textContent = ""
        return;
    }

    const listaProductos = JSON.parse(productosComprados);

    // Actualiza el badge con la cantidad total de productos
    const cantidadTotal = listaProductos.reduce((total, producto) => total + producto.quantity, 0);
    console.log("Cantidad total en el carrito:", cantidadTotal);// Verificar que se actualice la cantidad total
    carritoBadge.textContent = cantidadTotal > 0 ? cantidadTotal : "";

    if (listaProductos && listaProductos.length > 0) {
        let htmlContentToAppend = '';

        listaProductos.forEach(producto => {
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
                        Subtotal: <span id="subtotal-${producto.id}">${producto.currency} ${producto.cost * producto.quantity}</span>
                        <span class="close">&#10005;</span>
                    </div>
                    <div class="col">
                    <button id="eliminarProducto"><i class="fa-solid fa-trash-can"></i></button>
                    </div>

                </div>
            `;
        });

        contenedor.innerHTML = htmlContentToAppend;
    } else {
        contenedor.innerHTML = `<h5>No hay productos</h5>`;
    }
});

// Funcion para actualizar el badge al incrementar o decrementar la cantidad
function updateBadge() {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados'));
    const carritoBadge = document.getElementById('carrito-badge');
    const cantidadTotal = productosComprados.reduce((total, producto) => total + producto.quantity, 0);
    carritoBadge.textContent = cantidadTotal;
}

// Funciones para incrementar y decrementar la cantidad
function incrementarQuantity(id) {
    let ObternerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = ObternerListaProducto.find(p => p.id === id);
    if (producto) {
        producto.quantity++;
        updateDisplay(producto);
        localStorage.setItem('productosComprados', JSON.stringify(ObternerListaProducto)); // Actualiza el localStorage
        updateBadge();  // Llama a updateBadge para actualizar el badge
    }
}

function decrementarQuantity(id) {
    let ObternerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = ObternerListaProducto.find(p => p.id === id);
    if (producto && producto.quantity > 1) {
        producto.quantity--;
        updateDisplay(producto);
        localStorage.setItem('productosComprados', JSON.stringify(ObternerListaProducto)); // Actualiza el localStorage
        updateBadge();  // Llama a updateBadge para actualizar el badge
    }
}

function updateDisplay(producto) {
    document.getElementById(`quantity-${producto.id}`).textContent = producto.quantity;  // Actualiza la cantidad en el DOM
    const subtotal = producto.cost * producto.quantity;
    document.getElementById(`subtotal-${producto.id}`).textContent = `${producto.currency} ${subtotal}`;  // Actualiza el subtotal en el DOM
    localStorage.setItem('productoComprado', JSON.stringify(producto)); 
}

// Mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});