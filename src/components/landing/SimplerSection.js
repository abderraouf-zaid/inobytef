import assistantImg from '../../assets/landing/mobile-assistant.jpg';
import alertsImg from '../../assets/landing/mobile-alerts.jpg';
import scanImg from '../../assets/landing/mobile-scan.jpg';

const slides = [
  { src: alertsImg, label: 'Active Alerts' },
  { src: scanImg, label: 'Executive Dashboard' },
  { src: assistantImg, label: 'AI Assistant' },
];

function SimplerSection() {
  return (
    <section className="simpler-section">
      <div className="simpler-section__heading">
        <h2>A Simpler Way to Manage Security</h2>
        <p>
          From mobile alerts to executive summaries, keep your entire team
          informed with intuitive interfaces.
        </p>
      </div>

      <div className="simpler-grid" aria-label="Security dashboards">
        {slides.map((slide) => (
          <figure key={slide.label} className="simpler-grid__item">
            <img src={slide.src} alt={slide.label} />
            <figcaption>{slide.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default SimplerSection;
