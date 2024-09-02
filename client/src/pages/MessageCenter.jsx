import React, { useState, useEffect } from 'react';

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch messages from the backend API and update the state
    // fetch('http://localhost:5000/api/messages', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => setMessages(data))
    //   .catch(error => console.error('Error fetching messages:', error));

    // For now, we'll use mock data
    setMessages([
      { id: 1, query: 'What are the opening hours?', response: 'We are open from 9 AM to 9 PM.', status: 'Responded' },
      { id: 2, query: 'Do you offer vegan options?', response: 'Yes, we have a variety of vegan dishes.', status: 'Responded' },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Message Center</h2>
        <ul>
          {messages.map(message => (
            <li key={message.id} className="mb-4">
              <div className="mb-2">
                <strong>Query:</strong> {message.query}
              </div>
              <div className="mb-2">
                <strong>Response:</strong> {message.response}
              </div>
              <div className={`text-${message.status === 'Responded' ? 'green' : 'yellow'}-500`}>
                {message.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageCenter;
