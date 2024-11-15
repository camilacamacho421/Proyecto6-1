// Tasa de cambio
const tasaCambio = {
    'USD': 1,
    'UYU': 40
};

// Función para convertir de una moneda a otra
function convertirMoneda(cantidad, origen, destino) {
    return (cantidad * tasaCambio[destino]) / tasaCambio[origen];
}

// Función para actualizar el carrito y los subtotales
function actualizarCarrito() {
    const productosComprados = localStorage.getItem('productosComprados');
    const contenedor = document.querySelector('.texto_producto');
    const carritoBadge = document.getElementById('carrito-badge');
    const subtotal_carrito = document.getElementById('subtotal_carrito');

    if (!productosComprados || JSON.parse(productosComprados).length === 0) {
        contenedor.innerHTML = `<h5>No hay productos</h5>`;
        carritoBadge.style.display = 'none';
        subtotal_carrito.textContent = "UYU 0";
        actualizarTotal(); // Asegurarse de que el total también se actualice cuando no hay productos
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
                <!-- Contenedor completo para el producto y su subtotal -->
                <div id="producto-${producto.id}" class="producto row align-items-center mb-2">
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
                        <button class="btn-eliminar" onclick="borrarElemento(${producto.id})"><i class="material-icons">delete</i></button>
                    </div>
                    <!-- Subtotal del producto -->
                    <div class="row mb-2">
                        <div class="col-12 text-end">
                            <span>Subtotal:</span>
                            <span class="ms-1">UYU</span>
                            <span id="subtotal-${producto.id}" class="ms-1">${subtotalEnUYU}</span>
                        </div>
                    </div>
                    <hr class="linea-separadora">
                </div>
            `;
        });

        subtotal_carrito.textContent = `UYU ${sumaSubTotalUYU}`;
        contenedor.innerHTML = htmlContentToAppend;

        actualizarTotal();
    }
}

// Función para actualizar el precio total con envío
function actualizarTotal() {
    let listaProductos = JSON.parse(localStorage.getItem('productosComprados')) || [];
    let sumaSubTotalUYU = listaProductos.reduce((total, producto) => {
        const subtotal = producto.cost * producto.quantity;
        return total + (producto.currency === 'USD' ? convertirMoneda(subtotal, 'USD', 'UYU') : subtotal);
    }, 0);

    let costoenvio = 0;
    const selectEnvio = document.querySelector('.select_carrito');
    const selectedOption = selectEnvio.options[selectEnvio.selectedIndex];
    switch (selectedOption?.id) {
        case "envioPremium":
            costoenvio = sumaSubTotalUYU * 0.15;
            break;
        case "envioExpress":
            costoenvio = sumaSubTotalUYU * 0.07;
            break;
        case "envioStandard":
            costoenvio = sumaSubTotalUYU * 0.05;
            break;
        default:
            costoenvio = 0;
    }

    const contenedorTotal = document.getElementById("total_carrito");
    const totalConEnvio = sumaSubTotalUYU + costoenvio;
    contenedorTotal.textContent = `UYU ${totalConEnvio.toFixed(2)}`;
}


// Función para incrementar la cantidad
function incrementarQuantity(id) {
    let obtenerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = obtenerListaProducto.find(p => p.id === id);
    if (producto) {
        producto.quantity++;
        localStorage.setItem('productosComprados', JSON.stringify(obtenerListaProducto));
        actualizarCarrito();
        validarCamposBotonCompra(); // Validar después de incrementar
    }
}

// Función para decrementar la cantidad
function decrementarQuantity(id) {
    let obtenerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const producto = obtenerListaProducto.find(p => p.id === id);
    if (producto && producto.quantity > 1) {
        producto.quantity--;
        localStorage.setItem('productosComprados', JSON.stringify(obtenerListaProducto));
        actualizarCarrito();
        validarCamposBotonCompra(); // Validar después de decrementar
    }
}

// Función para actualizar el subtotal del producto al modificar cantidad
function precioSegunCantidad(producto) {
    document.getElementById(`quantity-${producto.id}`).textContent = producto.quantity;
    const subtotal = producto.cost * producto.quantity;
    let subtotalEnUYU = producto.currency === 'USD'
        ? convertirMoneda(subtotal, 'USD', 'UYU')
        : subtotal;
    document.getElementById(`subtotal-${producto.id}`).textContent = `${subtotalEnUYU}`; // Muestra el subtotal en UYU
}

// Mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

// Función para actualizar el badge
function updateBadge() {
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados'));
    const carritoBadge = document.getElementById('carrito-badge');
    const cantidadTotal = productosComprados.reduce((total, producto) => total + producto.quantity, 0);
    carritoBadge.textContent = cantidadTotal;
}

// ENTREGA 7
// Función para borrar un producto
function borrarElemento(id) {
    let obtenerListaProducto = JSON.parse(localStorage.getItem('productosComprados'));
    const posicion = obtenerListaProducto.findIndex(producto => producto.id === id);

    if (posicion !== -1) {
        obtenerListaProducto.splice(posicion, 1);
        localStorage.setItem('productosComprados', JSON.stringify(obtenerListaProducto));
        actualizarCarrito();
        updateBadge();
        validarCamposBotonCompra(); // Validar después de eliminar un producto
    }
}

// Evento de cambio para el selector de envío
document.querySelector('.select_carrito').addEventListener('change', actualizarTotal);


// Mostrar dirección guardada en localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const calleGuardada = localStorage.getItem('calle');
    const numeroGuardado = localStorage.getItem('numero');
    const contenedorDireccion = document.getElementById("direccion");

    if (calleGuardada && numeroGuardado) {
        contenedorDireccion.innerText = `Dirección de envío: ${calleGuardada} ${numeroGuardado}`;
    } else {
        contenedorDireccion.innerText = `Dirección de envío: (debe ingresar dirección)`;
    }

    // Guardar nueva dirección cuando se hace clic en el botón
    const botonDirecciones = document.getElementById("botonGuardarDireccion");
    botonDirecciones.addEventListener('click', () => {
        const calle = document.getElementById("calledire").value;
        const numero = document.getElementById("numerodire").value;

        // Guardar en localStorage
        localStorage.setItem('calle', calle);
        localStorage.setItem('numero', numero);

        // Actualizar el contenedor de dirección en pantalla
        if (calle && numero) {
            contenedorDireccion.innerText = `Dirección de envío: ${calle} ${numero}`;
        } else {
            contenedorDireccion.innerText = `Dirección de envío: (debe ingresar dirección)`;
        }

        // Validar después de guardar la dirección
        validarCamposBotonCompra();
    });
});



// Llamar a la función para actualizar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});

// Función para cargar departamentos y ciudades
async function cargarDepartamentosYLocalidades() {
    try {
        // Obtener el JSON desde la URL
        const response = await fetch('https://gist.githubusercontent.com/fedebabrauskas/b708c2a1b7a29af94927ad0e8d6d6a27/raw/b0c544d53c82de298ccedb824f8dd5e5ef5477e7/localidades.json');
        const data = await response.json();

        // Obtener el elemento del select de departamentos
        const selectDepartamento = document.getElementById('state_id');
        selectDepartamento.innerHTML = ''; // Limpiar opciones anteriores

        // Agregar el primer valor "Elija una opción"
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.textContent = 'Seleccione un departamento';
        optionDefault.disabled = true;  // Deshabilita esta opción para que no se pueda seleccionar
        optionDefault.selected = true; // La opción será la seleccionada por defecto
        selectDepartamento.appendChild(optionDefault);

        // Agregar las opciones de departamentos
        Object.keys(data).forEach(departamentoId => {
            const departamentoName = data[departamentoId].name; // Accede al nombre
            const option = document.createElement('option');
            option.value = departamentoId; // Mantenemos el id como valor
            option.textContent = departamentoName; // Mostramos el nombre
            selectDepartamento.appendChild(option);
        });


        // Agregar evento de cambio para cargar las ciudades
        selectDepartamento.addEventListener('change', (e) => {
            cargarCiudades(e.target.value, data);
        });

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para cargar las ciudades basadas en el departamento seleccionado
function cargarCiudades(departamentoId, data) {
    const selectCiudad = document.getElementById('city_id');
    selectCiudad.innerHTML = ''; // Limpiar opciones anteriores

    // Agregar la opción de "Elija una ciudad" como un pseudo-placeholder
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Seleccione una ciudad';
    optionDefault.disabled = true;  // Deshabilita esta opción para que no se pueda seleccionar
    optionDefault.selected = true; // La opción será la seleccionada por defecto
    selectCiudad.appendChild(optionDefault);

    if (departamentoId && data[departamentoId]) {
        // Obtener las ciudades del departamento
        data[departamentoId].towns.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad.id; // Usamos el id de la ciudad como valor
            option.textContent = ciudad.name; // Mostramos el nombre de la ciudad
            selectCiudad.appendChild(option);
        });
    }
}

// Llamar a la función para cargar los departamentos y ciudades
window.onload = cargarDepartamentosYLocalidades;

//Alert - Redes de cobranza
function showMessage(message) {
    alert(message);
}

// Validaciones de método de pago y botón de compra
const botonCobranza = document.getElementById("cobranza");
const botonTarjeta = document.getElementById("tarjeta");
const contenedorCobranza = document.getElementById("contenedor_cobranza");
const contenedorTarjeta = document.getElementById("contenedor_tarjeta");

// Función para alternar la visibilidad de los contenedores
function alternarMetodoPago() {
    if (botonCobranza.checked) {
        contenedorTarjeta.style.display = "none"; // Oculta el contenedor de tarjeta
        contenedorCobranza.style.display = "block"; // Muestra el contenedor de cobranza
    } else if (botonTarjeta.checked) {
        contenedorCobranza.style.display = "none"; // Oculta el contenedor de cobranza
        contenedorTarjeta.style.display = "block"; // Muestra el contenedor de tarjeta
    }
}

// Añadimos los eventos a los botones
botonCobranza.addEventListener("change", alternarMetodoPago);
botonTarjeta.addEventListener("change", alternarMetodoPago);

// Llamamos a la función al cargar la página para establecer el estado inicial
alternarMetodoPago();


//Validar campos de método de pago
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
function validarCamposPago() {
    if (botonCobranza.checked) {
        const inputCedulaCobranza = document.getElementById("inputCedulaCobranza").value;
        botonFinalizarCompra.disabled = !inputCedulaCobranza; // Deshabilita si está vacío

    } else if (botonTarjeta.checked) {
        const numTarjeta = document.getElementById("numTarjeta").value;
        const mesVencimiento = document.getElementById("mesVencimiento").value;
        const anoVencimiento = document.getElementById("anoVencimiento").value;
        const ccv = document.getElementById("ccv").value;
        const nombreTitular = document.getElementById("nombreTitular").value;

        botonFinalizarCompra.disabled = !(numTarjeta && mesVencimiento && anoVencimiento && ccv && nombreTitular);

    } else {
        botonFinalizarCompra.disabled = true;
    }
}

// Eventos para validar en tiempo real
botonCobranza.addEventListener("change", validarCamposPago);
botonTarjeta.addEventListener("change", validarCamposPago);
document.querySelectorAll("#inputCedulaCobranza, #numTarjeta, #mesVencimiento, #anoVencimiento, #ccv, #nombreTitular")
    .forEach(input => input.addEventListener("input", validarCamposPago));
validarCamposPago();


//Validar campos envío, dirección y productos (botón comprar)
const botonCompra = document.getElementById("botonComprar");

function validarCamposBotonCompra() {
    const calle = localStorage.getItem('calle');
    const numero = localStorage.getItem('numero');
    const opcionEnvio = document.querySelector('.select_carrito');
    const productosComprados = JSON.parse(localStorage.getItem('productosComprados')) || [];

    const envioSeleccionado = opcionEnvio && opcionEnvio.value !== "Seleccione una opción"; 
    const direccionValida = calle && numero; 
    const productosDisponibles = productosComprados.length > 0;

    // Habilitar o deshabilitar el botón de compra
    botonCompra.disabled = !(direccionValida && envioSeleccionado && productosDisponibles);
}
// Llamada inicial para asegurarse de que el botón esté bien al cargar la página
validarCamposBotonCompra();

// Evento de cambio para el selector de envío
document.querySelector('.select_carrito').addEventListener('change', validarCamposBotonCompra);

// Validar cuando se cargue el carrito o se actualicen los productos
document.addEventListener('DOMContentLoaded', () => {
    validarCamposBotonCompra();
    actualizarCarrito(); 
});

