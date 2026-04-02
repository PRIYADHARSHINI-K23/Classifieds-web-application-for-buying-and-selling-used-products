import axios from "axios";
import { 
    ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAIL,
    GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, GET_WISHLIST_FAIL
} from "../constants/wishlistConstants";

// Get Wishlist
export const getWishlist = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_WISHLIST_REQUEST });

        const { data } = await axios.get('/api/v1/wishlist', { withCredentials: true });

        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: data.wishlist,
        });

        localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_FAIL,
            payload: error.response?.data?.message || "Failed to load wishlist",
        });
    }
}

// Add To Wishlist
export const addToWishlist = (id, productData) => async (dispatch, getState) => {
    try {
        // OPTIMISTIC UPDATE: If productData is provided, update Redux immediately
        if (productData) {
            dispatch({
                type: ADD_TO_WISHLIST_SUCCESS,
                payload: {
                    ...productData,
                    product: id,
                    _id: id // Ensure both formats are supported
                },
            });
            localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
        }

        dispatch({ type: ADD_TO_WISHLIST_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post('/api/v1/wishlist/add', { productId: id }, config);

        // SYNC WITH SERVER: After server success, we know it's persistent
        if (data.success) {
            // Optional: You can re-dispatch getWishlist to get the absolute DB state
            // dispatch(getWishlist()); 
        }

    } catch (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAIL,
            payload: error.response?.data?.message || "Failed to add to wishlist",
        });
    }
}

// Remove From Wishlist
export const removeFromWishlist = (id) => async (dispatch, getState) => {
    try {
        // OPTIMISTIC UPDATE: Remove from Redux immediately
        dispatch({
            type: REMOVE_FROM_WISHLIST_SUCCESS,
            payload: id,
        });
        localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));

        dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });

        const { data } = await axios.delete(`/api/v1/wishlist/${id}`, { withCredentials: true });

        if (!data.success) {
            // If failed on server, we should ideally revert, but for now we'll just log
            console.error("Failed to remove from server wishlist");
        }

    } catch (error) {
        dispatch({
            type: REMOVE_FROM_WISHLIST_FAIL,
            payload: error.response?.data?.message || "Failed to remove from wishlist",
        });
    }
}