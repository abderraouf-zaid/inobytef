import { comparisonRows } from '../../data/landingData';

function ComparisonSection() {
  return (
    <section className="comparison-section">
      <div className="comparison-copy">
        <h2>
          Not Just Security...
          <br />
          Understanding
        </h2>
        <p>
          Most tools tell you that something went wrong. We tell you <strong>why</strong>,{' '}
          <strong>how</strong>, and <strong>how to ensure it never happens again</strong>.
          Our difference lies in the depth of our telemetry and the intelligence of
          our response layer.
        </p>
        <a href="/pricing" className="secondary-button">
          Explore the Platform
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div className="comparison-table">
        <div className="comparison-table__header">
          <span>METRIC</span>
          <span>LEGACY TOOLS</span>
          <span>SENTINELSHIELD</span>
        </div>

        {comparisonRows.map((row) => (
          <div key={row.metric} className="comparison-row">
            <span className="comparison-row__metric">{row.metric}</span>

            <div className="comparison-cell comparison-cell--legacy">
              <span className="comparison-icon comparison-icon--bad">&times;</span>
              <span>{row.legacy}</span>
            </div>

            <div className="comparison-cell comparison-cell--modern">
              <span className="comparison-icon comparison-icon--good">&#10003;</span>
              <span>{row.modern}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ComparisonSection;
