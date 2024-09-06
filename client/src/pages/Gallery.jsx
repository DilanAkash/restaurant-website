import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')  // Ensure the backend API route is correct
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching gallery images:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-white mb-12">Gallery</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.length === 0 ? (
            <p className="text-center col-span-full text-white">No images available at the moment.</p>
          ) : (
            images.map((image) => (
              <div
                key={image._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                {/* Render Image */}
                {image.imagePath ? (
                  <img
                    src={`http://localhost:5000${image.imagePath}`}  // Ensure correct image path
                    alt={image.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Image Title and Description */}
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">{image.title}</h2>
                <p className="text-gray-400">{image.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
