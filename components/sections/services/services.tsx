import { createRoot } from "react-dom/client";
import { PhotoStack } from "@/components/ui/photo-stack";
import { blockTwoGallery } from "./services.media";

function ServicesSection() {
  return (
    <section className="block-two">
      <header className="block-two__intro" id="services">
        <div className="block-two__intro-main">
          <p className="block-two__eyebrow">Что мы делаем</p>
          <h2 className="block-two__title">AI Fashion Production</h2>
          <p className="block-two__intro-text">
            Профессиональный AI-продакшн одежды на моделях для брендов, сайтов и
            маркетплейсов
          </p>
        </div>

        <ol className="block-two__steps" aria-label="Как работает ARTIFACT">
          <li>
            <span>1</span>
            <p>
              <strong>Передаете материалы</strong>
              Фото товара, ракурсы и короткую задачу под съемку
            </p>
          </li>
          <li>
            <span>2</span>
            <p>
              <strong>Мы создаем визуал</strong>
              Подбираем модель, локации и подачу под ваш бренд
            </p>
          </li>
          <li>
            <span>3</span>
            <p>
              <strong>Получаете готовые кадры</strong>
              Готовый набор изображений для каталога, сайта и рекламы
            </p>
          </li>
        </ol>
      </header>

      <section className="block-two__gallery" id="works" aria-label="Примеры работ ARTIFACT">
        <p className="block-two__gallery-label">Визуал, готовый к продажам</p>
        <PhotoStack photos={blockTwoGallery} />
      </section>
    </section>
  );
}

const root = document.querySelector("#block-2-root");

if (root) {
  createRoot(root).render(<ServicesSection />);
}
