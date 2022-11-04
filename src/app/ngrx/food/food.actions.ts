import { createAction, props } from '@ngrx/store';
import { Food } from '../../types/food';

export const getFoods = createAction('[Food] get foods');

export const getFoodsSuccess = createAction(
  '[Food] get foods success',
  props<{ foods: Food[] }>()
);

export const getFoodsFailure = createAction(
  '[Food] get foods failure',
  props<{ error: string }>()
);

export const addFood = createAction('[Food] add food', props<Food>());

export const addFoodSuccess = createAction('[Food] add food success');

export const addFoodFailure = createAction(
  '[Food] add food failure',
  props<{ error: string }>()
);
