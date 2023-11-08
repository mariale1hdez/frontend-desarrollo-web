const gallery = document.querySelector('.image-gallery');
const slides = document.querySelectorAll('.gallery-slide');
let currentIndex = 0;

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    const translateValue = -currentIndex * 100;
    gallery.style.transform = `translateX(${translateValue}%)`;
}

setInterval(nextSlide, 3000); // Cambia de diapositiva cada 3 segundos (ajusta el tiempo según lo desees)
