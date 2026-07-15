document.addEventListener("templates:loaded", () => {
  const gallery = document.querySelector(".featured-gallery-swiper");

  if (!gallery || typeof Swiper === "undefined" || typeof GLightbox === "undefined") {
    return;
  }

  new Swiper(gallery, {
    slidesPerView: 1.15,
    spaceBetween: 16,
    watchOverflow: true,
    navigation: {
      nextEl: ".featured-gallery-next",
      prevEl: ".featured-gallery-prev"
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });

  GLightbox({
    selector: "[data-gallery='eggshell-packaging']",
    touchNavigation: true,
    loop: true
  });
});
