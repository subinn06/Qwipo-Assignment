const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to the SQLite database.");
});

// Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    address_details TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
  )`);
});

// Customer Routes

// Create a new customer
app.post("/api/customers", (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.get("SELECT * FROM customers WHERE phone_number = ?", [phone_number], (err, row) => {
    if (row) return res.status(400).json({ error: "Phone already exists" });
    const sql = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
    db.run(sql, [first_name, last_name, phone_number], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Customer created", data: { id: this.lastID, first_name, last_name, phone_number } });
    });
  });
});

// Get a list of all customers (searching, sorting, filter & pagination
app.get("/api/customers", (req, res) => {
  const { search, city, state, pin_code, sort, page = 1, limit = 5 } = req.query;
  let sql =
    "SELECT DISTINCT c.* FROM customers c LEFT JOIN addresses a ON c.id = a.customer_id WHERE 1=1";
  let params = [];

  if (search) {
    sql += " AND (c.first_name LIKE ? OR c.last_name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  if (city) {
    sql += " AND a.city LIKE ?";
    params.push(`%${city}%`);
  }
  if (state) {
    sql += " AND a.state LIKE ?";
    params.push(`%${state}%`);
  }
  if (pin_code) {
    sql += " AND a.pin_code LIKE ?";
    params.push(`%${pin_code}%`);
  }

  if (sort === "name_asc") sql += " ORDER BY c.first_name ASC";
  if (sort === "name_desc") sql += " ORDER BY c.first_name DESC";

  sql += " LIMIT ? OFFSET ?";
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "success", data: rows });
  });
});

// Get details for a single customer
app.get("/api/customers/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM customers WHERE id = ?", [id], (err, customer) => {
    if (err || !customer) return res.status(404).json({ error: "Not found" });
    res.json({ message: "success", data: customer });
  });
});

// Update a customer's information
app.put("/api/customers/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number } = req.body;
  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.run(
    "UPDATE customers SET first_name=?, last_name=?, phone_number=? WHERE id=?",
    [first_name, last_name, phone_number, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Customer updated", changes: this.changes });
    }
  );
});

// Delete a customer
app.delete("/api/customers/:id", (req, res) => {
  db.run("DELETE FROM customers WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Customer deleted", changes: this.changes });
  });
});

// Address Routes

// Add a new address for a specific customer
app.post("/api/customers/:id/addresses", (req, res) => {
  const { id } = req.params;
  const { address_details, city, state, pin_code } = req.body;
  if (!address_details || !city || !state || !pin_code) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.run(
    "INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)",
    [id, address_details, city, state, pin_code],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Address added", data: { id: this.lastID, customer_id: id, address_details, city, state, pin_code } });
    }
  );
});

// Get all addresses for a specific customer
app.get("/api/customers/:id/addresses", (req, res) => {
  db.all("SELECT * FROM addresses WHERE customer_id=?", [req.params.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "success", data: rows });
  });
});

// Update a specific address
app.put("/api/addresses/:id", (req, res) => {
  const { address_details, city, state, pin_code } = req.body;
  db.run(
    "UPDATE addresses SET address_details=?, city=?, state=?, pin_code=? WHERE id=?",
    [address_details, city, state, pin_code, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Address updated", changes: this.changes });
    }
  );
});

// Delete a specific address
app.delete("/api/addresses/:id", (req, res) => {
  db.run("DELETE FROM addresses WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Address deleted", changes: this.changes });
  });
});

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
