import { useEffect, useState } from 'react';
import './App.css';
import { LandingPage, normalizePath, routeList } from './routes';

function getCurrentPath() {
  const hashPath = window.location.hash.replace(/^#/, '').split('?')[0];
  return normalizePath(hashPath || window.location.pathname);
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
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
