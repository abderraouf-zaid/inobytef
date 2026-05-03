import { useState } from 'react';
import { ROUTES } from '../constants/routes';
import { goTo } from '../utils/navigation';

const billingTabs = [
  { label: '1 Month', key: 'monthly' },
  { label: '3 Months', key: 'quarterly', note: 'Save 15%' },
  { label: '1 Year', key: 'yearly', note: 'Save 30%' }
];

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for independent security researchers.',
    prices: {
      monthly: { price: '$29', suffix: '/mo' },
      quarterly: { price: '$74', suffix: '/3 mo', monthly: '($25/mo)' },
      yearly: { price: '$249', suffix: '/yr', monthly: '($21/mo)' }
    },
    cta: 'Get Started',
    checkoutPlan: '1 month',
    features: [
      'Up to 3 monitoring targets',
      'Standard vulnerability scans',
      'Weekly security reports',
      'Email notifications',
      'Community support',
      'Basic API access',
      'SSL monitoring',
      'Port monitoring',
      'Domain WHOIS monitoring',
      '7-day data retention'
    ]
  },
  {
    name: 'Professional',
    description: 'The complete solution for growing businesses.',
    prices: {
      monthly: { price: '$119', suffix: '/mo' },
      quarterly: { price: '$303', suffix: '/3 mo', monthly: '($101/mo)' },
      yearly: { price: '$999', suffix: '/yr', monthly: '($83/mo)' }
    },
    cta: 'Start 3-Day Free Trial',
    checkoutPlan: '3 months',
    popular: true,
    features: [
      'Unlimited monitoring targets',
      'Advanced vulnerability scans',
      'Daily security reports',
      'Instant SMS & Webhook alerts',
      '24/7 Priority support',
      'Full API & SDK access',
      'Real-time threat detection',
      'Malware detection suite',
      'Customizable dashboard',
      '90-day data retention',
      'Team collaboration (5 seats)',
      'Automated patch alerts',
      'IP reputation tracking',
      'Global scan nodes',
      'Phishing detection'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Custom security needs for large-scale ops.',
    price: 'Custom',
    cta: 'Contact Sales',
    note: '* Note: Pricing for Enterprise plans is calculated based on scan frequency and custom feature requirements.',
    features: [
      'Unlimited monitoring targets',
      'Unlimited team members',
      'Dedicated Account Manager',
      'Custom compliance reporting',
      'SSO & SAML integration',
      'On-premise deployment option',
      '24/7 Phone & Email support',
      'Custom API development',
      'Unlimited data retention',
      'SLA guaranteed uptime'
    ]
  }
];

const comparisonRows = [
  ['Monitoring Targets', 'Up to 3', 'Unlimited', 'Unlimited'],
  ['Vulnerability Scans', 'Standard', 'Advanced', 'Customizable'],
  ['Scan Frequency', 'Weekly', 'Daily', 'Real-time'],
  ['API Access', 'Basic', 'Full', 'Full + SDK'],
  ['Data Retention', '7 Days', '90 Days', 'Unlimited'],
  ['Support', 'Community', '24/7 Priority', 'Dedicated Manager'],
  ['Team Seats', '1 Seat', '5 Seats', 'Unlimited'],
  ['SSO/SAML', false, false, true],
  ['Phishing Detection', false, true, true],
  ['Malware Suite', false, true, true]
];

const faqs = [
  {
    question: 'Can I change plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time from your billing settings. Changes take effect immediately, and we will prorate any payments.'
  },
  {
    question: 'Do you offer discounts for educational institutions?',
    answer: 'Yes. Contact sales with your institution details and we will prepare an education-friendly quote.'
  },
  {
    question: 'What happens if I exceed my monitoring target limit?',
    answer: 'We will notify you before enforcement. You can remove targets or upgrade to a plan with more capacity.'
  },
  {
    question: 'Is there a free trial for the Professional plan?',
    answer: 'Yes. Every plan includes a 3-day free trial so you can test monitoring before committing.'
  },
  {
    question: 'How secure is my monitoring data?',
    answer: 'Monitoring data is protected with encrypted transport, scoped access, and strict retention controls based on your plan.'
  }
];

function PricingBolt() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 3L5.5 13H11L9.5 21L18.5 10.5H13.3L13 3Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PricingCard({ plan, billingKey, isSelected, onSelect }) {
  const price = plan.prices?.[billingKey];
  const choosePlan = () => {
    if (!plan.checkoutPlan) {
      return;
    }

    goTo(ROUTES.confirmBuy, `?plan=${encodeURIComponent(plan.checkoutPlan)}`);
  };

  return (
    <article
      className={`pricing-clean-card ${plan.popular ? 'pricing-clean-card--popular' : ''} ${isSelected ? 'pricing-clean-card--selected' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      {plan.popular && <span className="pricing-clean-badge">MOST POPULAR</span>}

      <div className="pricing-clean-card__top">
        <div>
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
        </div>
        {plan.popular && (
          <span className="pricing-clean-card__icon">
            <PricingBolt />
          </span>
        )}
      </div>

      <div className={`pricing-clean-price ${plan.price === 'Custom' ? 'pricing-clean-price--custom' : ''}`}>
        <strong>{price?.price || plan.price}</strong>
        {price?.suffix && <span>{price.suffix}</span>}
        {price?.monthly && <em>{price.monthly}</em>}
      </div>

      <ul className="pricing-clean-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {plan.note && <p className="pricing-clean-note">{plan.note}</p>}

      <button
        className={`pricing-clean-cta ${plan.popular ? 'pricing-clean-cta--primary' : ''}`}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          choosePlan();
        }}
      >
        {plan.cta}
      </button>
    </article>
  );
}

function CompareValue({ value }) {
  if (typeof value !== 'boolean') {
    return value;
  }

  return (
    <span className={value ? 'pricing-check' : 'pricing-cross'} aria-label={value ? 'Included' : 'Not included'}>
      {value ? '✓' : '×'}
    </span>
  );
}

function PricingPage() {
  const [activeBilling, setActiveBilling] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const billingKey = billingTabs[activeBilling].key;

  return (
    <main className="pricing-page pricing-page--clean">
      <div className="pricing-clean-toggle" aria-label="Billing period">
        {billingTabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            className={activeBilling === index ? 'is-active' : ''}
            onClick={() => setActiveBilling(index)}
          >
            <span>{tab.label}</span>
            {tab.note && <small>{tab.note}</small>}
          </button>
        ))}
      </div>

      <section className="pricing-clean-grid" aria-label="Pricing plans">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            billingKey={billingKey}
            isSelected={selectedPlan === index}
            onSelect={() => setSelectedPlan(index)}
          />
        ))}
      </section>

      <section className="pricing-compare">
        <div className="pricing-clean-section-heading">
          <h2>Compare Features</h2>
          <p>Find the detailed breakdown of what&apos;s included in each plan.</p>
        </div>

        <div className="pricing-compare-table">
          <table>
            <thead>
              <tr>
                <th>Feature Category</th>
                <th>Starter</th>
                <th>Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([category, starter, professional, enterprise]) => (
                <tr key={category}>
                  <th>{category}</th>
                  <td><CompareValue value={starter} /></td>
                  <td className="is-highlighted"><CompareValue value={professional} /></td>
                  <td><CompareValue value={enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-faq">
        <div className="pricing-clean-section-heading">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our plans and billing.</p>
        </div>

        <div className="pricing-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="pricing-faq-item" open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PricingPage;
