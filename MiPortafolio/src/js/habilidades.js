document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll(".radio-inputs input");
    const sections = document.querySelectorAll(".imagen-contenedor");
    const containers = document.querySelectorAll(".container-hab");

    function showSection(selectedId) {
        sections.forEach(section => {
            section.style.display = section.id === selectedId ? "block" : "none";
        });
        
        containers.forEach(container => {
            container.style.display = container.id === selectedId ? "block" : "none";
        });
    }

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            showSection(this.value);
        });
    });

    showSection("ofimatica"); // Mostrar la primera imagen y contenedor por defecto
});