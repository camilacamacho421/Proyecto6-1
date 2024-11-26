const CATEGORIES_URL = "http://localhost:3000/categories"; // Ruta del backend para categorías
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish"; // Cambia según tu backend si lo implementas
const PRODUCTS_URL = "http://localhost:3000/category-products/"; // Productos por categoría
const PRODUCT_INFO_URL = "http://localhost:3000/product/"; // Información del producto individual
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comments/"; // Cambia según tu backend si lo implementas
const CART_INFO_URL = "http://localhost:3000/cart"; // Información del carrito
const CART_BUY_URL = "http://localhost:3000/cart"; // Comprar (usa la misma ruta si devuelve el JSON)
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


let getJSONData = function(url){ 
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}