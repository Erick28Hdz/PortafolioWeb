const jsonFile4 = '../assets/doc/Cer-crediU.json'; 
const galleryContainer4 = document.querySelector('.gallery-container-4');
const categoryElements4 = document.querySelectorAll('.card-prueba span');
const galleryControlsContainer4 = document.querySelector('.gallery-controls-4');
const galleryControls4 = ['anterior', 'siguiente'];

class Carousel4 {
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
      galleryControlsContainer4.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer4.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

// Función para abrir el modal
function openModal4(imageSrc, imageAlt) {
  const modal = document.getElementById('imageModal4');
  const modalImage = document.getElementById('modalImage4');
  const caption = document.getElementById('caption4');

  modal.style.display = "block";
  modalImage.src = imageSrc;
  caption.innerText = imageAlt;
}

// Función para cerrar el modal
function closeModal4() {
  const modal = document.getElementById('imageModal4');
  modal.style.display = "none";
}

// Evento de cierre del modal
document.getElementById('closeModal4').addEventListener('click', closeModal4);

// Evento para cerrar el modal si se hace clic fuera de la imagen
window.addEventListener('click', (e) => {
  const modal = document.getElementById('imageModal4');
  if (e.target === modal) {
    closeModal4();
  }
});

// Función para cargar todos los certificados inicialmente
function loadGallery4() {
  return fetch(jsonFile4)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenedor y agregar las imágenes
      galleryContainer4.innerHTML = '';
      data.certificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer4.appendChild(img);
      });

      // Devuelve las imágenes cargadas
      assignModalEvents();
      return document.querySelectorAll('.gallery-item');
    })
    .catch(error => console.error('Error al cargar los certificados:', error));
}

// Función para cargar certificados filtrados por categoría
function loadCertificates4(category) {
  fetch(jsonFile4)
    .then(response => response.json())
    .then(data => {
      // Filtrar certificados por categoría
      const filteredCertificates = data.certificates.filter(cert => cert.category === category);
      galleryContainer4.innerHTML = '';

      // Limpiar el contenedor de la galería
      galleryContainer4.innerHTML = '';

      // Agregar los certificados filtrados
      filteredCertificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer4.appendChild(img);
      });

      // Actualizar el carrusel con las nuevas imágenes
      assignModalEvents();
      const newItems = document.querySelectorAll('.gallery-item');
      exampleCarousel4.carouselArray = [...newItems];
      exampleCarousel4.updateGallery();
    })
    .catch(error => console.error('Error al cargar certificados por categoría:', error));
}

// Agregar eventos a las categorías
categoryElements4.forEach(el => {
  el.addEventListener('click', () => {
    const category = el.dataset.category;
    loadCertificates4(category);
  });
});

// Inicializar la galería y el carrusel
let exampleCarousel4;
loadGallery4().then(galleryItems => {
  exampleCarousel4 = new Carousel4(galleryContainer4, galleryItems, galleryControls4);
  exampleCarousel4.setControls();
  exampleCarousel4.useControls();
  categoryElements[0].click();
});
