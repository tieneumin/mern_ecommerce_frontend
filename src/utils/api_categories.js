import axios from "axios";

const url = "http://localhost:5000";

export const getCategories = async () => {
  const res = await axios.get(`${url}/categories`);
  return res.data;
};
