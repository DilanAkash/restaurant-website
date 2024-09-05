import React from 'react';
import { Link } from 'react-router-dom'; // Import if you use links

const MessageCenter = () => {
  return (
    <div className="pt-16 bg-gray-900 min-h-screen"> {/* Add padding-top here */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Message Center</h1>
        {/* Insert message display and interaction logic here */}
        <div>
          {/* Example message content */}
          <p className="text-white">Your messages will appear here...</p>
          {/* Link to create new message or similar action */}
          <Link to="/create-message" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded transition-colors">
            Send New Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
