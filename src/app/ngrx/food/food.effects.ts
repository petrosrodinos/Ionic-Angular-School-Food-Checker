import { FoodService } from 'src/app/services/food/food.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as FoodActions from './food.actions';
import { Food } from 'src/app/types/food';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable()
export class FoodEffects {
  getFoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.getFoods),
      switchMap(() =>
        from(this.foodService.getFoods()).pipe(
          map((foods: Food[]) => {
            return FoodActions.getFoodsSuccess({ foods });
          }),
          catchError((error: any) => {
            return of(FoodActions.getFoodsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.addFood),
      switchMap((food: Food) =>
        from(this.foodService.addFood(food)).pipe(
          map(() => {
            return FoodActions.addFoodSuccess();
          }),
          catchError((error: any) => {
            return of(FoodActions.addFoodFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private foodService: FoodService) {}
}
