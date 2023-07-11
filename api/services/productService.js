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

export const getModifiersForProduct = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${ROUTE}/${productId}/modifiers`
    );
    const mappedData = response.data.map(
      (element) =>
        new Modifier(
          element.id,
          element.name,
          element.priceDiff,
          element.ProductId
        )
    );

    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createModifierForProduct = async (name, priceDiff, productId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${ROUTE}/${productId}/modifiers`,
      {
        name: name,
        priceDiff: priceDiff,
        ProductId: productId,
      }
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteModifierForProduct = async (id, productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${ROUTE}/${productId}/modifiers/${id}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
