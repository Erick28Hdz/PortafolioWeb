// Objeto con información de cada país
const countries = {
    colombia: { name: 'Colombia', info: 'Naci en Colombia, actualmente conozco pocas ciudades y algunos municipios de este basto territorio.', image: 'MiPortafolio/src/assets/images/Imagenes/colombia.png'},
    ecuador: { name: 'Ecuador', info: 'Vivi algunos años, conozco gran parte de sus ciudades principales y pude conocer gran parte de sus territorios y culturas.', image: 'MiPortafolio/src/assets/images/Imagenes/ecuador.png'},
    peru: { name: 'Perú', info: 'Recorri todo el país por la principal vía y estuve viviendo en la capital durante unos 3 meses.', image: 'MiPortafolio/src/assets/images/Imagenes/peru.png'},
    bolivia: { name: 'Bolivia', info: 'Tan solo estuve una semana en este espectacular país, conoci dos ciudades.', image: 'MiPortafolio/src/assets/images/Imagenes/bolivia.png'}// Agrega otros países aquí
};

document.querySelectorAll('.country').forEach(country => {
    country.addEventListener('click', function() {
        const id = this.id.toLowerCase(); // Asegúrate de que los IDs estén en minúsculas
        const infoBox = document.getElementById('info-box');
        const countryImage = document.getElementById('country-image');
        const countryName = document.getElementById('country-name');
        const countryInfo = document.getElementById('country-info');

        // Verifica que el país existe en el objeto countries
        if (countries[id]) {
            countryImage.src = countries[id].image;
            countryName.textContent = countries[id].name;
            countryInfo.textContent = countries[id].info;
            infoBox.style.display = 'block';
        }
    });
});