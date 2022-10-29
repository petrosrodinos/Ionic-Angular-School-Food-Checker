import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.auth;

export const selectLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading
);

export const getAuthState = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoggedIn
);
