const submitSound = new Audio('submit-sound.mp3');
// Modifica el HTML en product-info.js para incluir las clases necesarias
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu-button').addEventListener('click', function (event) {
        window.location.href = 'login.html';
    });
});

//FUNCIÓN EN COMÚN PARA EL DESAFIANTE 2 - mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
});

//INFO PRINCIPAL DEL PRODUCTO
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto almacenado en localStorage
    const productID = localStorage.getItem('productID');

    if (productID) {
        // Construir la URL para obtener los datos del producto
        const productInfoURL = PRODUCT_INFO_URL + productID + EXT_TYPE;

        // Hacer la solicitud para obtener la información del producto
        getJSONData(productInfoURL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                const product = resultObj.data;

                // Generar el contenido HTML para mostrar el producto
                let htmlContentToAppend = `
                    <div class="product-info">
                        <div class="row">
                            <div class="col-md-6">
                                <div id="carouselExample" class="carousel slide">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="${product.images[0]}" class="d-block w-100 carousel-image">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${product.images[1]}" class="d-block w-100 carousel-image">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${product.images[2]}" class="d-block w-100 carousel-image">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="${product.images[3]}" class="d-block w-100 carousel-image">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <p class="product-category">${product.category}</p>
                                <p class="product-name">${product.name}</p>
                                <p class="product-cost">${product.currency} ${product.cost}</p>
                                <p class="product-description">${product.description}</p>
                                <p class="product-sold-count">Cantidad de vendidos: ${product.soldCount}</p>
                                <p class="product-rating" id="product-rating"></p> <!-- Se muestra el promedio de calificaciones del producto -->
                                <button type="submit" id="botonCompra">Comprar</button>
                            </div>
                        </div>
                    </div>
                `;

                // Insertar el contenido generado en el DOM
                document.getElementById('product-info-container').innerHTML = htmlContentToAppend;
            }
        });
    } else {
        console.error('No se encontró ningún ID de producto en el almacenamiento local');
    }
});

//MOSTRAR LOS PRODUCTOS RELACIONADOS
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto almacenado en localStorage
    const productID = localStorage.getItem('productID');

    if (productID) {
        // Construir la URL para obtener los datos del producto
        const productRelacionado = PRODUCT_INFO_URL + productID + EXT_TYPE;

        // Hacer la solicitud para obtener la información del producto
        getJSONData(productRelacionado).then(function (resultObj) {
            if (resultObj.status === "ok") {
                const product = resultObj.data;

                // Generar el contenido HTML para mostrar los productos relacionados
                let htmlContentToAppend = '';

                product.relatedProducts.forEach(item => {
                    const description = `<p class="product-description">${item.name}</p>`;
                    const img = `<img src="${item.image}" alt="${item.name}">`;
                    htmlContentToAppend += `
                    <div class="cardRelated" onclick="setProductRelacionadoID(${item.id})">
                    ${description}
                    ${img}
                    </div>`;
                });

                document.getElementById('product-info-related').innerHTML = htmlContentToAppend;

                //ENTREGA 6 - Parte 2
                // Guardar los datos en localStorage y redirigir al carrito
                document.getElementById('botonCompra').addEventListener('click', function () {
                    // Información del producto a guardar
                    const productComprado = {
                        id: product.id,
                        name: product.name,
                        cost: product.cost,
                        currency: product.currency,
                        image: product.images[0],
                        quantity: 1,
                        subtotal: product.cost * 1
                    };

                    localStorage.setItem('productoComprado', JSON.stringify(productComprado));

                    window.location.href = 'cart.html';
                });
            }
        });

    } else {
        console.error('No se encontró ningún ID de producto en el almacenamiento local');
    }
});

//ENTREGA 4 - INFO DE PRODUCTO RELACIONADO 
function setProductRelacionadoID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

//ENTRGA 4 - SECCIÓN DE CALIFICACIONES
document.addEventListener('DOMContentLoaded', () => {
    const productID = localStorage.getItem('productID');

    if (productID) {
        const commentsAPIURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

        fetch(commentsAPIURL)
            .then(response => response.json())
            .then(comments => {
                mostrarComentarios(comments);

                // Calcular y mostrar el promedio
                const promedio = calcularPromedio(comments); //Llama a la función
                const estrellasPromedio = generarEstrellas(Math.round(promedio)); //Llama a la función
                document.getElementById('product-rating').innerHTML = estrellasPromedio; //Agrega las estrellas en la info del producto

                document.getElementById('comment-form').addEventListener('submit', function (e) {
                    e.preventDefault();
                    const nuevoComentario = capturarComentario();

                    if (nuevoComentario) {
                        comments.push(nuevoComentario);
                        mostrarComentarios(comments);

                        // Recalcular y mostrar el nuevo promedio
                        const nuevoPromedio = calcularPromedio(comments);
                        const nuevasEstrellas = generarEstrellas(Math.round(nuevoPromedio));
                        document.getElementById('product-rating').innerHTML = nuevasEstrellas;

                        submitSound.play();
                        document.getElementById('comment-form').reset();
                    } else {
                        alert("Por favor selecciona una calificación.");
                    }
                });
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    } else {
        console.error('No se encontró ningún ID de producto en el almacenamiento local');
    }

    function capturarComentario() {
        // Obtener la calificación seleccionada
        const calificacion = document.querySelector('input[name="rating"]:checked');

        if (!calificacion) {
            return null; // Si no se seleccionó ninguna estrella, retornar null
        }

        const comentario = document.getElementById('mensaje').value;

        return {
            user: localStorage.getItem('username'),
            dateTime: new Date().toISOString(),
            description: comentario,
            score: parseInt(calificacion.value)
        };
    }

    //Formato de fecha y hora para que quede así -> dd/mm/yyyy, hh:mm y luego se llama esta función en MostrarComentarios()
    function formatoFecha(fechaString) {
        const fecha = new Date(fechaString);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const año = fecha.getFullYear();
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${año}, ${horas}:${minutos}`;
    }

    // Función para mostrar los comentarios
    function mostrarComentarios(comentarios) {
        let htmlContentToAppend = '';
        comentarios.forEach(item => {
            let estrellas = generarEstrellas(item.score);
            let fechaFormateada = formatoFecha(item.dateTime);
            htmlContentToAppend += `
                <div class="comment">
                    <img src="img/profile photo.jpg" alt="profile" class="profile-icon">
                    <strong>${item.user}</strong>
                    <span class="date">${fechaFormateada}</span>
                    <div class="comment"> ${item.description}</div>
                    <span> ${estrellas}</span>
                </div>
                <hr>`;
        });
        document.getElementById('comments-container').innerHTML = htmlContentToAppend;
    }

    // Función para generar estrellas
    function generarEstrellas(score) {
        let estrellasHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                estrellasHTML += '<span class="fa fa-star checked"></span>';
            } else {
                estrellasHTML += '<span class="fa fa-star nochecked"></span>';
            }
        }
        return estrellasHTML;
    }

    function calcularPromedio(comentarios) {
        const total = comentarios.reduce((sum, item) => sum + item.score, 0);
        return (total / comentarios.length) || 0; // Evitar dividir por 0
    }
});

