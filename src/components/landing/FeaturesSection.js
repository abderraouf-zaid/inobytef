import FeatureIcon from '../icons/FeatureIcon';
import { features } from '../../data/landingData';

function FeaturesSection() {
  return (
    <section className="features-section">
      <h2>Everything you need to stay ahead</h2>
      <p className="section-subtitle">
        A comprehensive suite of security tools designed for the modern web
        infrastructure.
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
