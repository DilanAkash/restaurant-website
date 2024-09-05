import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Icon for success message

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false); // For the popup success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Clear the form after success
        setTimeout(() => setSuccess(false), 5000); // Remove the popup after 5 seconds
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Success Popup */}
      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <FaCheckCircle className="text-xl" />
          <span>Message sent successfully!</span>
        </div>
      )}

      {/* Google Map Section */}
      <section className="relative w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.35096843275!2d79.85427828455756!3d6.92037266228462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592994f55f37%3A0x9875f0f30127e66a!2sBaladaksha%20Mawatha!5e0!3m2!1sen!2slk!4v1630232288723!5m2!1sen!2slk"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
        <div className="absolute top-10 right-10 bg-white p-6 rounded-lg shadow-lg w-64 text-black">
          <p className="font-semibold">Baladaksha Mawatha, Colombo</p>
          <p>123 Mahinda 2nd Lane</p>
          <p>CO-16, Sri Lanka</p>
          <p className="font-bold">071 887 9954</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-black">Send Us a Message</h2>
        <form className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-lg space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email Fields */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full">
              <label className="block text-sm font-bold mb-2 text-black">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-bold mb-2 text-black">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-bold mb-2 text-black">Your Message</label>
            <textarea
              name="message"
              placeholder="Type your message"
              className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
