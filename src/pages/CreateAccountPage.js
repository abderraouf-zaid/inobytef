import { useState } from 'react';
import { ArrowIcon, EyeIcon, GitHubIcon, LockIcon, MailIcon, UserIcon } from '../components/auth/AuthIcons';
import { ROUTES } from '../constants/routes';
import { authApi } from '../services/api';
import { buildHashUrl, goTo } from '../utils/navigation';

const sleep = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

function CreateAccountPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openVerifyPage = (email, otp = '') => {
    localStorage.setItem('accountCreated', 'true');
    sessionStorage.setItem('pendingVerificationEmail', email);
    goTo(ROUTES.verifyEmail, `?email=${encodeURIComponent(email)}${otp ? `&otp=${encodeURIComponent(otp)}` : ''}`);
  };

  const trySendVerificationCode = async (email, retries = 1) => {
    let lastError = null;

    for (let attempt = 1; attempt <= retries; attempt += 1) {
      try {
        const data = await authApi.resendOtp({ email });
        const otp = data.otpPreview || data.otp || '';

        setStatus({ type: 'success', message: 'Verification code sent. Redirecting...' });
        window.setTimeout(() => {
          openVerifyPage(email, otp);
        }, 700);
        return;
      } catch (error) {
        lastError = error;

        if (/already verified/i.test(error.message)) {
          throw error;
        }

        if (attempt < retries) {
          await sleep(2000);
        }
      }
    }

    throw lastError;
  };

  const recoverSignup = async (email, originalMessage) => {
    try {
      await trySendVerificationCode(email, 4);
    } catch (error) {
      if (/already verified/i.test(error.message)) {
        localStorage.setItem('accountCreated', 'true');
        setStatus({ type: 'success', message: 'Account already verified. Redirecting...' });
        window.setTimeout(() => {
          goTo(ROUTES.home);
        }, 700);
        return;
      }

      setStatus({ type: 'error', message: originalMessage });
    }
  };

  const createAccount = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (!form.acceptedTerms) {
      setStatus({ type: 'error', message: 'Please accept the terms to continue.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    let handled = false;
    let signupFallback = null;

    try {
      const email = form.email.trim();
      signupFallback = window.setTimeout(() => {
        if (handled) return;

        setStatus({ type: 'success', message: 'Account request received. Preparing verification...' });
        recoverSignup(email, 'Server took too long to respond. Please try again.').finally(() => {
          handled = true;
        });
      }, 6000);

      const data = await authApi.register({
        name: form.name.trim(),
        email,
        password: form.password
      });
      window.clearTimeout(signupFallback);

      if (handled) {
        return;
      }

      handled = true;
      const otp = data.otpPreview || data.otp || '';

      setStatus({ type: 'success', message: 'Account created. Redirecting...' });
      window.setTimeout(() => {
        openVerifyPage(email, otp);
      }, 700);
    } catch (error) {
      if (signupFallback) {
        window.clearTimeout(signupFallback);
      }

      const email = form.email.trim();

      if (/already exists|took too long/i.test(error.message)) {
        handled = true;
        await recoverSignup(email, error.message);
        return;
      }

      handled = true;
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page auth-page--entry">
      <section className="auth-card auth-card--signup">
        <div className="auth-card__header">
          <h1>Create your account</h1>
          <p>Join 10,000+ security professionals protecting their edge.</p>
        </div>

        <div className="social-row">
          <button type="button" className="social-button">
            <span className="google-mark">G</span>
            Google
          </button>
          <button type="button" className="social-button">
            <GitHubIcon />
            GitHub
          </button>
        </div>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <form className="auth-form" onSubmit={createAccount}>
          <label className="auth-field">
            <span>Full Name</span>
            <div className="auth-input">
              <UserIcon />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Work Email</span>
            <div className="auth-input">
              <MailIcon />
              <input
                name="email"
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input">
              <LockIcon />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={form.password}
                onChange={updateField}
                autoComplete="new-password"
                required
                minLength="8"
              />
              <button
                type="button"
                className="auth-input__icon-button"
                aria-label="Show password"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <EyeIcon />
              </button>
            </div>
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <div className="auth-input">
              <LockIcon />
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={form.confirmPassword}
                onChange={updateField}
                autoComplete="new-password"
                required
                minLength="8"
              />
              <button
                type="button"
                className="auth-input__icon-button"
                aria-label="Show password"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <EyeIcon />
              </button>
            </div>
          </label>

          <label className="terms-check">
            <input
              name="acceptedTerms"
              type="checkbox"
              checked={form.acceptedTerms}
              onChange={updateField}
            />
            <span>
              I agree to the <a href={buildHashUrl(ROUTES.home)}>Terms of Service</a> and{' '}
              <a href={buildHashUrl(ROUTES.home)}>Privacy Policy</a>.
            </span>
          </label>

          {status.message && (
            <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>
          )}

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Get Started'}
            <ArrowIcon />
          </button>
        </form>

        <p className="security-note">
          <LockIcon />
          Your data is protected with advanced security.
        </p>
      </section>
    </main>
  );
}

export default CreateAccountPage;
