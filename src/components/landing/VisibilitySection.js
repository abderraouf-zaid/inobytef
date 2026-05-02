import { chartLabels } from '../../data/landingData';

function VisibilitySection() {
  return (
    <section className="visibility-section">
      <div className="visibility-heading">
        <div>
          <h2>Full Visibility</h2>
          <p>
            A unified dashboard that gives you the bird&apos;s eye view and the
            molecular detail of every request.
          </p>
        </div>

        <div className="visibility-badges">
          <span>Live Updates</span>
          <span>Threat Vector: HIGH</span>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-card__header">
          <h3>Threat Activity Over Time</h3>
          <div className="chart-legend">
            <span>
              <i className="dot dot--black" />
              Global Traffic
            </span>
            <span>
              <i className="dot dot--red" />
              Threats Blocked
            </span>
          </div>
        </div>

        <div className="chart-area">
          <svg viewBox="0 0 980 430" className="traffic-chart" role="img" aria-label="Threat activity chart">
            <g className="traffic-chart__grid">
              <line x1="70" y1="70" x2="930" y2="70" />
              <line x1="70" y1="145" x2="930" y2="145" />
              <line x1="70" y1="220" x2="930" y2="220" />
              <line x1="70" y1="295" x2="930" y2="295" />
              <line x1="70" y1="370" x2="930" y2="370" />
            </g>

            <g className="traffic-chart__labels">
              <text x="32" y="74">1200</text>
              <text x="42" y="149">900</text>
              <text x="42" y="224">600</text>
              <text x="42" y="299">300</text>
              <text x="54" y="374">0</text>
            </g>

            <path
              className="traffic-chart__line traffic-chart__line--black"
              d="M80 255 C 145 280, 210 300, 250 280 C 320 210, 370 120, 470 75 C 560 55, 655 120, 730 200 C 790 255, 845 305, 915 355"
            />
            <path
              className="traffic-chart__line traffic-chart__line--red"
              d="M80 365 C 160 367, 220 370, 285 360 C 360 346, 420 330, 490 337 C 560 342, 650 355, 730 360 C 800 363, 860 366, 915 366"
            />
          </svg>

          <div className="chart-times">
            {chartLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisibilitySection;
