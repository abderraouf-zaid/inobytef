import { useEffect, useRef, useState } from 'react';
import BrandLogo from '../components/BrandLogo';
import { ROUTES } from '../constants/routes';
import { API_BASE_URL, dashboardApi, getAuthToken, scansApi, visualizationApi, websiteApi } from '../services/api';
import { buildHashUrl, goTo } from '../utils/navigation';

const SDK_TABS = ['JavaScript', 'Python', 'Go'];

function getApiOrigin() {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return 'https://inobyte-backend.onrender.com';
  }
}

function getSdkCode(activeTab, website) {
  const apiKey = website?.apiKey || 'sk_your_website_api_key';
  const apiOrigin = getApiOrigin();

  if (activeTab === 'Python') {
    return `import requests

requests.post('${API_BASE_URL}/events/track', json={
    'apiKey': '${apiKey}',
    'eventType': 'server_ping',
    'data': {'title': 'Python service connected'}
})`;
  }

  if (activeTab === 'Go') {
    return `payload := strings.NewReader(\`{
  "apiKey": "${apiKey}",
  "eventType": "server_ping",
  "data": {"title": "Go service connected"}
}\`)

http.Post("${API_BASE_URL}/events/track", "application/json", payload)`;
  }

  return `<script>
  window.INOBYTE_API_KEY = "${apiKey}";
</script>
<script src="${apiOrigin}/tracker.js"></script>`;
}

function StepTerms({ onNext }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="ob-step ob-step--terms">
      <div className="ob-step__label">STEP 1 OF 4</div>
      <h1 className="ob-step__title">Terms and Conditions</h1>
      <p className="ob-step__subtitle">
        Before we connect your website, review and accept the service agreement.
      </p>

      <div className="ob-terms-box">
        <div className="ob-terms-version">v2.4</div>
        <div className="ob-terms-content">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By using CyberLens monitoring, you confirm that you own or are authorized to monitor the website you register.
          </p>
          <h3>2. Passive Monitoring</h3>
          <p>
            The tracker records browser activity and the scanner performs passive checks only. Do not register systems
            you are not permitted to test.
          </p>
          <h3>3. Data Privacy</h3>
          <p>
            Security events, alerts, and website metadata are stored to power dashboards, reports, and notifications.
          </p>
        </div>
      </div>

      <label className="ob-checkbox" htmlFor="ob-accept-terms">
        <input
          id="ob-accept-terms"
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
        />
        <span className="ob-checkbox__box" aria-hidden="true" />
        <span className="ob-checkbox__text">
          I am authorized to connect and monitor this website
          <small>Your website key and verification status will be stored in your workspace.</small>
        </span>
      </label>

      <div className="ob-compliance-badge">CYBERLENS SECURITY SETUP</div>

      <div className="ob-nav">
        <a href={buildHashUrl(ROUTES.confirmBuy)} className="ob-nav__back">Back</a>
        <button
          id="ob-terms-continue"
          className="ob-nav__next"
          disabled={!accepted}
          onClick={onNext}
        >
          Accept &amp; Continue
        </button>
      </div>
    </div>
  );
}

function StepSDK({ onNext, onBack, website, setWebsite }) {
  const [activeTab, setActiveTab] = useState('JavaScript');
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState(website?.domain || '');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    websiteApi.list()
      .then((items) => {
        if (!isMounted || !items.length || website) return;
        setWebsite(items[0]);
        setDomain(items[0].domain);
        sessionStorage.setItem('websiteId', items[0].id);
        sessionStorage.setItem('websiteApiKey', items[0].apiKey);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [setWebsite, website]);

  function handleCopy() {
    navigator.clipboard.writeText(getSdkCode(activeTab, website)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCreateWebsite(event) {
    event.preventDefault();

    if (!domain.trim()) {
      setStatus({ type: 'error', message: 'Enter the public domain you want to monitor.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await websiteApi.create({ domain: domain.trim() });
      setWebsite(data);
      setDomain(data.domain);
      sessionStorage.setItem('websiteId', data.id);
      sessionStorage.setItem('websiteApiKey', data.apiKey);
      setStatus({ type: 'success', message: 'Website connected. Your tracking API key is ready.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="ob-step ob-step--sdk">
      <div className="ob-step__label">STEP 2 OF 4</div>
      <h1 className="ob-step__title">Connect Website</h1>
      <p className="ob-step__subtitle">
        Create a backend website record, then install the generated tracking key.
      </p>

      <form className="auth-form" onSubmit={handleCreateWebsite}>
        <label className="auth-field">
          <span>Website domain</span>
          <div className="auth-input">
            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              required
            />
          </div>
        </label>
        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Connecting...' : website ? 'Create another key' : 'Create website key'}
        </button>
      </form>

      {status.message && <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>}

      <div className="ob-sdk-header">
        <div className="ob-sdk-title-row">
          <span className="ob-sdk-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <div>
            <strong>{website?.domain || 'No website connected yet'}</strong>
            <span>{website?.apiKey || 'Create a website key to unlock the snippet'}</span>
          </div>
        </div>
        <div className="ob-sdk-tabs">
          {SDK_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`ob-sdk-tab${activeTab === tab ? ' ob-sdk-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="ob-sdk-section-label">
        TRACKING INTEGRATION
        <span className="ob-live-badge">Live Key</span>
      </div>

      <div className="ob-terminal">
        <div className="ob-terminal__bar">
          <span className="ob-terminal__prompt">&gt;</span>
          <span>{website?.apiKey || 'sk_your_website_api_key'}</span>
          <button type="button" className="ob-terminal__copy" onClick={handleCopy} id="ob-copy-install">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="ob-terminal__code"><code>{getSdkCode(activeTab, website)}</code></pre>
      </div>

      <p className="ob-sdk-note">Next, CyberLens will verify the website and prepare your first security scan.</p>

      <div className="ob-nav">
        <button className="ob-nav__back" onClick={onBack}>Back</button>
        <button id="ob-sdk-continue" className="ob-nav__next" disabled={!website} onClick={onNext}>
          Continue to Verification
        </button>
      </div>
    </div>
  );
}

const CHECKLIST = [
  { id: 'website', label: 'Website record verified' },
  { id: 'dashboard', label: 'Dashboard API connected' },
  { id: 'scan', label: 'Security scan API ready' },
];

function StepVerify({ onNext, onBack, website, setWebsite, setSetupResult }) {
  const [status, setStatus] = useState('pending');
  const [completed, setCompleted] = useState([]);
  const [message, setMessage] = useState('');
  const didRunRef = useRef(false);

  useEffect(() => {
    if (!website?.id || didRunRef.current) return;
    didRunRef.current = true;

    async function verifySetup() {
      setStatus('verifying');
      setMessage('');

      try {
        const verifiedWebsite = website.verified ? website : await websiteApi.verify(website.id);
        setWebsite(verifiedWebsite);
        setCompleted((current) => [...new Set([...current, 'website'])]);

        const dashboard = await dashboardApi.get({ websiteId: verifiedWebsite.id });
        const visualization = await visualizationApi.dashboard({ websiteId: verifiedWebsite.id, range: '24h', limit: 10 });
        setCompleted((current) => [...new Set([...current, 'dashboard'])]);

        let scan = null;
        try {
          scan = await scansApi.run({ websiteId: verifiedWebsite.id });
          setCompleted((current) => [...new Set([...current, 'scan'])]);
        } catch (error) {
          setMessage(`Website verified. Scan can be run later: ${error.message}`);
        }

        setSetupResult({ dashboard, visualization, scan, website: verifiedWebsite });
        setStatus('done');
      } catch (error) {
        setStatus('error');
        setMessage(error.message);
      }
    }

    verifySetup();
  }, [setSetupResult, setWebsite, website]);

  const doneCount = completed.length;

  return (
    <div className="ob-step ob-step--verify">
      <div className="ob-step__label">STEP 3 OF 4</div>
      <h1 className="ob-step__title">Verify Installation</h1>
      <p className="ob-step__subtitle">
        We are calling the real backend APIs for website verification, dashboard data, and scanning.
      </p>

      <div className="ob-verify-visual">
        <div className={`ob-verify-spinner${status === 'done' ? ' ob-verify-spinner--done' : ''}`}>
          {status === 'done' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg className="ob-spin" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="80 40" />
            </svg>
          )}
        </div>
        <div className={`ob-verify-badge${status === 'done' ? ' ob-verify-badge--done' : ''}`}>
          <span className="ob-verify-dot" />
          {status === 'done' ? 'Verification Complete' : status === 'error' ? 'Verification Failed' : 'Verification Running'}
        </div>
        <p className="ob-verify-sub">
          {message || (status === 'done' ? 'Backend APIs confirmed.' : 'Calling CyberLens backend...')}
        </p>
      </div>

      <div className="ob-checklist">
        <div className="ob-checklist__header">
          <span>VERIFICATION CHECKLIST</span>
          <span>{doneCount}/3 Complete</span>
        </div>
        {CHECKLIST.map((item) => {
          const isDone = completed.includes(item.id);
          return (
            <div key={item.id} className={`ob-checklist__item${isDone ? ' ob-checklist__item--done' : ''}`}>
              <span className="ob-cl-icon">
                {isDone ? (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 8 6.5 11.5 13 5" />
                  </svg>
                ) : (
                  <svg className={status === 'verifying' ? 'ob-spin' : ''} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8" cy="8" r="5" strokeDasharray="16 8" />
                  </svg>
                )}
              </span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="ob-verify-help">
        <span>i</span>
        <p>Backend URL: {API_BASE_URL}. Set REACT_APP_API_URL if your API runs elsewhere.</p>
      </div>

      <div className="ob-nav">
        <button className="ob-nav__back" onClick={onBack}>Back</button>
        <button
          id="ob-verify-continue"
          className={`ob-nav__next${status !== 'done' ? ' ob-nav__next--loading' : ''}`}
          disabled={status !== 'done'}
          onClick={onNext}
        >
          {status === 'done' ? 'Continue' : 'Verifying...'}
        </button>
      </div>
    </div>
  );
}

function StepAllSet({ website, setupResult }) {
  function handleFinish() {
    goTo(ROUTES.home);
  }

  return (
    <div className="ob-step ob-step--allset">
      <div className="ob-step__label">STEP 4 OF 4</div>
      <h1 className="ob-step__title">All Set!</h1>
      <p className="ob-step__subtitle">
        {website?.domain || 'Your website'} is connected to CyberLens monitoring.
      </p>

      <div className="ob-allset-visual">
        <div className="ob-allset-ring ob-allset-ring--outer" />
        <div className="ob-allset-ring ob-allset-ring--inner" />
        <div className="ob-allset-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div className="ob-allset-badge">
        <span className="ob-verify-dot" />
        Integration Verified &amp; Active
      </div>

      <p className="ob-allset-desc">
        API key: {website?.apiKey || sessionStorage.getItem('websiteApiKey') || 'created'}.
        {setupResult?.scan?.overall_risk ? ` Latest scan risk: ${setupResult.scan.overall_risk}.` : ''}
      </p>

      <div className="ob-pro-tip">
        <span className="ob-pro-tip__icon">*</span>
        <div>
          <strong>NEXT STEP</strong>
          <p>Keep the tracker snippet on your website so dashboard, users, events, and alerts can populate live.</p>
        </div>
      </div>

      <div className="ob-nav">
        <span />
        <button id="ob-finish-setup" className="ob-nav__next ob-nav__next--finish" onClick={handleFinish}>
          Finish Setup
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ step }) {
  const pct = (step / 4) * 100;
  return (
    <div className="ob-progress">
      <div className="ob-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState(null);
  const [setupResult, setSetupResult] = useState(null);

  useEffect(() => {
    if (!getAuthToken()) {
      goTo(ROUTES.signup, `?next=${encodeURIComponent(ROUTES.onboarding)}`);
    }
  }, []);

  const next = () => setStep((current) => Math.min(current + 1, 4));
  const back = () => setStep((current) => Math.max(current - 1, 1));

  return (
    <main className="ob-page">
      <div className="ob-card">
        <div className="ob-brand">
          <BrandLogo className="brand-logo--ob" />
        </div>
        <ProgressBar step={step} />

        {step === 1 && <StepTerms onNext={next} />}
        {step === 2 && <StepSDK onNext={next} onBack={back} website={website} setWebsite={setWebsite} />}
        {step === 3 && (
          <StepVerify
            onNext={next}
            onBack={back}
            website={website}
            setWebsite={setWebsite}
            setSetupResult={setSetupResult}
          />
        )}
        {step === 4 && <StepAllSet website={website} setupResult={setupResult} />}
      </div>
    </main>
  );
}
