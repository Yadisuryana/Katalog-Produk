// app/latihan8/page.js

export default async function Latihan8() {
    let products = [];
  
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
      });
      products = await res.json();
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  
    return (
        <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
        <div className="max-w-md mx-auto mb-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 border border-gray-300 rounded-md px-4 py-2 bg-white/70 backdrop-blur-sm shadow">
            🛍️ Daftar Produk Unggulan
            </h1>
        </div>
  
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada data produk ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-contain bg-gray-50 p-4 rounded-t-xl"
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description.substring(0, 100)}...
                  </p>
                  <div className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  }
  