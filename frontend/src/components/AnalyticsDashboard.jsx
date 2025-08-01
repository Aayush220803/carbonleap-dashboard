import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Use the environment variable for the API URL, with a fallback for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function AnalyticsDashboard({ refreshTrigger }) {
  const [data, setData] = useState(null);
  // ... the rest of the component remains the same
  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toLocaleTimeString();
  }

  useEffect(() => {
    const fetchAnalytics = async () => {
      // ...
      try {
        const response = await fetch(`${API_URL}/api/v1/analytics/`);
        if (!response.ok) throw new Error('Data could not be fetched.');
        const jsonData = await response.json();
        jsonData.latest_readings.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setData(jsonData);
      // ...
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [refreshTrigger]);

  // ... The JSX for rendering the chart and table remains the same
  if (isLoading) return <p className="text-gray-500">Loading analytics...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || data.total_count === 0) {
    return <p className="text-gray-600">No data yet. Submit some readings to get started!</p>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Analytics</h2>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <p className="text-lg font-bold text-blue-800">Total Readings in Database: {data.total_count}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Readings Trend</h3>
      <div style={{ width: '100%', height: 300 }} className="mb-8">
        <ResponsiveContainer>
          <LineChart data={data.latest_readings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reading_value" name="Reading Value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Latest Readings Data</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Timestamp</th>
              <th className="py-2 px-4 border-b text-left">Field ID</th>
              <th className="py-2 px-4 border-b text-left">Sensor Type</th>
              <th className="py-2 px-4 border-b text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.latest_readings.map((reading) => (
              <tr key={reading.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm">{new Date(reading.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-sm">{reading.field_id}</td>
                <td className="py-2 px-4 border-b text-sm">{reading.sensor_type}</td>
                <td className="py-2 px-4 border-b text-sm font-medium">{reading.reading_value} {reading.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AnalyticsDashboard;