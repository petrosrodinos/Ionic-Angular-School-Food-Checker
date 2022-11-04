import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app.state';
import { FoodStateInterface } from './food.types';

export const FoodSelector = (state: AppStateInterface) => state.food;

export const loadingSelector = createSelector(
  FoodSelector,
  (state: FoodStateInterface) => state.loading
);

export const foodSelector = createSelector(
  FoodSelector,
  (state: FoodStateInterface) => state.foods
);

export const errorSelector = createSelector(
  FoodSelector,
  (state: FoodStateInterface) => state.error
);

export const statusSelector = createSelector(
  FoodSelector,
  (state: FoodStateInterface) => state.status
);
