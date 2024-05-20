import axios from "axios";

const url = "http://localhost:5000";

export const getCategories = async () => {
  const res = await axios.get(`${url}/categories`);
  return res.data;
};

export const addCategory = async (data) => {
  const res = await axios.post(`${url}/categories`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token, // include token to API
    },
  });
  return res.data;
};

export const updateCategory = async (data) => {
  const res = await axios.put(
    `${url}/categories/${data.id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token, // include token to API
      },
    }
  );
  return res.data;
};

export const deleteCategory = async (data) => {
  const res = await axios.delete(`${url}/categories/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token, // include token to API
    },
  });
  return res.data;
};
