import { 
    ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAIL,
    GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, GET_WISHLIST_FAIL
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        case GET_WISHLIST_REQUEST:
        case ADD_TO_WISHLIST_REQUEST:
        case REMOVE_FROM_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlistItems: payload,
            };
        case ADD_TO_WISHLIST_SUCCESS:
            const item = payload;
            const isItemExist = state.wishlistItems.find((i) => (i._id || i.product) === (item._id || item.product));

            if (isItemExist) {
                return {
                    ...state,
                    loading: false,
                    wishlistItems: state.wishlistItems.map((i) =>
                        (i._id || i.product) === (isItemExist._id || isItemExist.product) ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlistItems: state.wishlistItems.filter((i) => (i._id || i.product) !== payload),
            };
        case GET_WISHLIST_FAIL:
        case ADD_TO_WISHLIST_FAIL:
        case REMOVE_FROM_WISHLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}