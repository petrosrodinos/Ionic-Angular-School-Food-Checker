import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getAuthState } from 'src/app/ngrx/auth/auth.selectors';
import { ToastService } from 'src/app/services/toast/toast.service';
import { selectLoading } from 'src/app/ngrx/food/food.selectors';
import { FoodService } from 'src/app/services/food/food.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { FoodPhoto } from 'src/app/types/food';
import { DateService } from 'src/app/services/date/date.service';
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
  loading: boolean;
  auth: boolean = false;

  constructor(
    public store: Store,
    private toastController: ToastService,
    public foodService: FoodService,
    private storage: StorageService,
    public photoService: PhotoService,
    private dateService: DateService
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

  addFood(): void {
    this.loading = true;
    if (!this.dateService.canAddFood()) {
      this.toastController.presentToast(
        'primary',
        'Restaurant is closed, you can not add food'
      );
      return;
    }
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
            this.loading = false;
            this.toastController.presentToast(
              'success',
              'Meal added successfully'
            );
            this.resetFields();
          })
          .catch((err) => {
            this.loading = false;
            this.toastController.presentToast('primary', 'Could not add meal');
          });
      })
      .catch((err) => {
        this.toastController.presentToast(
          'primary',
          'Please log in to continue 2s'
        );
      });
    this.loading = false;
  }

  resetFields() {
    this.firstplate = '';
    this.secondplate = '';
    this.description = '';
    this.photo = null;
  }
}
