import {
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_RESET,

    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,

    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,

    CLEAR_ERRORS
} from "../constants/categoryConstants";


// -------------------------------------------
// CREATE NEW CATEGORY
// -------------------------------------------
export const newCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case NEW_CATEGORY_REQUEST:
            return { ...state, loading: true };

        case NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                category: action.payload.category,
            };

        case NEW_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case NEW_CATEGORY_RESET:
            return { ...state, success: false };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// GET ALL / ADMIN CATEGORIES
// -------------------------------------------
const categoriesInitialState = {
    loading: false,
    categories: [],
    error: null,
};

export const categoriesReducer = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
        case ADMIN_CATEGORY_REQUEST:
            return { ...state, loading: true, categories: [] };

        case ALL_CATEGORY_SUCCESS:
        case ADMIN_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };

        case ALL_CATEGORY_FAIL:
        case ADMIN_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// SINGLE CATEGORY DETAILS
// -------------------------------------------
export const categoryDetailsReducer = (
    state = { category: {} },
    action
) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true };

        case CATEGORY_DETAILS_SUCCESS:
            return {
                loading: false,
                category: action.payload.category,
            };

        case CATEGORY_DETAILS_FAIL:
            return {
                loading: false,
                category: {},
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// UPDATE CATEGORY
// -------------------------------------------
export const updateCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
            return { ...state, loading: true };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
            };

        case UPDATE_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_CATEGORY_RESET:
            return { ...state, isUpdated: false };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// DELETE CATEGORY
// -------------------------------------------
export const deleteCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return { ...state, loading: true };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
            };

        case DELETE_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case DELETE_CATEGORY_RESET:
            return { ...state, isDeleted: false };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};
