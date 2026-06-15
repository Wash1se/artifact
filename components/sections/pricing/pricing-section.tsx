import { createRoot } from "react-dom/client";
import { PricingGrid } from "./pricing-grid";
import { pricingPlans } from "./pricing.config";

function PricingSection() {
  return (
    <section className="block-five" id="packages">
      <header className="block-five__intro">
        <div className="block-five__heading">
          <h2>Не знаете, с чего начать?</h2>
          <p>Начните с готового пакета — все необходимое уже внутри</p>
        </div>
      </header>

      <PricingGrid plans={pricingPlans} />
    </section>
  );
}

const root = document.querySelector("#block-5-root");

if (root) {
  createRoot(root).render(<PricingSection />);
}
