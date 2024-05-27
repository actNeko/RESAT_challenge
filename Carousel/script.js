let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

function showSlide() {
  slider.style.transform = `translateX(-${currentSlide * 460}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  if (0 < currentSlide < slides.length) {
    showSlide();
  }
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  if (0 < currentSlide < slides.length) {
    showSlide();
  }
}

// Initialize the slider
showSlide();
