import { createReducer, on } from '@ngrx/store';
import { authAction, logIn, logOut } from './auth.actions';

export interface AuthState {
  loading: boolean;
  user: null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  loading: false,
  user: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(authAction, (state: AuthState) => ({
    ...state,
    loading: !state.loading,
  })),
  on(logIn, (state: AuthState) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(logOut, (state: AuthState) => ({
    ...state,
    isLoggedIn: false,
    user: null,
  }))
);
