import {createReducer, on} from "@ngrx/store";
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess, getOrderByIdFailure,
  getOrderByIdRequest,
  getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess
} from "./order.action";

export interface OrderState {
  orders: any[],
  order: any,
  error: any,
  loading: boolean
}

const initialState: OrderState = {
  orders:[],
  loading: false,
  order: null,
  error: null
}

export const orderReducer = createReducer(
  initialState,
  on(createOrderRequest, getOrderByIdRequest, getOrderHistoryRequest, state => ({...state, loading: true, error: null})),
  on(createOrderSuccess, (state, action) => ({...state, loading: false, error: null, order:action.order})),
  on(createOrderFailure, getOrderByIdFailure, getOrderHistoryFailure, (state, error) => ({...state, loading: false, error: error})),
  on(getOrderByIdSuccess, (state, action) => ({...state, loading: false, error: null, order:action.order})),
  on(getOrderHistorySuccess, (state, action) => ({...state, loading: false, error: null, orders:action.orders})),
)
