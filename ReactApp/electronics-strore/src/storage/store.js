import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart.slice';
import tokenReducer from './slices/token.slice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        token: tokenReducer,
    }
})