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
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-on-surface">
        Inventory Analytics
      </h2>

      <div className="bg-surface-lowest rounded-xl p-8 shadow-ambient">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(191, 200, 202, 0.25)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#181c20", fontSize: 12, fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#181c20", fontSize: 12, fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "none",
                borderRadius: "0.75rem",
                boxShadow: "0 20px 40px rgba(24, 28, 32, 0.06)",
                fontFamily: "Inter",
                color: "#181c20",
              }}
            />
            <Bar
              dataKey="quantity"
              fill="#004048"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}