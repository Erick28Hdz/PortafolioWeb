const jsonFile = '/MiPortafolio/src/assets/doc/Datos.json';
const galleryContainer = document.querySelector('.gallery-container');
const categoryElements = document.querySelectorAll('.card-prueba span');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['anterior', 'siguiente'];

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];

    this.updateGallery();
  }

  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item1', 'gallery-item2', 'gallery-item3', 'gallery-item4', 'gallery-item5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item${i + 1}`);
    });
  }

  setCurrentState(direction) {
    if (direction.className.includes('gallery-controls-anterior')) {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      const button = document.createElement('button');
      button.className = `gallery-controls-${control}`;
      button.innerText = control;
      galleryControlsContainer.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

// Función para cargar todos los certificados inicialmente
function loadGallery() {
  return fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenedor y agregar las imágenes
      galleryContainer.innerHTML = '';
      data.certificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer.appendChild(img);
      });

      // Devuelve las imágenes cargadas
      return document.querySelectorAll('.gallery-item');
    })
    .catch(error => console.error('Error al cargar los certificados:', error));
}

// Función para cargar certificados filtrados por categoría
function loadCertificates(category) {
  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // Filtrar certificados por categoría
      const filteredCertificates = data.certificates.filter(cert => cert.category === category);

      // Limpiar el contenedor de la galería
      galleryContainer.innerHTML = '';

      // Agregar los certificados filtrados
      filteredCertificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer.appendChild(img);
      });

      // Actualizar el carrusel con las nuevas imágenes
      const newItems = document.querySelectorAll('.gallery-item');
      exampleCarousel.carouselArray = [...newItems];
      exampleCarousel.updateGallery();
    })
    .catch(error => console.error('Error al cargar certificados por categoría:', error));
}

// Agregar eventos a las categorías
categoryElements.forEach(el => {
  el.addEventListener('click', () => {
    const category = el.dataset.category;
    loadCertificates(category);
  });
});

// Inicializar la galería y el carrusel
let exampleCarousel;
loadGallery().then(galleryItems => {
  exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
  exampleCarousel.setControls();
  exampleCarousel.useControls();
});