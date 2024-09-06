document.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('menu-button').addEventListener('click',function(event) {
        window.location.href= 'login.html' 
        });
    });

    //FUNCIÓN EN COMÚN PARA EL DESAFIANTE 2 - mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();
  });

    document.addEventListener('DOMContentLoaded', () => {
        // Obtener el ID del producto almacenado en localStorage
        const productID = localStorage.getItem('productID');
        
        if (productID) {
            // Construir la URL para obtener los datos del producto
            const productInfoURL = PRODUCT_INFO_URL + productID + EXT_TYPE;
            
            // Hacer la solicitud para obtener la información del producto
            getJSONData(productInfoURL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    const product = resultObj.data;
                    
                    // Generar el contenido HTML para mostrar el producto
                    let htmlContentToAppend = `
                        <div class="product-info">
                            <h1>${product.name}</h1>
                            <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img src="${product.images[0]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                            <img src="${product.images[1]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                            <img src="${product.images[2]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                            <img src="${product.images[3]}" class="d-block w-100" alt="...">
                            </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" color="black">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                            </button>
                            </div>
                            <p class="product-category">Categoria: ${product.category}</p>
                            <p class="product-description">${product.description}</p>
                            <p class="product-cost">${product.currency} ${product.cost}</p>
                            <p class="product-sold-count">Cantidad Vendida: ${product.soldCount}</p>
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
    