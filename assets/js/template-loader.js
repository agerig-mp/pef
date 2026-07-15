async function loadTemplates() {
  const templateNodes = document.querySelectorAll("[data-template]");

  await Promise.all(
    Array.from(templateNodes).map(async (node) => {
      const templatePath = node.getAttribute("data-template");

      if (!templatePath) {
        return;
      }

      const response = await fetch(templatePath, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
      }

      const html = await response.text();
      const wrapper = document.createElement("div");

      wrapper.innerHTML = html.trim();
      node.replaceWith(...wrapper.childNodes);
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplates()
    .then(() => {
      document.dispatchEvent(new CustomEvent("templates:loaded"));
    })
    .catch((error) => {
      console.error(error);
    });
});
