import React from 'react';
import '../style.css';

function ResultTable({ tests = [] }) {
  if (!Array.isArray(tests) || !tests.length) {
    return <p className="muted">No test results extracted.</p>;
  }

  const rowClass = (status) => {
    const v = (status || '').toLowerCase();
    if (v === 'high') return 'high';
    if (v === 'low') return 'low';
    if (v === 'normal') return 'normal';
    return '';
  };

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Test name</th>
          <th>Value</th>
          <th>Reference range</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((t, idx) => (
          <tr key={idx} className={rowClass(t.status)}>
            <td>{t.test_name}</td>
            <td>{t.value} {t.unit}</td>
            <td>{t.ref_min} - {t.ref_max}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;
