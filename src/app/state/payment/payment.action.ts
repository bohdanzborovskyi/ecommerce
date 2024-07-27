import {createAction, props} from "@ngrx/store";

export const createPaymentRequest = createAction('[Payment] Create Payment Request', props<{orderId:any}>());
export const createPaymentSuccess = createAction('[Payment] Create Payment Success', props<{order:any}>());
export const createPaymentFailure = createAction('[Payment] Create Payment Failure', props<{error:any}>());
export const competePaymentRequest = createAction('[Payment] Complete Payment Request', props<{orderId:any}>());
export const competePaymentSuccess = createAction('[Payment] Complete Payment Success', props<{order:any}>());
export const competePaymentFailure = createAction('[Payment] Complete Payment Failure', props<{error:any}>());

