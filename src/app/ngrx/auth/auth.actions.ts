import { createAction, props } from '@ngrx/store';

export const authAction = createAction(
  '[Auth Page] Auth',
  props<{ loadingValue: boolean }>
);

export const logOut = createAction('[Auth Page] logout');

export const logIn = createAction('[Auth Page] login');
