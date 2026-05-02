function HeroSection({ showAuthActions }) {
  return (
    <section className="hero">
      {showAuthActions && (
        <div className="landing-auth-actions">
          <a href="/login" className="landing-auth-actions__link">
            Login
          </a>
          <a href="/signup" className="landing-auth-actions__button">
            Sign Up
          </a>
        </div>
      )}

      <div className="hero__content">
        <span className="tag">CYBERSECURITY REINVENTED</span>

        <h1 className="hero__title">
          See What
          <br />
          Others
          <br />
          <em>Can&apos;t See</em>
        </h1>

        <p className="hero__text">
          Gain real-time visibility into your web application&apos;s security posture.
          Monitor, detect, and neutralize threats before they impact your business.
        </p>

        <a href={showAuthActions ? '/signup' : '/pricing'} className="primary-button">
          Get Started
          <span aria-hidden="true">&rarr;</span>
        </a>

        <div className="trust">
          <div className="trust__avatars" aria-hidden="true">
            <span className="avatar avatar--one" />
            <span className="avatar avatar--two" />
            <span className="avatar avatar--three" />
            <span className="avatar avatar--four" />
            <span className="avatar avatar--five" />
          </div>

          <p>
            Trusted by <strong>500+</strong> DevSecOps teams
          </p>
        </div>
      </div>

      <div className="monitor-card">
        <div className="monitor-card__header">
          <span className="monitor-dot" />
          <p>LIVE SECURITY MONITOR</p>
        </div>

        <div className="monitor-card__body">
          <span className="monitor-label">Active Threats</span>
          <div className="monitor-main-row">
            <strong>0 Detected</strong>
            <div className="shield-badge">&#10003;</div>
          </div>

          <div className="progress-bar">
            <span />
          </div>

          <div className="monitor-progress-row">
            <small>SCAN PROGRESS</small>
            <small>67% COMPLETE</small>
          </div>
        </div>

        <div className="floating-card floating-card--latency">
          <span className="floating-card__icon">&#8767;</span>
          <div>
            <small>LATENCY</small>
            <strong>24ms</strong>
          </div>
        </div>

        <div className="floating-card floating-card--alert">
          <span className="floating-card__icon">&#9684;</span>
          <div>
            <small>SMART ALERT</small>
            <strong>IP Rotation Detected</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
