import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AnalyticsDashboard({ refreshTrigger }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toLocaleTimeString();
  }

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/v1/analytics/');
        if (!response.ok) throw new Error('Data could not be fetched.');
        const jsonData = await response.json();
        // Sort data by timestamp for the line chart
        jsonData.latest_readings.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [refreshTrigger]);

  if (isLoading) return <p className="text-gray-500">Loading analytics...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || data.total_count === 0) {
    return <p className="text-gray-600">No data yet. Submit some readings to get started!</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Analytics</h2>

      {/* --- Key Metric Card --- */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <p className="text-lg font-bold text-blue-800">Total Readings in Database: {data.total_count}</p>
      </div>

      {/* --- Chart --- */}
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

      {/* --- Table --- */}
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