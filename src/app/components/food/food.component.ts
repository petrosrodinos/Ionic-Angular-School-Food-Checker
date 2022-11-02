import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/types/food';
import { DateService } from 'src/app/services/date/date.service';
import { FoodService } from 'src/app/services/food/food.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  @Input() food: Food;
  public loading = false;
  public isAdmin = false;
  constructor(
    private dateService: DateService,
    public foodService: FoodService,
    public toastController: ToastService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    this.storage
      .get('user')
      .then((res) => {
        this.isAdmin = res?.admin || false;
      })
      .catch((err) => {
        this.isAdmin = false;
      });
  }

  getTime(date: Date) {
    return this.dateService.formatDate(date);
  }

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
