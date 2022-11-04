import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app.state';
import { UserStateInterface } from './auth.types';

export const authSelector = (state: AppStateInterface) => state.user;

export const isLoggedInSelector = createSelector(
  authSelector,
  (state: UserStateInterface) => state.isLoggedIn
);

export const userSelector = createSelector(
  authSelector,
  (state: UserStateInterface) => state
);

export const userIsAdminSelector = createSelector(
  authSelector,
  (state: UserStateInterface) => state.admin
);
