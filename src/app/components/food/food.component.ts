import { userIsAdminSelector } from 'src/app/ngrx/auth/auth.selectors';
import { AppStateInterface } from 'src/app/ngrx/app.state';
import { Component, Input } from '@angular/core';
import { Food } from 'src/app/types/food';
import { FoodService } from 'src/app/services/food/food.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  @Input() food: Food;
  public loading = false;
  public isAdmin = false;
  public userIsAdmin$ = this.store.select(userIsAdminSelector);
  constructor(
    public foodService: FoodService,
    public toastController: ToastService,
    public store: Store<AppStateInterface>
  ) {}

  deleteFood(id: string): void {
    this.loading = true;
    this.foodService.deleteFood(id).then(
      (res) => {
        this.toastController.presentToast('success', 'Meal deleted');
      },
      (err) => {
        this.toastController.presentToast('primary', 'Could not delete meal');
        this.loading = false;
      }
    );
    this.loading = false;
  }
}
