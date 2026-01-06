import React from 'react';
import '../style.css';

function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <section className="how-hero">
        <h1>How MediScan AI Works</h1>
        <p className="intro">
          MediScan AI is a next-generation health assistant that combines machine learning, natural language processing, and OCR to analyze medical records, predict diseases, and provide personalized recommendations — all in one unified platform.
        </p>
      </section>

      <section className="how-section">
        <h2>Step 1: Upload Your Medical Reports</h2>
        <p>
          Whether it's a blood test, ECG, or radiology scan, MediScan AI uses advanced OCR (Optical Character Recognition) to extract key values and insights from your uploaded documents. No manual entry required.
        </p>
      </section>

      <section className="how-section">
        <h2>Step 2: AI-Powered Analysis</h2>
        <p>
          Our system runs your data through trained machine learning models (Random Forest, XGBoost, Neural Networks) to detect patterns, flag abnormalities, and predict potential health risks. It’s like having a digital diagnostic assistant.
        </p>
      </section>

      <section className="how-section">
        <h2>Step 3: Conversational Symptom Collection</h2>
        <p>
          Using transformer-based NLP models like BERT and GPT, MediScan AI interacts with you to gather symptoms and medical history. This conversational layer ensures context-aware, accurate predictions.
        </p>
      </section>

      <section className="how-section">
        <h2>Step 4: Personalized AI Recommendations</h2>
        <p>
          Based on your reports and symptoms, MediScan AI offers lifestyle advice, alerts for abnormal values, and guidance on when to consult a doctor. Recommendations are aligned with WHO and CDC guidelines.
        </p>
      </section>

      <section className="how-section">
        <h2>Step 5: Telemedicine Integration</h2>
        <p>
          If needed, MediScan AI connects you with certified medical professionals for further consultation. This bridges the gap between AI insights and real-world care — especially valuable in rural or remote areas.
        </p>
      </section>

      <section className="how-section">
        <h2>Why It Matters</h2>
        <p>
          MediScan AI isn’t just a tool — it’s a healthcare companion. By combining prediction, analysis, and advisory in one platform, it empowers patients and supports doctors with faster, smarter decision-making.
        </p>
      </section>
    </div>
  );
}

export default HowItWorksPage;
