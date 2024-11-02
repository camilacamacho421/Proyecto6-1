document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//FUNCIÓN EN COMÚN PARA EL DESAFIANTE
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

//Funcion para ver el badget ENTREGA 6
document.addEventListener('DOMContentLoaded', () => {
    manejarBadgeCarrito();
});