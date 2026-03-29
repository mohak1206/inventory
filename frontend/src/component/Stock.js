import React, { useEffect, useState } from "react";

export default function Stock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://127.0.0.1:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  };

  const handleStockIn = async (id) => {
    const qty = prompt("Enter quantity to add:");
    if (!qty) return;

    await fetch("http://127.0.0.1:5000/stock/in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: id,
        quantity: parseInt(qty)
      })
    });

    fetchProducts();
  };

  const handleStockOut = async (id) => {
    const qty = prompt("Enter quantity to remove:");
    if (!qty) return;

    await fetch("http://127.0.0.1:5000/stock/out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: id,
        quantity: parseInt(qty)
      })
    });

    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Stock Management 📦
      </h2>

      <div className="space-y-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white shadow rounded-xl p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-600">
                Current Stock: {product.quantity}
              </p>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleStockIn(product.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                + Add
              </button>

              <button
                onClick={() => handleStockOut(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                - Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}