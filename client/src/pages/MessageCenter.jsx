import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const MessageCenter = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/messages/user/${user._id}`);
          const data = await response.json();
          if (response.ok) {
            setMessages(data);
          } else {
            throw new Error('Failed to fetch messages');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();
  }, [user]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, content: messageContent }),
      });
      const newMessage = await response.json();
      if (response.ok) {
        setMessages([...messages, newMessage]);
        setMessageContent('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Message Center</h1>
      <form onSubmit={handleMessageSubmit}>
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send Message</button>
      </form>
      <div>
        {isLoading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id}>
              <p>{msg.content}</p>
              <p>{msg.response}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
