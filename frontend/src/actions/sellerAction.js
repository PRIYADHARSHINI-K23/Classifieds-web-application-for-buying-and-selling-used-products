import {
    LOGIN_SELLER_REQUEST,
    LOGIN_SELLER_SUCCESS,
    LOGIN_SELLER_FAIL,
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    LOAD_SELLER_REQUEST,
    LOAD_SELLER_SUCCESS,
    LOAD_SELLER_FAIL,
    LOGOUT_SELLER_SUCCESS,
    LOGOUT_SELLER_FAIL,
    SELLER_STATS_REQUEST,
    SELLER_STATS_SUCCESS,
    SELLER_STATS_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS,
} from "../constants/sellerConstants";
import axios from "axios";

// Login
export const loginSeller = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_SELLER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/seller/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SELLER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOGIN_SELLER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Register
export const registerSeller = (sellerData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_SELLER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/seller/register`,
            sellerData,
            config
        );

        dispatch({ type: REGISTER_SELLER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_SELLER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Load Seller
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_SELLER_REQUEST });

        // Access the protected route to get current seller from token
        const { data } = await axios.get(`/api/v1/seller/me`); // Note: Backend needs this route or similar logic

        dispatch({ type: LOAD_SELLER_SUCCESS, payload: data.seller });
    } catch (error) {
        dispatch({ type: LOAD_SELLER_FAIL, payload: error.response.data.message });
    }
};

// Logout
export const logoutSeller = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SELLER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_SELLER_FAIL, payload: error.response.data.message });
    }
};

// Get Seller Stats
export const getSellerStats = (id) => async (dispatch) => {
    try {
        dispatch({ type: SELLER_STATS_REQUEST });

        const { data } = await axios.get(`/api/v1/seller/${id}/stats`);

        dispatch({ type: SELLER_STATS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SELLER_STATS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Seller Profile
export const updateSeller = (id, sellerData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/seller/${id}`,
            sellerData,
            config
        );

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
