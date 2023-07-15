import MenuGroup from "../models/menuGroup.model";
import { BaseURL, Routes } from "../routes";

const { default: axios } = require("axios");

export const getMenuGroups = async () => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.MenuGroups}`);
    const mappedData = response.data.map(
      (element) => new MenuGroup(element.id, element.name)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMenuGroup = async (id) => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.MenuGroups}/${id}`);
    return new MenuGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createMenuGroup = async (name) => {
  try {
    const response = await axios.post(`${BaseURL}/${Routes.MenuGroups}`, {
      name: name,
    });

    return new MenuGroup(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putMenuGroup = async (id, name) => {
  try {
    const response = await axios.put(`${BaseURL}/${Routes.MenuGroups}/${id}`, {
      name: name,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteMenuGroup = async (id) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/${Routes.MenuGroups}/${id}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
