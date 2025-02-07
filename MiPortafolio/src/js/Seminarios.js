const jsonFile3 = '../assets/doc/Cer-Semin.json'; 
const galleryContainer3 = document.querySelector('.gallery-container-3');
const categoryElements3 = document.querySelectorAll('.card-prueba span');
const galleryControlsContainer3 = document.querySelector('.gallery-controls-3');
const galleryControls3 = ['anterior', 'siguiente'];

class Carousel3 {
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
      galleryControlsContainer3.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer3.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

// Función para abrir el modal
function openModal3(imageSrc, imageAlt) {
  const modal = document.getElementById('imageModal3');
  const modalImage = document.getElementById('modalImage3');
  const caption = document.getElementById('caption3');

  modal.style.display = "block";
  modalImage.src = imageSrc;
  caption.innerText = imageAlt;
}

// Función para cerrar el modal
function closeModal3() {
  const modal = document.getElementById('imageModal3');
  modal.style.display = "none";
}

// Evento de cierre del modal
document.getElementById('closeModal3').addEventListener('click', closeModal3);

// Evento para cerrar el modal si se hace clic fuera de la imagen
window.addEventListener('click', (e) => {
  const modal = document.getElementById('imageModal3');
  if (e.target === modal) {
    closeModal3();
  }
});

// Función para cargar todos los certificados inicialmente
function loadGallery3() {
  return fetch(jsonFile3)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenedor y agregar las imágenes
      galleryContainer3.innerHTML = '';
      data.certificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer3.appendChild(img);
      });

      // Devuelve las imágenes cargadas
      assignModalEvents();
      return document.querySelectorAll('.gallery-item');
    })
    .catch(error => console.error('Error al cargar los certificados:', error));
}

// Función para cargar certificados filtrados por categoría
function loadCertificates3(category) {
  fetch(jsonFile3)
    .then(response => response.json())
    .then(data => {
      // Filtrar certificados por categoría
      const filteredCertificates = data.certificates.filter(cert => cert.category === category);
      galleryContainer3.innerHTML = '';

      // Limpiar el contenedor de la galería
      galleryContainer3.innerHTML = '';

      // Agregar los certificados filtrados
      filteredCertificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer3.appendChild(img);
      });

      // Actualizar el carrusel con las nuevas imágenes
      assignModalEvents();
      const newItems = document.querySelectorAll('.gallery-item');
      exampleCarousel3.carouselArray = [...newItems];
      exampleCarousel3.updateGallery();
    })
    .catch(error => console.error('Error al cargar certificados por categoría:', error));
}

// Agregar eventos a las categorías
categoryElements3.forEach(el => {
  el.addEventListener('click', () => {
    const category = el.dataset.category;
    loadCertificates3(category);
  });
});

// Inicializar la galería y el carrusel
let exampleCarousel3;
loadGallery3().then(galleryItems => {
  exampleCarousel3 = new Carousel3(galleryContainer3, galleryItems, galleryControls3);
  exampleCarousel3.setControls();
  exampleCarousel3.useControls();
});
