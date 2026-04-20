import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

export async function getProducts() {
  const response = await axios.get(API_BASE_URL);
  return response.data;
}

export async function addProduct(payload) {
  const response = await axios.post(API_BASE_URL, payload);
  return response.data;
}
