function createSlide({ src, alt, id }, index) {
  const slide = document.createElement("figure");
  const image = document.createElement("img");

  slide.className = `slide${index === 0 ? " is-active" : ""}`;
  slide.dataset.slideId = id;
  image.alt = alt;
  image.decoding = "async";
  image.loading = index === 0 ? "eager" : "lazy";
  image.sizes = "100vw";
  image.dataset.src = src;

  if (index === 0) {
    image.src = src;
    image.fetchPriority = "high";
  } else {
    image.fetchPriority = "low";
  }

  slide.append(image);
  return slide;
}

export function initHero(config) {
  const hero = document.querySelector(".hero");
  if (!hero || !config.slides.length) return;
  const slidesForViewport = window.matchMedia("(max-width: 700px)").matches
    ? config.slides
        .filter((slide) => slide.showOnMobile)
        .sort(
          (first, second) =>
            ["4", "2", "6", "8"].indexOf(first.id) -
            ["4", "2", "6", "8"].indexOf(second.id),
        )
    : config.slides;

  hero.style.setProperty("--interval", `${config.autoplayInterval}ms`);

  const slidesContainer = hero.querySelector(".slides");
  const previousButton = hero.querySelector(".arrow--previous");
  const nextButton = hero.querySelector(".arrow--next");
  const progressBar = hero.querySelector(".progress__bar");

  slidesForViewport.forEach((slide, index) => {
    slidesContainer.append(createSlide(slide, index));
  });

  const slides = [...slidesContainer.querySelectorAll(".slide")];
  let currentIndex = 0;
  let autoplayTimer;
  let pointerStartX = null;
  let isHeroVisible = true;

  function loadSlide(index) {
    const normalizedIndex = (index + slides.length) % slides.length;
    const image = slides[normalizedIndex].querySelector("img");

    if (!image.src) image.src = image.dataset.src;
  }

  function preloadAround(index) {
    loadSlide(index);
    loadSlide(index + 1);
    loadSlide(index - 1);
  }

  function restartProgress() {
    progressBar.classList.remove("is-running");
    void progressBar.offsetWidth;
    progressBar.classList.add("is-running");
  }

  function showSlide(nextIndex) {
    currentIndex = (nextIndex + slides.length) % slides.length;
    preloadAround(currentIndex);

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentIndex);
    });

    restartProgress();
  }

  function stopAutoplay() {
    window.clearInterval(autoplayTimer);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!isHeroVisible) return;
    autoplayTimer = window.setInterval(
      () => showSlide(currentIndex + 1),
      config.autoplayInterval,
    );
    restartProgress();
  }

  function moveTo(nextIndex) {
    showSlide(nextIndex);
    startAutoplay();
  }

  previousButton.addEventListener("click", () => moveTo(currentIndex - 1));
  nextButton.addEventListener("click", () => moveTo(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.matches("input, textarea, select, button"));

    if (!isHeroVisible || isTyping) return;
    if (event.key === "ArrowLeft") moveTo(currentIndex - 1);
    if (event.key === "ArrowRight") moveTo(currentIndex + 1);
  });

  hero.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
  });

  hero.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;

    const distance = event.clientX - pointerStartX;
    pointerStartX = null;

    if (Math.abs(distance) < config.swipeThreshold) return;
    moveTo(distance > 0 ? currentIndex - 1 : currentIndex + 1);
  });

  hero.addEventListener("pointercancel", () => {
    pointerStartX = null;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) startAutoplay();
      else stopAutoplay();
    },
    { threshold: 0.01 },
  );

  visibilityObserver.observe(hero);
  preloadAround(currentIndex);
  startAutoplay();
}
