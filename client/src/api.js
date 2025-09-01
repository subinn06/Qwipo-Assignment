import axios from "axios";

const api = axios.create({
  baseURL: "https://qwipo-assignment-ykby.onrender.com/api", 
});

export default api;