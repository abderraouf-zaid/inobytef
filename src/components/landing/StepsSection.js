import StepIcon from '../icons/StepIcon';
import { steps } from '../../data/landingData';

function StepsSection() {
  return (
    <section className="steps-section">
      <h2>How it Works</h2>
      <p className="section-subtitle">Up and running in minutes, not months.</p>

      <div className="steps-line" />

      <div className="steps-grid">
        {steps.map((step) => (
          <article key={step.label} className="step-card">
            <div className="step-card__icon">
              <StepIcon type={step.icon} />
            </div>
            <span>{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StepsSection;
