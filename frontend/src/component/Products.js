import React, { useEffect, useState } from "react";

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
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products 📦</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setName("");
            setQuantity("");
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">Qty: {product.quantity}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => openEditModal(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-96 space-y-4">
            <h3 className="text-xl font-bold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              {editingProduct ? (
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}