import { createAction, props } from '@ngrx/store';

export const setUserState = createAction('[Auth] login success', props<any>());

export const logOut = createAction('[Auth] logout');
