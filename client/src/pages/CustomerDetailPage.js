import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const fetchCustomer = () => {
    api.get(`/customers/${id}`).then((res) => setCustomer(res.data.data));
  };

  const fetchAddresses = () => {
    api.get(`/customers/${id}/addresses`).then((res) => setAddresses(res.data.data));
  };

  useEffect(() => {
    fetchCustomer();
    fetchAddresses();
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{customer.first_name} {customer.last_name}</h2>
      <p>
        Phone: {customer.phone_number}{" "}
        {addresses.length === 1 && (
          <span style={{ color: "green", fontWeight: "bold" }}>Only One Address</span>
        )}
      </p>

      <h3>Addresses</h3>
      <AddressList addresses={addresses} onRefresh={fetchAddresses} />

      <h3>Add Address</h3>
      <AddressForm customerId={id} onSuccess={fetchAddresses} />

      <button
        style={{ background: "red", marginTop: "15px" }}
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this customer?")) {
            api.delete(`/customers/${id}`).then(() => navigate("/"));
          }
        }}
      >
        Delete Customer
      </button>
    </div>
  );
}

export default CustomerDetailPage;
