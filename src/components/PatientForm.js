import React from 'react';
import '../style.css';

function PatientForm({ patientName, setPatientName, file, setFile, onAnalyze, loading }) {
  return (
    <div className="form-row">
      <label className="grow">
        <span>Patient name</span>
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </label>

      <label className="grow">
        <span>Choose file</span>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <small>Selected: {file.name}</small>}
      </label>

      <button className="primary" onClick={onAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>
    </div>
  );
}

export default PatientForm;
