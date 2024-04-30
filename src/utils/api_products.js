import axios from "axios";

const API_URL = "http://localhost:5000";

export const addProducts = async () => {};

export const getProducts = async (category) => {
  try {
    let params = {};
    if (category !== "all") {
      params.category = category;
    }
    // console.log(params.category);
    const queries = new URLSearchParams(params);
    const response = await axios.get(
      API_URL + "/products?" + queries.toString()
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getProduct = async (id) => {};

export const updateProducts = async (id, data) => {};

export const deleteProducts = async (id) => {};
