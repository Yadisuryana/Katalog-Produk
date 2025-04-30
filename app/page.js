import ProductCatalog from './ProductCatalog';

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
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🛍️ Katalog Produk Interaktif
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada produk.</p>
      ) : (
        <ProductCatalog products={products} />
      )}
    </main>
  );
}
