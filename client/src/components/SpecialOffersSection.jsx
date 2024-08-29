import React from 'react';
import { Button } from '@chakra-ui/react';
import offerImage from '../assets/offer-image.jpg'; // Replace with your actual image path
import menuImage from '../assets/menu-image.jpg'; // Replace with your actual image path

const SpecialOffersSection = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-black text-white rounded-lg overflow-hidden">
          <img src={offerImage} alt="Steaming dish in a pan" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Special Offer: Sizzling Delights</h1>
            <p className="mb-4">Experience our mouthwatering dishes, bursting with flavor and aroma.</p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              View offers and promotions
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden">
          <img src={menuImage} alt="Variety of dishes" className="w-full h-96 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Explore Our Diverse Menu</h2>
            <p className="mb-4">From traditional favorites to exotic specialties, our menu has something for everyone.</p>
            <div className="flex justify-center">
              <Button>VIEW FULL MENU</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersSection;
