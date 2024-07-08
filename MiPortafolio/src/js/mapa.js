// Objeto con información de cada país
const countries = {
    colombia: { name: 'Colombia', info: 'Has visitado Colombia, conocido por su café y la diversidad cultural.'},
    ecuador: { name: 'Ecuador', info: 'Has visitado Colombia, conocido por su café y la diversidad cultural.'},
    peru: { name: 'Perú', info: 'Has visitado Colombia, conocido por su café y la diversidad cultural.'},
    bolivia: { name: 'Bolivia', info: 'Has visitado Colombia, conocido por su café y la diversidad cultural.'}// Agrega otros países aquí
};

document.querySelectorAll('.country').forEach(country => {
    country.addEventListener('mouseover', function(e) {
        const id = this.id.toLowerCase(); // Asegúrate de que los IDs estén en minúsculas
        const tooltip = document.getElementById('tooltip');
        
        // Verifica que el país existe en el objeto countries
        if (countries[id]) {
            tooltip.textContent = countries[id].name;
            tooltip.style.display = 'block';
            tooltip.style.left = (e.pageX + 10) + 'px';
            tooltip.style.top = (e.pageY + 10) + 'px';
        }
    });

    country.addEventListener('mousemove', function(e) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY + 10) + 'px';
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