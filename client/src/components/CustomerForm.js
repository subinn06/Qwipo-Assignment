import React, { useState, useEffect } from "react";

const CustomerForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.first_name || !formData.last_name || !formData.phone_number) {
      setError("All fields are required.");
      return;
    }

    onSubmit(formData)
      .then(() => setError(""))
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
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="submit">{initialData ? "Update" : "Create"}</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CustomerForm;
