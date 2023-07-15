import ProductGroup from "../models/productGroup.model";
import { BaseURL } from "../routes";

const { default: axios } = require("axios");

export const getProductGroups = async () => {
  try {
    const response = await axios.get(`${BaseURL}/productGroups`);
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
    const response = await axios.get(`${BaseURL}/productGroups/${id}`);

    return new ProductGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createProductGroup = async (name) => {
  try {
    const response = await axios.post(`${BaseURL}/productGroups`, {
      name: name,
    });

    return new ProductGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putProductGroup = async (id, name) => {
  try {
    const response = await axios.put(`${BaseURL}/productGroups/${id}`, {
      name: name,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteProductGroup = async (id) => {
  try {
    const response = await axios.delete(`${BaseURL}/productGroups/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAssignmentsForProductGroup = async (id) => {
  try {
    const response = await axios.get(
      `${BaseURL}/productGroups/${id}/productAssignments`
    );
    const mappedData = response.data.map((element) => element.ProductId);

    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createAssignmentForProductGroup = async (id, productId) => {
  try {
    const response = await axios.post(
      `${BaseURL}/productGroups/${id}/productAssignments`,
      {
        productId: productId,
      }
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteAssignmentForProductGroup = async (id, productId) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/productGroups/${id}/productAssignments/${productId}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
