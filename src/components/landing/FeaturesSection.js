import FeatureIcon from '../icons/FeatureIcon';
import { features } from '../../data/landingData';

function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <span className="capability-tag">Capabilities</span>
      <h2>Powerful Security, Simplified</h2>
      <p className="section-subtitle">
        Everything you need to monitor and mitigate risk without hiring a
        full-time security analyst.
      </p>

      <div className="features-grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <div className="feature-card__icon">
              <FeatureIcon type={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
