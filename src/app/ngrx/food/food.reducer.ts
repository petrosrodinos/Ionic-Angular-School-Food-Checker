import { createReducer, on } from '@ngrx/store';
import { addFoodAction } from './food.actions';

export interface FoodState {
  loading: boolean;
}

export const initialState: FoodState = {
  loading: false,
};

export const counterReducer = createReducer(
  initialState,
  on(addFoodAction, (state) => ({ ...state, loading: !state.loading }))
);
