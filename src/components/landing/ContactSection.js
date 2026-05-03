import { ROUTES } from '../../constants/routes';
import { buildHashUrl } from '../../utils/navigation';

function ContactSection() {
  return (
    <section className="lp-cta" id="contact">
      <div className="lp-cta__inner">
        <span className="lp-hero__badge">Ready to get started?</span>
        <h2 className="lp-cta__title">
          Protect your business<br />before it's too late.
        </h2>
        <p className="lp-cta__sub">
          Join hundreds of growing companies using CyberLens to protect their
          digital future. Get started today with a free security scan.
        </p>

        <div className="lp-cta__actions">
          <a href={buildHashUrl(ROUTES.signup)} className="lp-btn lp-btn--primary">
            Start My Free Scan →
          </a>
          <a href={buildHashUrl(ROUTES.pricing)} className="lp-btn lp-btn--outline">
            View Offre
          </a>
        </div>

        <div className="lp-cta__trust">
          <span>🔒 No Credit Card Required</span>
          <span>🛡 SOC 2 Compliant</span>
          <span>⚡ Setup in 5 minutes</span>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
