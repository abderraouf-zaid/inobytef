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

export default StepIcon;
