import React, { useState } from 'react';
import pittuImage from '../assets/pittu.jpeg';
import friedRiceImage from '../assets/fried_rice.jpeg';
import parallaxImage from '../assets/menubg.jpeg';


const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Full menu data with images, prices, and other details
  const menuItems = [
    // Dinner Menu
    { id: 52, category: 'Dinner', name: 'PITT U', description: 'Sri Lankan Favourite - 3 pieces of Red or White Pittu served Kirihodi, Lunumiris. Coconut Milk & chefs dedicated Vegetable Dish', price: 650, image: pittuImage, isNew: false, isPopular: true },
    { id: 53, category: 'Dinner', name: 'STRING HOPPERS', description: 'An All Rounder - 15 Nos Red or White String Hoppers served with Kiri Hodi, POI Sambol & Chefs dedicated Vegetable Dish', price: 650, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 54, category: 'Dinner', name: 'STRING HOPPER PILAU', description: 'Shredded String Hoppers Tempered with authentic spices', price: 650, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 55, category: 'Dinner', name: 'HOPPERS', description: '3 Plain Hoppers & 1 Egg Hopper served with Lunumiris, Seeni Sambol & chefs dedicated Vegetable Dish', price: 625, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 56, category: 'Dinner', name: 'POL ROTTI', description: '3 Pieces of POI Rotti served with Seeni Sambol, Katta Sambol & Chefs dedicated Vegetable Dish', price: 650, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 57, category: 'Dinner', name: 'PARATA', description: '3 Paratas served with Dhal Curry & Chefs dedicated Vegetable Dish', price: 625, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 58, category: 'Dinner', name: 'EGG ROTTI', description: '1 Egg Rotti, 1 Masalafotti served with Seeni Sambol, Katta Sambol & chefs dedicated Vegetable Dish', price: 695, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 59, category: 'Dinner', name: 'Hot Butter Chicken Hopper Meal', description: '01 plain hopper, 01 egg hopper topped with Hot butter Chicken & spiced curd', price: 950, image: friedRiceImage, isNew: true, isPopular: true },
    { id: 60, category: 'Dinner', name: 'Hot Butter Prawn Hopper Meal', description: '01 plain hopper, 01 egg hopper topped with Hot butter Prawn & spiced curd', price: 1050, image: friedRiceImage, isNew: true, isPopular: true },
  
    // Rice Specialities (Note: Unique ids here)
    { id: 61, category: 'Rice', name: 'Rice and Curry Special', description: 'Red Rice/White Rice, Mallum or Salad, 3 Vegetables, Curries, Papadam/Dry Chilli/Lime Pickle/Male Pickle', price: 550, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 62, category: 'Rice', name: 'Fried Rice - Chicken', description: '', price: 950, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 63, category: 'Rice', name: 'Fried Rice - Fish', description: '', price: 925, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 64, category: 'Rice', name: 'Fried Rice - Prawn', description: '', price: 1050, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 65, category: 'Rice', name: 'Fried Rice - Mutton', description: '', price: 1390, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 66, category: 'Rice', name: 'Bamboo Biriyani - Vegetable', description: 'Biriyani served in a steaming hot bamboo with Raita, Homemade Chutney and Masala Curry', price: 750, image: friedRiceImage, isNew: true, isPopular: false },
    { id: 67, category: 'Rice', name: 'Bamboo Biriyani - Chicken', description: 'Biriyani served in a steaming hot bamboo with Raita, Homemade Chutney and Masala Curry', price: 990, image: friedRiceImage, isNew: true, isPopular: true },
    { id: 68, category: 'Rice', name: 'Bamboo Biriyani - Prawn', description: 'Biriyani served in a steaming hot bamboo with Raita, Homemade Chutney and Masala Curry', price: 1150, image: friedRiceImage, isNew: true, isPopular: true },
    { id: 69, category: 'Rice', name: 'Bamboo Biriyani - Seafood', description: 'Biriyani served in a steaming hot bamboo with Raita, Homemade Chutney and Masala Curry', price: 1390, image: friedRiceImage, isNew: true, isPopular: false },
    { id: 70, category: 'Rice', name: 'Bamboo Biriyani - Mutton', description: 'Biriyani served in a steaming hot bamboo with Raita, Homemade Chutney and Masala Curry', price: 1550, image: friedRiceImage, isNew: true, isPopular: true },
    { id: 71, category: 'Rice', name: 'Veg Lamprais', description: 'Traditional Dutch lamprais', price: 680, image: friedRiceImage, isNew: false, isPopular: false },
    { id: 72, category: 'Rice', name: 'Chicken Lamprais', description: 'Traditional Dutch lamprais', price: 780, image: friedRiceImage, isNew: false, isPopular: true },
    { id: 73, category: 'Rice', name: 'Kachal Rice', description: 'Special Rice mixed with mutton, chicken, prawns & fish. (includes brinjal Moju & Miris Hodi)', price: 2650, image: friedRiceImage, isNew: true, isPopular: true },

    // Mati Walande Dry Curry
{ id: 74, category: 'Dry Curry', name: 'Crab Dry Curry Bowl - Half', description: 'Spicy dry crab curry served with Rice or Roast Paan along with Onion Sambol', price: 2625, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 75, category: 'Dry Curry', name: 'Crab Dry Curry Bowl - Full', description: 'Spicy dry crab curry served with Rice or Roast Paan along with Onion Sambol', price: 4950, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 76, category: 'Dry Curry', name: 'Prawn Dry Curry Bowl - Half', description: 'Prawn Dry Curry Bowl with Rice/Roast Paan along with Onion Sambol', price: 2625, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 77, category: 'Dry Curry', name: 'Prawn Dry Curry Bowl - Full', description: 'Prawn Dry Curry Bowl with Rice/Roast Paan along with Onion Sambol', price: 4850, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 78, category: 'Dry Curry', name: 'Roast Chicken Dry Curry Bowl - Half', description: 'Oven Roasted Chicken with Rice/Roast Paan along with Onion Sambol', price: 2290, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 79, category: 'Dry Curry', name: 'Roast Chicken Dry Curry Bowl - Full', description: 'Oven Roasted Chicken with Rice/Roast Paan along with Onion Sambol', price: 4550, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 80, category: 'Dry Curry', name: 'Mixed Seafood Dry Curry Bowl - Half', description: 'Mixed Seafood with Rice/Roast Paan along with Onion Sambol', price: 2290, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 81, category: 'Dry Curry', name: 'Mixed Seafood Dry Curry Bowl - Full', description: 'Mixed Seafood with Rice/Roast Paan along with Onion Sambol', price: 4550, image: friedRiceImage, isNew: true, isPopular: true },

// Sambola
{ id: 82, category: 'Sambola', name: 'Gotukola Sambola', description: 'Chopped Gotu Kola, Coconut, Onion, Tomato, Green Chilli, Lime', price: 300, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 83, category: 'Sambola', name: 'Karawila Sambola', description: 'Bitter Gourd, Onion, Tomato, Green Chilli, Lime, Capsicum', price: 350, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 84, category: 'Sambola', name: 'Carrot Sambola', description: 'Grated Carrot, Coconut, onion, Green Chilli, Lime', price: 320, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 85, category: 'Sambola', name: 'Mixed Salad', description: 'Mixture of Cucumber, Tomato, Carrot, Onion, Green Chili, Lime', price: 350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 86, category: 'Sambola', name: 'Seeni Sambol', description: 'Caramelized onion, chili flakes, Tamarind Paste', price: 325, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 87, category: 'Sambola', name: 'POI Sambol', description: 'Grated Coconut, Dry Chilli, Onion, Tomato, Green Chilli, Lime', price: 275, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 88, category: 'Sambola', name: 'Papadam', description: '', price: 190, image: friedRiceImage, isNew: false, isPopular: false },

// Soup
{ id: 89, category: 'Soup', name: 'Vegetable Soup', description: 'Farm Fresh Vegetable soup with a pinch of salt for your liking', price: 425, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 90, category: 'Soup', name: 'Sweet Corn Chicken Soup', description: 'Sweet corn kernels in a flavorful chicken soup with egg drop', price: 620, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 91, category: 'Soup', name: 'Roasted Fish Soup', description: 'Roasted fish soup along with roasted cumin seeds and red onions', price: 575, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 92, category: 'Soup', name: 'Mullaguthanni Soup', description: 'Coconut milk based soup made with a combination of accompaniments to create an authentic Sri Lankan curry flavor', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 93, category: 'Soup', name: 'Creme of Moringa', description: 'Moringa flash blended into a thick rich & creamy soup', price: 450, image: friedRiceImage, isNew: true, isPopular: false },

// Fish
{ id: 94, category: 'Fish', name: 'Maalu Mirisata', description: 'Spicy Fish curry cooked with Fresh Spices from the Heart of Ceylon', price: 695, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 95, category: 'Fish', name: 'Maalu Ambulthiyal', description: 'A Unique Sri Lankan fish recipe marinated in tangy and peppery sauce', price: 695, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 96, category: 'Fish', name: 'Maalu Themparadu Karala', description: 'Marinated Fried Fish sautéed with Onions and Capsicum', price: 775, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 97, category: 'Fish', name: 'Maalu Suduwata', description: "It's our lighter version of the Miris Maalu. Cooked with Coconut milk, Turmeric and Mustard cream", price: 795, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 98, category: 'Fish', name: 'Maalu Devilled', description: "Fried Fish sautéed with the Chef's Special Mixture of Sauces", price: 765, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 99, category: 'Fish', name: 'Maalu Stew', description: 'Fish cooked in Mustard flavoured sauce with a hint of Ceylon Spices & Farm Fresh Vegetables', price: 795, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 100, category: 'Fish', name: 'Fried Seer Fish', description: 'Coated with Bread Crumbs and to perfection with a hint of Salt & Pepper', price: 1050, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 101, category: 'Fish', name: 'Mackerel Curry', description: 'A Favorite in the local household. A spicy mackerel fish made with a blend of Sri Lankan fresh spices', price: 680, image: friedRiceImage, isNew: false, isPopular: true },

// Cuttlefish
{ id: 102, category: 'Cuttlefish', name: 'Dalla Rathata, Sarata', description: 'Fresh Cuttlefish Cooked in a spice blended red curry sauce', price: 775, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 103, category: 'Cuttlefish', name: 'Dallo Devilled', description: "Fried CuttleFish sautéed with the Chefs' special mixture of sauces", price: 850, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 104, category: 'Cuttlefish', name: 'Hot Butter Cuttlefish', description: 'Batter fried Cuttlefish mixed with a special blend of spices', price: 950, image: friedRiceImage, isNew: true, isPopular: true },

// Crab
{ id: 105, category: 'Crab', name: 'Kakuluwo Negombo Kramayata (350K)', description: 'Freshly caught Crab marinated and slow cooked according to a Unique recipe of an authentic household in Negambo', price: 1250, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 106, category: 'Crab', name: 'Lankan Chilli Kakuluwo', description: 'A local rendition of the world famous Singapore chilli crab', price: 1280, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 107, category: 'Crab', name: 'Crab Tempered Dry Curry', description: 'Marinated Crab sautéed with onions & Capsicum', price: 1175, image: friedRiceImage, isNew: false, isPopular: false },

// Prawns
{ id: 108, category: 'Prawns', name: 'Isso Yapanaya kramayata (13-15 Pcs)', description: 'Jaffna Style - Freshly caught Prawns cooked using authentic Jaffna spices', price: 1275, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 109, category: 'Prawns', name: 'Isso Themperadu', description: 'Fried Prawns sautéed with onions and Capsicum', price: 1150, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 110, category: 'Prawns', name: 'Isso Stew', description: 'Freshly caught Prawns cooked in Mustard flavoured sauce with a hint Of Ceylon spices and vegetables', price: 1250, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 111, category: 'Prawns', name: 'Isso Devilled', description: "Fried Prawns sautéed with Chefs' special mixture of sauces and Ceylon spices", price: 1175, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 112, category: 'Prawns', name: 'Hot Butter Isso', description: 'Batter Fried Prawns mixed with a special blend of spices', price: 1350, image: friedRiceImage, isNew: true, isPopular: true },

// Mutton
{ id: 113, category: 'Mutton', name: 'Elu Mas Rathata', description: 'Mutton cooked in Masala herbs (Indian Spices) with Coriander & lime', price: 1350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 114, category: 'Mutton', name: 'Elu Mas Yapanaya Kramayata', description: 'Jaffna Style - Mutton marinated and slow cooked using a recipe unique to the northern Province', price: 1350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 115, category: 'Mutton', name: 'Elu Mas Stew', description: 'Mutton cooked in Mustard flavoure & sauce with a hint of Ceylon Spices & Farm Fresh Vegetables', price: 1250, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 116, category: 'Mutton', name: 'Elu Mas Devilled (Boneless)', description: 'Boneless Mutton Sauted in chefs special mixture of sauces', price: 1650, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 117, category: 'Mutton', name: 'Elu Mas Themparadu (Boneless)', description: 'Marinated Mutton Sauteed to perfection with onions & capsicum', price: 1550, image: friedRiceImage, isNew: false, isPopular: false },

// Chicken
{ id: 118, category: 'Chicken', name: 'Kukulmas Yapanaya Kramayata', description: 'Jaffna Style - Chicken marinated and slow cooked using a recipe unique to the Northern Province of Sri Lanka', price: 820, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 119, category: 'Chicken', name: 'Kukulmas Kaluwata I-Jyala', description: 'Chicken cooked in a Ceylon spice blended black curry', price: 780, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 120, category: 'Chicken', name: 'Kukulmas Themparadu', description: 'Marinated Fried Chicken sautéed with Onions and Capsicum', price: 750, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 121, category: 'Chicken', name: 'Meat Balls Kirata / Devilled', description: 'A favorite in the local household Chicken meatballs cooked in coconut based brown curry', price: 750, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 122, category: 'Chicken', name: 'Hot Butter Chicken', description: 'Batter Fried Chicken mixed with blend of spices', price: 850, image: friedRiceImage, isNew: true, isPopular: true },

// Vegetables
{ id: 123, category: 'Vegetables', name: 'Soya Curry / Devilled', description: '', price: 335, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 124, category: 'Vegetables', name: 'Stuffed Capsicum (1 nos)', description: '', price: 190, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 125, category: 'Vegetables', name: 'Beetroot Curry', description: '', price: 390, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 126, category: 'Vegetables', name: 'Pumpkin Curry', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 127, category: 'Vegetables', name: 'Tempered Potato/ Curry', description: '', price: 445, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 128, category: 'Vegetables', name: 'Mango Curry', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 129, category: 'Vegetables', name: 'Beans Curry', description: '', price: 395, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 130, category: 'Vegetables', name: 'Dhal Curry', description: '', price: 365, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 131, category: 'Vegetables', name: 'Garlic Curry', description: '', price: 395, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 132, category: 'Vegetables', name: 'Tempered Pineapple', description: '', price: 445, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 133, category: 'Vegetables', name: 'Polos Curry', description: '', price: 475, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 134, category: 'Vegetables', name: 'Kaju Maluwa', description: '', price: 925, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 135, category: 'Vegetables', name: 'Batu Mojuwa', description: '', price: 550, image: friedRiceImage, isNew: false, isPopular: false },

// Desserts
{ id: 136, category: 'Desserts', name: 'Ice Cream (Vanilla/Chocolate/Strawberry)', description: '', price: 350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 137, category: 'Desserts', name: 'Fruit Salad', description: '', price: 400, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 138, category: 'Desserts', name: 'Fruit Salad with Ice Cream', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 139, category: 'Desserts', name: 'Watalappam', description: '', price: 550, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 140, category: 'Desserts', name: 'Curd & Treacle', description: '', price: 350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 141, category: 'Desserts', name: 'Fruit Platter', description: '', price: 750, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 142, category: 'Desserts', name: 'Honey Hopper', description: '', price: 200, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 143, category: 'Desserts', name: 'Hopper Mousse', description: '3 scoops of mousse served on a delicious Pani appa', price: 550, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 144, category: 'Desserts', name: 'Biscuit Pudding', description: '', price: 500, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 145, category: 'Desserts', name: 'Sundae Fantasy', description: '3 Scoops of ice cream topped with strawberry Comport Mango syrup & chocolate - chip', price: 590, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 146, category: 'Desserts', name: 'CC Sweet Meat Jar', description: 'A mixture of Local delights mixed with a silky Smooth Mousse', price: 550, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 147, category: 'Desserts', name: 'Kithul Curd Cake', description: 'Soft Curd cake assembled on top of Ginger biscuit base & is topped with Pani Kaju & kithul Treacle', price: 690, image: friedRiceImage, isNew: true, isPopular: true },

// Drinks
{ id: 148, category: 'Drinks', name: 'Orange Juice', description: 'Fresh Juice', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 149, category: 'Drinks', name: 'Passion Fruit Juice', description: 'Fresh Juice', price: 350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 150, category: 'Drinks', name: 'Mixed Fruit Juice', description: 'Fresh Juice', price: 400, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 151, category: 'Drinks', name: 'Mango Juice', description: 'Fresh Juice', price: 400, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 152, category: 'Drinks', name: 'Pineapple Juice', description: 'Fresh Juice', price: 400, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 153, category: 'Drinks', name: 'Melon Juice', description: 'Fresh Juice', price: 300, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 154, category: 'Drinks', name: 'Lime Soda', description: '', price: 300, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 155, category: 'Drinks', name: 'Homemade Ginger Beer', description: '', price: 275, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 156, category: 'Drinks', name: 'Lime and Mint', description: '', price: 300, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 157, category: 'Drinks', name: 'Lime Juice', description: '', price: 350, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 158, category: 'Drinks', name: 'King Coconut Lime', description: '', price: 300, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 159, category: 'Drinks', name: 'King Coconut', description: '', price: 375, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 160, category: 'Drinks', name: 'Passion Mint', description: '', price: 300, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 161, category: 'Drinks', name: 'Papaya Juice', description: '', price: 250, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 162, category: 'Drinks', name: 'Tamarind Juice', description: '', price: 375, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 163, category: 'Drinks', name: 'Gora ka Juice', description: 'Packed with health benefits', price: 350, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 164, category: 'Drinks', name: 'Trio of Homemade Shooter Platter', description: 'Before, During after meal shooter platter', price: 320, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 165, category: 'Drinks', name: 'Coca Cola', description: 'Soft Drink', price: 250, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 166, category: 'Drinks', name: 'Sprite', description: 'Soft Drink', price: 250, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 167, category: 'Drinks', name: 'Portello', description: 'Soft Drink', price: 250, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 168, category: 'Drinks', name: 'Coke Zero', description: 'Soft Drink', price: 350, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 169, category: 'Drinks', name: 'Sprite Zero', description: 'Soft Drink', price: 350, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 170, category: 'Drinks', name: 'Soda', description: 'Soft Drink', price: 250, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 171, category: 'Drinks', name: 'Fanta', description: 'Soft Drink', price: 250, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 172, category: 'Drinks', name: 'Chai with Onion Bajji', description: '', price: 575, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 173, category: 'Drinks', name: 'Chai with Onion Bajji (Without Chia Seeds)', description: '', price: 550, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 174, category: 'Drinks', name: 'Cinnamon Iced Tea', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 175, category: 'Drinks', name: 'Lemon Iced Tea', description: '', price: 480, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 176, category: 'Drinks', name: 'Iced Milo', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 177, category: 'Drinks', name: 'Iced Coffee', description: '', price: 480, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 178, category: 'Drinks', name: 'Faluda', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 179, category: 'Drinks', name: 'Mineral Water Bottle (500ml)', description: '', price: 100, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 180, category: 'Drinks', name: 'Mineral Water Bottle (1L)', description: '', price: 170, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 181, category: 'Drinks', name: 'Tea Pot/Coffee Pot (Small)', description: '', price: 300, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 182, category: 'Drinks', name: 'Tea Pot/Coffee Pot (Large)', description: '', price: 450, image: friedRiceImage, isNew: false, isPopular: false },

// Kottu
{ id: 183, category: 'Kottu', name: 'Veg Kottu', description: '', price: 650, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 184, category: 'Kottu', name: 'Fish Kottu', description: '', price: 750, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 185, category: 'Kottu', name: 'Chicken Kottu', description: '', price: 790, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 186, category: 'Kottu', name: 'Mutton Kottu', description: '', price: 1500, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 187, category: 'Kottu', name: 'Cheesy Nai Miris Veg', description: '', price: 800, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 188, category: 'Kottu', name: 'Cheesy Nai Miris Chicken', description: '', price: 940, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 189, category: 'Kottu', name: 'Cheesy Nai Miris Fish', description: '', price: 900, image: friedRiceImage, isNew: true, isPopular: false },
{ id: 190, category: 'Kottu', name: 'Cheesy Nai Miris Mutton', description: '', price: 1650, image: friedRiceImage, isNew: true, isPopular: true },
{ id: 191, category: 'Kottu', name: 'Masala Kottu Veg', description: '', price: 850, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 192, category: 'Kottu', name: 'Masala Kottu Fish', description: '', price: 950, image: friedRiceImage, isNew: false, isPopular: false },
{ id: 193, category: 'Kottu', name: 'Masala Kottu Chicken', description: '', price: 990, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 194, category: 'Kottu', name: 'Masala Kottu Mutton', description: '', price: 1700, image: friedRiceImage, isNew: false, isPopular: true },
{ id: 195, category: 'Kottu', name: 'ABC Special Chicken Kottu', description: 'Kottu Rotti softend and Soaked in a thick curry. topped with 2 type of cheese sauce to bring the cheesiest kottu in town', price: 1650, image: friedRiceImage, isNew: true, isPopular: true },
  ];
  
  const categories = [
    'All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 
    'Prawns', 'Vegetables', 'Desserts', 'Crab', 'Mutton', 'Chicken'
  ];

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Filter and sort menu items based on the selected category, search term, and sort option
  const filteredItems = menuItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      if (sortOption === 'new') return b.isNew - a.isNew;
      if (sortOption === 'popular') return b.isPopular - a.isPopular;
      return 0;
    });

    // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      {/* Parallax Section */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${parallaxImage})`, height: '550px' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white">Our Menu</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to first page on category change
              }}
              className={`m-2 px-4 py-2 rounded-lg font-semibold ${
                selectedCategory === category ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex justify-end mb-8">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="new">New</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <div key={item.id} className="bg-gray-800 p-6 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">{item.name}</h2>
              <p className="text-white">{item.description}</p>
              <p className="text-white font-semibold mt-2">Rs. {item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-2 rounded-lg font-semibold ${
                currentPage === index + 1 ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;