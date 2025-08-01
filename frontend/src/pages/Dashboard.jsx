import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../api';
import DataUploadForm from '../components/DataUploadForm';

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const response = await getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  };

  useEffect(() => {
    fetchAnalytics(); // Fetch on initial load
  }, []);

  const handleJobSubmitted = (taskId) => {
    // You can implement the polling logic for the job status here
    console.log("Job submitted with task ID:", taskId);
    // As a simple approach, just refetch analytics after a delay
    setTimeout(fetchAnalytics, 5000); // Wait 5s for processing
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Field Insights Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <DataUploadForm onJobSubmitted={handleJobSubmitted} />
        </div>
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Latest Readings</h2>
          {/* Render your analytics data here */}
          <pre className="mt-4 bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(analytics, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;