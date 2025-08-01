import React, { useState } from 'react';
import toast from 'react-hot-toast';

function DataUploadForm({ onJobSubmitted }) {
  const [jsonData, setJsonData] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const promise = new Promise(async (resolve, reject) => {
      try {
        const readings = JSON.parse(jsonData);
        const response = await fetch('http://localhost:8000/api/v1/readings/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Array.isArray(readings) ? readings : [readings]),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        onJobSubmitted(result.task_id);
        setJsonData('');
        resolve(result); // Resolve the promise on success
      } catch (err) {
        console.error("Upload failed:", err);
        reject(err); // Reject the promise on error
      }
    });

    toast.promise(promise, {
      loading: 'Submitting data...',
      success: 'Data submitted! Processing in the background.',
      error: 'Upload failed. Please check the JSON and console.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Submit Sensor Data</h3>
      <textarea
        className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder='Paste your sensor data in JSON format here...'
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        required
      />
      <button type="submit" className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
        Submit Data
      </button>
    </form>
  );
}

export default DataUploadForm;