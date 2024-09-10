import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout'; 

const OffersManagement = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    offerName: '',
    description: '',
    promoCode: '',
    discountPercentage: '',
    expirationDate: '',
  });
  const [message, setMessage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); 

  // Fetch all offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new offer
  const addOffer = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/api/offers', newOffer);
      setOffers((prevOffers) => [...prevOffers, response.data]);
      setNewOffer({
        offerName: '',
        description: '',
        promoCode: '',
        discountPercentage: '',
        expirationDate: '',
      });
      setMessage('Offer added successfully!');
    } catch (error) {
      console.error('Error adding offer:', error);
      setErrorMessage('Error adding offer. Please try again.');
    }
  };

  // Handle deleting an offer
  const deleteOffer = async (offerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this offer?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/offers/${offerId}`);
      setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
      setMessage('Offer deleted successfully!');
    } catch (error) {
      console.error('Error deleting offer:', error);
      setErrorMessage('Error deleting offer. Please try again.');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Offers Management</h1>

        {/* Add New Offer Form */}
        <form onSubmit={addOffer} className="mb-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white font-semibold mb-4">Add New Offer</h2>

          {message && <div className="bg-green-500 text-white p-4 rounded mb-4">{message}</div>}
          {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white">Offer Name</label>
              <input
                type="text"
                name="offerName"
                value={newOffer.offerName}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-white">Promo Code</label>
              <input
                type="text"
                name="promoCode"
                value={newOffer.promoCode}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-white">Discount Percentage</label>
              <input
                type="number"
                name="discountPercentage"
                value={newOffer.discountPercentage}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-white">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={newOffer.expirationDate}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-white">Description</label>
            <textarea
              name="description"
              value={newOffer.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Offer
          </button>
        </form>

        {/* Display Existing Offers */}
        <div>
          <h2 className="text-xl font-bold mb-6">Current Offers</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <li key={offer._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{offer.offerName}</h3>
                <p>Promo Code: {offer.promoCode}</p>
                <p>Discount: {offer.discountPercentage}%</p>
                <p>Expires on: {new Date(offer.expirationDate).toLocaleDateString()}</p>
                <p>{offer.description}</p>

                <button
                  onClick={() => deleteOffer(offer._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OffersManagement;
