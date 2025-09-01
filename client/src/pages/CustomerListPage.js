import React, { useState, useEffect } from "react";
import api from "../api";
import CustomerList from "../components/CustomerList";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const fetchCustomers = () => {
    api.get("/customers", {
      params: { search, city, state, pin_code: pinCode, sort, page, limit: 5 },
    }).then((res) => setCustomers(res.data.data));
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, sort]);

  return (
    <div className="container">
      <h1>Customer List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
        <input placeholder="Search name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <input placeholder="Search city..." value={city} onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Search state..." value={state} onChange={(e) => setState(e.target.value)} />
        <input placeholder="Search pin code..." value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
        </select>
        <button onClick={fetchCustomers}>Search</button>
        <button onClick={() => { setSearch(""); setCity(""); setState(""); setPinCode(""); setSort(""); setPage(1); fetchCustomers(); }}>
          Clear Filters
        </button>
      </div>
      <CustomerList customers={customers} page={page} setPage={setPage} />
    </div>
  );
}

export default CustomerListPage;
