import React from 'react';
import '../style.css';

function AcceptableUsePage() {
  return (
    <div className="legal-page">
      <h1>Acceptable Use Policy</h1>
      <p>
        MediScan AI is committed to ethical and responsible use of its platform. By using our services, you agree to the following:
      </p>

      <ul>
        <li>Do not upload false, misleading, or fraudulent medical data.</li>
        <li>Do not use MediScan AI for illegal or harmful purposes.</li>
        <li>Do not attempt to reverse-engineer, hack, or disrupt the platform.</li>
        <li>Respect patient privacy and confidentiality at all times.</li>
        <li>Do not share login credentials or misuse access privileges.</li>
      </ul>

      <p>
        Violations may result in suspension or termination of access. For questions, contact <a href="/contact">Support</a>.
      </p>
    </div>
  );
}

export default AcceptableUsePage;
