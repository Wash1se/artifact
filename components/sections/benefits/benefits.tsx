import { createRoot } from "react-dom/client";
import { RulerCarousel } from "@/components/ui/ruler-carousel";
import { benefits } from "./benefits.config";

function BenefitsSection() {
  return (
    <section className="block-benefits" id="advantages">
      <header className="block-benefits__intro">
        <h2>Больше возможностей</h2>
      </header>

      <RulerCarousel
        originalItems={benefits}
        ariaLabel="Преимущества AI-продакшна ARTIFACT"
      />
    </section>
  );
}

const root = document.querySelector("#block-benefits-root");

if (root) {
  createRoot(root).render(<BenefitsSection />);
}
