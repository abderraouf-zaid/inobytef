import { useState } from 'react';
import BrandLogo from '../components/BrandLogo';
import { pricingPlans } from '../data/pricingData';
import { ROUTES } from '../constants/routes';
import { goTo } from '../utils/navigation';

function PricingIcon({ type }) {
  if (type === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 3L5.5 13H11L9.5 21L18.5 10.5H13.3L13 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'crown') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9L8.5 12L12 6L15.5 12L19 9L17.5 17H6.5L5 9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 19H17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5L18 6V11.5C18 15.8 15.4 18.6 12 20.5C8.6 18.6 6 15.8 6 11.5V6L12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.7 12L11.3 13.6L14.6 10.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PricingCard({ plan, isActive, onActivate }) {
  const choosePlan = () => {
    goTo(ROUTES.confirmBuy, `?plan=${encodeURIComponent(plan.name.toLowerCase())}`);
  };

  return (
    <article
      className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''} ${isActive ? 'pricing-card--active' : ''}`}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
    >
      {plan.popular && <span className="popular-badge">Most Popular</span>}

      <div className="pricing-card__icon">
        <PricingIcon type={plan.icon} />
      </div>

      <h2>{plan.name}</h2>
      <p>{plan.description}</p>

      <div className="pricing-card__price">
        <strong>{plan.price}</strong>
        <span>/ plan</span>
      </div>
      <p className="pricing-card__trial">{plan.trial}</p>

      <div className="pricing-card__line" />

      <ul className="pricing-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span>&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`pricing-card__cta ${plan.popular ? 'pricing-card__cta--primary' : ''}`}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          choosePlan();
        }}
      >
        Start 3-Day Free Trial
      </button>
    </article>
  );
}

function PricingPage() {
  const [activePlan, setActivePlan] = useState(() => {
    const popularIndex = pricingPlans.findIndex((plan) => plan.popular);
    return popularIndex >= 0 ? popularIndex : 0;
  });

  return (
    <main className="pricing-page pricing-page--interactive">
      <BrandLogo className="brand-logo--pricing" />

      <section className="pricing-hero">
        <span>Pricing Plans</span>
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose one plan based on your preferred duration: monthly, quarterly, or yearly.</p>
      </section>

      <section className="pricing-cards">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isActive={activePlan === index}
            onActivate={() => setActivePlan(index)}
          />
        ))}
      </section>
    </main>
  );
}

export default PricingPage;
