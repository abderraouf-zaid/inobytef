import './App.css';

const features = [
  {
    icon: 'scanner',
    title: 'Vulnerability Scanner',
    description:
      'Automated deep-scans for XSS, SQL Injection, and common misconfigurations before they reach production.',
  },
  {
    icon: 'monitoring',
    title: 'Real-time Monitoring',
    description:
      'Live traffic visualization and anomaly detection using high-frequency sampling and heuristics.',
  },
  {
    icon: 'alerts',
    title: 'Smart Alerts',
    description:
      'Intelligent notification routing via Slack, PagerDuty, or Email only for threats that actually matter.',
  },
  {
    icon: 'ai',
    title: 'AI Explanations',
    description:
      'Leverage LLM-driven insights to understand how a threat occurred and get instant patch suggestions.',
  },
  {
    icon: 'behavior',
    title: 'Login Behavior Tracking',
    description:
      'Detect impossible travel, credential stuffing, and unusual user agent transitions instantly.',
  },
  {
    icon: 'upload',
    title: 'File Upload Protection',
    description:
      'Sandboxed file scanning with multi-engine malware analysis for every upload to your servers.',
  },
];

const steps = [
  {
    icon: 'connect',
    label: 'STEP 01',
    title: 'Connect your website',
    description:
      'Simply integrate our SDK or use our cloud proxy to route your traffic through our secure edge.',
  },
  {
    icon: 'shield',
    label: 'STEP 02',
    title: 'Scan & monitor activity',
    description:
      'Our engine starts baseline profiling and active scanning immediately, building your security map.',
  },
  {
    icon: 'check',
    label: 'STEP 03',
    title: 'Receive alerts & insights',
    description:
      'Get categorized threat reports and actionable fix suggestions delivered directly to your team.',
  },
];

const comparisonRows = [
  {
    metric: 'ANALYSIS SPEED',
    legacy: 'Post-mortem',
    modern: 'Instant\nReal-time',
  },
  {
    metric: 'FALSE POSITIVES',
    legacy: 'Common\n(15%+)',
    modern: 'Rare (<\n0.1%)',
  },
  {
    metric: 'INTEGRATION',
    legacy: 'Heavy Ops',
    modern: 'One-line\nscript',
  },
  {
    metric: 'THREAT INTEL',
    legacy: 'Static DB',
    modern: 'Predictive\nAI',
  },
];

const chartLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

const contactItems = [
  {
    icon: 'support',
    title: 'Direct Support',
    description: 'access@sentinelshield.ai',
  },
  {
    icon: 'global',
    title: 'Global Infrastructure',
    description: '32 Global Edge Locations',
  },
];

function FeatureIcon({ type }) {
  const icons = {
    scanner: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="10" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13.5 13.5L18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    monitoring: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 12H7L9.5 7L13.5 17L16 12H21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    alerts: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 5C9.8 5 8 6.8 8 9V11.2C8 12.1 7.7 12.9 7.2 13.6L6.5 14.5H17.5L16.8 13.6C16.3 12.9 16 12.1 16 11.2V9C16 6.8 14.2 5 12 5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M10.4 17C10.8 17.7 11.4 18 12 18C12.6 18 13.2 17.7 13.6 17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4L13.6 8.4L18 10L13.6 11.6L12 16L10.4 11.6L6 10L10.4 8.4Z"
          fill="currentColor"
        />
      </svg>
    ),
    behavior: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4.8 17.2C5.7 15.5 7.2 14.6 9 14.6C10.8 14.6 12.3 15.5 13.2 17.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15 8H19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M17 6V10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="4.5" width="12" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 9H15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 12H15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 15V10.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.5 12L12 10.5L13.5 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function StepIcon({ type }) {
  const icons = {
    connect: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M13 3L5.5 13H11L9.5 21L18.5 10.5H13.2L15 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.6L17.5 6V11.5C17.5 15.7 14.8 18.5 12 19.8C9.2 18.5 6.5 15.7 6.5 11.5V6L12 3.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M10.2 11.8L11.6 13.2L14 10.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M9.5 12.2L11.2 13.9L14.7 10.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return icons[type] || null;
}

function ContactIcon({ type }) {
  const icons = {
    support: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="6.8" width="15" height="10.4" rx="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6.6 8.8L12 12.6L17.4 8.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    global: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.2 12H18.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 4.8C14.1 6.8 15.1 9.3 15.1 12C15.1 14.7 14.1 17.2 12 19.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 4.8C9.9 6.8 8.9 9.3 8.9 12C8.9 14.7 9.9 17.2 12 19.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function App() {
  return (
    <main className="landing-page">
      <section className="hero">
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

          <button type="button" className="primary-button">
            Get Started
            <span aria-hidden="true">→</span>
          </button>

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
              <div className="shield-badge">✓</div>
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
            <span className="floating-card__icon">∿</span>
            <div>
              <small>LATENCY</small>
              <strong>24ms</strong>
            </div>
          </div>

          <div className="floating-card floating-card--alert">
            <span className="floating-card__icon">◔</span>
            <div>
              <small>SMART ALERT</small>
              <strong>IP Rotation Detected</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="platform">
        <div className="platform__visual">
          <div className="platform__radar">
            <span className="radar-dot radar-dot--dark" />
            <span className="radar-dot radar-dot--red" />
            <div className="radar-ring radar-ring--outer" />
            <div className="radar-ring radar-ring--inner" />
            <div className="radar-center">
              <svg
                className="shield-icon"
                viewBox="0 0 48 56"
                aria-hidden="true"
              >
                <path
                  d="M24 4 L38 10 V24 C38 35 31 44 24 48 C17 44 10 35 10 24 V10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 28 L23 33 L31 23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="platform__content">
          <span className="tag">THE MISSION</span>
          <h2>What is this platform?</h2>
          <p>
            SentinelShield was built with one goal: to replace fragmented security
            tools with a unified, intelligent defense system. We provide more than
            just logs; we provide context. By combining AI analysis with real-time
            packet inspection, we give teams the clarity they need to act decisively.
          </p>

          <div className="platform__stats">
            <div>
              <strong>100%</strong>
              <span>Coverage of OWASP Top 10 vulnerabilities.</span>
            </div>
            <div>
              <strong>&lt; 1ms</strong>
              <span>Latency overhead on your application traffic.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Everything you need to stay ahead</h2>
        <p className="section-subtitle">
          A comprehensive suite of security tools designed for the modern web
          infrastructure.
        </p>

        <div className="features-grid">
          {/* أبقيت الكروت هنا مباشرة وبشكل واضح حتى يظل الكود سهل التتبع */}
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-card__icon">
                <FeatureIcon type={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="steps-section">
        <h2>How it Works</h2>
        <p className="section-subtitle">Up and running in minutes, not months.</p>

        <div className="steps-line" />

        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.label} className="step-card">
              <div className="step-card__icon">
                <StepIcon type={step.icon} />
              </div>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section">
        <div className="comparison-copy">
          <h2>
            Not Just Security...
            <br />
            Understanding
          </h2>
          <p>
            Most tools tell you that something went wrong. We tell you <strong>why</strong>,{' '}
            <strong>how</strong>, and <strong>how to ensure it never happens again</strong>.
            Our difference lies in the depth of our telemetry and the intelligence of
            our response layer.
          </p>
          <button type="button" className="secondary-button">
            Explore the Platform
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="comparison-table">
          <div className="comparison-table__header">
            <span>METRIC</span>
            <span>LEGACY TOOLS</span>
            <span>SENTINELSHIELD</span>
          </div>

          {comparisonRows.map((row) => (
            <div key={row.metric} className="comparison-row">
              <span className="comparison-row__metric">{row.metric}</span>

              <div className="comparison-cell comparison-cell--legacy">
                <span className="comparison-icon comparison-icon--bad">&times;</span>
                <span>{row.legacy}</span>
              </div>

              <div className="comparison-cell comparison-cell--modern">
                <span className="comparison-icon comparison-icon--good">&#10003;</span>
                <span>{row.modern}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="visibility-section">
        <div className="visibility-heading">
          <div>
            <h2>Full Visibility</h2>
            <p>
              A unified dashboard that gives you the bird&apos;s eye view and the
              molecular detail of every request.
            </p>
          </div>

          <div className="visibility-badges">
            <span>Live Updates</span>
            <span>Threat Vector: HIGH</span>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__header">
            <h3>Threat Activity Over Time</h3>
            <div className="chart-legend">
              <span>
                <i className="dot dot--black" />
                Global Traffic
              </span>
              <span>
                <i className="dot dot--red" />
                Threats Blocked
              </span>
            </div>
          </div>

          <div className="chart-area">
            <svg viewBox="0 0 980 430" className="traffic-chart" role="img" aria-label="Threat activity chart">
              <g className="traffic-chart__grid">
                <line x1="70" y1="70" x2="930" y2="70" />
                <line x1="70" y1="145" x2="930" y2="145" />
                <line x1="70" y1="220" x2="930" y2="220" />
                <line x1="70" y1="295" x2="930" y2="295" />
                <line x1="70" y1="370" x2="930" y2="370" />
              </g>

              <g className="traffic-chart__labels">
                <text x="32" y="74">1200</text>
                <text x="42" y="149">900</text>
                <text x="42" y="224">600</text>
                <text x="42" y="299">300</text>
                <text x="54" y="374">0</text>
              </g>

              <path
                className="traffic-chart__line traffic-chart__line--black"
                d="M80 255 C 145 280, 210 300, 250 280 C 320 210, 370 120, 470 75 C 560 55, 655 120, 730 200 C 790 255, 845 305, 915 355"
              />
              <path
                className="traffic-chart__line traffic-chart__line--red"
                d="M80 365 C 160 367, 220 370, 285 360 C 360 346, 420 330, 490 337 C 560 342, 650 355, 730 360 C 800 363, 860 366, 915 366"
              />
            </svg>

            <div className="chart-times">
              {chartLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-copy">
          <h2>
            Ready to fortify your
            <br />
            application?
          </h2>
          <p>
            Join our exclusive Early Access program and get 3 months of
            enterprise-grade security for free. Our engineering team will
            personally assist with your initial setup.
          </p>

          <div className="contact-list">
            {contactItems.map((item) => (
              <div key={item.title} className="contact-item">
                <span className="contact-item__icon">
                  <ContactIcon type={item.icon} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="request-form">
          <div className="request-form__dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <h3>Request Access</h3>
          <p>Submit your details and we&apos;ll reach out within 24 hours.</p>

          <div className="form-grid">
            <label>
              <span>FULL NAME</span>
              <input type="text" placeholder="John Doe" />
            </label>
            <label>
              <span>EMAIL</span>
              <input type="email" placeholder="john@company.com" />
            </label>
          </div>

          <label>
            <span>COMPANY / PROJECT NAME</span>
            <input type="text" placeholder="Acme Inc." />
          </label>

          <label>
            <span>MESSAGE</span>
            <textarea rows="5" placeholder="Tell us about your security needs..." />
          </label>

          <button type="submit" className="submit-button">
            Send Request
            <span aria-hidden="true">→</span>
          </button>

          <small>*Our team will contact you shortly*</small>
        </form>
      </section>
    </main>
  );
}

export default App;
