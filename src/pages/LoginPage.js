import { useState } from 'react';
import AuthBottomBadges from '../components/auth/AuthBottomBadges';
import { EyeIcon, GitHubIcon, LockIcon, MailIcon, ShieldIcon } from '../components/auth/AuthIcons';
import { authApi } from '../services/api';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
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

  const signIn = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authApi.login({
        email: form.email.trim(),
        password: form.password
      });
      const token = data.token || data.authToken || data.accessToken;
      const storage = form.remember ? localStorage : sessionStorage;
      if (token) {
        storage.setItem('authToken', token);
      }
      if (data.apiKey) {
        storage.setItem('apiKey', data.apiKey);
      }
      storage.setItem('userEmail', form.email.trim());
      window.location.href = '/pricing';
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <a href="/" className="auth-back-button">&larr; Back to home</a>

      <div className="auth-logo">
        <ShieldIcon />
      </div>

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
            <span className="field-row">
              Password
              <a href="/login">Forgot password?</a>
            </span>
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

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <a href="/signup">Create an account</a>
        </p>

        <p className="security-note">
          <LockIcon />
          Enterprise grade security active.
        </p>
      </section>

      <AuthBottomBadges />
      <p className="auth-copyright auth-copyright--inline">&copy; 2026 ShieldFlow Security Platform.</p>
    </main>
  );
}

export default LoginPage;
