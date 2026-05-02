import { pricingPlans } from '../data/pricingData';

function formatPlanName(value) {
  if (!value) {
    return 'Pro';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function FlowSetupWizard() {
  const params = new URLSearchParams(window.location.search);
  const selectedPlan = formatPlanName(params.get('plan'));
  const plan = pricingPlans.find((item) => item.name.toLowerCase() === selectedPlan.toLowerCase()) || pricingPlans[1];
  const amount = `${plan.price}.00`;

  return (
    <main className="setup-page setup-page--success">
      <section className="payment-success">
        <div className="payment-success__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1>Payment Successful</h1>
        <p>
          Welcome to ShieldFlow. Your web infrastructure is now protected by our
          AI-driven security mesh.
        </p>

        <div className="payment-details">
          <div className="payment-details__header">
            <div>
              <strong>Subscription Details</strong>
              <span>A receipt has been sent to your email.</span>
            </div>
            <em>Active</em>
          </div>

          <dl>
            <div>
              <dt>Plan Type</dt>
              <dd>{plan.name} Subscription (Monthly)</dd>
            </div>
            <div>
              <dt>Transaction ID</dt>
              <dd>TXN-8821-4902-SHLD</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>May 2, 2026</dd>
            </div>
            <div>
              <dt>Amount Paid</dt>
              <dd>{amount}</dd>
            </div>
            <div>
              <dt>Next Renewal</dt>
              <dd>June 2, 2026</dd>
            </div>
          </dl>

          <div className="payment-details__badges">
            <span>256-bit Encryption</span>
            <span>Receipt Emailed</span>
            <span>24/7 Priority Support</span>
          </div>
        </div>

        <a href="/" className="payment-success__button">
          Go to Dashboard
          <span aria-hidden="true">&rarr;</span>
        </a>

        <small>
          Trouble logging in? <a href="/">Visit Support</a>
        </small>
      </section>
    </main>
  );
}

export default FlowSetupWizard;
