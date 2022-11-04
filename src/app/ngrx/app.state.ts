import { UserStateInterface } from './auth/auth.types';
import { FoodStateInterface } from './food/food.types';

export interface AppStateInterface {
  user: UserStateInterface;
  food: FoodStateInterface;
}
