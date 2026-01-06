import React from 'react';
import '../style.css';

function SupportPage() {
  return (
    <div className="support-page">
      <section className="support-hero">
        <h1>Need Help? We're Here for You</h1>
        <p>
          Whether you're a first-time user or a long-time customer, our support team is ready to assist you.
        </p>
      </section>

      <section className="support-faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>How do I upload a medical report?</strong><br />
            Go to the Analyze page and drag your file into the upload box. Supported formats: PDF, PNG, JPG.
          </li>
          <li>
            <strong>What does the AI advisory engine do?</strong><br />
            It analyzes your report and symptoms to offer lifestyle tips, alerts, and doctor recommendations.
          </li>
          <li>
            <strong>Can I talk to a real doctor?</strong><br />
            Yes! Our Enterprise plan includes telemedicine integration with certified professionals.
          </li>
          <li>
            <strong>Is my data secure?</strong><br />
            Absolutely. We follow HIPAA compliance and encrypt all data in transit and at rest.
          </li>
        </ul>
      </section>

      <section className="support-contact">
        <h2>Contact Support</h2>
        <p>If your question isn’t answered above, reach out to us directly:</p>
        <ul>
          <li>Email: <a href="mailto:support@mediscan.ai">support@mediscan.ai</a></li>
          <li>Phone: +91-98765-43210</li>
          <li>Live Chat: Available 9am–6pm IST, Monday to Saturday</li>
        </ul>
      </section>

      <section className="support-links">
        <h2>Helpful Resources</h2>
        <ul>
          <li><a href="/guides">User Guides</a></li>
          <li><a href="/faq">Full FAQ</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/data-security">Data Security</a></li>
        </ul>
      </section>
    </div>
  );
}

export default SupportPage;
