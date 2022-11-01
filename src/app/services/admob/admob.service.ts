import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdMobBannerSize,
} from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root',
})
export class AdmobService {
  constructor() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['testingdevice234'],
      initializeForTesting: true,
    });
  }

  async showBanner(): Promise<void> {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      console.log('Banner loaded');
    });

    const adId =
      Capacitor.getPlatform() === 'ios'
        ? environment.admob.ios
        : environment.admob.android;

    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
      // npa: true
    };
    AdMob.showBanner(options);
  }
}
