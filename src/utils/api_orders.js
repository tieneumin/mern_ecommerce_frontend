import axios from "axios";

const url = "http://localhost:5000";

export const getOrders = async (token) => {
  const res = await axios.get(`${url}/orders`, {
    headers: {
      Authorization: "Bearer " + token, // include token to API
    },
  });
  return res.data;
};

export const addOrder = async (data) => {
  const res = await axios.post(
    `${url}/orders`, // POST API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return res.data;
};

export const updateOrder = async (data) => {
  // console.log(data);
  const res = await axios.put(
    `${url}/orders/${data._id}`, // PUT API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
        Authorization: "Bearer " + data.token,
      },
    }
  );
  // console.log(res.data);
  return res.data;
};

export const deleteOrder = async (data) => {
  const res = await axios.delete(`${url}/orders/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return res.data;
};
