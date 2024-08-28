//EXTRAEMOS DATOS DEL JSON Y LOS AGREGAMOS A LA TABLA
const AUTOS_DATOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const container = document.getElementById("tabla");

function showData(dataArray) {
  for (const item of dataArray) {
    const tr_autos = document.createElement('tr');
    tr_autos.innerHTML += `
    <td><img src="${item.image}" alt="${item.name}" style="max-width: 150px;"></td>
    <td>"${item.name}"</td>
    <td>"${item.description}"</td>
    <td>"${item.cost}"</td>
    <td>"${item.soldCount}"</td>
    `;
    container.appendChild(tr_autos);
  }
}


fetch(AUTOS_DATOS)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  })
  .then(function(data){
    showData(data.products);
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  });

//AGREGAMOS EL BOTÓN DE CERRAR SESIÓN A LA PÁGINA DE PRODUCTOS
document.getElementById('menu-button').addEventListener('click',function(event) {
  window.location.href= 'login.html' 
  });