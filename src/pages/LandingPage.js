import { useEffect, useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import PlatformSection from '../components/landing/PlatformSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import StepsSection from '../components/landing/StepsSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import VisibilitySection from '../components/landing/VisibilitySection';
import ContactSection from '../components/landing/ContactSection';

function LandingPage() {
  const [showAuthActions, setShowAuthActions] = useState(false);

  useEffect(() => {
    const tokenKeys = ['token', 'authToken', 'accessToken'];
    const hasToken = tokenKeys.some(
      (key) => localStorage.getItem(key) || sessionStorage.getItem(key),
    );

    setShowAuthActions(!hasToken);
  }, []);

  return (
    <main className="landing-page">
      <HeroSection showAuthActions={showAuthActions} />
      <PlatformSection />
      <FeaturesSection />
      <StepsSection />
      <ComparisonSection />
      <VisibilitySection />
      <ContactSection />
    </main>
  );
}

export default LandingPage;
