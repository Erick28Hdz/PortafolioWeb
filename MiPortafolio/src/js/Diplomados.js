const jsonFile2 = '../assets/doc/Cer-diplo.json'; 
const galleryContainer2 = document.querySelector('.gallery-container-2');
const categoryElements2 = document.querySelectorAll('.card-prueba span');
const galleryControlsContainer2 = document.querySelector('.gallery-controls-2');
const galleryControls2 = ['anterior', 'siguiente'];

class Carousel2 {
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
      galleryControlsContainer2.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer2.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

// Función para abrir el modal
function openModal2(imageSrc, imageAlt) {
  const modal = document.getElementById('imageModal2');
  const modalImage = document.getElementById('modalImage2');
  const caption = document.getElementById('caption2');

  modal.style.display = "block";
  modalImage.src = imageSrc;
  caption.innerText = imageAlt;
}

// Función para cerrar el modal
function closeModal2() {
  const modal = document.getElementById('imageModal2');
  modal.style.display = "none";
}

// Evento de cierre del modal
document.getElementById('closeModal2').addEventListener('click', closeModal2);

// Evento para cerrar el modal si se hace clic fuera de la imagen
window.addEventListener('click', (e) => {
  const modal = document.getElementById('imageModal2');
  if (e.target === modal) {
    closeModal2();
  }
});

// Función para cargar todos los certificados inicialmente
function loadGallery2() {
  return fetch(jsonFile2)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenedor y agregar las imágenes
      galleryContainer2.innerHTML = '';
      data.certificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;

        // Añadir evento de click para abrir el modal
        img.addEventListener('click', () => openModal2(cert.src, cert.alt));

        galleryContainer2.appendChild(img);
      });

      // Devuelve las imágenes cargadas
      return document.querySelectorAll('.gallery-item');
    })
    .catch(error => console.error('Error al cargar los certificados:', error));
}

// Función para cargar certificados filtrados por categoría
function loadCertificates2(category) {
  fetch(jsonFile2)
    .then(response => response.json())
    .then(data => {
      // Filtrar certificados por categoría
      const filteredCertificates = data.certificates.filter(cert => cert.category === category);

      // Limpiar el contenedor de la galería
      galleryContainer2.innerHTML = '';

      // Agregar los certificados filtrados
      filteredCertificates.forEach(cert => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        img.src = cert.src;
        img.alt = cert.alt;
        galleryContainer2.appendChild(img);
      });

      // Actualizar el carrusel con las nuevas imágenes
      const newItems = document.querySelectorAll('.gallery-item');
      exampleCarousel2.carouselArray = [...newItems];
      exampleCarousel2.updateGallery();
    })
    .catch(error => console.error('Error al cargar certificados por categoría:', error));
}

// Agregar eventos a las categorías
categoryElements2.forEach(el => {
  el.addEventListener('click', () => {
    const category = el.dataset.category;
    loadCertificates2(category);
  });
});

// Inicializar la galería y el carrusel
let exampleCarousel2;
loadGallery2().then(galleryItems => {
  exampleCarousel2 = new Carousel2(galleryContainer2, galleryItems, galleryControls2);
  exampleCarousel2.setControls();
  exampleCarousel2.useControls();
});
