import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const MessageCenter = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/messages/user/${user._id}`);
        const data = await response.json();
        if (response.ok) {
          setMessages(data);
        } else {
          throw new Error(data.message || 'Failed to fetch messages');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          content: newMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Message sent successfully');
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage('');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return <p>Please log in to view or send messages.</p>;
  }

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">Message Center</h1>

        {isLoading ? (
          <p className="text-center text-white">Loading messages...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <p className="text-center text-white">No messages found.</p>
            ) : (
              messages.map((message) => (
                <div key={message._id} className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                  <p className="font-bold text-lg">Message:</p>
                  <p className="text-gray-300 mt-2">{message.content}</p>
                  {message.response && (
                    <div className="mt-4 bg-gray-900 p-4 rounded-lg">
                      <p className="font-bold text-lg text-green-400">Response:</p>
                      <p className="text-green-200 mt-2">{message.response}</p>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-2">Status: {message.status}</p>
                </div>
              ))
            )}
          </div>
        )}

        <form onSubmit={handleSubmitMessage} className="mt-12 space-y-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-4 rounded-lg shadow-md text-gray-800 focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            rows="5"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold text-lg px-4 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Send Message
          </button>
          {success && <p className="text-green-500 mt-4">{success}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default MessageCenter;
