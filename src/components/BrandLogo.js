function BrandLogo({ className = '', markOnly = false }) {
  const classes = ['brand-logo', className].filter(Boolean).join(' ');

  return (
    <span className={classes} aria-label="CyberLens">
      <svg className="brand-logo__mark" viewBox="0 0 96 96" aria-hidden="true">
        <defs>
          <linearGradient id="cyberlens-mark-gradient" x1="16" y1="14" x2="82" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D28D9" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="34" fill="none" stroke="url(#cyberlens-mark-gradient)" strokeWidth="6" />
        <circle cx="48" cy="48" r="18" fill="none" stroke="url(#cyberlens-mark-gradient)" strokeWidth="5" />
        <circle cx="48" cy="48" r="9" fill="none" stroke="url(#cyberlens-mark-gradient)" strokeWidth="5" />
        <path d="M48 8v11M48 77v11M8 48h11M77 48h11M24 24l8 8M72 24l-8 8M24 72l8-8M72 72l-8-8" fill="none" stroke="url(#cyberlens-mark-gradient)" strokeLinecap="round" strokeWidth="5" />
      </svg>
      {!markOnly && <span className="brand-logo__word">CyberLens</span>}
    </span>
  );
}

export default BrandLogo;
