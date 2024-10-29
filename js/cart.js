document.addEventListener('DOMContentLoaded', () => {
    const productoComprado = localStorage.getItem('productoComprado');

    // Verificar si existe algún producto
    if (!productoComprado) {
        let htmlContentToAppend = `
            <h5>No hay productos</h5>
        `;

        // Insertar el contenido generado en el DOM
        document.getElementsByClassName('texto_producto')[0].innerHTML = htmlContentToAppend;
    } else {
        // Convertir el string almacenado en localStorage en un objeto
        const producto = JSON.parse(productoComprado);

        // Acceder a las propiedades del objeto
        let htmlContentToAppend = `
            <div class="col-2"><img class="img-fluid" src="${producto.image}" alt="${producto.name}"></div>
            <div class="col">
                <div class="row text-muted">${producto.name}</div>
            </div>
            <div class="col">
                <button class="border" onclick="decrementarQuantity()">-</button>
                <span id="quantity" class="border">${producto.quantity}</span>
                <button class="border" onclick="incrementarQuantity()">+</button>
            </div>
            <div class="col"> 
                Subtotal: <span id="subtotal">${producto.currency} ${producto.cost * producto.quantity}</span>
                <span class="close">&#10005;</span>
            </div>
        `;

        // Insertar el contenido generado en el DOM
        document.getElementsByClassName('texto_producto')[0].innerHTML = htmlContentToAppend;
    }
});

// Función para incrementar la cantidad
function incrementarQuantity() {
    let producto = JSON.parse(localStorage.getItem('productoComprado'));
    producto.quantity++;
    updateDisplay(producto);  // Actualiza la cantidad y el subtotal en el DOM
}

// Función para decrementar la cantidad
function decrementarQuantity() {
    let producto = JSON.parse(localStorage.getItem('productoComprado'));
    if (producto.quantity > 1) {
        producto.quantity--;
        updateDisplay(producto);  // Actualiza la cantidad y el subtotal en el DOM
    }
}

function updateDisplay(producto) {
    document.getElementById('quantity').textContent = producto.quantity;  // Actualiza la cantidad en el DOM
    const subtotal = producto.cost * producto.quantity;
    document.getElementById('subtotal').textContent = `${producto.currency} ${subtotal}`;  // Actualiza el subtotal en el DOM
    
    producto.subtotal = subtotal;  // Actualiza subtotal del Local Storage
    localStorage.setItem('productoComprado', JSON.stringify(producto)); 
}

//mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});