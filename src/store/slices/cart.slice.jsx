import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action)=>{
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => { //el thunk no se ejecuta solo toca despacharlo.
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig()) //Este getConfig es porque es protegido con un token
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCartThunk = (productCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart",
                 productCart,
                 getConfig()
             )
                .then(() => dispatch(getCartThunk()))
                .catch(error => console.log(error.response))
                .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", 
                       {}, 
                       getConfig()
                       )
                .then(() => dispatch(setCart([])))
                .catch(error => console.log(error.response))
                .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
