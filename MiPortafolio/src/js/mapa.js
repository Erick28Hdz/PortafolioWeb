// Objeto con información de cada país
const countries = {
    colombia: { name: 'Colombia', info: 'Naci en Colombia, actualmente conozco pocas ciudades y algunos municipios de este basto territorio.'},
    ecuador: { name: 'Ecuador', info: 'Vivi algunos años, conozco gran parte de sus ciudades principales y pude conocer gran parte de sus territorios y culturas.'},
    peru: { name: 'Perú', info: 'Recorri todo el país por la principal vía y estuve viviendo en la capital durante unos 3 meses.'},
    bolivia: { name: 'Bolivia', info: 'Tan solo estuve una semana en este espectacular país, conoci dos ciudades.'}// Agrega otros países aquí
};

document.querySelectorAll('.country').forEach(country => {
    country.addEventListener('mouseover', function(e) {
        const id = this.id.toLowerCase(); // Asegúrate de que los IDs estén en minúsculas
        const tooltip = document.getElementById('tooltip');

        // Verifica que el país existe en el objeto countries
        if (countries[id]) {
            tooltip.textContent = countries[id].name;
            tooltip.style.display = 'block';
            tooltip.style.left = Math.min(e.clientX + 10, window.innerWidth - tooltip.offsetWidth - 10) + 'px'; // Ajuste para no salir del viewport
            tooltip.style.top = (e.clientY + 10) + 'px';
        }
    });

    country.addEventListener('mousemove', function(e) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.left = Math.min(e.clientX + 10, window.innerWidth - tooltip.offsetWidth - 10) + 'px'; // Ajuste para evitar scroll
        tooltip.style.top = (e.clientY + 10) + 'px';
    });

    country.addEventListener('mouseout', function() {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    });

    country.addEventListener('click', function() {
        const id = this.id.toLowerCase(); // Asegúrate de que los IDs estén en minúsculas
        const infoBox = document.getElementById('info-box');
        const countryName = document.getElementById('country-name');
        const countryInfo = document.getElementById('country-info');

        // Verifica que el país existe en el objeto countries
        if (countries[id]) {
            countryName.textContent = countries[id].name;
            countryInfo.textContent = countries[id].info;
            infoBox.style.display = 'block';
        }
    });
});