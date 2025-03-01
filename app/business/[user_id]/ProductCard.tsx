import React, { useState } from 'react';
import { useCart } from '../context/CartContext';


interface Product {
  id: number;
  name: string;
  description: string;
  price_inr: number;
  media_urls: string[];
  price?: string;
  discounted_price: string;
}

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  addCartIcon?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow, addCartIcon }) => {
  const { addToCart } = useCart();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % product.media_urls.length);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? product.media_urls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4 group">
        {product.media_urls.map((url, index) => {
          const isVisible = index === currentMediaIndex;
          const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isVideo ? (
                <video
                  src={url}
                  controls
                  muted
                  loop
                  className="w-full h-full object-cover rounded-lg"
                ></video>
              ) : (
                <img
                  src={url}
                  alt={`Product ${product.id} - Media ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          );
        })}

        {/* Media navigation buttons */}
        {product.media_urls.length > 1 && (
          <>
            <button
              onClick={handlePrevMedia}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ❮
            </button>
            <button
              onClick={handleNextMedia}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ❯
            </button>
          </>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-4 text-center">{product.description}</p>
      <p className="text-sm text-gray-600 mb-4 text-center">MRP: Rs. {product.price_inr}</p>
      <p className="text-sm text-gray-600 mb-4 text-center">Discount Price: Rs. {product.discounted_price}</p>
      <div className="flex gap-4">
      </div>
    </div>
  );
};

export default ProductCard;
