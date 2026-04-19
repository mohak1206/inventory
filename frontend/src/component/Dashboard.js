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

  const kpiCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: "📦",
      accent: "text-primary-fixed-dim",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: "⚠️",
      accent: "text-on-error-container",
    },
    {
      label: "Today's Transactions",
      value: todayTransactions,
      icon: "💸",
      accent: "text-primary",
    },
  ];

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* PAGE TITLE */}
      <h2 className="font-display text-3xl font-bold text-on-surface">
        Dashboard
      </h2>

      {/* SUMMARY CARDS — Statement Figures */}
      <div className="grid grid-cols-3 gap-6">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-surface-lowest rounded-xl p-8 shadow-ambient transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-xs font-body font-semibold uppercase tracking-widest ${card.accent}`}>
                {card.label}
              </span>
            </div>
            <p className="font-display text-5xl font-extrabold text-on-surface">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* LOW STOCK LIST PREVIEW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-lowest rounded-xl p-8 shadow-ambient"
      >
        <h3 className="font-display text-xl font-bold text-on-surface mb-6">
          Low Stock Alerts
        </h3>

        {lowStock === 0 ? (
          <p className="text-on-surface/50 font-body">
            All products are sufficiently stocked.
          </p>
        ) : (
          <div className="space-y-3">
            {products
              .filter(p => p.quantity < 10)
              .map(p => (
                <div
                  key={p.id}
                  className="flex justify-between items-center bg-error-container/40 p-4 rounded-lg transition-colors hover:bg-error-container/60"
                >
                  <span className="font-body font-medium text-on-surface">
                    {p.name}
                  </span>
                  <span className="chip-error">
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