import express from 'express';
import Offer from '../models/Offer.js'; // Assuming you're using default export in Offer.js

const router = express.Router();

// Fetch all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers', error });
  }
});

// Add a new offer
router.post('/', async (req, res) => {
  const { offerName, description, promoCode, discountPercentage, expirationDate } = req.body;
  const newOffer = new Offer({
    offerName,
    description,
    promoCode,
    discountPercentage,
    expirationDate,
  });

  try {
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(400).json({ message: 'Error adding offer', error });
  }
});

// Update an offer
router.put('/:offerId', async (req, res) => {
  const { offerId } = req.params;
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, req.body, { new: true });
    res.json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating offer', error });
  }
});

// Delete an offer
router.delete('/:offerId', async (req, res) => {
  const { offerId } = req.params;
  try {
    const deletedOffer = await Offer.findByIdAndDelete(offerId);
    res.json(deletedOffer);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting offer', error });
  }
});

// Validate and apply promo code
router.post('/apply-promo', async (req, res) => {
  const { promoCode } = req.body;

  try {
    const offer = await Offer.findOne({ promoCode });
    if (!offer) {
      return res.status(404).json({ message: 'Promo code not found' });
    }

    const isExpired = new Date() > new Date(offer.expirationDate);
    if (isExpired) {
      return res.status(400).json({ message: 'Promo code has expired' });
    }

    res.json({ discount: offer.discountPercentage });
  } catch (error) {
    res.status(500).json({ message: 'Error applying promo code', error });
  }
});

export default router;
