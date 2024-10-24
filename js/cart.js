document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

const productoComprado = localStorage.getItem('productoComprado');

// Verificar si existe algún producto
if (!productoComprado) {
    let htmlContentToAppend = `
        <p>No hay productos</p>
    `;

    // Insertar el contenido generado en el DOM, accediendo al primer elemento de la colección
    document.getElementsByClassName('texto_producto')[0].innerHTML = htmlContentToAppend;
} else {
    let htmlContentToAppend = `
        <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"></div>
        <div class="col">
            <div class="row text-muted">Shirt</div>
            <div class="row">Cotton T-shirt</div>
        </div>
        <div class="col">
            <a class="border" href="#">-</a><a href="#" class="border">1</a><a class="border" href="#">+</a>
        </div>
        <div class="col">&dollar; 44.00 <span class="close">&#10005;</span></div>
    `;

    // Insertar el contenido generado en el DOM, accediendo al primer elemento de la colección
    document.getElementsByClassName('texto_producto')[0].innerHTML = htmlContentToAppend;
}
