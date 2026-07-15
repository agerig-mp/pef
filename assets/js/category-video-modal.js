function initCategoryVideoModal() {
  const modal = document.getElementById("categoryVideoModal");
  const frame = document.getElementById("categoryVideoFrame");
  const title = document.getElementById("categoryVideoModalLabel");

  if (!modal || !frame || !title || modal.dataset.videoModalReady === "true") {
    return;
  }

  modal.dataset.videoModalReady = "true";

  modal.addEventListener("show.bs.modal", (event) => {
    const trigger = event.relatedTarget;
    const videoId = trigger?.dataset.videoId;

    if (!videoId) {
      return;
    }

    title.textContent = trigger.dataset.videoTitle || "Packaging Equipment Video";
    frame.title = title.textContent;
    frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  });

  modal.addEventListener("hidden.bs.modal", () => {
    frame.src = "about:blank";
  });
}

document.addEventListener("templates:loaded", initCategoryVideoModal);
initCategoryVideoModal();
