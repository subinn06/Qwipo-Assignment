import React from "react";
import { Link } from "react-router-dom";
import api from "../api";

const CustomerList = ({ customers, page, setPage }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      api.delete(`/customers/${id}`).then(() => window.location.reload());
    }
  };

  if (!customers.length) return <p>No customers found.</p>;

  return (
    <div>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <Link to={`/customers/${c.id}`}>
              {c.first_name} {c.last_name}
            </Link>{" "}
            - {c.phone_number}
            <Link to={`/customers/${c.id}/edit`}>
              <button style={{ marginLeft: "10px" }}>Edit</button>
            </Link>
            <button
              style={{ marginLeft: "5px", background: "red" }}
              onClick={() => handleDelete(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default CustomerList;
