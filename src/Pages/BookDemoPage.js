import React, { useState } from 'react';
import '../style.css';

function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can add API call or email logic here
  };

  return (
    <div className="demo-page-centered">
      <div className="demo-form-box">
        <h1>Book a Demo</h1>
        <p>Fill out the form and we’ll schedule a personalized walkthrough for your team.</p>

        {!submitted ? (
          <form className="demo-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" required />
            </label>
            <label>
              Email
              <input type="email" required />
            </label>
            <label>
              Organization / Clinic
              <input type="text" />
            </label>
            <label>
              Preferred Date & Time
              <input type="datetime-local" />
            </label>
            <label>
              Demo Type
              <select>
                <option>Live Call</option>
                <option>Recorded Walkthrough</option>
                <option>Product Tour Only</option>
              </select>
            </label>
            <label>
              Message / Notes
              <textarea rows="4" />
            </label>
            <button type="submit" className="primary">Submit</button>
          </form>
        ) : (
          <div className="confirmation">
            <h3>✅ Demo request submitted!</h3>
            <p>We’ll get back to you shortly with a confirmation.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDemoPage;
