import { useEffect, useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import SimplerSection from '../components/landing/SimplerSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import StepsSection from '../components/landing/StepsSection';
import ContactSection from '../components/landing/ContactSection';

function LandingPage() {
  const [showAuthActions, setShowAuthActions] = useState(false);

  useEffect(() => {
    const tokenKeys = ['token', 'authToken', 'accessToken'];
    const hasToken = tokenKeys.some(
      (key) => localStorage.getItem(key) || sessionStorage.getItem(key),
    );
    const hasCreatedAccount = localStorage.getItem('accountCreated') === 'true';

    setShowAuthActions(!hasToken && !hasCreatedAccount);
  }, []);

  return (
    <main className="landing-page landing-page--visily">
      <HeroSection showAuthActions={showAuthActions} />
      <SimplerSection />
      <FeaturesSection />
      <StepsSection />
      <ContactSection />
    </main>
  );
}

export default LandingPage;
