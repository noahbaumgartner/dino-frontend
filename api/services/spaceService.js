import Space from "../models/space.model";
import { BaseURL, Routes } from "../routes";

const { default: axios } = require("axios");

export const getSpaces = async () => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.Spaces}`);
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
    const response = await axios.get(`${BaseURL}/${Routes.Spaces}/${id}`);
    return new Space(response.data.id, response.data.name, response.data.plan);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createSpace = async (name, plan) => {
  try {
    const response = await axios.post(`${BaseURL}/${Routes.Spaces}`, {
      name: name,
      plan: plan,
    });

    return new Space(response.data.id, response.data.name, response.data.plan);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putSpace = async (id, name, plan) => {
  try {
    const response = await axios.put(`${BaseURL}/${Routes.Spaces}/${id}`, {
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
    const response = await axios.patch(`${BaseURL}/${Routes.Spaces}/${id}`, {
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
    const response = await axios.patch(`${BaseURL}/${Routes.Spaces}/${id}`, {
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
    const response = await axios.delete(`${BaseURL}/${Routes.Spaces}/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
