import React, { useState } from "react";
import api from "../api";

const AddressForm = ({ customerId, onSuccess }) => {
  const [formData, setFormData] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (
      !formData.address_details ||
      !formData.city ||
      !formData.state ||
      !formData.pin_code
    ) {
      setError("All fields are required.");
      return;
    }

    return api
      .post(`/customers/${customerId}/addresses`, formData)
      .then(() => {
        setFormData({
          address_details: "",
          city: "",
          state: "",
          pin_code: "",
        });
        setError("");
        onSuccess();
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="address_details"
          value={formData.address_details}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          name="pin_code"
          value={formData.pin_code}
          onChange={handleChange}
          placeholder="PIN Code"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddressForm;
