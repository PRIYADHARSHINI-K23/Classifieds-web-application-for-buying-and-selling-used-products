import axios from "axios";
import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,

    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    CLEAR_ERRORS
} from "../constants/categoryConstants";


// Get all categories (public)
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });

        const { data } = await axios.get("/api/v1/categories");

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get all categories (ADMIN)
export const getAdminCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CATEGORY_REQUEST });

        const { data } = await axios.get("/api/v1/admin/categories", { withCredentials: true });

        dispatch({
            type: ADMIN_CATEGORY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ADMIN_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get Single Category
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/category/${id}`, { withCredentials: true });

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Create new category
export const createCategory = (formData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });

        const { data } = await axios.post(
            "/api/v1/admin/category/new",
            formData,
            { withCredentials: true }
        );

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Update Category
export const updateCategory = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const { data } = await axios.put(
            `/api/v1/admin/category/${id}`,
            formData,
            { withCredentials: true }
        );

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`, { withCredentials: true });

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
