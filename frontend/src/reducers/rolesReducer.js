import {
  ALL_ROLES_REQUEST,
  ALL_ROLES_SUCCESS,
  ALL_ROLES_FAIL,

  NEW_ROLE_REQUEST,
    NEW_ROLE_SUCCESS,
    NEW_ROLE_FAIL,
    NEW_ROLE_RESET,

  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_RESET,

  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  DELETE_ROLE_RESET,

  ROLE_DETAILS_REQUEST,
  ROLE_DETAILS_SUCCESS,
  ROLE_DETAILS_FAIL,

  CLEAR_ERRORS,
} from "../constants/rolesConstants";


export const newRoleReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_ROLE_REQUEST:
            return { loading: true };

        case NEW_ROLE_SUCCESS:
            return { loading: false, success: true, role: action.payload };

        case NEW_ROLE_FAIL:
            return { loading: false, error: action.payload };

        case NEW_ROLE_RESET:
            return {};

        default:
            return state;
    }
};

export const rolesReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ALL_ROLES_REQUEST:
      return { ...state, loading: true };

    case ALL_ROLES_SUCCESS:
      return { loading: false, roles: action.payload };

    case ALL_ROLES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const deleteRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_REQUEST:
      return { ...state, loading: true };

    case DELETE_ROLE_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };

    case DELETE_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_ROLE_RESET:
      return { ...state, isDeleted: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const updateRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST:
      return { ...state, loading: true };

    case UPDATE_ROLE_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };

    case UPDATE_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_ROLE_RESET:
      return { ...state, isUpdated: false };

    default:
      return state;
  }
};

export const roleDetailsReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case ROLE_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ROLE_DETAILS_SUCCESS:
      return { loading: false, role: action.payload };

    case ROLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
