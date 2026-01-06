import React from 'react';
import '../style.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Reach out with questions, feedback, or support requests.</p>
      </section>

      <section className="contact-details">
        <h2>Get in Touch</h2>
        <ul>
          <li>Email: <a href="mailto:support@mediscan.ai">support@mediscan.ai</a></li>
          <li>Phone: +91-98765-43210</li>
          <li>Live Chat: Available 9am–6pm IST, Monday to Saturday</li>
        </ul>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <label>
            Name
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Message
            <textarea rows="5" required />
          </label>
          <button type="submit" className="primary">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default ContactPage;
