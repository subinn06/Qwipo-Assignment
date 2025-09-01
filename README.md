# Customer Management App

A full-stack assignment project built with **React, Node.js, Express, and SQLite**.  
This app manages **customers** and their **addresses** with full CRUD, search, filters, pagination, and validation.

---

## Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Styling:** CSS (responsive, minimal design)

---

## Project Structure
customer-management-app/
│── client/ # React frontend
│── server/ # Express backend


---

## Features

### Customers
- Create, read, update, delete customers
- Validation (client + server)
- Unique phone number validation
- List with **search, filter, sort, pagination**
- **Delete confirmation**
- Navigation between pages

### Addresses
- Add, view, edit, delete addresses for each customer
- Validation (all fields required)
- **Only One Address badge** if customer has exactly one
- Inline edit (via prompt) and delete with confirmation

### Extra
- Clear filters button
- Sorting (Name A–Z, Z–A)
- Responsive design for mobile/tablet
- Error handling with user-friendly messages

---

## API Endpoints
Customers

POST /api/customers → create customer
GET /api/customers → list customers (with search, filter, pagination, sort)
GET /api/customers/:id → get single customer
PUT /api/customers/:id → update customer
DELETE /api/customers/:id → delete customer

Addresses

POST /api/customers/:id/addresses → add address
GET /api/customers/:id/addresses → list addresses
PUT /api/addresses/:id → update address
DELETE /api/addresses/:id → delete address

---

## Improvements

Centralized API client (api.js) for Axios
Form validation with inline error messages
Responsive CSS
Confirmation before deletes

---

## Assignment Coverage

- Full CRUD (Customers & Addresses)
- Validation (Client & Server)
- Search, filter, sort, pagination
- Navigation with React Router
- Error handling & responsive UI
- Only One Address badge

---

## Author

Subin A
Assignment project for Qwipo Interview

---

### Deployment Note
- Backend: [Render](https://qwipo-assignment-ykby.onrender.com) (free tier, DB resets after redeploys)  
- Frontend: [Vercel](https://qwipo-assignment-tdva.vercel.app)  
