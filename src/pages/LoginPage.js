import { useMemo, useState } from 'react';
import { EyeIcon, GitHubIcon, LockIcon, MailIcon } from '../components/auth/AuthIcons';
import { ROUTES } from '../constants/routes';
import { authApi } from '../services/api';
import { buildHashUrl, goTo } from '../utils/navigation';

function getLoginParams() {
  const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
  return new URLSearchParams(hashQuery || window.location.search);
}

function LoginPage() {
  const params = useMemo(getLoginParams, []);
  const requestedNextPath = params.get('next') || ROUTES.pricing;
  const nextPath = requestedNextPath.startsWith('/') ? requestedNextPath : ROUTES.pricing;
  const [form, setForm] = useState({
    email: params.get('email') || sessionStorage.getItem('userEmail') || '',
    password: '',
    remember: false
  });
  const [status, setStatus] = useState(() => (
    params.get('verified') === '1'
      ? { type: 'success', message: 'Email verified. Sign in to continue.' }
      : { type: '', message: '' }
  ));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const signIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authApi.login({
        email: form.email.trim(),
        password: form.password
      });
      const storage = form.remember ? localStorage : sessionStorage;
      const token = data.token || data.authToken || data.accessToken;

      if (token) {
        storage.setItem('authToken', token);
      }

      if (data.apiKey) {
        storage.setItem('apiKey', data.apiKey);
      }

      storage.setItem('userEmail', form.email.trim());
      goTo(nextPath);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page auth-page--entry">
      <section className="auth-card auth-card--login">
        <div className="auth-card__header auth-card__header--left">
          <h1>Welcome Back</h1>
          <p>Sign in to your security dashboard to continue monitoring.</p>
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

        <form className="auth-form" onSubmit={signIn}>
          <label className="auth-field">
            <span>Email Address</span>
            <div className="auth-input">
              <MailIcon />
              <input name="email" type="email" placeholder="name@company.com" value={form.email} onChange={updateField} autoComplete="email" required />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input">
              <LockIcon />
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="********" value={form.password} onChange={updateField} autoComplete="current-password" required />
              <button type="button" className="auth-input__icon-button" aria-label="Show password" onClick={() => setShowPassword((visible) => !visible)}>
                <EyeIcon />
              </button>
            </div>
          </label>

          <label className="terms-check terms-check--login">
            <input name="remember" type="checkbox" checked={form.remember} onChange={updateField} />
            <span>Remember me for 30 days</span>
          </label>

          {status.message && <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>}

          <button type="submit" className="auth-submit" disabled={isSubmitting} onSubmit={signIn} >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <a href={buildHashUrl(ROUTES.signup)}>Create an account</a>
        </p>

        <p className="security-note">
          <LockIcon />
          Enterprise grade security active.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
