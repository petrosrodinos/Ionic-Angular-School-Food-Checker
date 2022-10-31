import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private router: Router, platform: Platform) {}

  initPush() {
    console.log(Capacitor.getPlatform());
    if (Capacitor.getPlatform() !== 'web') {
      this.registerNotifications();
    }
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      return;
    }

    await PushNotifications.register();

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification) => {
        const data = notification.notification.data;
        this.router.navigateByUrl(`/home`);
      }
    );
  }
}
