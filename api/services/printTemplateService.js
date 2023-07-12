import PrintTemplate from "../models/printTemplate.model";
import { BaseURL, Routes } from "../routes";

const { default: axios } = require("axios");

export const getPrintTemplates = async () => {
  try {
    const response = await axios.get(`${BaseURL}/${Routes.PrintTemplates}`);
    const mappedData = response.data.map(
      (element) => new PrintTemplate(element.id, element.name, element.plan)
    );
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPrintTemplate = async (id) => {
  try {
    const response = await axios.get(
      `${BaseURL}/${Routes.PrintTemplates}/${id}`
    );
    return new PrintTemplate(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createPrintTemplate = async (name) => {
  try {
    const response = await axios.post(`${BaseURL}/${Routes.PrintTemplates}`, {
      name: name,
    });

    return new PrintTemplate(response.data.id, response.data.name);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const putPrintTemplate = async (id, name) => {
  try {
    const response = await axios.put(
      `${BaseURL}/${Routes.PrintTemplates}/${id}`,
      {
        name: name,
      }
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deletePrintTemplate = async (id) => {
  try {
    const response = await axios.delete(
      `${BaseURL}/${Routes.PrintTemplates}/${id}`
    );

    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
