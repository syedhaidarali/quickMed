/** @format */

import React from "react";

const products = [
  {
    name: "Stethoscope",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=facearea&w=256&q=80",
  },
  {
    name: "Thermometer",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=facearea&w=256&q=80",
  },
  {
    name: "Blood Pressure Monitor",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=facearea&w=256&q=80",
  },
  {
    name: "First Aid Kit",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=256&q=80",
  },
];

const Shop = () => (
  <div className='min-h-[60vh] flex flex-col items-center justify-center bg-emerald-50 py-16 px-4'>
    <div className='bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full text-center'>
      <h1 className='text-3xl font-bold text-emerald-800 mb-6'>Shop</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {products.map((product, idx) => (
          <div
            key={idx}
            className='bg-emerald-100 rounded-lg p-6 shadow flex flex-col items-center'>
            <img
              src={product.image}
              alt={product.name}
              className='w-24 h-24 object-cover rounded mb-3'
            />
            <h2 className='text-lg font-semibold text-emerald-900 mb-1'>
              {product.name}
            </h2>
            <p className='text-emerald-700 font-bold mb-2'>
              Rs. {product.price}
            </p>
            <button className='px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-200 font-medium'>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Shop;
