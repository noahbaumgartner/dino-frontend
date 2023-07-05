import ProductGroup from "../models/productGroup.model";

const { default: axios } = require("axios");

const API_BASE_URL = "http://192.168.1.104:8000";

export const getProductGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productGroups`);
    const mappedData = response.data.map(
      (element) => new ProductGroup(element.id, element.name)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getProductGroup = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productGroups/${id}`);

    return new ProductGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createProductGroup = async (name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/productGroups`, {
      name: name,
    });

    return new ProductGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteProductGroup = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/productGroups/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
