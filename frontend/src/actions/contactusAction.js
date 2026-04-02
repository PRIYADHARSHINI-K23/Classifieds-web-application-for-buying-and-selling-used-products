import axios from "axios";

import {
    ALL_CONTACTUS_REQUEST,
    ALL_CONTACTUS_SUCCESS,
    ALL_CONTACTUS_FAIL,

    ADMIN_CONTACTUS_REQUEST,
    ADMIN_CONTACTUS_SUCCESS,
    ADMIN_CONTACTUS_FAIL,

    CONTACTUS_DETAILS_REQUEST,
    CONTACTUS_DETAILS_SUCCESS,
    CONTACTUS_DETAILS_FAIL,

    NEW_CONTACTUS_REQUEST,
    NEW_CONTACTUS_SUCCESS,
    NEW_CONTACTUS_RESET,
    NEW_CONTACTUS_FAIL,

    DELETE_CONTACTUS_REQUEST,
    DELETE_CONTACTUS_SUCCESS,
    DELETE_CONTACTUS_FAIL,

    CLEAR_ERRORS
} from "../constants/contactusConstants";


// Create new contact (Public)
export const createContact = (formData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CONTACTUS_REQUEST });

        const { data } = await axios.post("/api/v1/contactus/new", formData);

        dispatch({
            type: NEW_CONTACTUS_SUCCESS,
            payload: data,
        });
        // Do not reset immediately; let component display confirmation

    } catch (error) {
        dispatch({
            type: NEW_CONTACTUS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get all contact (Public)
export const getContactusList = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CONTACTUS_REQUEST });

        const { data } = await axios.get("/api/v1/contactus");

        dispatch({
            type: ALL_CONTACTUS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_CONTACTUS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get all contact (Admin)
export const getAdminContactus = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CONTACTUS_REQUEST });

        const { data } = await axios.get("/api/v1/admin/contactus");

        dispatch({
            type: ADMIN_CONTACTUS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ADMIN_CONTACTUS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get contact details (Admin)
export const getContactusDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CONTACTUS_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/contactus/${id}`);

        dispatch({
            type: CONTACTUS_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CONTACTUS_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Delete contact (Admin)
export const deleteContactus = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTACTUS_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/contactus/${id}`);

        dispatch({
            type: DELETE_CONTACTUS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: DELETE_CONTACTUS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
