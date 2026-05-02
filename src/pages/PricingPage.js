import { pricingPlans } from '../data/pricingData';

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

function PricingCard({ plan }) {
  const choosePlan = () => {
    window.location.href = `/setup?plan=${plan.name.toLowerCase()}`;
  };

  return (
    <article
      className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
      onClick={choosePlan}
    >
      {plan.popular && <span className="popular-badge">Most Popular</span>}

      <div className="pricing-card__icon">
        <PricingIcon type={plan.icon} />
      </div>

      <h2>{plan.name}</h2>
      <p>{plan.description}</p>

      <div className="pricing-card__price">
        <strong>{plan.price}</strong>
        <span>/month</span>
      </div>

      <div className="pricing-card__line" />

      <ul className="pricing-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span>&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>

    </article>
  );
}

function PricingPage() {
  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <span>Pricing Plans</span>
        <h1>
          Invest in your platform&apos;s
          <em>security</em>
        </h1>
        <p>
          Choose the perfect plan for your needs. Scale your security posture with
          real-time monitoring and AI-driven threat analysis.
        </p>
      </section>

      <section className="pricing-cards">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </section>
    </main>
  );
}

export default PricingPage;
