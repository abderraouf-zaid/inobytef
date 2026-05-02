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

export default FeatureIcon;
