import React, { useState } from 'react';
import '../style.css';
import ResultTable from '../components/ResultTable';
import Recommendations from '../components/recommendations';

function AnalyzerPage() {
  const [patientName, setPatientName] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', reportFile);

      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('API response:', data);

      setResult({
        tests: data.structured_results || [],
        items: data.recommendations || [],
        disclaimer: data.disclaimer || '',
      });
    } catch (err) {
      console.error('Analyze error:', err);
      setResult({
        tests: [],
        items: [],
        disclaimer: 'Error analyzing report. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-hero">
      <div className="analyzer-box analyzer-wide">
        <h1>Mediscan Report Analyzer</h1>

        {!result && (
          <form className="analyzer-form" onSubmit={handleSubmit}>
            <label>
              Patient Name
              <input
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </label>

            <label>
              Upload Report
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => setReportFile(e.target.files[0])}
                required
              />
            </label>

            <button type="submit" className="primary" disabled={loading}>
              {loading ? 'Analyzing...' : 'Upload & Analyze'}
            </button>
          </form>
        )}

        {result && (
          <div className="analysis-output">
            <h2>Analysis Complete</h2>
            <p>Patient: <strong>{patientName}</strong></p>
            <p>Report: <strong>{reportFile?.name}</strong></p>

            <ResultTable tests={result.tests} />
            <Recommendations items={result.items} />

            <p className="disclaimer">{result.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyzerPage;
