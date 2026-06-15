import shotOneDisplay from "@/assets/media/block-2/gallery-display/1.jpg?url";
import shotTwoDisplay from "@/assets/media/block-2/gallery-display/2.jpg?url";
import shotThreeDisplay from "@/assets/media/block-2/gallery-display/3.jpg?url";
import shotFourDisplay from "@/assets/media/block-2/gallery-display/4.jpg?url";
import shotFiveDisplay from "@/assets/media/block-2/gallery-display/5.jpg?url";
import shotSixDisplay from "@/assets/media/block-2/gallery-display/6.jpg?url";

export const blockTwoGallery = [
  {
    id: "shot-1",
    displaySrc: shotOneDisplay,
    alt: "Портфолио ARTIFACT 1",
    objectPosition: "center center",
    x: "-400px",
    y: "26px",
    zIndex: 70,
    direction: "left" as const,
  },
  {
    id: "shot-2",
    displaySrc: shotTwoDisplay,
    alt: "Портфолио ARTIFACT 2",
    objectPosition: "center 20%",
    x: "-240px",
    y: "58px",
    zIndex: 60,
    direction: "right" as const,
  },
  {
    id: "shot-3",
    displaySrc: shotThreeDisplay,
    alt: "Портфолио ARTIFACT 3",
    objectPosition: "center center",
    x: "-80px",
    y: "34px",
    zIndex: 50,
    direction: "left" as const,
  },
  {
    id: "shot-4",
    displaySrc: shotFourDisplay,
    alt: "Портфолио ARTIFACT 4",
    objectPosition: "center 18%",
    x: "80px",
    y: "8px",
    zIndex: 40,
    direction: "right" as const,
  },
  {
    id: "shot-5",
    displaySrc: shotFiveDisplay,
    alt: "Портфолио ARTIFACT 5",
    objectPosition: "center center",
    x: "240px",
    y: "22px",
    zIndex: 30,
    direction: "right" as const,
  },
  {
    id: "shot-6",
    displaySrc: shotSixDisplay,
    alt: "Портфолио ARTIFACT 6",
    objectPosition: "center top",
    x: "400px",
    y: "48px",
    zIndex: 20,
    direction: "left" as const,
  },
];
