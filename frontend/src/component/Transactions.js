import React, { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History 📜</h2>

      <div className="bg-white shadow rounded-xl p-6">
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
                    <span className="text-green-600 font-semibold">IN</span>
                  ) : (
                    <span className="text-red-600 font-semibold">OUT</span>
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
    </div>
  );
}