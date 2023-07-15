import Menu from "../models/menu.model";
import { BaseURL, Routes } from "../routes";

const { default: axios } = require("axios");

export const getMenus = async () => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.Menus}`);
    const mappedData = response.data.map(
      (element) => new Menu(element.id, element.name)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMenu = async (id) => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.Menus}/${id}`);
    return new Menu(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createMenu = async (name) => {
  try {
    const response = await axios.post(`${BaseURL}/${Routes.Menus}`, {
      name: name,
    });

    return new Menu(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putMenu = async (id, name) => {
  try {
    const response = await axios.put(`${BaseURL}/${Routes.Menus}/${id}`, {
      name: name,
    });

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(`${BaseURL}/${Routes.Menus}/${id}`);

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMenuGroupAssignments = async (id) => {
  try {
    const response = await axios.get(
      `${BaseURL}/${Routes.Menus}/${id}/${Routes.MenuGroupAssignments}`
    );
    const mappedData = response.data.map((element) => element.MenuGroupId);

    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createMenuGroupaAssignment = async (id, menuGroupId) => {
  try {
    const response = await axios.post(
      `${BaseURL}/${Routes.Menus}/${id}/${Routes.MenuGroupAssignments}`,
      {
        MenuGroupId: menuGroupId,
      }
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteMenuGroupAssignment = async (id, menuGroupId) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/${Routes.Menus}/${id}/${Routes.MenuGroupAssignments}/${menuGroupId}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
