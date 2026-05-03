import BrandLogo from '../BrandLogo';
import { ROUTES } from '../../constants/routes';
import { buildHashUrl } from '../../utils/navigation';

function HeroSection({ showAuthActions }) {
  return (
    <section className="lp-hero">
      {/* ── Navbar ── */}
      <nav className="lp-nav">
        <BrandLogo className="brand-logo--hero" />

        <div className="lp-nav__links">
          <a href="#features">Features</a>
          <a href="#journey">How It Works</a>
          <a href={buildHashUrl(ROUTES.pricing)}>Pricing</a>
        </div>

        <div className="lp-nav__actions">
          <button type="button" className="lp-nav__btn">
            Download App
          </button>
          {showAuthActions && (
            <a href={buildHashUrl(ROUTES.signup)} className="lp-nav__link">
              Sign in
            </a>
          )}
        </div>
      </nav>

      {/* ── Hero Content ── */}
      <div className="lp-hero__body">
        <span className="lp-hero__badge">✦ AI-Powered Cybersecurity for SMEs</span>

        <h1 className="lp-hero__title">
          See Risk.<br />
          <em>Act</em> with Clarity.
        </h1>

        <p className="lp-hero__sub">
          Transform complex cybersecurity risks into simple, actionable insights —
          no security expertise required.
        </p>

        <div className="lp-hero__actions">
          <a
            href={buildHashUrl(showAuthActions ? ROUTES.signup : ROUTES.pricing)}
            className="lp-btn lp-btn--primary"
          >
            Start Free Trial →
          </a>
          <a href={buildHashUrl(ROUTES.pricing)} className="lp-btn lp-btn--ghost">
            View Pricing
          </a>
        </div>

        <div className="lp-hero__trust">
          <div className="lp-trust__avatars" aria-hidden="true">
            <span className="lp-avatar lp-avatar--one" />
            <span className="lp-avatar lp-avatar--two" />
            <span className="lp-avatar lp-avatar--three" />
            <span className="lp-avatar lp-avatar--four" />
            <span className="lp-avatar lp-avatar--five" />
          </div>
          <p>Trusted by <strong>500+ SMEs</strong> worldwide</p>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;
