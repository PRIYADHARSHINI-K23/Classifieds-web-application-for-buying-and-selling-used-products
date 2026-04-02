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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    SELLER_STATS_REQUEST,
    SELLER_STATS_SUCCESS,
    SELLER_STATS_FAIL,
    CLEAR_ERRORS,
} from "../constants/sellerConstants";

export const sellerReducer = (state = { seller: {} }, action) => {
    switch (action.type) {
        case LOGIN_SELLER_REQUEST:
        case REGISTER_SELLER_REQUEST:
        case LOAD_SELLER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SELLER_SUCCESS:
        case REGISTER_SELLER_SUCCESS:
        case LOAD_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: !!action.payload,
                seller: action.payload,
            };

        case LOGOUT_SELLER_SUCCESS:
            return {
                loading: false,
                seller: null,
                isAuthenticated: false,
            };

        case LOGIN_SELLER_FAIL:
        case REGISTER_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                seller: null,
                error: action.payload,
            };

        case LOAD_SELLER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                seller: null,
                error: action.payload,
            };

        case LOGOUT_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const sellerProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true, // Only this simpler flag is needed usually
            };

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const sellerStatsReducer = (state = { stats: {} }, action) => {
    switch (action.type) {
        case SELLER_STATS_REQUEST:
            return {
                loading: true,
            };

        case SELLER_STATS_SUCCESS:
            return {
                loading: false,
                stats: action.payload,
            };

        case SELLER_STATS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
