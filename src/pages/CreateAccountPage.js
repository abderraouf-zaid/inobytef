import { useState } from 'react';
import AuthBottomBadges from '../components/auth/AuthBottomBadges';
import { ArrowIcon, CircleIcon, EyeIcon, GitHubIcon, LockIcon, MailIcon, UserIcon } from '../components/auth/AuthIcons';
import { authApi } from '../services/api';

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

  const createAccount = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (!form.acceptedTerms) {
      setStatus({ type: 'error', message: 'Please accept the terms before creating your account.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authApi.register({
        email: form.email.trim(),
        password: form.password
      });
      const token = data.token || data.authToken || data.accessToken;

      sessionStorage.setItem('pendingVerificationEmail', form.email.trim());
      sessionStorage.setItem('userEmail', form.email.trim());

      if (token) {
        sessionStorage.setItem('authToken', token);
      }

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

      <div className="security-pill">
        <CircleIcon />
        <span>ENTERPRISE GRADE SECURITY</span>
      </div>

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
              <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={updateField} autoComplete="name" />
            </div>
          </label>

          <label className="auth-field">
            <span>Work Email</span>
            <div className="auth-input">
              <MailIcon />
              <input name="email" type="email" placeholder="john@company.com" value={form.email} onChange={updateField} autoComplete="email" required />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-input">
              <LockIcon />
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="********" value={form.password} onChange={updateField} autoComplete="new-password" required minLength="6" />
              <button type="button" className="auth-input__icon-button" aria-label="Show password" onClick={() => setShowPassword((visible) => !visible)}>
                <EyeIcon />
              </button>
            </div>
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <div className="auth-input">
              <LockIcon />
              <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="********" value={form.confirmPassword} onChange={updateField} autoComplete="new-password" required minLength="6" />
              <button type="button" className="auth-input__icon-button" aria-label="Show password" onClick={() => setShowPassword((visible) => !visible)}>
                <EyeIcon />
              </button>
            </div>
          </label>

          <label className="terms-check">
            <input name="acceptedTerms" type="checkbox" checked={form.acceptedTerms} onChange={updateField} />
            <span>
              I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
            </span>
          </label>

          {status.message && <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>}

          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Get Started'}
            <ArrowIcon />
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Sign in</a>
        </p>

        <p className="security-note">
          <LockIcon />
          Your data is protected with advanced security.
        </p>
      </section>

      <AuthBottomBadges />
      <p className="auth-copyright auth-copyright--inline">&copy; 2026 ShieldFlow Security Platform.</p>
    </main>
  );
}

export default CreateAccountPage;
