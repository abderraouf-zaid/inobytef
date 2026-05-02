import { CircleIcon, LockIcon, ShieldIcon } from './AuthIcons';

function AuthBottomBadges() {
  return (
    <div className="signup-badges">
      <div>
        <ShieldIcon />
        <span>SOC2 TYPE II</span>
      </div>
      <div>
        <LockIcon />
        <span>GDPR READY</span>
      </div>
      <div>
        <CircleIcon />
        <span>SLA 99.9%</span>
      </div>
    </div>
  );
}

export default AuthBottomBadges;
