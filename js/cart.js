document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

const productoComprado = localStorage.getItem('productoComprado');

// Verificar si existe algún producto
if (!productoComprado) {
    let htmlContentToAppend = `
        <h5>No hay productos</h5>
    `;

    // Insertar el contenido generado en el DOM, accediendo al primer elemento de la colección
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
            <a class="border" href="#">-</a><a href="#" class="border">${producto.quantity}</a><a class="border" href="#">+</a>
        </div>
        <div class="col">&dollar; ${producto.cost} <span class="close">&#10005;</span></div>
    `;

    // Insertar el contenido generado en el DOM, accediendo al primer elemento de la colección
    document.getElementsByClassName('texto_producto')[0].innerHTML = htmlContentToAppend;
}
