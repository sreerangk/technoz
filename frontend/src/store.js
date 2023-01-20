import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"

import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userDetailsReducer, userListReducer, userLoginReducer,userRegisterReducer, userUpdateProfileReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducer'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderlistMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'
import { productTopRatedReducer } from './actions/productActions'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,


    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderlistMyReducer,
    orderList:orderListReducer,
    orderDeliver: orderDeliverReducer,
  
})



const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const usreInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: usreInfoFromStorage },

}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store