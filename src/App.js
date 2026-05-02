import './App.css';
import LandingPage from './pages/LandingPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import FlowSetupWizard from './pages/FlowSetup';

function App() {
  const hashPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const path = hashPath || window.location.pathname;

  if (path === '/signup') {
    return <CreateAccountPage />;
  }

  if (path === '/login') {
    return <LoginPage />;
  }
  if (path === '/setup' || path === '/Setup') {
    return <FlowSetupWizard />;
  }

  if (path === '/pricing') {

    return <PricingPage />;
  }

  if (path === '/verify-email') {
    return <VerifyEmailPage />;
  }

  return <LandingPage />;
}

export default App;
