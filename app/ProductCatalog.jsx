'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";


export default function Latihan9() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
        const json = await res.json();

        // Tambahkan properti quantity pada setiap produk (stok awal 5)
        const withQuantity = json.map(p => ({ ...p, quantity: 5 }));
        setProducts(withQuantity);
      } catch (err) {
        console.error('Gagal memuat data:', err);
      }
    }

    fetchData();
  }, []);

  const addToCart = (product) => {
    if (product.quantity <= 0) {
      toast.error("Stok habis!");
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        if (existing.cartQuantity >= product.quantity) {
          toast.warning("Jumlah melebihi stok tersedia!");
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });

    toast.success("Produk ditambahkan ke Cart!");
  };

  const updateQuantity = (id, qty) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, cartQuantity: qty }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const newProducts = products.map(p => {
      const cartItem = cart.find(c => c.id === p.id);
      if (cartItem) {
        return { ...p, quantity: p.quantity - cartItem.cartQuantity };
      }
      return p;
    });

    setProducts(newProducts);
    setCart([]);
    toast.success("Pembelian berhasil! 🎉");
  };

  const totalHarga = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <ToastContainer />

      {/* Tombol Cart Fixed */}
      <div className="fixed top-4 left-4 z-50">
        <a
          href="#cart"
          className="relative inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🛒 Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </a>
      </div>

      {/* Header dengan Efek Blur */}
      <div className="max-w-md mx-auto mb-8">
        <div className="backdrop-blur-sm bg-white/80 border border-gray-300 rounded-md px-4 py-2 shadow">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            Katalog Produk
          </h1>
        </div>
      </div>

      {/* Garis Pemisah Katalog dan Cart */}
      <div className="my-16">
        <div className="w-full border-t border-dashed border-gray-400"></div>
      </div>

      {/* Katalog Produk dengan Animasi Scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between border hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img src={product.image} alt={product.title} className="w-full h-52 object-contain mb-4" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
            <div className="mb-2 font-bold text-blue-600">${product.price}</div>
            <div className="text-sm text-gray-500 mb-4">Stok tersedia: {product.quantity}</div>
            <button
              onClick={() => addToCart(product)}
              disabled={product.quantity <= 0}
              className={`bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ${product.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Tambah ke Cart
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cart dengan Efek Blur */}
      <div id="cart" className="mt-20 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow max-w-4xl mx-auto border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">🛒 Detail Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart masih kosong.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">${item.price} x {item.cartQuantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={products.find(p => p.id === item.id)?.quantity || 1}
                    value={item.cartQuantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border px-2 py-1 rounded text-center"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-lg font-bold mb-2">Total: ${totalHarga.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Beli Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
