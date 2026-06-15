import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type GalleryPhoto = {
  id: string;
  displaySrc: string;
  alt: string;
  objectPosition?: string;
  x: string;
  y: string;
  zIndex: number;
  direction: "left" | "right";
};

type PhotoStackProps = {
  photos: GalleryPhoto[];
};

const photoVariants = {
  hidden: { x: 0, y: 0, rotate: 0, scale: 1 },
  visible: ({ x, y, order }: GalleryPhoto & { order: number }) => ({
    x,
    y,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 12,
      mass: 1,
      delay: order * 0.12,
    },
  }),
};

export function PhotoStack({ photos }: PhotoStackProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const shouldLoadImages = useInView(galleryRef, { once: true, margin: "700px 0px" });
  const isInView = useInView(galleryRef, { once: true, margin: "0px 0px -15%" });

  return (
    <div ref={galleryRef} className="photo-gallery">
      <motion.div
        className="photo-gallery__stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {[...photos].reverse().map((photo, reverseIndex) => (
          <motion.div
            key={photo.id}
            className="photo-gallery__item"
            style={{ zIndex: photo.zIndex }}
            variants={photoVariants}
            custom={{ ...photo, order: photos.length - reverseIndex - 1 }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Photo photo={photo} shouldLoad={shouldLoadImages} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Photo({ photo, shouldLoad }: { photo: GalleryPhoto; shouldLoad: boolean }) {
  const rotation = photo.direction === "left" ? -2 : 2;

  return (
    <motion.figure
      className="photo-gallery__photo"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.06, rotateZ: rotation, zIndex: 9999 }}
      whileDrag={{ scale: 1.06, zIndex: 9999 }}
      whileTap={{ scale: 1.08, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      tabIndex={0}
    >
      <img
        src={shouldLoad ? photo.displaySrc : undefined}
        alt={photo.alt}
        style={{ objectPosition: photo.objectPosition ?? "center center" }}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(max-width: 700px) 56vw, 320px"
        draggable={false}
      />
    </motion.figure>
  );
}
