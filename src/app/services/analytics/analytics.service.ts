import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { environment } from '../../../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  analyticsEnabled = true;
  constructor(private router: Router) {
    this.initFirebase();
    this.router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.setScreenName(e.url);
      });
  }

  async initFirebase() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebase);
    }
  }

  setUser(userId: string) {
    FirebaseAnalytics.setUserId({
      userId: userId,
    });
  }

  setProperty(name: string, value: string) {
    FirebaseAnalytics.setUserProperty({
      name,
      value,
    });
  }

  logEvent(name: string, params = {}) {
    FirebaseAnalytics.logEvent({
      name: name,
      params,
    });
  }

  setScreenName(screenName: string) {
    FirebaseAnalytics.setScreenName({
      screenName,
    });
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });
  }
}
