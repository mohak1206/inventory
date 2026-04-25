from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from flask_socketio import SocketIO, emit
from flask_caching import Cache

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

cache = Cache(config={'CACHE_TYPE': 'SimpleCache', 'CACHE_DEFAULT_TIMEOUT': 30})
cache.init_app(app)


# ================= DB CONNECTION FUNCTION =================
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Mohak@12",
        database="inventory_db"
    )


# ================= GET PRODUCTS =================
@app.route("/products", methods=["GET"])
@cache.cached()
def get_products():
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("SELECT * FROM products ORDER BY id DESC")
    data = cur.fetchall()

    cur.close()
    conn.close()
    return jsonify(data)


# ================= ADD PRODUCT =================
@app.route("/products", methods=["POST"])
def add_product():
    data = request.json

    name = data.get("name")
    quantity = data.get("quantity", 0)
    category = data.get("category", "")
    supplier = data.get("supplier", "")
    unit = data.get("unit", "")
    min_stock = data.get("min_stock", 0)
    current_stock = data.get("current_stock", quantity)

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO products
        (name, category, supplier, unit, min_stock, current_stock, quantity)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (name, category, supplier, unit, min_stock, current_stock, quantity))

    conn.commit()
    cur.close()
    conn.close()

    socketio.emit("notification", {"message": f"New Product Added: {name}"})

    cache.delete('view//products')
    cache.delete('view//dashboard')

    return jsonify({"msg": "Product added"})


# ================= UPDATE PRODUCT =================
@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.json

    name = data.get("name")
    quantity = data.get("quantity", 0)
    current_stock = data.get("current_stock", quantity)

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE products
        SET name=%s, quantity=%s, current_stock=%s
        WHERE id=%s
    """, (name, quantity, current_stock, id))

    conn.commit()
    cur.close()
    conn.close()

    cache.delete('view//products')
    cache.delete('view//dashboard')

    return jsonify({"msg": "Product updated"})


# ================= DELETE PRODUCT =================
@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM products WHERE id=%s", (id,))
    conn.commit()

    cur.close()
    conn.close()

    socketio.emit("notification", {"message": f"Product Deleted (ID: {id})"})

    cache.delete('view//products')
    cache.delete('view//dashboard')

    return jsonify({"msg": "Deleted"})


# ================= DASHBOARD =================
@app.route("/dashboard", methods=["GET"])
def dashboard():
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("SELECT COUNT(*) as total FROM products")
    total = cur.fetchone()["total"]

    cur.execute("SELECT COUNT(*) as low FROM products WHERE quantity < 10")
    low = cur.fetchone()["low"]

    cur.close()
    conn.close()

    return jsonify({
        "total": total,
        "low": low,
        "today": 0
    })


# ================= STOCK IN =================
@app.route("/stock/in", methods=["POST"])
def stock_in():
    data = request.json
    product_id = data["product_id"]
    quantity = data["quantity"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE products
        SET quantity = quantity + %s
        WHERE id = %s
    """, (quantity, product_id))

    cur.execute("""
        INSERT INTO transactions (product_id, type, quantity)
        VALUES (%s, 'IN', %s)
    """, (product_id, quantity))

    conn.commit()
    cur.close()
    conn.close()

    socketio.emit("notification", {"message": f"Stock IN: {quantity} units added for Product ID {product_id}"})

    cache.delete('view//products')
    cache.delete('view//transactions')
    cache.delete('view//dashboard')

    return jsonify({"msg": "Stock added"})


# ================= STOCK OUT =================
@app.route("/stock/out", methods=["POST"])
def stock_out():
    data = request.json
    product_id = data["product_id"]
    quantity = data["quantity"]

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE products
        SET quantity = quantity - %s
        WHERE id = %s AND quantity >= %s
    """, (quantity, product_id, quantity))

    cur.execute("""
        INSERT INTO transactions (product_id, type, quantity)
        VALUES (%s, 'OUT', %s)
    """, (product_id, quantity))

    conn.commit()
    cur.close()
    conn.close()

    socketio.emit("notification", {"message": f"Stock OUT: {quantity} units removed for Product ID {product_id}"})

    cache.delete('view//products')
    cache.delete('view//transactions')
    cache.delete('view//dashboard')

    return jsonify({"msg": "Stock removed"})


# ================= GET TRANSACTIONS =================
@app.route("/transactions", methods=["GET"])
@cache.cached()
def get_transactions():
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("SELECT * FROM transactions ORDER BY created_at DESC")
    data = cur.fetchall()

    cur.close()
    conn.close()
    return jsonify(data)


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    if email == "admin@inventory.com" and password == "1234":
        return jsonify({
            "msg": "Login successful",
            "role": "admin",
            "name": "Admin"
        })
    else:
        return jsonify({"msg": "Invalid credentials"}), 401


# ================= RUN APP =================
if __name__ == "__main__":
    import os
    if os.environ.get('FLASK_ENV') == 'development':
        socketio.run(app, debug=True, port=5000)
    else:
        from waitress import serve
        serve(app, host='127.0.0.1', port=5000)