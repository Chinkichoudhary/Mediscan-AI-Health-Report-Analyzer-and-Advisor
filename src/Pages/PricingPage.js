import React, { useState } from 'react';
import '../style.css';

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <h1>Choose the Right Plan for You</h1>
        <p>
          MediScan AI offers flexible plans designed for individuals, clinics, and hospitals. 
          Start with a free trial and scale as your needs grow.
        </p>
      </section>

      <section className="pricing-grid">
        {/* Free Trial */}
        <div
          className={`pricing-card ${selectedPlan === 'free' ? 'selected' : ''}`}
          onClick={() => handleSelect('free')}
        >
          <h2>Free Trial</h2>
          <p className="price">₹0 / 15 days</p>
          <ul>
            <li>Upload up to 10 reports</li>
            <li>Basic AI analysis</li>
            <li>Limited chatbot access</li>
          </ul>
          <button className="primary">Start Free Trial</button>
        </div>

        {/* Professional */}
        <div
          className={`pricing-card ${selectedPlan === 'pro' ? 'selected' : ''}`}
          onClick={() => handleSelect('pro')}
        >
          <h2>Professional</h2>
          <p className="price">₹1,999 / month</p>
          <ul>
            <li>Unlimited report uploads</li>
            <li>Full AI advisory engine</li>
            <li>Chatbot + OCR</li>
            <li>Email support</li>
          </ul>
          <button className="primary">Subscribe Now</button>
        </div>

        {/* Enterprise */}
        <div
          className={`pricing-card ${selectedPlan === 'enterprise' ? 'selected' : ''}`}
          onClick={() => handleSelect('enterprise')}
        >
          <h2>Enterprise</h2>
          <p className="price">Custom Pricing</p>
          <ul>
            <li>Multi-user dashboard</li>
            <li>API integration</li>
            <li>Priority support</li>
            <li>Doctor network access</li>
          </ul>
          <button className="primary">Contact Sales</button>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
