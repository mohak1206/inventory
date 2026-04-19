import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Error loading products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD PRODUCT =================
  const handleAdd = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          quantity: Number(quantity),
          category: "",
          supplier: "",
          unit: "",
          min_stock: 0,
          current_stock: Number(quantity),
        }),
      });

      if (!res.ok) throw new Error("Add failed");

      setShowModal(false);
      setName("");
      setQuantity("");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            quantity: Number(quantity),
            current_stock: Number(quantity),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setShowModal(false);
      setEditingProduct(null);
      setName("");
      setQuantity("");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setQuantity(product.quantity);
    setShowModal(true);
  };

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h2 className="font-display text-3xl font-bold text-on-surface">
          Products
        </h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setName("");
            setQuantity("");
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-surface-lowest rounded-xl p-5 flex justify-between items-center
                       transition-colors duration-200 hover:bg-surface-high group"
          >
            <div>
              <h3 className="font-body font-semibold text-on-surface text-base">
                {product.name}
              </h3>
              <p className="text-on-surface/50 text-sm font-body mt-1">
                Qty: {product.quantity}
              </p>
            </div>

            <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEditModal(product)}
                className="bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-colors hover:opacity-80"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-error-container text-on-error-container px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-colors hover:opacity-80"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL — Glassmorphism */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{ backgroundColor: "rgba(24, 28, 32, 0.3)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-surface-lowest/95 backdrop-blur-xl rounded-2xl shadow-ambient w-[420px] p-8 space-y-6"
            >
              <h3 className="font-display text-xl font-bold text-on-surface">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ledger-input"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="ledger-input"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg font-body font-medium text-on-surface/60 bg-surface-high hover:bg-surface-highest transition-colors"
                >
                  Cancel
                </button>

                {editingProduct ? (
                  <button
                    onClick={handleUpdate}
                    className="btn-primary"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleAdd}
                    className="btn-primary"
                  >
                    Save
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}