import {createAction, props} from "@ngrx/store";

export const findProductsByCategory = createAction("[Product] Find Products By Category");
export const findProductsByCategorySuccess = createAction("[Product] Find Products By Category Success", props<{ payload: any }>());
export const findProductsByCategoryFailure = createAction("[Product] Find Products By Category Failure", props<{ error: any }>());
export const findProductsById = createAction("[Product] Find Products By Id");
export const findProductsByIdSuccess = createAction("[Product] Find Products By Id Success", props<{ payload: any }>());
export const findProductsByIdFailure = createAction("[Product] Find Products By Id Failure", props<{ error: any }>());
