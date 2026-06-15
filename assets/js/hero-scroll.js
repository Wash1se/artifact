const hero = document.querySelector(".hero");

if (hero) {
  let frameRequested = false;

  function updateHeroProgress() {
    const rect = hero.getBoundingClientRect();
    const scrollDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));

    hero.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
    frameRequested = false;
  }

  function requestUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(updateHeroProgress);
  }

  updateHeroProgress();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}
