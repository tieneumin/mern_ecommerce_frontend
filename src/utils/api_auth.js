import axios from "axios";

const url = "http://localhost:5000";

export const loginUser = async (data) => {
  console.log(data);
  const res = await axios.post(`${url}/users/login`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(`${url}/users/signup`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
