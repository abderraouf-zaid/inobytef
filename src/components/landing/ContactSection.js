import ContactIcon from '../icons/ContactIcon';
import { contactItems } from '../../data/landingData';

function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-copy">
        <h2>
          Ready to fortify your
          <br />
          application?
        </h2>
        <p>
          Join our exclusive Early Access program and get 3 months of
          enterprise-grade security for free. Our engineering team will
          personally assist with your initial setup.
        </p>

        <div className="contact-list">
          {contactItems.map((item) => (
            <div key={item.title} className="contact-item">
              <span className="contact-item__icon">
                <ContactIcon type={item.icon} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="plans-offer-card">
        <div className="plans-offer-card__icon" aria-hidden="true">
          <span>&#127873;</span>
          <i>&#10023;</i>
        </div>

        <h3>Explore Our Plans</h3>
        <strong>Explore Our Plans</strong>
        <p>
          Discover the perfect security plan tailored for your application&apos;s
          needs.
        </p>

        <div className="plans-offer-card__tiers" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="plans-offer-card__labels" aria-hidden="true">
          <span>CORE</span>
          <span>PRO</span>
          <span>ENTERPRISE</span>
        </div>

        <a href="/pricing" className="plans-offer-card__button">
          Browse Offers
          <span aria-hidden="true">&rarr;</span>
        </a>

        <small>&#9889; Special launch pricing available for a limited time</small>
      </div>
    </section>
  );
}

export default ContactSection;
