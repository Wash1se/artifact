import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";

export interface PricingPlan {
  id: string;
  name: string;
  price?: number;
  priceLabel?: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  telegramText: string;
}

interface PricingGridProps {
  plans: PricingPlan[];
}

export function PricingGrid({ plans }: PricingGridProps) {
  const defaultPlan =
    plans.find((plan) => plan.id === "extended") ??
    plans.find((plan) => plan.isPopular) ??
    plans[0];
  const [activePlanId, setActivePlanId] = useState(defaultPlan?.id);

  function getTelegramHref(text: string) {
    return `https://t.me/StepanIlyich?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="pricing">
      <div className="pricing-tabs" aria-label="Выберите пакет" role="tablist">
        {plans.map((plan) => (
          <button
            aria-controls={`pricing-plan-${plan.id}`}
            aria-selected={activePlanId === plan.id}
            className="pricing-tab"
            key={plan.id}
            onClick={() => setActivePlanId(plan.id)}
            role="tab"
            type="button"
          >
            <span>{plan.name}</span>
            <strong>
              {plan.price ? `${plan.price.toLocaleString("ru-RU")} ₽` : plan.priceLabel}
            </strong>
          </button>
        ))}
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <motion.article
            className={`pricing-card${plan.isPopular ? " pricing-card--featured" : ""}${
              activePlanId === plan.id ? " is-active" : ""
            }`}
            id={`pricing-plan-${plan.id}`}
            key={plan.id}
            initial={{ opacity: 0, y: 32 }}
            role="tabpanel"
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <header className="pricing-card__header">
              <p>{plan.name}</p>
              {plan.isPopular && (
                <span>
                  <Star aria-hidden="true" />
                  Популярный
                </span>
              )}
            </header>

            <div className="pricing-card__price">
              {plan.price ? (
                <>
                  <NumberFlow
                    value={plan.price}
                    format={{ maximumFractionDigits: 0 }}
                    className="pricing-card__number"
                  />
                  <span>₽</span>
                </>
              ) : (
                <strong>{plan.priceLabel}</strong>
              )}
            </div>

            <ul className="pricing-card__features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              className="pricing-card__action"
              href={getTelegramHref(plan.telegramText)}
              rel="noreferrer"
              target="_blank"
            >
              <span>{plan.buttonText}</span>
            </a>

            <p className="pricing-card__footer">{plan.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
