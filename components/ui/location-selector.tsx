import { useEffect, useRef, useState } from "react";

export type SelectorOption = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type LocationSelectorProps = {
  options: SelectorOption[];
};

export function LocationSelector({ options }: LocationSelectorProps) {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [shouldLoadImages, setShouldLoadImages] = useState(false);
  const [loadedOptionIndices, setLoadedOptionIndices] = useState<number[]>([]);

  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadImages(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(selector);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadImages) return;

    setLoadedOptionIndices((current) =>
      current.includes(activeIndex) ? current : [...current, activeIndex],
    );

    const loadRest = () => {
      setLoadedOptionIndices(options.map((_, index) => index));
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadRest, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(loadRest, 900);
    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, options, shouldLoadImages]);

  useEffect(() => {
    const timers = options.map((_, index) =>
      window.setTimeout(() => {
        setAnimatedOptions((current) => [...current, index]);
      }, 140 * index),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [options]);

  return (
    <div ref={selectorRef} className="interactive-selector" aria-label="Выбор локации">
      {options.map((option, index) => {
        const isActive = activeIndex === index;
        const isLoaded = loadedOptionIndices.includes(index);

        return (
          <button
            className={`interactive-selector__option${isActive ? " is-active" : ""}`}
            key={option.id}
            type="button"
            aria-pressed={isActive}
            style={{
              backgroundImage: isLoaded ? `url("${option.image}")` : undefined,
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-40px)",
              flexGrow: isActive ? 7 : 1,
            }}
            onClick={() => {
              setLoadedOptionIndices((current) =>
                current.includes(index) ? current : [...current, index],
              );
              setActiveIndex(index);
            }}
          >
            <span className="interactive-selector__shade" aria-hidden="true" />
            <span className="interactive-selector__copy">
              <strong>{option.title}</strong>
              <span>{option.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
