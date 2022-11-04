import { NotificationService } from '../../services/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { Store } from '@ngrx/store';
import { FoodService } from 'src/app/services/food/food.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import {
  foodSelector,
  loadingSelector,
  errorSelector,
} from 'src/app/ngrx/food/food.selectors';
import { AppStateInterface } from 'src/app/ngrx/app.state';
import { getFoods } from 'src/app/ngrx/food/food.actions';
import { userSelector } from 'src/app/ngrx/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public foodSub: Subscription;
  public user$ = this.store.select(userSelector);
  public loading$ = this.store.select(loadingSelector);
  public allFoods$ = this.store.select(foodSelector);
  public error$ = this.store.select(errorSelector);

  constructor(
    private router: Router,
    private fireService: FireserviceService,
    public foodService: FoodService,
    public toastController: ToastService,
    public store: Store<AppStateInterface>,
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
  }

  async ngOnInit() {
    this.getFoods();
    this.notificationService.initPush();
    this.user$
      .subscribe((user) => {
        if (user.isLoggedIn) {
          this.analyticsService.setUser(user.uid);
        }
      })
      .unsubscribe();
  }

  getFoods() {
    try {
      this.store.dispatch(getFoods());
    } catch (err) {
      this.toastController.presentToast('danger', 'Could not fetch meals');
    }
  }

  refresh(ev: any) {
    this.getFoods();
    ev.target.complete();
  }

  deleteOldFoods() {
    this.foodService.deleteOldFoods();
  }

  ngOnDestroy() {
    if (this.foodSub) {
      this.foodSub.unsubscribe();
    }
  }
}
