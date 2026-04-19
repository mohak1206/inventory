import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: "rgba(24, 28, 32, 0.3)" }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-surface-lowest/95 backdrop-blur-xl w-[420px] p-8 rounded-2xl shadow-ambient"
        >
          <h2 className="font-display text-xl font-bold text-on-surface mb-6">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="ledger-input"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="number"
              className="ledger-input"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-body font-medium text-on-surface/60 bg-surface-high hover:bg-surface-highest transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}