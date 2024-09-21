import {createAction, props} from "@ngrx/store";

export const addItemToCartRequest = createAction("[Cart] Add Item to Cart Request", props<{reqData:any}>());
export const addItemToCartSuccess = createAction("[Cart] Add Item to Cart Success", props<{payload:any}>());
export const addItemToCartFailure = createAction("[Cart] Add Item to Cart Failure", props<{error:any}>());
export const getCartRequest = createAction("[Cart] Get Cart Request");
export const getCartSuccess = createAction("[Cart] Get Cart Success", props<{payload:any}>());
export const getCartFailure = createAction("[Cart] Get Cart Failure", props<{error:any}>());
export const removeCartItemRequest = createAction("[Cart] Remove Item From Cart Request", props<{reqData:any}>());
export const removeCartItemSuccess = createAction("[Cart] Remove Item From Cart Success", props<{cartItemId:any}>());
export const removeCartItemFailure = createAction("[Cart] Remove Item From Cart Failure", props<{error:any}>());
export const updateCartItemRequest = createAction("[Cart] Update Item From Cart Request", props<{reqData:any}>());
export const updateCartItemSuccess = createAction("[Cart] Update Item From Cart Success", props<{payload:any}>());
export const updateCartItemFailure = createAction("[Cart] Update Item From Cart Failure", props<{error:any}>());
export const removeWholeCartRequest = createAction("[Cart] Remove Whole Cart Request", props<{reqData:any}>());
export const removeWholeCartSuccess = createAction("[Cart] Remove Whole Cart Success", props<{payload:any}>());
export const removeWholeCartFailure = createAction("[Cart] Remove Whole Cart Failure", props<{error:any}>());
