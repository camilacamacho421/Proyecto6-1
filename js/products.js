const DATACARS = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

const probandoAutos = document.getElementById("probandoAutos");

function showData(dataArray) {
    // El for itera sobre los elementos del array
    for (const item of dataArray) {

      let cardDiv = document.createElement('div');
      cardDiv.className = "cardAuto";
      cardDiv.innerHTML += `
      <img src= "${item.image}" alt= "${item.description}">
      <p class="modelo"> ${item.name} </p> 
      <p class="description">${item.description} </p>       
      <p class="precio">${item.currency}${item.cost}</p> 
      <p class="vendidos"> Cantidad de Vendidos: ${item.soldCount}</p>
      `; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor

      // Añadir la tarjeta al contenedor principal
    probandoAutos.appendChild(cardDiv);
}
};


fetch(DATACARS)
.then((res) =>{
console.log(res);
return res.ok? res.json(): Promise.reject(res); //esto hace que: si la respuesta es ok manda un rest.json y sino rechaza la promesa
})
.then(data => {
// Acceso al array products dentro de data 
const products = data.products;
showData(products); // Paso products array para la funcion showData
})
.catch((err) => {
console.log(err);
let message = err.statusText || "Ocurrió un error";
probandoAutos.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
})
.finally(() => 
console.log('Operación de fetch completada.'));


//FUNCIÓN EN COMÚN PARA EL DESAFIANTE
document.addEventListener('DOMContentLoaded', () => {
  Desafiante();
});