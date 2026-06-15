import { heroConfig } from "../../components/hero/hero.config.js";
import { loadHeroImages } from "../../components/hero/hero.images.js";
import { initHero } from "../../components/hero/hero.js";

async function startApp() {
  const slides = await loadHeroImages();
  initHero({ ...heroConfig, slides });
}

startApp().catch((error) => {
  console.error(error);
});
