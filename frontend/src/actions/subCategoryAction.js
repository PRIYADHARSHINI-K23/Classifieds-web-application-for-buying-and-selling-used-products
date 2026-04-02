import axios from "axios";
import {
    ALL_SUBCATEGORY_REQUEST,
    ALL_SUBCATEGORY_SUCCESS,
    ALL_SUBCATEGORY_FAIL,

    ADMIN_SUBCATEGORY_REQUEST,
    ADMIN_SUBCATEGORY_SUCCESS,
    ADMIN_SUBCATEGORY_FAIL,

    SUBCATEGORY_DETAILS_REQUEST,
    SUBCATEGORY_DETAILS_SUCCESS,
    SUBCATEGORY_DETAILS_FAIL,

    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_FAIL,

    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAIL,

    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,

    CLEAR_ERRORS
} from "../constants/subCategoryConstants";

// Get all subcategories
export const getSubCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUBCATEGORY_REQUEST });
        const { data } = await axios.get("/api/v1/subcategories");
        dispatch({
            type: ALL_SUBCATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get all subcategories (ADMIN)
export const getAdminSubCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SUBCATEGORY_REQUEST });
        const { data } = await axios.get("/api/v1/subcategories"); // Same endpoint since it's common
        dispatch({
            type: ADMIN_SUBCATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Single SubCategory details
export const getSubCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUBCATEGORY_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/subcategory/${id}`);
        dispatch({
            type: SUBCATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SUBCATEGORY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create SubCategory
export const createSubCategory = (formData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SUBCATEGORY_REQUEST });
        const { data } = await axios.post("/api/v1/admin/subcategory/new", formData);
        dispatch({
            type: NEW_SUBCATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update SubCategory
export const updateSubCategory = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
        const { data } = await axios.put(`/api/v1/admin/subcategory/${id}`, formData);
        dispatch({
            type: UPDATE_SUBCATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete SubCategory
export const deleteSubCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/subcategory/${id}`);
        dispatch({
            type: DELETE_SUBCATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_SUBCATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
