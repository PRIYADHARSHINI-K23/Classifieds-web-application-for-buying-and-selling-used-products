import {
    NEW_SUBCATEGORY_REQUEST,
    NEW_SUBCATEGORY_SUCCESS,
    NEW_SUBCATEGORY_FAIL,
    NEW_SUBCATEGORY_RESET,

    ALL_SUBCATEGORY_REQUEST,
    ALL_SUBCATEGORY_SUCCESS,
    ALL_SUBCATEGORY_FAIL,

    ADMIN_SUBCATEGORY_REQUEST,
    ADMIN_SUBCATEGORY_SUCCESS,
    ADMIN_SUBCATEGORY_FAIL,

    SUBCATEGORY_DETAILS_REQUEST,
    SUBCATEGORY_DETAILS_SUCCESS,
    SUBCATEGORY_DETAILS_FAIL,

    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAIL,
    UPDATE_SUBCATEGORY_RESET,

    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_RESET,

    CLEAR_ERRORS
} from "../constants/subCategoryConstants";

export const newSubCategoryReducer = (state = { subCategory: {} }, action) => {
    switch (action.type) {
        case NEW_SUBCATEGORY_REQUEST:
            return { ...state, loading: true };
        case NEW_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                subCategory: action.payload.subCategory,
            };
        case NEW_SUBCATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case NEW_SUBCATEGORY_RESET:
            return { ...state, success: false };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const subCategoriesReducer = (state = { subCategories: [] }, action) => {
    switch (action.type) {
        case ALL_SUBCATEGORY_REQUEST:
        case ADMIN_SUBCATEGORY_REQUEST:
            return { ...state, loading: true, subCategories: [] };
        case ALL_SUBCATEGORY_SUCCESS:
        case ADMIN_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                subCategories: action.payload.subCategories,
            };
        case ALL_SUBCATEGORY_FAIL:
        case ADMIN_SUBCATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const subCategoryDetailsReducer = (state = { subCategory: {} }, action) => {
    switch (action.type) {
        case SUBCATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true };
        case SUBCATEGORY_DETAILS_SUCCESS:
            return {
                loading: false,
                subCategory: action.payload.subCategory,
            };
        case SUBCATEGORY_DETAILS_FAIL:
            return {
                loading: false,
                subCategory: {},
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const subCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SUBCATEGORY_REQUEST:
        case DELETE_SUBCATEGORY_REQUEST:
            return { ...state, loading: true };
        case UPDATE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
            };
        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
            };
        case UPDATE_SUBCATEGORY_FAIL:
        case DELETE_SUBCATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_SUBCATEGORY_RESET:
            return { ...state, isUpdated: false };
        case DELETE_SUBCATEGORY_RESET:
            return { ...state, isDeleted: false };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};
