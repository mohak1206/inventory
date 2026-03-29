import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports 📊</h2>

        <button
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Export to Excel
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h3>Total Products</h3>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <h3>Total Stock</h3>
          <p className="text-3xl font-bold mt-2">{totalStock}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h3>Total Stock In</h3>
          <p className="text-3xl font-bold mt-2">{totalIn}</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow">
          <h3>Total Stock Out</h3>
          <p className="text-3xl font-bold mt-2">{totalOut}</p>
        </div>

      </div>

      {/* LOW STOCK SECTION */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Low Stock Products ⚠</h3>

        {lowStock.length === 0 ? (
          <p className="text-gray-500">No low stock items</p>
        ) : (
          <div className="space-y-3">
            {lowStock.map(p => (
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
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Transaction Summary</h3>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} className="border-t">
                    <td className="p-3">{t.name}</td>
                    <td className="p-3">
                      {t.type === "IN" ? (
                        <span className="text-green-600 font-semibold">
                          IN
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          OUT
                        </span>
                      )}
                    </td>
                    <td className="p-3">{t.quantity}</td>
                    <td className="p-3">
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