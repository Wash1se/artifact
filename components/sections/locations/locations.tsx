import { createRoot } from "react-dom/client";
import { LocationSelector } from "@/components/ui/location-selector";
import { locationOptions } from "./locations.config";

function LocationsSection() {
  return (
    <section className="block-three" id="locations">
      <header className="block-three__intro">
        <div className="block-three__headline">
          <h2 className="block-three__title">Любая локация</h2>
          <p className="block-three__eyebrow">Локация под задачу бренда</p>
        </div>
        <p className="block-three__description">
          Соберем любую сцену: от индустриальных пространств и брутальных сетов
          до футуристических арт-локаций
        </p>
      </header>

      <LocationSelector options={locationOptions} />
    </section>
  );
}

const root = document.querySelector("#block-3-root");

if (root) {
  createRoot(root).render(<LocationsSection />);
}
