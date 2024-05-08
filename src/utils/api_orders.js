import axios from "axios";

const url = "http://localhost:5000";

export const getOrders = async () => {
  // const params = {
  //   page,
  //   perPage,
  // };
  // if (category !== "all") params.category = category; // ?category={category}
  // console.log(params.category);
  // const query = new URLSearchParams(params);
  // const res = await axios.get(`${url}/orders?${query.toString()}`);
  const res = await axios.get(`${url}/orders`);
  return res.data;
};

export const addOrder = async (data) => {
  const res = await axios.post(
    `${url}/orders`, // POST API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
      },
    }
  );
  return res.data;
};

export const updateOrder = async (data) => {
  console.log(data);
  const res = await axios.put(
    `${url}/orders/${data._id}`, // PUT API URL
    JSON.stringify(data), // API-bound JSON-format data
    {
      headers: {
        "Content-Type": "application/json", // tells API data sent is JSON
      },
    }
  );
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${url}/orders/${id}`);
  return res.data;
};
