document.addEventListener("templates:loaded", () => {
  const variant = document.body.dataset.featuredVariant;
  const title = document.querySelector("[data-featured-title]");

  if (variant && title) {
    title.textContent = `Featured Packaging #${variant}`;
  }
});
