import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const CartNotification = ({ item, visible, onClose }) => {
  const [show, setShow] = useState(visible);
  const [animate, setAnimate] = useState(false); // For handling animations

  useEffect(() => {
    if (visible) {
      setShow(true);
      setAnimate(true); // Trigger the entrance animation

      const timer = setTimeout(() => {
        setAnimate(false); // Trigger the exit animation
        setTimeout(() => {
          setShow(false);
          onClose(); // Callback to reset the visible state in parent component
        }, 300); // Wait for the exit animation to complete
      }, 1000); // Show notification for 4 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount or if visible changes
    }
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 bg-black bg-opacity-70 text-white backdrop-blur-md px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-4 transition-all duration-300 ease-in-out
        ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
      `}
      aria-live="assertive"
      role="alert"
    >
      <p className="font-semibold">{item.name} added to cart!</p>
      <button
        className="text-white hover:text-gray-300 focus:outline-none"
        onClick={() => {
          setAnimate(false); // Trigger the exit animation
          setTimeout(() => {
            setShow(false);
            onClose();
          }, 300); // Wait for the exit animation to complete
        }}
        aria-label="Close notification"
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
};

CartNotification.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartNotification;
