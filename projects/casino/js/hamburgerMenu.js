let menuButton = document.querySelector(".hamburger");
let mobileMenu = document.querySelector(".mobile-nav");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
});