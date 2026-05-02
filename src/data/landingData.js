export const features = [
  {
    icon: 'scanner',
    title: 'Vulnerability Scanner',
    description:
      'Automated deep-scans for XSS, SQL Injection, and common misconfigurations before they reach production.',
  },
  {
    icon: 'monitoring',
    title: 'Real-time Monitoring',
    description:
      'Live traffic visualization and anomaly detection using high-frequency sampling and heuristics.',
  },
  {
    icon: 'alerts',
    title: 'Smart Alerts',
    description:
      'Intelligent notification routing via Slack, PagerDuty, or Email only for threats that actually matter.',
  },
  {
    icon: 'ai',
    title: 'AI Explanations',
    description:
      'Leverage LLM-driven insights to understand how a threat occurred and get instant patch suggestions.',
  },
  {
    icon: 'behavior',
    title: 'Login Behavior Tracking',
    description:
      'Detect impossible travel, credential stuffing, and unusual user agent transitions instantly.',
  },
  {
    icon: 'upload',
    title: 'File Upload Protection',
    description:
      'Sandboxed file scanning with multi-engine malware analysis for every upload to your servers.',
  },
];

export const steps = [
  {
    icon: 'connect',
    label: 'STEP 01',
    title: 'Connect your website',
    description:
      'Simply integrate our SDK or use our cloud proxy to route your traffic through our secure edge.',
  },
  {
    icon: 'shield',
    label: 'STEP 02',
    title: 'Scan & monitor activity',
    description:
      'Our engine starts baseline profiling and active scanning immediately, building your security map.',
  },
  {
    icon: 'check',
    label: 'STEP 03',
    title: 'Receive alerts & insights',
    description:
      'Get categorized threat reports and actionable fix suggestions delivered directly to your team.',
  },
];

export const comparisonRows = [
  {
    metric: 'ANALYSIS SPEED',
    legacy: 'Post-mortem',
    modern: 'Instant\nReal-time',
  },
  {
    metric: 'FALSE POSITIVES',
    legacy: 'Common\n(15%+)',
    modern: 'Rare (<\n0.1%)',
  },
  {
    metric: 'INTEGRATION',
    legacy: 'Heavy Ops',
    modern: 'One-line\nscript',
  },
  {
    metric: 'THREAT INTEL',
    legacy: 'Static DB',
    modern: 'Predictive\nAI',
  },
];

export const chartLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

export const contactItems = [
  {
    icon: 'support',
    title: 'Direct Support',
    description: 'access@sentinelshield.ai',
  },
  {
    icon: 'global',
    title: 'Global Infrastructure',
    description: '32 Global Edge Locations',
  },
];
