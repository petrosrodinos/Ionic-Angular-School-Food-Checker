import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FoodState } from './food.reducer';

export const selectAuth = (state: AppState) => state.auth;

export const selectLoading = createSelector(
  selectAuth,
  (state: FoodState) => state.loading
);
