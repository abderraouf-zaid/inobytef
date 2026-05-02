function PlatformSection() {
  return (
    <section className="platform">
      <div className="platform__visual">
        <div className="platform__radar">
          <span className="radar-dot radar-dot--dark" />
          <span className="radar-dot radar-dot--red" />
          <div className="radar-ring radar-ring--outer" />
          <div className="radar-ring radar-ring--inner" />
          <div className="radar-center">
            <svg
              className="shield-icon"
              viewBox="0 0 48 56"
              aria-hidden="true"
            >
              <path
                d="M24 4 L38 10 V24 C38 35 31 44 24 48 C17 44 10 35 10 24 V10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M18 28 L23 33 L31 23"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="platform__content">
        <span className="tag">THE MISSION</span>
        <h2>What is this platform?</h2>
        <p>
          SentinelShield was built with one goal: to replace fragmented security
          tools with a unified, intelligent defense system. We provide more than
          just logs; we provide context. By combining AI analysis with real-time
          packet inspection, we give teams the clarity they need to act decisively.
        </p>

        <div className="platform__stats">
          <div>
            <strong>100%</strong>
            <span>Coverage of OWASP Top 10 vulnerabilities.</span>
          </div>
          <div>
            <strong>&lt; 1ms</strong>
            <span>Latency overhead on your application traffic.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformSection;
