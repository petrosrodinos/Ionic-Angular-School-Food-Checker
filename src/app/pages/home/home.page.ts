import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food/food.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Food } from 'src/app/types/food';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public isLoggedIn: boolean;
  public foods: Food[] = [];
  public loading = false;
  public isAdmin = false;
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

  async ngOnInit() {
    this.getFoods();
    // this.storageService.get('user').then((user) => {
    //   if (user) {
    //     this.isAdmin = user?.admin || false;
    //   }
    // });
  }

  async getFoods() {
    // return [];
    // return (this.foods = this.data.getMessages());
    this.loading = true;
    this.foodService.getFoods().subscribe(
      (res: any[]) => {
        this.foods = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.toastController.presentToast('danger', 'Could not fetch meals');
        this.loading = false;
      }
    );
    this.loading = false;
  }

  refresh(ev: any) {
    this.getFoods();
    ev.target.complete();
  }

  login(): void {
    this.router.navigateByUrl('/auth/login');
  }

  logoutUser(): void {
    this.fireService.logout();
  }

  isUserLoggedIn(): boolean {
    return !!this.fireService.getUser();
  }
}
