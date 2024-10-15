//FUNCIÓN EN COMÚN PARA REDIRIGIR (OPCIONES MENU DESPLEGABLE)
document.addEventListener('DOMContentLoaded', () => {
    Desafiante();

    // Cargar la foto de perfil desde localStorage al cargar la página
    const storedPic = localStorage.getItem('FotoPerfil');
    if (storedPic) {
        const imagenElement = document.getElementById('imagenPerfil');
        imagenElement.src = storedPic;
        imagenElement.style.display = 'block';
    }

});

// Variable para el correo
const username = localStorage.getItem('username');
document.getElementById('email').value = username;

// Validación del formulario
(function () {
    'use strict';
    const form = document.getElementById('miFormulario');
    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            // Agregar la clase de validación a cada input
            Array.from(form.elements).forEach(input => {
                if (input.required && !input.value) {
                    input.classList.add('is-invalid');
                }
            });

            alert("Faltan campos por completar.");
        } else {
            alert("Formulario enviado con éxito.");
            const nombre = document.querySelector('#nombre').value;
            const apellido = document.querySelector('#apellido').value;
            const email = document.querySelector('#email').value;
            const fotoPerfil = document.querySelector('#fotoPerfil');

            localStorage.setItem('Nombre', nombre);
            localStorage.setItem('Apellido', apellido);
            localStorage.setItem('Email', email);
            localStorage.setItem("username", email);

            // Si hay un archivo de imagen seleccionado
            if (fotoPerfil.files.length > 0) {
                const file = fotoPerfil.files[0];
                const reader = new FileReader();

                // Cuando el archivo se haya leído
                reader.onload = function (e) {
                    const imagenElement = document.getElementById('imagenPerfil');
                    imagenElement.src = e.target.result; // Establecer la imagen
                    imagenElement.style.display = 'block'; // Hacer visible la imagen

                    // Almacenar la URL de la imagen en localStorage
                    localStorage.setItem('FotoPerfil', e.target.result);
                }

                reader.readAsDataURL(file); // Leer el archivo como URL
            } else {
                console.log('No se ha seleccionado ninguna imagen.');
            }
        }
        form.classList.add('was-validated');
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.trim() === '') {
                // Si el campo está vacío, eliminar las clases de validación
                this.classList.remove('is-valid', 'is-invalid');
            } else if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
})();