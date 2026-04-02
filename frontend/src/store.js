import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentStatusReducer } from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';
import {
    newCategoryReducer,
    categoriesReducer,
    categoryDetailsReducer,
    updateCategoryReducer,
    deleteCategoryReducer,
} from "./reducers/categoryReducer";

import {
    newSubCategoryReducer,
    subCategoriesReducer,
    subCategoryDetailsReducer,
    subCategoryReducer,
} from "./reducers/subCategoryReducer";

import {
    newRoleReducer,
    rolesReducer,
    deleteRoleReducer,
    updateRoleReducer,
    roleDetailsReducer,
} from "./reducers/rolesReducer";

import {
    newContactusReducer,
    contactusListReducer,
    contactusDetailsReducer,
    deleteContactusReducer
} from "./reducers/contactusReducer";

import { sellerReducer, sellerProfileReducer, sellerStatsReducer } from './reducers/sellerReducer';

const reducer = combineReducers({
    seller: sellerReducer,
    sellerProfile: sellerProfileReducer,
    sellerStats: sellerStatsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: reviewReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    newCategory: newCategoryReducer,
    categoryDetails: categoryDetailsReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    subCategories: subCategoriesReducer,
    newSubCategory: newSubCategoryReducer,
    subCategoryDetails: subCategoryDetailsReducer,
    subCategory: subCategoryReducer,
    roles: rolesReducer,
    newRole: newRoleReducer,
    deleteRole: deleteRoleReducer,
    updateRole: updateRoleReducer,
    roleDetails: roleDetailsReducer,

    contacts: contactusListReducer,
    newContact: newContactusReducer,
    contactDetails: contactusDetailsReducer,
    deleteContact: deleteContactusReducer,

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems')
            ? JSON.parse(localStorage.getItem('saveForLaterItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;