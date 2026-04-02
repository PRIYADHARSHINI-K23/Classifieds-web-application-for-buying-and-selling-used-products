import {
    NEW_CONTACTUS_REQUEST,
    NEW_CONTACTUS_SUCCESS,
    NEW_CONTACTUS_FAIL,
    NEW_CONTACTUS_RESET,

    ALL_CONTACTUS_REQUEST,
    ALL_CONTACTUS_SUCCESS,
    ALL_CONTACTUS_FAIL,

    ADMIN_CONTACTUS_REQUEST,
    ADMIN_CONTACTUS_SUCCESS,
    ADMIN_CONTACTUS_FAIL,

    CONTACTUS_DETAILS_REQUEST,
    CONTACTUS_DETAILS_SUCCESS,
    CONTACTUS_DETAILS_FAIL,

    DELETE_CONTACTUS_REQUEST,
    DELETE_CONTACTUS_SUCCESS,
    DELETE_CONTACTUS_FAIL,
    DELETE_CONTACTUS_RESET,

    CLEAR_ERRORS
} from "../constants/contactusConstants";


// -------------------------------------------
// CREATE NEW CONTACT (PUBLIC FORM)
// -------------------------------------------
export const newContactusReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_CONTACTUS_REQUEST:
            return { loading: true };

        case NEW_CONTACTUS_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                contact: action.payload.contact,
            };

        case NEW_CONTACTUS_FAIL:
            return { loading: false, error: action.payload };

        case NEW_CONTACTUS_RESET:
            return {};

        default:
            return state;
    }
};




// -------------------------------------------
// GET ALL CONTACTS (PUBLIC + ADMIN)
// -------------------------------------------
const contactusInitialState = {
    loading: false,
    contacts: [],
    error: null,
};

export const contactusListReducer = (state = contactusInitialState, action) => {
    switch (action.type) {
        case ALL_CONTACTUS_REQUEST:
        case ADMIN_CONTACTUS_REQUEST:
            return { ...state, loading: true, contacts: [] };

        case ALL_CONTACTUS_SUCCESS:
        case ADMIN_CONTACTUS_SUCCESS:
            return {
                ...state,
                loading: false,
                contacts: action.payload.contacts,
            };

        case ALL_CONTACTUS_FAIL:
        case ADMIN_CONTACTUS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// SINGLE CONTACT DETAILS (ADMIN)
// -------------------------------------------
export const contactusDetailsReducer = (
    state = { contact: {} },
    action
) => {
    switch (action.type) {
        case CONTACTUS_DETAILS_REQUEST:
            return { ...state, loading: true };

        case CONTACTUS_DETAILS_SUCCESS:
            return {
                loading: false,
                contact: action.payload.contact,
            };

        case CONTACTUS_DETAILS_FAIL:
            return {
                loading: false,
                contact: {},
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};


// -------------------------------------------
// DELETE CONTACT (ADMIN)
// -------------------------------------------
export const deleteContactusReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CONTACTUS_REQUEST:
            return { ...state, loading: true };

        case DELETE_CONTACTUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
            };

        case DELETE_CONTACTUS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case DELETE_CONTACTUS_RESET:
            return { ...state, isDeleted: false };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};
