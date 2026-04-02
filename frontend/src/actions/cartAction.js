import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, SET_CART } from "../constants/cartConstants";
import { mockProducts } from "../utils/mockData";

// add to cart
export const addItemsToCart = (id, quantity = 1, productData = null) => async (dispatch, getState) => {
    try {
        // 1. Prepare Cart Item Data
        let cartItem = {};

        if (productData) {
            cartItem = {
                product: productData._id || productData.id,
                name: productData.name,
                category: productData.category || "",
                seller: productData.brand?.name || "",
                price: productData.price,
                cuttedPrice: productData.cuttedPrice,
                image: (productData.images && productData.images.length > 0) 
                    ? (typeof productData.images[0] === 'object' ? (productData.images[0].url || "") : productData.images[0]) 
                    : "",
                stock: productData.stock,
                subCategoryType: productData.subCategoryType,
                prescriptionUrl: productData.prescriptionUrl,
                quantity,
            };
        } else {
            // Check if item exists in current state (Redux)
            const { cart: { cartItems } } = getState();
            const existingItem = cartItems.find(i => i.product === id);

            if (existingItem) {
                cartItem = {
                    ...existingItem,
                    quantity,
                };
            } else {
                // Fallback to mock if no data passed (legacy support)
                let product = mockProducts.find(p => p._id === id);
                if (product) {
                    cartItem = {
                        product: product._id || product.id,
                        name: product.name,
                        category: product.category || "",
                        seller: (product.brand && product.brand.name) ? product.brand.name : "",
                        price: product.price,
                        cuttedPrice: product.cuttedPrice,
                        image: (product.images && product.images.length > 0) ? (product.images[0].url || product.images[0]) : "",
                        stock: product.stock,
                        subCategoryType: product.subCategoryType,
                        prescriptionUrl: product.prescriptionUrl,
                        quantity,
                    };
                }
            }
        }

        // 2. OPTIMISTIC UPDATE: Dispatch to Redux immediately for instant UI feedback
        if (cartItem.product) {
            dispatch({
                type: ADD_TO_CART,
                payload: cartItem,
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }

        // 3. SERVER SYNC: If authenticated, sync with backend
        const { isAuthenticated } = getState().user;
        if (isAuthenticated) {
            const { data } = await axios.post('/api/v1/cart/add', { productId: id, quantity }, { withCredentials: true });

            // Reconcile with server state (Optional: only if we trust server more or need calculated fields)
            const serverCart = data.cart;
            const cartItems = serverCart.cartItems.map(ci => ({
                product: ci.product ? (ci.product._id || ci.product) : ci.product,
                name: ci.name,
                category: ci.category || (ci.product && ci.product.category) || "",
                seller: ci.seller || "",
                price: ci.price,
                cuttedPrice: ci.cuttedPrice || ci.price,
                image: typeof ci.image === 'object' && ci.image ? (ci.image.url || '') : (ci.image || ''),
                stock: ci.stock || 0,
                subCategoryType: (ci.product && ci.product.subCategoryType) || "",
                prescriptionUrl: ci.prescriptionUrl,
                quantity: ci.quantity,
            }));

            dispatch({ type: SET_CART, payload: { cartItems } });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
        // Note: In a production app, we might want to revert the optimistic update here if it fails
    }
}

// fetch cart from server
export const fetchCart = () => async (dispatch, getState) => {
    try {
        const { isAuthenticated } = getState().user;
        if (!isAuthenticated) return;

        const { data } = await axios.get('/api/v1/cart', { withCredentials: true });
        const serverCart = data.cart;

        const cartItems = serverCart.cartItems.map(ci => ({
            product: ci.product ? (ci.product._id || ci.product) : ci.product,
            name: ci.name,
            category: ci.category || (ci.product && ci.product.category) || "",
            seller: ci.seller || "",
            price: ci.price,
            cuttedPrice: ci.cuttedPrice || ci.price,
            image: typeof ci.image === 'object' && ci.image ? (ci.image.url || '') : (ci.image || ''),
            stock: ci.stock || 0,
            subCategoryType: (ci.product && ci.product.subCategoryType) || "",
            prescriptionUrl: ci.prescriptionUrl,
            quantity: ci.quantity,
        }));

        dispatch({ type: SET_CART, payload: { cartItems } });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}
