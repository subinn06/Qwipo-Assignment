import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import CustomerForm from "../components/CustomerForm";

const CustomerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/customers/${id}`).then((res) => {
        const { first_name, last_name, phone_number } = res.data.data;
        setInitialData({ first_name, last_name, phone_number });
      });
    }
  }, [id]);

  const handleSubmit = (formData) => {
    if (id) {
      return api.put(`/customers/${id}`, formData).then(() => navigate("/"));
    } else {
      return api.post("/customers", formData).then(() => navigate("/"));
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Edit Customer" : "New Customer"}</h1>
      <CustomerForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

export default CustomerFormPage;
