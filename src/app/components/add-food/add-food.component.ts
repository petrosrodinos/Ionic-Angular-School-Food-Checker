import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FoodService } from 'src/app/services/food/food.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { Food, FoodPhoto } from 'src/app/types/food';
import { DateService } from 'src/app/services/date/date.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { ValidatorsService } from 'src/app/utils/validators/validators.service';
import { userSelector } from 'src/app/ngrx/auth/auth.selectors';
import { AppStateInterface } from 'src/app/ngrx/app.state';
import { addFood } from 'src/app/ngrx/food/food.actions';
import {
  loadingSelector,
  statusSelector,
} from 'src/app/ngrx/food/food.selectors';
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
})
export class AddFoodComponent implements OnInit, OnDestroy {
  // @Input() onAddFood: (food: Food) => void;

  presentingElement = null;
  foodForm: FormGroup;
  firstplate: FormControl;
  secondplate: FormControl;
  dessert: FormControl;
  description: FormControl;
  photo: FoodPhoto;
  auth: any;
  user$ = this.store.select(userSelector);
  isLoading$ = this.store.select(loadingSelector);
  status$ = this.store.select(statusSelector);
  modal: any;

  constructor(
    public store: Store<AppStateInterface>,
    private toastController: ToastService,
    public foodService: FoodService,
    public photoService: PhotoService,
    private dateService: DateService,
    private analyticsService: AnalyticsService,
    private validatorsService: ValidatorsService
  ) {
    this.user$
      .subscribe((user) => {
        this.auth = user;
      })
      .unsubscribe();

    this.status$.subscribe((status) => {
      console.log(status);
      if (status === 'success') {
        this.toastController.presentToast('success', 'Food added successfully');
        this.analyticsService.logEvent('add_food', { user: this.auth.uid });
        this.resetFields();
      } else if (status === 'error') {
        this.toastController.presentToast('error', 'Error adding food');
      }
    });
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstplate = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      this.validatorsService.specialCharactersValidator,
    ]);
    this.secondplate = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      this.validatorsService.specialCharactersValidator,
    ]);
    this.dessert = new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(30),
      this.validatorsService.specialCharactersValidator,
    ]);
    this.description = new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(100),
      this.validatorsService.specialCharactersValidator,
    ]);
  }

  createForm() {
    this.foodForm = new FormGroup({
      firstplate: this.firstplate,
      secondplate: this.secondplate,
      dessert: this.dessert,
      description: this.description,
    });
  }

  async openCamera(): Promise<void> {
    this.photo = await this.photoService.openCamera();
  }

  addFood(modal: any): void {
    if (!this.auth.isLoggedIn) {
      this.toastController.presentToast('primary', 'Please log in to continue');
      this.analyticsService.logEvent('add_food_no_auth', { user: 'no_auth' });
      return;
    }
    if (!this.dateService.canAddFood()) {
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
    this.modal = modal;
    let food: Food = {
      ...this.foodForm.value,
      username: this.auth.username,
      photo: this.photo,
    };
    this.store.dispatch(addFood(food));
    // this.loading = true;

    // .then((val: any) => {
    // let food = {
    //   ...this.foodForm.value,
    //   username: val.username,
    //   photo: this.photo,
    // };
    //   this.foodService
    //     .addFood(food)
    //     .then((res) => {
    // this.toastController.presentToast(
    //   'success',
    //   'Meal added successfully'
    // );
    //       this.analyticsService.logEvent('add_food', { user: val.uid });
    //       this.resetFields(modal);
    //     })
    //     .catch((err) => {
    //       this.toastController.presentToast('primary', 'Could not add meal');
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // })
    // .catch((err) => {
    //   this.analyticsService.logEvent('add_food_no_auth', { user: 'no_auth' });
    //   this.toastController.presentToast(
    //     'primary',
    //     'Please log in to continue'
    //   );
    // })
    // .finally(() => {
    //   this.loading = false;
    // });
  }

  resetFields() {
    this.foodForm?.reset();
    this.modal?.dismiss?.();
  }

  ngOnDestroy() {
    this.presentingElement = null;
  }
}
