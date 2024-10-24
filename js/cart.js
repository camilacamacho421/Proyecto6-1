//FUNCIÓN EN COMÚN PARA REDIRIGIR (OPCIONES MENU DESPLEGABLE)
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

if (!productoComprado) {
    let htmlContentToAppend = `
                    No hay productos
                `;

    // Insertar el contenido generado en el DOM
    document.getElementsById('mostrarProductos').innerHTML = htmlContentToAppend;
}

else {
    let htmlContentToAppend = `
    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"></div>
                        <div class="col">
                            <div class="row text-muted">Shirt</div>
                            <div class="row">Cotton T-shirt</div>
                        </div>
                        <div class="col">
                            <a class="border" href="#">-</a><a href="#" class="border">1</a><a class="border" href="#">+</a>
                        </div>
                        <div class="col">&dollar; 44.00 <span class="close">&#10005;</span></div>
                    </div>
                `;
    
                

    // Insertar el contenido generado en el DOM
    document.getElementsByClassName('row main align-items-center').innerHTML = htmlContentToAppend;
}