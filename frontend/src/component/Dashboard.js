import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchTransactions = async () => {
    const res = await fetch("http://127.0.0.1:5000/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.quantity < 10).length;

  const todayTransactions = transactions.filter(t => {
    const today = new Date().toDateString();
    return new Date(t.created_at).toDateString() === today;
  }).length;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold">
        Dashboard 📊
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6">

        {/* TOTAL PRODUCTS */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Total Products</h3>
          <p className="text-4xl font-bold mt-2">
            {totalProducts}
          </p>
        </motion.div>

        {/* LOW STOCK */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Low Stock</h3>
          <p className="text-4xl font-bold mt-2">
            {lowStock}
          </p>
        </motion.div>

        {/* TODAY TRANSACTIONS */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Today's Transactions</h3>
          <p className="text-4xl font-bold mt-2">
            {todayTransactions}
          </p>
        </motion.div>

      </div>

      {/* LOW STOCK LIST PREVIEW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">
          Low Stock Alerts ⚠
        </h3>

        {lowStock === 0 ? (
          <p className="text-gray-500">
            All products are sufficiently stocked.
          </p>
        ) : (
          <div className="space-y-3">
            {products
              .filter(p => p.quantity < 10)
              .map(p => (
                <div
                  key={p.id}
                  className="flex justify-between bg-red-50 border border-red-200 p-3 rounded-lg"
                >
                  <span>{p.name}</span>
                  <span className="text-red-600 font-bold">
                    Qty: {p.quantity}
                  </span>
                </div>
              ))}
          </div>
        )}
      </motion.div>

    </motion.div>
  );
}