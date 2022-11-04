import { createReducer, on } from '@ngrx/store';
import {
  addFood,
  addFoodFailure,
  addFoodSuccess,
  getFoods,
  getFoodsFailure,
  getFoodsSuccess,
} from './food.actions';
import { FoodStateInterface } from './food.types';

export const initialState: FoodStateInterface = {
  loading: false,
  foods: [],
  error: '',
  status: '',
};

export const FoodReducers = createReducer(
  initialState,
  on(getFoods, (state) => ({ ...state, loading: true })),
  on(getFoodsSuccess, (state, { foods }) => ({
    ...state,
    foods,
    loading: false,
    error: '',
  })),
  on(getFoodsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(addFood, (state) => ({ ...state, loading: true })),
  on(addFoodSuccess, (state) => ({
    ...state,
    loading: false,
    error: '',
    status: 'success',
  })),
  on(addFoodFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    status: 'error',
  }))
);
