import Space from "../models/space.model";

const { default: axios } = require("axios");

const API_BASE_URL = "http://localhost:8000";
const ROUTE = "spaces";

export const getSpaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${ROUTE}`);
    const mappedData = response.data.map(
      (element) => new Space(element.id, element.name, element.plan)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSpace = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${ROUTE}/${id}`);
    return new Space(response.data.id, response.data.name, response.data.plan);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createSpace = async (name, plan) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${ROUTE}`, {
      name: name,
      plan: plan,
    });

    return new Space(response.data.id, response.data.name, response.data.price);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putSpace = async (id, name, plan) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${ROUTE}/${id}`, {
      name: name,
      plan: plan,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const patchSpaceName = async (id, name) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${ROUTE}/${id}`, {
      name: name,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const patchSpacePlan = async (id, plan) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${ROUTE}/${id}`, {
      plan: plan,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteSpace = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${ROUTE}/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
