import {createReducer, on} from "@ngrx/store";
import {
  findProductsByCategoryFailure,
  findProductsByCategorySuccess,
  findProductsByIdFailure,
  findProductsByIdSuccess
} from "./product.action";

const initialState = {
  products:[],
  loading: false,
  error: null,
  product: null,
  productPages: 0
}

export const productReducer = createReducer(
  initialState,
  on(findProductsByCategorySuccess, (state, {payload}) => ({...state, loading: false, error: null, products: payload, productPages: payload.totalPages})),
  on(findProductsByIdSuccess, (state, {payload}) => ({...state, loading: false, error: null, product: payload, content:payload.content})),
  on(findProductsByCategoryFailure, findProductsByIdFailure, (state, {error}) => ({...state, loading: false, error: error})),
);
