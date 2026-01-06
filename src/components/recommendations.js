import React from 'react';
import '../style.css';

function Recommendations({ items = [] }) {
  if (!Array.isArray(items) || !items.length) {
    return <p className="muted">No recommendations available.</p>;
  }

  return (
    <div className="cards">
      {items.map((rec, idx) => (
        <div className="card" key={idx}>
          <strong>{rec.condition}</strong>
          <p><strong>Description:</strong> {rec.description || '—'}</p>
          <p><strong>Diet:</strong> {rec.diet || '—'}</p>
          <p><strong>Medicines:</strong> {rec.medicines || '—'}</p>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
