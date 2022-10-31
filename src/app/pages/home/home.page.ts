import { NotificationService } from '../../services/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food/food.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Food } from 'src/app/types/food';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public foodSub: Subscription;
  public isLoggedIn: boolean;
  public foods: Food[] = [];
  public loading = true;
  public isAdmin = false;
  // auth$: Observable<boolean>;

  constructor(
    private router: Router,
    private fireService: FireserviceService,
    public foodService: FoodService,
    public toastController: ToastService,
    public store: Store,
    public storageService: StorageService,
    public analyticsService: AnalyticsService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private notificationService: NotificationService
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    // this.auth$ = this.store.select(getAuthState);
  }

  async ngOnInit() {
    this.getFoods();
    this.notificationService.initPush();
    setTimeout(() => {
      let user = this.isUserLoggedIn();
      if (user) {
        this.isAdmin = environment.adminEmails.includes(user.email);
        this.analyticsService.setUser(user.uid);
      }
    }, 1000);
  }

  getFoods() {
    // return [];
    this.loading = true;
    this.foodSub = this.foodService.getFoods().subscribe(
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
  }

  refresh(ev: any) {
    this.getFoods();
    ev.target.complete();
  }

  login(): void {
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  logoutUser(): void {
    this.isAdmin = false;
    this.fireService.logout();
  }

  isUserLoggedIn(): any {
    return this.fireService.getUser();
  }

  deleteOldFoods() {
    this.foodService.deleteOldFoods();
  }

  ngOnDestroy() {
    this.foodSub.unsubscribe();
  }
}
