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

export default ContactIcon;
