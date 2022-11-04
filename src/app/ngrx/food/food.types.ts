import { Food } from '../../types/food';

export interface FoodStateInterface {
  foods: Food[];
  loading: boolean;
  error: string;
  status: string;
}
