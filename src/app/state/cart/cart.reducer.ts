import {createReducer, on} from "@ngrx/store";
import {
  addItemToCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  getCartFailure,
  getCartRequest,
  getCartSuccess,
  removeCartItemFailure,
  removeCartItemRequest,
  removeCartItemSuccess,
  removeWholeCartFailure,
  removeWholeCartSuccess,
  updateCartItemFailure,
  updateCartItemRequest,
  updateCartItemSuccess
} from "./cart.action";

export interface CartState {
  cartItems: any[],
  loading: boolean,
  error: any,
  cart: any
}

const initialState : CartState = {
  cartItems: [],
  loading: false,
  error: null,
  cart: null
}

export const cartReducer = createReducer(
  initialState,
  on(addItemToCartRequest, getCartRequest, removeCartItemRequest, updateCartItemRequest, removeCartItemRequest,(state) => ({...state, loading: true, error: null})),
  on(addItemToCartSuccess,(state, action) => ({...state, loading: false, error: null, cartItems: [...state.cartItems, action.payload]})),
  on(addItemToCartFailure, getCartFailure, removeCartItemFailure, updateCartItemFailure, removeWholeCartFailure, (state, action) => ({...state, loading: true, error: action.error})),
  on(getCartSuccess,(state, action) => ({...state, loading: false, error: null, cartItems: action.payload.cartItems, cart:action.payload})),
  on(removeCartItemSuccess,(state, action) => ({...state, loading: false, error: null, cartItems: state.cartItems.filter(item => item.id !== action.cartItemId)})),
  on(updateCartItemSuccess,(state, action) => ({...state, loading: false, error: null, cartItems: state.cartItems.map(item => item.id === action.payload.id ? action.payload : item)})),
  on(removeWholeCartSuccess, (state) => ({...state, loading: false, error:null, cartItems: []}))
)
