'use client'

import { useState, useEffect } from 'react';

export default function Latihan9() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  
  // Fetch data produk dari API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Gagal memuat data:', error);
      }
    }

    fetchData();
  }, []);

  // Fungsi untuk menambah produk ke cart
  const handleAddToCart = (product) => {
    // Pastikan kuota tidak habis
    if (product.quantity > 0) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.id === product.id);
        
        // Jika produk sudah ada di cart, tambah jumlahnya
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Jika produk belum ada di cart, tambahkan ke cart dengan quantity 1
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    }
  };

  // Fungsi untuk menghapus produk dari cart
  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Fungsi untuk mengubah kuantitas produk dalam cart
  const handleQuantityChange = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.quantity) }
          : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 p-8 text-white font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-400 drop-shadow-lg">
        🛍️ Daftar Produk E-Commerce
      </h1>

      {/* Cart UI */}
      <div className="absolute top-5 right-5 flex items-center space-x-4">
        <div className="text-xl text-white">
          <span className="font-bold">Cart:</span> {cart.length} items
        </div>
        <a href="#cart-detail" className="text-2xl text-green-400">
          🛒
        </a>
      </div>

      {/* Produk Katalog */}
      {data.length === 0 ? (
        <p className="text-center text-gray-400">Gagal memuat data.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="bg-black/30 backdrop-blur-lg border border-green-800 shadow-md rounded-xl p-6 hover:shadow-green-600 transition-transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain bg-gray-800 mb-4 rounded-t-xl"
              />
              <h2 className="text-xl font-semibold text-green-300 mb-2">{product.title}</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-green-400 flex items-center">
                  $ {product.price}
                </span>
                <button
                  onClick={() => handleAddToCart(product)} // Pastikan fungsi ini dipanggil saat tombol diklik
                  disabled={product.quantity === 0}
                  className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {cart.some(item => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
              <p className="text-sm text-gray-300">{product.description.substring(0, 100)}...</p>
              <div className="mt-4 text-gray-500">Kuota: {product.quantity}</div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Detail */}
      <div id="cart-detail" className="mt-12 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-3xl font-bold text-green-400 mb-4">🛒 Detail Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-green-300">{item.title}</h3>
                  <p className="text-sm text-gray-400">Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition mr-4"
                >
                  🗑️ Remove
                </button>
                <input
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 text-center p-2 bg-gray-700 text-white rounded-md"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
