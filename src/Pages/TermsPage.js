import React from 'react';
import '../style.css';

function TermsPage() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p>
        By using MediScan AI, you agree to the following terms:
      </p>

      <ul>
        <li>You are responsible for the accuracy of uploaded data.</li>
        <li>MediScan AI provides advisory support, not medical diagnosis.</li>
        <li>We reserve the right to modify features or pricing at any time.</li>
        <li>All content is protected by copyright and may not be reproduced without permission.</li>
        <li>Disputes will be governed by the laws of India.</li>
      </ul>

      <p>
        For questions or legal inquiries, please contact <a href="/contact">Support</a>.
      </p>
    </div>
  );
}

export default TermsPage;
