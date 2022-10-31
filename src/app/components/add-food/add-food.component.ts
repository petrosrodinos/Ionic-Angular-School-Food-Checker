import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { selectLoading } from 'src/app/ngrx/food/food.selectors';
import { FoodService } from 'src/app/services/food/food.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { FoodPhoto } from 'src/app/types/food';
import { DateService } from 'src/app/services/date/date.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { modalController } from '@ionic/core';
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
})
export class AddFoodComponent implements OnInit {
  // @Input() onAddFood: (food: Food) => void;

  addFoodForm = new FormGroup({
    firstplate: new FormControl(''),
    secondplate: new FormControl(''),
    description: new FormControl(''),
  });

  presentingElement = null;
  firstplate = '';
  secondplate = '';
  description = '';
  photo: FoodPhoto;
  loading = false;
  auth: boolean = false;

  constructor(
    public store: Store,
    private toastController: ToastService,
    public foodService: FoodService,
    private storage: StorageService,
    public photoService: PhotoService,
    private dateService: DateService,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    // this.store.select(selectLoading).subscribe((res) => {
    //   console.log(res);
    //   this.loading = res;
    // });
  }

  async openCamera(): Promise<void> {
    this.photo = await this.photoService.openCamera();
  }

  addFood(modal: any): void {
    if (this.dateService.canAddFood()) {
      this.analyticsService.logEvent('add_food_wrong_time', {
        time: this.dateService.formatTime(new Date()),
        date: this.dateService.formatDate(new Date()),
      });
      this.toastController.presentToast(
        'primary',
        'Restaurant is closed, you can not add food'
      );
      return;
    }
    this.loading = true;
    this.storage
      .get('user')
      .then((val: any) => {
        let food = {
          firstplate: this.firstplate,
          secondplate: this.secondplate,
          description: this.description,
          username: val.username,
          photo: this.photo,
        };
        this.foodService
          .addFood(food)
          .then((res) => {
            this.toastController.presentToast(
              'success',
              'Meal added successfully'
            );
            this.analyticsService.logEvent('add_food', { user: val.uid });
            this.resetFields(modal);
          })
          .catch((err) => {
            this.toastController.presentToast('primary', 'Could not add meal');
          })
          .finally(() => {
            this.loading = false;
          });
      })
      .catch((err) => {
        this.analyticsService.logEvent('add_food_no_auth', { user: 'no_auth' });
        this.toastController.presentToast(
          'primary',
          'Please log in to continue'
        );
      });
  }

  resetFields(modal: any) {
    this.firstplate = '';
    this.secondplate = '';
    this.description = '';
    this.photo = null;
    modal.dismiss();
  }
}
