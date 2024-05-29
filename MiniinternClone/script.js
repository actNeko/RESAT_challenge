let currentSlide = 0;
const slides = document.querySelectorAll(".slide-img");
const slider = document.querySelector(".banner-slide");
const dots = document.querySelectorAll(".dot");
const slideInterval = 3000; // 3초 간격

function showSlide(index) {
  currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

function startAutoSlide() {
  setInterval(nextSlide, slideInterval);
}

// Initialize the slider and start auto sliding
showSlide(currentSlide);
startAutoSlide();
