import {createReducer, on} from "@ngrx/store";
import {getUserProfile, getUserProfileFailure, getUserProfileSuccess, logoutSuccess} from "./user.actions";

const initialState = {
  userProfile:null,
  error:null
}

export const userReducer = createReducer(
  initialState,
  on(getUserProfile, (state) => ({...state, loading: true, error: null})),
  on(getUserProfileSuccess, (state, {userProfile}) => ({...state, loading: false, error: null, userProfile: userProfile})),
  on(getUserProfileFailure, (state, {error}) => ({...state, loading: true, error: error})),
  on(logoutSuccess, () => initialState)

)
