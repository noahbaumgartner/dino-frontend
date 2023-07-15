import { BaseURL, Routes } from "../routes";

const { default: axios } = require("axios");

export const exportDatabase = async () => {
  try {
    const response = await axios.get(
      `${BaseURL}/${Routes.Database}/${Routes.Export}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "dino.db");
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const importDatabase = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const response = await axios.post(
      `${BaseURL}/${Routes.Database}/${Routes.Import}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
