import Modifier from "../models/modifier.model";
import Product from "../models/product.model";

const { default: axios } = require("axios");

const API_BASE_URL = "http://localhost:8000";
const ROUTE = "products";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${ROUTE}`);
    const mappedData = response.data.map(
      (element) => new Product(element.id, element.name, element.price)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${ROUTE}/${id}`);

    return new Product(
      response.data.id,
      response.data.name,
      response.data.price
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createProduct = async (name, price) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${ROUTE}`, {
      name: name,
      price: price,
    });

    return new Product(
      response.data.id,
      response.data.name,
      response.data.price
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putProduct = async (id, name, price) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${ROUTE}/${id}`, {
      name: name,
      price: price,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${ROUTE}/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAssignmentsForProduct = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ROUTE}/${id}/modifierGroupAssignments`
    );
    const mappedData = response.data.map((element) => element.ModifierGroupId);

    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createAssignmentForProduct = async (id, modifierGroupId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ROUTE}/${id}/modifierGroupAssignments`,
      {
        modifierGroupId: modifierGroupId,
      }
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteAssignmentForProduct = async (id, modifierGroupId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${ROUTE}/${id}/modifierGroupAssignments/${modifierGroupId}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
