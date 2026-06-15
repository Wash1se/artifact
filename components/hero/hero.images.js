import { mediaNameFromPath, sortMediaEntries } from "@/components/shared/media";

const imageModules = import.meta.glob(
  "/assets/media/hero-display/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

export function loadHeroImages() {
  return sortMediaEntries(imageModules)
    .map(([path, src]) => {
      const name = mediaNameFromPath(path);

      return {
        src,
        alt: name,
        id: name,
        showOnMobile: Number(name) % 2 === 0,
      };
    });
}
