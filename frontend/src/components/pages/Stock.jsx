import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function Stock() {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(() => {
    fetch("/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleStockIn = async (id) => {
    const qty = prompt("Enter quantity to add:");
    if (!qty) return;

    await fetch("/stock/in", {
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

    await fetch("/stock/out", {
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
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-on-surface">
        Stock Management
      </h2>

      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-surface-lowest rounded-xl p-6 flex justify-between items-center
                       transition-colors duration-200 hover:bg-surface-high group"
          >
            <div>
              <h3 className="font-body text-lg font-semibold text-on-surface">
                {product.name}
              </h3>
              <p className="text-on-surface/50 text-sm font-body mt-1">
                Current Stock: <span className="font-display text-xl font-bold text-on-surface">{product.quantity}</span>
              </p>
            </div>

            <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleStockIn(product.id)}
                className="bg-secondary-container text-on-secondary-container px-5 py-2 rounded-lg text-sm font-body font-semibold transition-colors hover:opacity-80"
              >
                + Add
              </button>

              <button
                onClick={() => handleStockOut(product.id)}
                className="bg-error-container text-on-error-container px-5 py-2 rounded-lg text-sm font-body font-semibold transition-colors hover:opacity-80"
              >
                − Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}