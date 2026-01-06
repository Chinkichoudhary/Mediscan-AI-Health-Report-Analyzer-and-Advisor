import React from 'react';
import '../style.css';

function FAQPage() {
  return (
    <div className="faq-page">
      <section className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers to the most common questions about MediScan AI.</p>
      </section>

      <section className="faq-list">
        <div className="faq-item">
          <h2>What is MediScan AI?</h2>
          <p>
            MediScan AI is a health report analyzer and advisor that uses machine learning, NLP, and OCR to
            interpret medical records, predict diseases, and provide personalized recommendations.
          </p>
        </div>

        <div className="faq-item">
          <h2>Is my data secure?</h2>
          <p>
            Yes. MediScan AI is HIPAA compliant, encrypts all data in transit and at rest, and works only with certified vendors.
          </p>
        </div>

        <div className="faq-item">
          <h2>Can I try MediScan AI for free?</h2>
          <p>
            Absolutely. We offer a 15-day free trial with access to core features so you can experience the platform before subscribing.
          </p>
        </div>

        <div className="faq-item">
          <h2>Which reports can I upload?</h2>
          <p>
            You can upload blood tests, ECGs, radiology scans, and other medical reports in PDF, JPG, or PNG format.
          </p>
        </div>

        <div className="faq-item">
          <h2>Does MediScan AI replace doctors?</h2>
          <p>
            No. MediScan AI is designed to assist physicians and patients by providing faster insights, but it does not replace professional medical consultation.
          </p>
        </div>

        <div className="faq-item">
          <h2>How do I contact support?</h2>
          <p>
            You can reach us via email at <a href="mailto:support@mediscan.ai">support@mediscan.ai</a>, phone, or live chat during business hours.
          </p>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;
