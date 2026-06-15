import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CarouselItem {
  id: string;
  title: string;
  label: string;
  description: string;
}

interface RulerCarouselProps {
  originalItems: CarouselItem[];
  ariaLabel?: string;
}

const copies = 3;

export function RulerCarousel({
  originalItems,
  ariaLabel = "Преимущества",
}: RulerCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(480);
  const [activeIndex, setActiveIndex] = useState(originalItems.length);
  const [isResetting, setIsResetting] = useState(false);

  const itemCount = originalItems.length;
  const infiniteItems = Array.from({ length: copies }, (_, copyIndex) =>
    originalItems.map((item) => ({
      ...item,
      key: `${copyIndex}-${item.id}`,
    })),
  ).flat();
  const activeOriginalIndex = ((activeIndex % itemCount) + itemCount) % itemCount;
  const activeItem = originalItems[activeOriginalIndex];
  const gap = itemWidth < 400 ? 22 : 36;
  const trackX = viewportWidth / 2 - activeIndex * (itemWidth + gap) - itemWidth / 2;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateSize = () => {
      const width = viewport.clientWidth;
      setViewportWidth(width);
      setItemWidth(width < 560 ? Math.min(340, width * 0.86) : width < 1000 ? 400 : 480);
    };
    const observer = new ResizeObserver(updateSize);

    updateSize();
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  const selectItem = (index: number) => {
    const originalIndex = index % itemCount;
    const candidates = [originalIndex, originalIndex + itemCount, originalIndex + itemCount * 2];
    const closest = candidates.reduce((current, candidate) =>
      Math.abs(candidate - activeIndex) < Math.abs(current - activeIndex) ? candidate : current,
    );

    setActiveIndex(closest);
  };

  const normalizePosition = () => {
    if (activeIndex >= itemCount && activeIndex < itemCount * 2) return;

    setIsResetting(true);
    setActiveIndex(activeOriginalIndex + itemCount);
    requestAnimationFrame(() => requestAnimationFrame(() => setIsResetting(false)));
  };

  return (
    <section
      className="ruler-carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setActiveIndex((index) => index - 1);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          setActiveIndex((index) => index + 1);
        }
      }}
    >
      <div className="ruler-carousel__viewport" ref={viewportRef}>
        <motion.div
          className="ruler-carousel__track"
          animate={{ x: trackX }}
          transition={
            isResetting
              ? { duration: 0 }
              : { type: "spring", stiffness: 220, damping: 28, mass: 0.9 }
          }
          onAnimationComplete={normalizePosition}
        >
          {infiniteItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.button
                className="ruler-carousel__item"
                key={item.key}
                type="button"
                aria-label={`Показать преимущество ${item.title}`}
                aria-pressed={isActive}
                onClick={() => selectItem(index)}
                animate={{
                  opacity: isActive ? 1 : 0.22,
                  scale: isActive ? 1 : 0.82,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                style={{ width: itemWidth }}
              >
                {item.title}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div className="ruler-carousel__detail">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="ruler-carousel__detail-copy"
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
          >
            <span>{activeItem.label}</span>
            <p>{activeItem.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="ruler-carousel__controls">
          <button
            type="button"
            aria-label="Предыдущее преимущество"
            onClick={() => setActiveIndex((index) => index - 1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <span>
            {activeOriginalIndex + 1} / {itemCount}
          </span>
          <button
            type="button"
            aria-label="Следующее преимущество"
            onClick={() => setActiveIndex((index) => index + 1)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
