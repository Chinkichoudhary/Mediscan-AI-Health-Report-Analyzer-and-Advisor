import React from 'react';
import '../style.css';

function DataSecurityPage() {
  return (
    <div className="legal-page">
      <h1>Data Security</h1>
      <p>
        MediScan AI takes data protection seriously. We implement industry-standard security measures to safeguard your information:
      </p>

      <ul>
        <li>HIPAA-compliant infrastructure</li>
        <li>End-to-end encryption (in transit and at rest)</li>
        <li>Certified vendors: SOC 2 Type 2, ISO/IEC 27001:2022</li>
        <li>Regular audits and vulnerability testing</li>
        <li>Access control and role-based permissions</li>
      </ul>

      <p>
        Your data is never sold or shared without consent. For more details, see our <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default DataSecurityPage;
