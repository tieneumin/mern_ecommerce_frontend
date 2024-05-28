import axios from "axios";

import { url } from "./data";

export const getProducts = async (category, page, perPage) => {
  const params = {
    page,
    perPage,
  };
  if (category !== "all") params.category = category; // ?category={category}
  // console.log(params.category);
  const query = new URLSearchParams(params);
  const res = await axios.get(`${url}/products?${query.toString()}`);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${url}/products/${id}`); // to retrieve specific product from /products/:id
  return res.data;
};

export const addProduct = async (data) => {
  const res = await axios.post(
    `${url}/products`, // POST API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
        Authorization: "Bearer " + data.token, // include token to API
      },
    }
  );
  return res.data;
};

export const updateProduct = async (data) => {
  // console.log(data);
  const res = await axios.put(
    `${url}/products/${data.id}`, // PUT API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
        Authorization: "Bearer " + data.token, // include token to API
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (data) => {
  const res = await axios.delete(`${url}/products/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token, // include token to API
    },
  });
  return res.data;
};
