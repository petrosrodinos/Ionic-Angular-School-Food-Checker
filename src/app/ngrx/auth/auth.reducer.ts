import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { UserStateInterface } from './auth.types';

export const initialState: UserStateInterface = {
  uid: '',
  username: '',
  email: '',
  avatar: '',
  emailVerified: false,
  admin: false,
  isLoggedIn: false,
};

export const AuthReducers = createReducer(
  initialState,
  on(AuthActions.setUserState, (state, action: any) => ({
    ...state,
    ...action.user,
    isLoggedIn: true,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    ...initialState,
  }))
);
