import {createAction, props} from "@ngrx/store";

export const getUserProfile = createAction('[User] Get User Profile');
export const getUserProfileSuccess = createAction('[User] Get User Profile Success', props<{userProfile : any}>());
export const getUserProfileFailure = createAction('[User] Get User Profile Success', props<{error : any}>());
export const logoutSuccess = createAction('[User] User Logout Success');
