let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const slideInterval = 2000; // 2초 간격

function showSlide() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide();
}

function startAutoSlide() {
  setInterval(nextSlide, slideInterval);
}

// 슬라이드 초기화 및 자동 슬라이드 시작
showSlide();
startAutoSlide();
