// ─────────────────────────────────────────────────────────
// ملف routes.js
// هنا نجمع كل الصفحات ونربطها بمساراتها
// ─────────────────────────────────────────────────────────

import LandingPage       from './pages/LandingPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage         from './pages/LoginPage';
import PricingPage       from './pages/PricingPage';
import VerifyEmailPage   from './pages/VerifyEmailPage';
import ConfirmBuyPage    from './pages/ConfirmBuyPage';
import OnboardingPage    from './pages/OnboardingPage';
import { ROUTES }        from './constants/routes';

// ─── مسارات قديمة ────────────────────────────────────────
// بعض المسارات تأتي بأشكال مختلفة (كبيرة/صغيرة)
// نحولها كلها لمسار واحد موحد
const LEGACY_ROUTES = {
  '/Confirm-Buy': ROUTES.confirmBuy,  // نسخة قديمة بأحرف كبيرة
  '/setup':       ROUTES.confirmBuy,  // اسم قديم للمسار
  '/Setup':       ROUTES.confirmBuy,  // نفسه لكن بحرف كبير
};

// ─── قائمة الصفحات ───────────────────────────────────────
// كل عنصر: path = المسار، component = الصفحة اللي تظهر
export const routeList = [
  { path: ROUTES.signup,      component: CreateAccountPage },
  { path: ROUTES.login,       component: LoginPage         },
  { path: ROUTES.pricing,     component: PricingPage       },
  { path: ROUTES.verifyEmail, component: VerifyEmailPage   },
  { path: ROUTES.confirmBuy,  component: ConfirmBuyPage    },
  { path: ROUTES.onboarding,  component: OnboardingPage    },
];

// ─── دالة تنظيف المسار ───────────────────────────────────
// إذا كان المسار قديماً نحوله للمسار الصحيح
// وإلا نرجعه كما هو
export function normalizePath(path) {
  return LEGACY_ROUTES[path] || path;
}

// نصدّر LandingPage لأن App.js يستخدمها كصفحة افتراضية
export { LandingPage };
