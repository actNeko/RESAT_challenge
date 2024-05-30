// script.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const bottomMenu = document.querySelector(".bottom-menu");

  hamburger.addEventListener("click", () => {
    bottomMenu.classList.toggle("show-menu");
  });
});
