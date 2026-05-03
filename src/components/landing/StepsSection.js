import { steps } from '../../data/landingData';

function StepsSection() {
  return (
    <section id="journey" className="lp-steps">
      <div className="lp-steps__head">
        <h2>Your Journey to Cyber Resilience</h2>
        <p>
          Getting started is easy. We designed a 6-step process that takes you
          from vulnerability to total clarity.
        </p>
      </div>

      <div className="lp-steps__grid">
        {steps.map((step, index) => (
          <article key={step.title} className="lp-step">
            <span className="lp-step__num">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StepsSection;
