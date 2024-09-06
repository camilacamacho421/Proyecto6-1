//FUNCIÓN sortCategories ES PARA LOS FILTROS

const ORDER_DESC_BY_PRICE = "↓P"; //ENTREGA 3: CAMBIÉ NOMBRES DE LAS VARIABLES DE LOS FILTROS
const ORDER_ASC_BY_PRICE = "↑P";
const ORDER_BY_PROD_RELEVANCE = "REL"; 
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];


    if (criteria === ORDER_DESC_BY_PRICE)
      {
      result = array.sort(function(a, b) {
        let aPrice = parseInt(a.cost); // ENTREGA 3: COPIÉ EL 3ER ELSE IF (ORDER_BY_PROD RELEVANCE), CAMBIÉ solCount POR COST PARA QUE TOME EL PRECIO Y EL ORDEN DE LOS SIMBOLOR <>
        let bPrice = parseInt(b.cost);

        if ( aPrice  < bPrice ){ return -1; }
        if ( bPrice > bPrice ){ return 1; }
        return 0;
        });
 
      } else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
          let aPrice = parseInt(a.cost); // ENTREGA 3: COPIÉ EL 3ER ELSE IF (ORDER_BY_PROD RELEVANCE) Y CAMBIÉ solCount POR COST PARA QUE TOME EL PRECIO
          let bPrice = parseInt(b.cost);
  
          if ( aPrice  > bPrice ){ return -1; }
          if ( bPrice < bPrice ){ return 1; }
          return 0;
          });
    
      } else if (criteria === ORDER_BY_PROD_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); // ENTREGA 3: CAMBIÉ POR VARIABLE COSTO EN VEZ DE CANTIDAD Y NOMBRE DE LA VARIABLE
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
          });
        }
    return result;
}

//FUNCIÓN showCategoriesList ES LA QUE MUESTRA LOS PRODUCTOS EN LA TARJETAS
//LA FUNCIÓN setProductId la usa showCategoriesList. Guarda el Id en local storage y redirecciona a products-info. 

function setProductID(id) {
    localStorage.setItem("productID", id); //ENTREGA 3: AHORA GUARDA EL PRODUCTID EN VEZ DE CATID (SE PIDE 4.1)
    window.location = "product-info.html" 
}

function showCategoriesList(){
  let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let product = currentCategoriesArray[i];

        //ENTREGA 3: Cambié rango a product.cost y agregué currency y cost en la etiqueta.
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
             <div class="cardAuto">
                <div onclick="setProductID(${product.id})" class="list-group-item-action cursor-active">
                <img src= "${product.image}" alt= "${product.description}">
                <p class="modelo"> ${product.name} </p> 
                <p class="description">${product.description} </p>       
                <p class="precio">${product.currency} ${product.cost}</p> 
                <p class="vendidos"> Cantidad de Vendidos: ${product.soldCount}</p>
                
            </div>
             </div>
            `
          
        }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
};

//FUNCIÓN sortAndShowCategorie FUSIONA LAS DOS FUNCIONES ANTERIORES. FILTRA Y MUESTRA.

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}



// ENTREGA 3: Modifico URL para que asocie el catID y lleve al JSON correcto.

const PRODUCTS_URL_MODIFICADA = PRODUCTS_URL+localStorage.getItem("catID")+".json" 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL_MODIFICADA).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products // ENTREGA 3: AGREGUÉ .PRODUCTS PARA QUE BUSQUE EN EL ARRAY DE PRODUCTOS
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });



    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});



//FUNCIÓN EN COMÚN PARA EL DESAFIANTE 2 - mostrar usuario
document.addEventListener('DOMContentLoaded', () => {
  Desafiante();
});

//ENTREGA 3
//PARA MOSTRAR TÍTULO "Verás aquí todos los productos de la categoría" defino función para que traiga nombre de categoría y hago fetch.
// URL del endpoint que devuelve los datos en formato JSON

function fetchCategoryName() {
    fetch(PRODUCTS_URL_MODIFICADA)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const catName = data.catName;
            const categoryNameElement = document.getElementById('category-name');
            categoryNameElement.textContent = catName;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Llama a la función cuando la página se haya cargado
window.onload = fetchCategoryName;

// Llama a la función cuando la página se haya cargado
window.onload = fetchCategoryName;