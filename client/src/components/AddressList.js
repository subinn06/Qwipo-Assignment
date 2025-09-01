import React from "react";
import api from "../api";

const AddressList = ({ addresses, onRefresh }) => {
  if (!addresses.length) return <p>No addresses yet.</p>;

  const handleDelete = (id) => {
    if (window.confirm("Delete this address?")) {
      api.delete(`/addresses/${id}`).then(() => onRefresh());
    }
  };

  const handleEdit = (a) => {
    const updated = {
      address_details: prompt("Address:", a.address_details) || a.address_details,
      city: prompt("City:", a.city) || a.city,
      state: prompt("State:", a.state) || a.state,
      pin_code: prompt("Pin Code:", a.pin_code) || a.pin_code,
    };
    api.put(`/addresses/${a.id}`, updated).then(() => onRefresh());
  };

  return (
    <ul>
      {addresses.map((a) => (
        <li key={a.id}>
          {a.address_details}, {a.city}, {a.state} - {a.pin_code}
          <button style={{ marginLeft: "10px", background: "red" }} onClick={() => handleDelete(a.id)}>Delete</button>
          <button style={{ marginLeft: "5px" }} onClick={() => handleEdit(a)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default AddressList;
