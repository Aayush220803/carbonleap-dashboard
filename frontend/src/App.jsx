import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import DataUploadForm from './components/DataUploadForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleJobSubmitted = (taskId) => {
    console.log("Job submitted with task ID:", taskId);
    // The dashboard will refresh automatically. We don't need the alert anymore.
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* This component renders all the toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Carbonleap Field Insights
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="md:col-span-1">
            <DataUploadForm onJobSubmitted={handleJobSubmitted} />
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <AnalyticsDashboard refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;