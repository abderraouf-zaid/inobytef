import BrandLogo from '../components/BrandLogo';
import { pricingPlans } from '../data/pricingData';
import { ROUTES } from '../constants/routes';
import { getAuthToken } from '../services/api';
import { buildHashUrl } from '../utils/navigation';

function formatPlanName(value) {
  if (!value) return 'Pro';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatAmount(price) {
  return String(price);
}

function ConfirmBuyPage() {
  const hashQuery = window.location.hash.includes('?')
    ? window.location.hash.split('?')[1]
    : '';
  const params = new URLSearchParams(window.location.search || hashQuery);
  const selectedPlan = formatPlanName(params.get('plan'));
  const plan = pricingPlans.find(
    (item) => item.name.toLowerCase() === selectedPlan.toLowerCase()
  ) || pricingPlans[1];
  const amount = formatAmount(plan.price);
  const setupHref = getAuthToken()
    ? buildHashUrl(ROUTES.onboarding)
    : buildHashUrl(ROUTES.signup);

  return (
    <main className="ps-page">
      <div className="ps-particles" aria-hidden="true">
        <span className="ps-particle ps-particle--1" />
        <span className="ps-particle ps-particle--2" />
        <span className="ps-particle ps-particle--3" />
        <span className="ps-particle ps-particle--4" />
        <span className="ps-particle ps-particle--5" />
        <span className="ps-particle ps-particle--6" />
      </div>

      <div className="ps-card">
        <BrandLogo className="brand-logo--ps" />

        <div className="ps-icon-wrap" aria-hidden="true">
          <div className="ps-icon-ring ps-icon-ring--outer" />
          <div className="ps-icon-ring ps-icon-ring--inner" />
          <div className="ps-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className="ps-success-badge">
          <span className="ps-success-dot" />
          Payment Confirmed
        </div>

        <h1 className="ps-title">Payment Successful</h1>
        <p className="ps-subtitle">
          Your {plan.name} plan is active. Finish setup to connect monitoring,
          alerts, and security checks for your web infrastructure.
        </p>

        <div className="ps-details">
          <div className="ps-details__header">
            <div>
              <strong>Subscription Details</strong>
              <span>A receipt has been sent to your email.</span>
            </div>
            <em className="ps-active-badge">
              <span className="ps-active-dot" />
              ACTIVE
            </em>
          </div>

          <dl className="ps-dl">
            <div className="ps-dl__row">
              <dt>
                <span className="ps-row-icon">PL</span>
                Plan Type
              </dt>
              <dd>{plan.name} Subscription (Monthly)</dd>
            </div>
            <div className="ps-dl__row">
              <dt>
                <span className="ps-row-icon">TX</span>
                Transaction ID
              </dt>
              <dd className="ps-dl__mono">TXN-8821-4902-SHLD</dd>
            </div>
            <div className="ps-dl__row">
              <dt>
                <span className="ps-row-icon">DT</span>
                Date
              </dt>
              <dd>May 2, 2026</dd>
            </div>
            <div className="ps-dl__row">
              <dt>
                <span className="ps-row-icon">AM</span>
                Amount Paid
              </dt>
              <dd className="ps-dl__amount">{amount}</dd>
            </div>
            <div className="ps-dl__row">
              <dt>
                <span className="ps-row-icon">RN</span>
                Next Renewal
              </dt>
              <dd>June 2, 2026</dd>
            </div>
          </dl>

          <div className="ps-badges">
            <span className="ps-badge-item">
              <span className="ps-badge-icon">SSL</span>
              256-bit Encryption
            </span>
            <span className="ps-badge-sep" />
            <span className="ps-badge-item">
              <span className="ps-badge-icon">MAIL</span>
              Receipt Emailed
            </span>
            <span className="ps-badge-sep" />
            <span className="ps-badge-item">
              <span className="ps-badge-icon">24/7</span>
              Priority Support
            </span>
          </div>
        </div>

        <div className="ps-actions">
          <a href={setupHref} className="ps-btn" id="ps-start-setup">
            <span>Start setup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

        </div>

        <small className="ps-help">
          Need help with your order? <a href={buildHashUrl(ROUTES.home)}>Contact support</a>
        </small>
      </div>

      <div className="ps-deco-shield" aria-hidden="true">
        <svg viewBox="0 0 80 96" fill="none">
          <path d="M40 2L4 18v28c0 22.4 15.4 43.2 36 48 20.6-4.8 36-25.6 36-48V18L40 2z"
                stroke="currentColor" strokeWidth="2" opacity="0.12"/>
          <path d="M40 14L14 26v20c0 16.8 11 32.4 26 36 15-3.6 26-19.2 26-36V26L40 14z"
                stroke="currentColor" strokeWidth="1.5" opacity="0.07"/>
          <polyline points="30 48 38 56 52 40" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.1"/>
        </svg>
      </div>
    </main>
  );
}

export default ConfirmBuyPage;
