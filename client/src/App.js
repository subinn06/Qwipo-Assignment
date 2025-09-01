import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Customers</Link> <Link to="/customers/new">Add Customer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
