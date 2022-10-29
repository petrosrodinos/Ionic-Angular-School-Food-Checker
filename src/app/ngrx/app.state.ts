import { AuthState } from './auth/auth.reducer';
import { FoodState } from './food/food.reducer';

export interface AppState {
  auth: AuthState;
  food: FoodState;
}
