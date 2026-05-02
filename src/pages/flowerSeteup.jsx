// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// /**
//  * FlowSetupWizard - Consolidating all steps from "visily-multiscreens reda.pdf"
//  * Features: Smooth animations, functional switches, and technical stack toggle.
//  */
// const FlowSetupWizard = () => {
//     const [step, setStep] = useState(1);
//     const [agreed, setAgreed] = useState(false);
//     const [selectedStack, setSelectedStack] = useState('JavaScript');

//     const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
//     const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//     // Animation variants for sliding effect
//     const variants = {
//         enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
//         center: { x: 0, opacity: 1 },
//         exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
//     };

//     return (
//         <div className="setup-container">
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
//         :root {
//           --primary-gradient: linear-gradient(90deg, #81a1f8 0%, #b892f7 100%);
//           --text-dark: #111827;
//           --text-muted: #6b7280;
//           --border-color: #e5e7eb;
//           --bg-light: #f9fafb;
//         }

//         .setup-container {
//           background-color: var(--bg-light);
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           font-family: 'Inter', sans-serif;
//           padding: 20px;
//           overflow: hidden;
//         }

//         .setup-card {
//           background: white;
//           width: 100%;
//           max-width: 600px;
//           border-radius: 16px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
//           position: relative;
//           padding: 40px;
//           border: 1px solid var(--border-color);
//         }

//         .setup-card::before {
//           content: "";
//           position: absolute;
//           top: 0; left: 0; right: 0; height: 5px;
//           background: var(--primary-gradient);
//           border-radius: 16px 16px 0 0;
//         }

//         .step-label { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; display: block; }
//         h1 { font-size: 26px; font-weight: 700; color: var(--text-dark); margin: 0 0 12px 0; }
//         .header-desc { color: var(--text-muted); line-height: 1.5; margin-bottom: 24px; font-size: 15px; }

//         /* Step 1: Terms */
//         .terms-box { border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; height: 180px; overflow-y: auto; margin-bottom: 20px; font-size: 14px; line-height: 1.6; }
//         .v-tag { font-size: 10px; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-bottom: 10px; display: inline-block; }

//         .checkbox-row { display: flex; gap: 14px; background: #f9fafb; padding: 18px; border-radius: 12px; border: 1px solid var(--border-color); cursor: pointer; transition: 0.2s; }
//         .checkbox-row:hover { border-color: #81a1f8; }
//         .checkbox-row input { width: 18px; height: 18px; cursor: pointer; accent-color: #81a1f8; }

//         /* Step 2: SDK Switches */
//         .tech-box { border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
//         .tech-header { background: #f9fafb; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); }
//         .stack-tabs { display: flex; gap: 12px; }
//         .stack-tab { padding: 4px 10px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--text-muted); border-radius: 6px; transition: 0.3s; }
//         .stack-tab.active { background: white; color: var(--text-dark); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
//         .terminal { background: #0f172a; color: #cbd5e1; padding: 20px; font-family: 'Monaco', monospace; display: flex; justify-content: space-between; align-items: center; font-size: 14px; }

//         /* Step 3: Verification */
//         .loader { width: 40px; height: 40px; border: 3px solid #f3f4f6; border-top: 3px solid #81a1f8; border-radius: 50%; animation: spin 1s linear infinite; margin: 30px auto; }
//         @keyframes spin { 100% { transform: rotate(360deg); } }
//         .checklist-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 14px; color: var(--text-muted); }
//         .dot { width: 8px; height: 8px; background: #d1d5db; border-radius: 50%; }

//         /* Step 4: Success */
//         .success-banner { display: flex; gap: 15px; background: #f5f8ff; padding: 20px; border-radius: 12px; margin-bottom: 20px; align-items: center; }
//         .check-icon { width: 48px; height: 48px; background: var(--primary-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; flex-shrink: 0; }
//         .feature-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px; }
//         .feature-item { padding: 12px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; font-weight: 600; text-align: center; background: white; }
//         .pro-tip { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; font-size: 13px; color: #92400e; }

//         /* Nav Buttons */
//         .footer-nav { display: flex; justify-content: space-between; margin-top: 30px; align-items: center; }
//         .btn-back { background: none; border: none; color: var(--text-muted); font-weight: 600; cursor: pointer; }
//         .btn-primary { background: var(--primary-gradient); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: transform 0.2s; }
//         .btn-primary:hover { transform: translateY(-1px); }
//         .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

//         .ext-footer { margin-top: 30px; text-align: center; }
//         .ext-links { display: flex; gap: 20px; justify-content: center; margin-bottom: 10px; font-size: 13px; color: #6b7280; }
//       `}</style>

//             <div className="setup-card">
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={step}
//                         initial="enter"
//                         animate="center"
//                         exit="exit"
//                         variants={variants}
//                         transition={{ duration: 0.3 }}
//                     >
//                         {step === 1 && (
//                             <div>
//                                 <span className="step-label">Step 1 of 4</span>
//                                 <h1>Terms and Conditions</h1>
//                                 <p className="header-desc">Before we get started, please review and accept our Master Service Agreement.[cite: 1]</p>
//                                 <div className="terms-box">
//                                     <span className="v-tag">v2.4[cite: 1]</span>
//                                     <p><strong>1. Acceptance of Terms[cite: 1]</strong><br />By accessing or using the FlowSetup platform, you agree to be bound by these terms.[cite: 1]</p>
//                                     <p><strong>2. Usage License[cite: 1]</strong><br />FlowSetup grants you a limited, non-exclusive, non-transferable license to access the platform.[cite: 1]</p>
//                                 </div>
//                                 <label className="checkbox-row">
//                                     <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
//                                     <div>
//                                         <strong style={{ fontSize: '14px', display: 'block' }}>I have read and agree to the Master Service Agreement[cite: 1]</strong>
//                                         <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Your acceptance will be logged with your current IP address.[cite: 1]</span>
//                                     </div>
//                                 </label>
//                             </div>
//                         )}

//                         {step === 2 && (
//                             <div>
//                                 <span className="step-label">Step 2 of 4[cite: 1]</span>
//                                 <h1>Install the SDK[cite: 1]</h1>
//                                 <p className="header-desc">Copy your credentials and drop the snippet into your project entry file.[cite: 1]</p>
//                                 <div className="tech-box">
//                                     <div className="tech-header">
//                                         <span style={{ fontWeight: 700, fontSize: '14px' }}>{'</>'} Technical Setup[cite: 1]</span>
//                                         <div className="stack-tabs">
//                                             {['JavaScript', 'Python', 'Go'].map(stack => (
//                                                 <div
//                                                     key={stack}
//                                                     className={`stack-tab ${selectedStack === stack ? 'active' : ''}`}
//                                                     onClick={() => setSelectedStack(stack)}
//                                                 >
//                                                     {stack}[cite: 1]
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div className="terminal">
//                                         <code>
//                                             {selectedStack === 'JavaScript' && '> npm install @flowsetup/sdk'}[cite: 1]
//                                             {selectedStack === 'Python' && '> pip install flowsetup-sdk'}[cite: 1]
//                                             {selectedStack === 'Go' && '> go get github.com/flowsetup/sdk'}[cite: 1]
//                                         </code>
//                                         <button className="copy-btn" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}>Copy[cite: 1]</button>
//                                     </div>
//                                 </div>
//                                 <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}><strong>🔑 Environment Variables:</strong> We recommend storing keys in a .env file.[cite: 1]</p>
//                             </div>
//                         )}

//                         {step === 3 && (
//                             <div style={{ textAlign: 'center' }}>
//                                 <span className="step-label">Step 3 of 4[cite: 1]</span>
//                                 <h1>Verify Installation[cite: 1]</h1>
//                                 <div className="loader"></div>
//                                 <h3 style={{ fontSize: '18px', margin: '0 0 8px 0' }}>Verification Pending[cite: 1]</h3>
//                                 <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Listening for signals from your server...[cite: 1]</p>
//                                 <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', marginTop: '25px', paddingTop: '15px' }}>
//                                     <div className="checklist-item"><div className="dot"></div> SDK Script Detection[cite: 1]</div>
//                                     <div className="checklist-item"><div className="dot"></div> API Handshake established[cite: 1]</div>
//                                     <p style={{ fontSize: '12px', fontWeight: 800, marginTop: '10px' }}>0/3 COMPLETE[cite: 1]</p>
//                                 </div>
//                             </div>
//                         )}

//                         {step === 4 && (
//                             <div>
//                                 <span className="step-label">Step 4 of 4[cite: 1]</span>
//                                 <h1>All Set![cite: 1]</h1>
//                                 <p className="header-desc">Your workspace has been successfully configured and is ready for production.[cite: 1]</p>
//                                 <div className="success-banner">
//                                     <div className="check-icon">✓</div>
//                                     <div>
//                                         <h4 style={{ margin: 0, fontSize: '15px' }}>Integration Verified & Active[cite: 1]</h4>
//                                         <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>All systems are green. API keys active.[cite: 1]</p>
//                                     </div>
//                                 </div>
//                                 <div className="feature-grid">
//                                     <div className="feature-item">📊 Dashboard[cite: 1]</div>
//                                     <div className="feature-item">👥 Team Access[cite: 1]</div>
//                                     <div className="feature-item">⚡ Webhooks[cite: 1]</div>
//                                 </div>
//                                 <div className="pro-tip">
//                                     <strong>PRO TIP[cite: 1]</strong>
//                                     <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>You can re-run these steps or update API keys in Workspace Settings.[cite: 1]</p>
//                                 </div>
//                             </div>
//                         )}
//                     </motion.div>
//                 </AnimatePresence>

//                 <div className="footer-nav">
//                     <button className="btn-back" onClick={prevStep} disabled={step === 1}>&larr; Back[cite: 1]</button>
//                     <button
//                         className="btn-primary"
//                         onClick={nextStep}
//                         disabled={step === 1 && !agreed}
//                     >
//                         {step === 4 ? 'Finish Setup' : 'Accept & Continue'}[cite: 1]
//                     </button>
//                 </div>
//             </div>

//             <footer className="ext-footer">
//                 <div className="ext-links">
//                     <span>Support[cite: 1]</span>
//                     <span>Privacy Policy[cite: 1]</span>
//                     <span>Terms of Service[cite: 1]</span>
//                 </div>
//                 <p style={{ fontSize: '12px', color: '#9ca3af' }}>© 2026 FlowSetup Inc. All rights reserved.[cite: 1]</p>
//             </footer>
//         </div>
//     );
// };

// export default FlowSetupWizard;