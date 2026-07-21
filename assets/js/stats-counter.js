function initStatsCounter() {
  const numbers = document.querySelectorAll(".stats-reason-number[data-count-to]");

  if (!numbers.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setFinalValue = (number) => {
    const target = Number(number.dataset.countTo || "0");
    const suffix = number.dataset.countSuffix || "";
    number.textContent = `${target.toLocaleString("en-US")}${suffix}`;
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    numbers.forEach(setFinalValue);
    return;
  }

  const animateNumber = (number) => {
    if (number.dataset.countAnimated === "true") {
      return;
    }

    number.dataset.countAnimated = "true";

    const target = Number(number.dataset.countTo || "0");
    const suffix = number.dataset.countSuffix || "";
    const duration = 1200;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      number.textContent = `${current.toLocaleString("en-US")}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setFinalValue(number);
      }
    };

    number.textContent = `0${suffix}`;
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateNumber(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  numbers.forEach((number) => observer.observe(number));
}

document.addEventListener("templates:loaded", initStatsCounter);
initStatsCounter();
