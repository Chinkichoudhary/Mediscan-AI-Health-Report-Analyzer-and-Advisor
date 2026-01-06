import React from 'react';
import '../style.css';

function UploadSection({ file, setFile, onAnalyze, loading, result }) {
  return (
    <div className="uploader">
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="primary" onClick={onAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {result && (
        <div className="analysis-output">
          <h2>Extracted Results</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Value</th>
                <th>Reference Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result.tests.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td>{test.value}</td>
                  <td>{test.range || '-'}</td>
                  <td>{test.status || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Possible Conditions</h2>
          <p>{result.conditions || 'No conditions detected.'}</p>

          <h2>Diet & Medicine Recommendations</h2>
          <p>{result.recommendations || 'No recommendations available.'}</p>

          <p className="disclaimer">
            This analysis is AI-generated for informational purposes only. Always consult a certified doctor before making any medical decisions.
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadSection;
