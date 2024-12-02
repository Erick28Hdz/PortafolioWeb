// Variable para almacenar el índice del certificado que se mostrará en cada categoría
let currentCertificateIndex = 0;
let currentCategory = "";

// Función para cargar y mostrar certificados según la categoría y el índice seleccionados
async function cargarCertificados(categoriaSeleccionada) {
    try {
        const response = await fetch('/MiPortafolio/src/assets/doc/Datos.json');
        const data = await response.json();

        // Buscar la categoría seleccionada en los datos JSON
        const categoria = data.certificados.find(cat => cat.categoria === categoriaSeleccionada);

        if (categoria && categoria.certificados.length > 0) {
            const certificados = categoria.certificados;
            
            // Asegurarse de que el índice esté dentro del rango de certificados disponibles
            if (currentCertificateIndex >= certificados.length) {
                currentCertificateIndex = 0;
            } else if (currentCertificateIndex < 0) {
                currentCertificateIndex = certificados.length - 1;
            }

            // Selecciona el certificado actual usando currentCertificateIndex
            const certificado = certificados[currentCertificateIndex];

            // Actualizar la tarjeta con los datos del certificado seleccionado
            const card = document.querySelector('.card');
            const img = card.querySelector('img');
            const title = card.querySelector('.card__title');
            const institution = card.querySelectorAll('.card__description')[0];
            const dateLocation = card.querySelectorAll('.card__description')[1];

            img.src = certificado.imagen || "../assets/images/placeholder.jpg"; // Imagen por defecto si falta
            title.textContent = certificado.nombre;
            institution.textContent = certificado.institucion;
            dateLocation.innerHTML = `${certificado.fecha} <br> ${certificado.lugar}`;
        } else {
            console.log('No se encontraron certificados para esta categoría');
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para avanzar al siguiente certificado en la categoría actual
function siguienteCertificado() {
    currentCertificateIndex++;
    cargarCertificados(currentCategory);
}

// Función para retroceder al certificado anterior en la categoría actual
function anteriorCertificado() {
    currentCertificateIndex--;
    cargarCertificados(currentCategory);
}

// Evento para cambiar la categoría al hacer clic en el nombre de la categoría
document.querySelectorAll('.card-prueba p').forEach(element => {
    element.addEventListener('click', () => {
        currentCategory = element.textContent.trim();
        currentCertificateIndex = 0; // Reiniciar el índice al cambiar de categoría
        cargarCertificados(currentCategory);
    });
});
