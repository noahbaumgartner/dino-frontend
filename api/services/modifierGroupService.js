import ModifierGroup from "../models/modifierGroup.model";
import Modifier from "../models/modifier.model";

const { default: axios } = require("axios");

const API_BASE_URL = "http://localhost:8000";
const ROUTE = "modifierGroups";

export const getModifierGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${ROUTE}`);
        const mappedData = response.data.map(
            (element) => new ModifierGroup(element.id, element.name)
        );
        return mappedData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getModifierGroup = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${ROUTE}/${id}`);

        return new ModifierGroup(response.data.id, response.data.name)
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const createModifierGroup = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${ROUTE}`, {
            name: name,
        });

        return new ModifierGroup(response.data.id, response.data.name);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const putModifierGroup = async (id, name) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${ROUTE}/${id}`, {
            name: name,
        });

        return true;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const deleteModifierGroup = async (id) => {
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

export const getModifiersForModifierGroup = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/${ROUTE}/${id}/modifiers`
        );
        const mappedData = response.data.map(
            (element) => new Modifier(element.id, element.name, element.priceDiff, element.modifierGroupId)
        );
        return mappedData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const createModifierForModifierGroup = async (modifierId, name, priceDiff) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${ROUTE}/${modifierId}/modifiers`,
            {
                name: name,
                priceDiff: priceDiff,
            }
        );
        return new Modifier(response.id, response.name, response.priceDiff, response.modifierGroupId);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const deleteModifierForModifierGroup = async (id, modifierId) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/${ROUTE}/${id}/modifiers/${modifierId}`
        );
        return true;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};