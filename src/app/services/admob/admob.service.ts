import { Injectable } from '@angular/core';
import { AdMob } from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root',
})
export class AdmobService {
  constructor() {}

  async initialize(): Promise<void> {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
  }
}
