import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then(res => res.json())
      .then(products => {
        const formatted = products.map(p => ({
          name: p.name,
          quantity: p.quantity
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Inventory Analytics 📊</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[5,5,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}