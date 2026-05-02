import { useMemo, useRef, useState } from 'react';
import AuthBottomBadges from '../components/auth/AuthBottomBadges';
import { ArrowIcon, LockIcon, MailIcon, ShieldIcon } from '../components/auth/AuthIcons';
import { authApi } from '../services/api';

function VerifyEmailPage() {
  const inputRefs = useRef([]);
  const email = useMemo(() => {
    const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
    const params = new URLSearchParams(hashQuery || window.location.search);
    return params.get('email') || sessionStorage.getItem('pendingVerificationEmail') || '';
  }, []);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const updateDigit = (index, value) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1);
    setDigits((current) => current.map((digit, position) => (position === index ? cleanValue : digit)));

    if (cleanValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyEmail = async (event) => {
    event.preventDefault();

    if (!email) {
      setStatus({ type: 'error', message: 'Please sign up again so we know which email to verify.' });
      return;
    }

    const otp = digits.join('');

    if (otp.length !== 6) {
      setStatus({ type: 'error', message: 'Enter the 6 digit code from your email.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authApi.verifyOtp({ email, otp });
      const token = data.token || data.authToken || data.accessToken;

      if (token) {
        sessionStorage.setItem('authToken', token);
      }
      sessionStorage.setItem('userEmail', email);
      sessionStorage.removeItem('pendingVerificationEmail');
      setStatus({ type: 'success', message: 'Email verified. Redirecting to pricing...' });
      window.setTimeout(() => {
        window.location.href = '/pricing';
      }, 900);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Please sign up again so we know where to send the code.' });
      return;
    }

    setIsResending(true);
    setStatus({ type: '', message: '' });

    try {
      await authApi.resendOtp({ email });
      setStatus({ type: 'success', message: 'New verification code sent.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="auth-page">
      <a href="/" className="auth-back-button">&larr; Back to home</a>

      <div className="verify-shield">
        <ShieldIcon />
      </div>

      <section className="auth-card verify-card">
        <div className="auth-card__header">
          <h1>Verify your email</h1>
          <p>
            We&apos;ve sent a 6-digit verification code to
            <strong>
              <MailIcon />
              {email || 'your email address'}
            </strong>
          </p>
        </div>

        <form onSubmit={verifyEmail}>
          <div className="code-group">
          <span>Enter your 6-digit code</span>
          <div className="code-boxes" aria-label="Verification code boxes">
            {digits.map((digit, index) => (
              <input
                key={`digit-${index + 1}`}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                maxLength="1"
                inputMode="numeric"
                aria-label={`Digit ${index + 1}`}
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !digits[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>
          </div>

          <div className="expire-note">
            <LockIcon />
            <p>This code will expire in 10 minutes. ShieldFlow will never ask for your password via email.</p>
          </div>

          {status.message && <p className={`auth-status auth-status--${status.type}`}>{status.message}</p>}

          <button type="submit" className="auth-submit verify-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify Account'}
            <ArrowIcon />
          </button>
        </form>

        <div className="verify-resend">
          <p>
            Didn&apos;t receive the code? <button type="button" onClick={resendCode} disabled={isResending}>{isResending ? 'Sending...' : 'Resend code'}</button>
          </p>
          <small>
            By verifying your email, you agree to our Terms of Service and Privacy Policy.
          </small>
        </div>
      </section>

      <AuthBottomBadges />
      <p className="auth-copyright auth-copyright--inline">&copy; 2026 ShieldFlow Security Platform. ISO 27001 Certified.</p>
    </main>
  );
}

export default VerifyEmailPage;
