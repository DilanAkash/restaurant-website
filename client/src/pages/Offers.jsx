import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTag } from 'react-icons/fa';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/offers')
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error('Error fetching offers:', error));
  }, []);

  const handleCopyCode = (promoCode) => {
    navigator.clipboard.writeText(promoCode);
    setCopied(promoCode);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Current Offers</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {offers.length === 0 ? (
            <p className="text-center text-white col-span-full">No offers available at the moment.</p>
          ) : (
            offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-gray-800 p-6 shadow-lg rounded-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{offer.offerName}</h2>
                  <FaTag className="text-yellow-400 text-2xl" />
                </div>
                <p className="text-gray-300 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-200">Promo Code:</span>
                  <button
                    onClick={() => handleCopyCode(offer.promoCode)}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transform transition-transform hover:scale-105"
                  >
                    {copied === offer.promoCode ? <FaCheckCircle className="text-green-500" /> : 'Copy Code'}
                  </button>
                </div>
                <p className="text-gray-400">Discount: {offer.discountPercentage || 0}% off</p>
                <p className="text-gray-400">
                  Valid until: {offer.expirationDate ? new Date(offer.expirationDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
