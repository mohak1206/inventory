import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchTransactions = useCallback(async () => {
    const res = await fetch("/transactions");
    const data = await res.json();
    setTransactions(data);
  }, []);

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/products");
    const data = await res.json();
    setProducts(data);
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, [fetchTransactions, fetchProducts]);

  // Build a product name lookup map
  const productMap = {};
  products.forEach(p => { productMap[p.id] = p.name; });

  // Helper to resolve product name
  const getProductName = (t) => {
    if (t.name) return t.name;
    if (t.product_name) return t.product_name;
    if (t.product_id && productMap[t.product_id]) return productMap[t.product_id];
    return "—";
  };

  // KPI calculations
  const totalTransactions = transactions.length;

  const totalIn = transactions
    .filter(t => t.type === "IN")
    .reduce((acc, t) => acc + t.quantity, 0);

  const totalOut = transactions
    .filter(t => t.type === "OUT")
    .reduce((acc, t) => acc + t.quantity, 0);

  const todayCount = transactions.filter(t => {
    const today = new Date().toDateString();
    return new Date(t.created_at).toDateString() === today;
  }).length;

  // Date range display
  const getDateRange = () => {
    if (transactions.length === 0) return "No data";
    const dates = transactions.map(t => new Date(t.created_at));
    const min = new Date(Math.min(...dates));
    const max = new Date(Math.max(...dates));
    const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${fmt(min)} - ${fmt(max)}`;
  };

  // Export to CSV
  const exportCSV = () => {
    const csvData = transactions.map(t => ({
      Product: getProductName(t),
      Type: t.type,
      Quantity: t.quantity,
      Date: new Date(t.created_at).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const buffer = XLSX.write(workbook, { bookType: "csv", type: "array" });
    saveAs(new Blob([buffer]), "Transactions.csv");
  };

  // Export to Excel
  const exportExcel = () => {
    const data = transactions.map(t => ({
      Product: getProductName(t),
      Type: t.type,
      Quantity: t.quantity,
      Date: new Date(t.created_at).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Transaction_Report.xlsx");
  };

  const kpiCards = [
    {
      label: "TOTAL TRANSACTIONS",
      value: totalTransactions,
      icon: "📊",
      trend: `${todayCount} today`,
      trendType: "neutral",
    },
    {
      label: "TOTAL STOCK IN",
      value: totalIn,
      icon: "📈",
      trend: `${transactions.filter(t => t.type === "IN").length} entries`,
      trendType: "success",
    },
    {
      label: "TOTAL STOCK OUT",
      value: totalOut,
      icon: "📉",
      trend: `${transactions.filter(t => t.type === "OUT").length} entries`,
      trendType: "error",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-on-surface tracking-tight">
            Performance Reports
          </h2>
          <p className="font-body text-sm text-on-surface/50 mt-1.5 max-w-md">
            Comprehensive analysis of inventory movement and valuation.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Range Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium text-on-primary"
               style={{ background: "linear-gradient(135deg, #004048, #005963)" }}>
            <span>📅</span>
            <span>{getDateRange()}</span>
          </div>

          {/* CSV Export */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium text-on-surface bg-surface-lowest ghost-border hover:bg-surface-high transition-colors"
          >
            <span>⬇</span> CSV
          </button>

          {/* Excel Export */}
          <button
            onClick={exportExcel}
            className="btn-primary flex items-center gap-2"
          >
            <span>📄</span> Export Report
          </button>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-lowest rounded-xl p-7 shadow-ambient"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.12em] text-on-surface/50">
                {card.label}
              </span>
              <span className="text-lg opacity-60">{card.icon}</span>
            </div>

            <p className="font-display text-4xl font-extrabold text-on-surface mb-3">
              {card.value}
            </p>

            <div className="flex items-center gap-2">
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-body
                ${card.trendType === "success" ? "bg-secondary-container text-on-secondary-container" : ""}
                ${card.trendType === "error" ? "bg-error-container text-on-error-container" : ""}
                ${card.trendType === "neutral" ? "bg-tertiary-container text-on-tertiary-container" : ""}
              `}>
                {card.trendType === "success" && "↗"}
                {card.trendType === "error" && "↘"}
                {card.trendType === "neutral" && "•"}{" "}
                {card.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── TRANSACTION TABLE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-surface-lowest rounded-xl p-8 shadow-ambient"
      >
        <h3 className="font-display text-xl font-bold text-on-surface mb-6">
          Transaction Summary
        </h3>

        {transactions.length === 0 ? (
          <p className="text-on-surface/50 font-body">No transactions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-low rounded-lg">
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50 first:rounded-l-lg last:rounded-r-lg">
                    Product
                  </th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50">
                    Type
                  </th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50">
                    Quantity
                  </th>
                  <th className="p-3 text-left text-[11px] font-body font-bold uppercase tracking-[0.1em] text-on-surface/50 first:rounded-l-lg last:rounded-r-lg">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
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
                    <td className="p-3 font-body text-sm font-semibold text-on-surface">
                      {t.quantity}
                    </td>
                    <td className="p-3 font-body text-sm text-on-surface/60">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}