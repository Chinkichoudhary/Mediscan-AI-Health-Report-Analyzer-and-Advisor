import React from 'react';
import '../style.css';

function PrivacyPage() {
  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>Your privacy matters. MediScan AI is committed to protecting your data and ensuring compliance.</p>
      </section>

      <section className="privacy-section">
        <h2>Data Collection</h2>
        <p>We collect only the information necessary to provide our services, such as uploaded medical reports and account details.</p>
      </section>

      <section className="privacy-section">
        <h2>Data Security</h2>
        <p>All data is encrypted in transit and at rest. We are HIPAA compliant and work with certified vendors (SOC 2 Type 2, ISO/IEC 27001:2022).</p>
      </section>

      <section className="privacy-section">
        <h2>Usage of Data</h2>
        <p>Your data is used solely for medical analysis and advisory purposes. We never sell or share your information with third parties without consent.</p>
      </section>

      <section className="privacy-section">
        <h2>Your Rights</h2>
        <p>You can request deletion of your data, access your records, or update your information anytime by contacting support.</p>
      </section>
    </div>
  );
}

export default PrivacyPage;
