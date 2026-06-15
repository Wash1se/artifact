import { sortMediaEntries } from "@/components/shared/media";

const imageModules = import.meta.glob(
  "/assets/media/block-4/display/*/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

function getModelImages(folder: string) {
  return sortMediaEntries(imageModules)
    .filter(([path]) => path.includes(`/block-4/display/${folder}/`))
    .map(([, source]) => source);
}

export const portfolioModels = [
  { id: "model-1", name: "Model 1", images: getModelImages("1-model") },
  { id: "model-2", name: "Model 2", images: getModelImages("2-model") },
  { id: "model-3", name: "Model 3", images: getModelImages("3-model") },
  { id: "model-4", name: "Model 4", images: getModelImages("4-model") },
];
