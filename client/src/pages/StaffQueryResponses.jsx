import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const StaffQueryResponses = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null); // For showing a specific query
  const [response, setResponse] = useState(''); // Staff's response
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages'); // Fetch all messages
        setQueries(res.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
        setErrorMessage('Failed to load customer queries.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleRespond = async (queryId) => {
    try {
      await axios.put(`http://localhost:5000/api/messages/${queryId}`, { response });
      setSuccessMessage('Response sent successfully!');
      setQueries(queries.map(query => query._id === queryId ? { ...query, response, status: 'responded' } : query)); // Update local state
      setSelectedQuery(null); // Close the form after submission
      setResponse(''); // Clear the response
    } catch (error) {
      console.error('Error sending response:', error);
      setErrorMessage('Failed to send the response.');
    }
  };

  if (loading) {
    return <p>Loading queries...</p>;
  }

  return (
    <DashboardLayout role="staff">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Customer Queries</h1>

        {successMessage && <p className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</p>}

        <div className="grid grid-cols-1 gap-6">
          {queries.length === 0 ? (
            <p>No customer queries available.</p>
          ) : (
            queries.map((query) => (
              <div key={query._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                <p className="font-bold">Customer Query:</p>
                <p className="text-gray-300 mb-4">{query.content}</p>

                <p className="text-sm text-gray-500 mb-2">Status: {query.status}</p>
                <p className="text-sm text-gray-500 mb-2">Date: {new Date(query.createdAt).toLocaleString()}</p>

                {query.response ? (
                  <div className="mt-4 bg-gray-900 p-4 rounded-lg">
                    <p className="font-bold text-lg text-green-400">Your Response:</p>
                    <p className="text-green-200 mt-2">{query.response}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedQuery(query._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Respond
                  </button>
                )}

                {selectedQuery === query._id && (
                  <div className="mt-4">
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Write your response..."
                      className="w-full p-4 rounded-lg text-gray-900 mb-4"
                    />
                    <button
                      onClick={() => handleRespond(query._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Send Response
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffQueryResponses;
