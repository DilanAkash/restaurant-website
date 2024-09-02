import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartNotification = ({ item, visible, onClose }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose(); // Callback to reset the visible state in parent component
      }, 3000); // Auto close the notification after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50">
      <p>{item.name} added to cart!</p>
      <button
        className="ml-4 text-sm text-white bg-red-500 px-2 py-1 rounded"
        onClick={() => {
          setShow(false);
          onClose();
        }}
      >
        Close
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
