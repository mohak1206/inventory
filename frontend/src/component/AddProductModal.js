import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000/products";

export default function AddProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  // ================= PREFILL EDIT =================
  useEffect(() => {
    if (product) {
      setName(product.name);
      setQuantity(product.quantity);
    }
  }, [product]);

  // ================= SAVE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        quantity: Number(quantity),
        category: "",
        supplier: "",
        unit: "",
        min_stock: 0,
        current_stock: Number(quantity),
      };

      const res = await fetch(
        isEdit ? `${API}/${product.id}` : API,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      onSaved(); // refresh list + close modal
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-2 mb-4 rounded"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}