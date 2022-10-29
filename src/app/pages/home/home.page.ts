import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food/food.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Food } from 'src/app/types/food';
import { getAuthState } from 'src/app/ngrx/auth/auth.selectors';
import { logOut } from 'src/app/ngrx/auth/auth.actions';
import { addFoodAction } from 'src/app/ngrx/food/food.actions';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isLoggedIn: boolean;
  public foods: Food[] = [];
  public loading = false;
  // auth$: Observable<boolean>;

  constructor(
    private data: DataService,
    private router: Router,
    private fireService: FireserviceService,
    public foodService: FoodService,
    public toastController: ToastService,
    public store: Store,
    public storageService: StorageService
  ) {
    // this.auth$ = this.store.select(getAuthState);
  }

  ngOnInit() {
    this.store.select(getAuthState).subscribe((res) => (this.isLoggedIn = res));
    this.getFoods();
  }

  async getFoods() {
    // return [];
    // return (this.foods = this.data.getMessages());
    this.loading = true;
    this.foodService.getFoods().subscribe(
      (res: any[]) => {
        this.foods = res;
      },
      (err: any) => {
        console.log(err);
        this.toastController.presentToast('danger', 'Could not fetch meals');
        this.loading = false;
      }
    );
    this.loading = false;
  }

  // deleteFood(id: string): void {
  //   this.loading = true;
  //   this.foodService.deleteFood(id).then(
  //     (res) => {
  //       this.toastController.presentToast('success', 'Meal deleted');
  //     },
  //     (err) => {
  //       this.toastController.presentToast('primary', 'Could not delete meal');
  //       this.loading = false;
  //     }
  //   );
  //   this.loading = false;
  // }

  refresh(ev: any) {
    this.getFoods();
    ev.target.complete();
  }

  login(): void {
    this.router.navigateByUrl('/auth/login');
  }

  async logoutUser(): Promise<void> {
    this.store.dispatch(logOut());
    this.fireService.logout();
    this.storageService.clear();
    this.router.navigateByUrl('/home');
  }

  isUserLoggedIn(): boolean {
    return !!this.fireService.getUser();
  }
}
