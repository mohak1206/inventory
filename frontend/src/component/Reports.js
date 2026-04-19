import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

export default function Reports() {
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

  // Build a product name lookup map
  const productMap = {};
  products.forEach(p => { productMap[p.id] = p.name; });

  // Helper to resolve product name (handles multiple possible field names)
  const getProductName = (t) => {
    if (t.name) return t.name;
    if (t.product_name) return t.product_name;
    if (t.product_id && productMap[t.product_id]) return productMap[t.product_id];
    return "—";
  };

  const lowStock = products.filter(p => p.quantity < 10);
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);

  const totalIn = transactions
    .filter(t => t.type === "IN")
    .reduce((acc, t) => acc + t.quantity, 0);

  const totalOut = transactions
    .filter(t => t.type === "OUT")
    .reduce((acc, t) => acc + t.quantity, 0);

  // ================= EXPORT TO EXCEL =================
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(data, "Inventory_Report.xlsx");
  };

  const summaryCards = [
    { label: "TOTAL PRODUCTS", value: totalProducts, icon: "📦", accent: "text-primary" },
    { label: "TOTAL STOCK", value: totalStock, icon: "🏭", accent: "text-primary-fixed-dim" },
    { label: "STOCK IN", value: totalIn, icon: "📈", accent: "text-on-secondary-container" },
    { label: "STOCK OUT", value: totalOut, icon: "📉", accent: "text-on-error-container" },
  ];

  return (
    <div className="space-y-10">

      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="font-display text-3xl font-bold text-on-surface">
          Reports
        </h2>

        <button
          onClick={exportToExcel}
          className="btn-primary"
        >
          Export to Excel
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-5">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-surface-lowest rounded-xl p-6 shadow-ambient"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.12em] text-on-surface/50">
                {card.label}
              </span>
              <span className="text-lg opacity-60">{card.icon}</span>
            </div>
            <p className={`font-display text-4xl font-extrabold ${card.accent}`}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* LOW STOCK SECTION */}
      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient">
        <h3 className="font-display text-xl font-bold text-on-surface mb-6">
          Low Stock Products
        </h3>

        {lowStock.length === 0 ? (
          <p className="text-on-surface/50 font-body">No low stock items</p>
        ) : (
          <div className="space-y-3">
            {lowStock.map(p => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-error-container/40 p-4 rounded-lg hover:bg-error-container/60 transition-colors"
              >
                <span className="font-body font-medium text-on-surface">{p.name}</span>
                <span className="chip-error">
                  Qty: {p.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRANSACTION TABLE — with product name resolution */}
      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient">
        <h3 className="font-display text-xl font-bold text-on-surface mb-6">
          Transaction Summary
        </h3>

        {transactions.length === 0 ? (
          <p className="text-on-surface/50 font-body">No transactions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="bg-surface-low">
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50 first:rounded-l-lg last:rounded-r-lg">Product</th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50">Type</th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50">Quantity</th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50 first:rounded-l-lg last:rounded-r-lg">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-surface-high transition-colors">
                    <td className="p-3 font-body text-sm font-medium text-on-surface">
                      {getProductName(t)}
                    </td>
                    <td className="p-3">
                      {t.type === "IN" ? (
                        <span className="chip-success">IN</span>
                      ) : (
                        <span className="chip-error">OUT</span>
                      )}
                    </td>
                    <td className="p-3 font-body text-sm font-semibold text-on-surface">{t.quantity}</td>
                    <td className="p-3 font-body text-sm text-on-surface/60">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}