import { createRoot } from "react-dom/client";
import { PortfolioSwiper } from "@/components/ui/portfolio-swiper";
import { portfolioModels } from "./portfolio.media";

function PortfolioSection() {
  return (
    <section className="block-four" id="portfolio">
      <header className="block-four__intro">
        <div className="block-four__headline">
          <h2 className="block-four__title">Примеры работ</h2>
          <p className="block-four__subtitle">
            Создадим модель под задачу вашего бренда — выбирать из готовых
            образов необязательно
          </p>
        </div>
        <p className="block-four__description">
          Смахивайте фото влево или вправо, чтобы посмотреть следующее
        </p>
      </header>

      <div className="block-four__models">
        {portfolioModels.map((model) => (
          <article className="model-portfolio" key={model.id}>
            <PortfolioSwiper
              images={model.images}
              altPrefix={model.name}
              cardWidth={340}
              cardHeight={510}
              className="model-portfolio__swiper"
            />
            <footer className="model-portfolio__caption">
              <h3>{model.name}</h3>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

const root = document.querySelector("#block-4-root");

if (root) {
  createRoot(root).render(<PortfolioSection />);
}
