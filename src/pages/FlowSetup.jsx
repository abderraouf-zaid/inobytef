import React, { useMemo } from 'react';
import { pricingPlans } from '../data/pricingData';

function FlowSetupWizard() {
    const { plan, amount, dates, transactionId } = useMemo(() => {
        // Parse params from the main URL search or from the hash segment
        const queryString = window.location.search || window.location.hash.split('?')[1] || '';
        const params = new URLSearchParams(queryString);
        const planParam = params.get('plan') || 'pro';

        // Find plan or default to fallback
        const foundPlan = pricingPlans.find(
            (item) => item.name.toLowerCase() === planParam.toLowerCase()
        ) || pricingPlans[1] || pricingPlans[0] || { name: 'Pro', price: 0 };

        // Format Amount
        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(foundPlan.price || 0);

        // Dynamic Dates
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);

        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };

        // Unique ID for the receipt
        const txnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-SHLD`;

        return {
            plan: foundPlan,
            amount: formattedAmount,
            dates: {
                current: today.toLocaleDateString('en-US', dateOptions),
                renewal: nextMonth.toLocaleDateString('en-US', dateOptions)
            },
            transactionId: txnId
        };
    }, []);

    return (
        <main className="setup-page setup-page--success">
            <section className="payment-success">
                <div className="payment-success__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>

                <h1>Payment Successful</h1>
                <p>
                    Welcome to ShieldFlow. Your web infrastructure is now protected by our AI-driven security mesh.
                </p>

                <div className="payment-details">
                    <div className="payment-details__header">
                        <div>
                            <strong>Subscription Details</strong>
                            <span>A receipt has been sent to your email.</span>
                        </div>
                        <em>Active</em>
                    </div>

                    <dl>
                        <div>
                            <dt>Plan Type</dt>
                            <dd>{plan.name} Subscription (Monthly)</dd>
                        </div>
                        <div>
                            <dt>Transaction ID</dt>
                            <dd>{transactionId}</dd>
                        </div>
                        <div>
                            <dt>Date</dt>
                            <dd>{dates.current}</dd>
                        </div>
                        <div>
                            <dt>Amount Paid</dt>
                            <dd>{amount}</dd>
                        </div>
                        <div>
                            <dt>Next Renewal</dt>
                            <dd>{dates.renewal}</dd>
                        </div>
                    </dl>

                    <div className="payment-details__badges">
                        <span>256-bit Encryption</span>
                        <span>Receipt Emailed</span>
                        <span>24/7 Priority Support</span>
                    </div>
                </div>

                <a href="/" className="payment-success__button">
                    Go to Dashboard
                    <span aria-hidden="true">&rarr;</span>
                </a>

                <small>
                    Trouble logging in? <a href="/">Visit Support</a>
                </small>
            </section>
        </main>
    );
}
export default FlowSetupWizard;