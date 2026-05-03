import { useEffect, useState } from 'react';
import './App.css';
<<<<<<< HEAD
import LandingPage from './pages/LandingPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import FlowSetupWizard from './pages/FlowSetup';
=======
import { LandingPage, normalizePath, routeList } from './routes';

function getCurrentPath() {
  // نقرأ المسار من hash أو من pathname حتى يدعم المشروع الطريقتين.
  const hashPath = window.location.hash.replace(/^#/, '').split('?')[0];
  return normalizePath(hashPath || window.location.pathname);
}
>>>>>>> 191bd18 (jackkkk)

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    // عند تغيير الرابط من الأزرار، نحدث الصفحة بدون React Router.
    const updatePath = () => setCurrentPath(getCurrentPath());

    window.addEventListener('hashchange', updatePath);
    window.addEventListener('popstate', updatePath);

    return () => {
      window.removeEventListener('hashchange', updatePath);
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  const activeRoute = routeList.find((route) => route.path === currentPath);

  if (activeRoute) {
    const Page = activeRoute.component;
    return <Page />;
  }

  return <LandingPage />;
}

export default App;
