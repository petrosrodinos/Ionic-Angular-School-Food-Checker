import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { authAction, logIn } from 'src/app/ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public email: string = '';
  public password: string = '';
  public isloading = false;

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>,
    private storage: StorageService,
    private analyticsService: AnalyticsService
  ) {}

  onSubmit(form: any) {
    this.isloading = true;
    this.fireService
      .loginWithEmail({ email: this.email, password: this.password })
      .then(
        (res) => {
          if (res.user.uid) {
            this.analyticsService.setUser(res.user.uid);
            this.analyticsService.logEvent('login', {
              user: res.user.uid,
            });

            this.fireService.getDetails({ uid: res.user.uid }).subscribe(
              (res) => {
                this.store.dispatch(logIn());
                this.storage.set('user', res);
                this.toastController.presentToast(
                  'success',
                  'Welcome ' + res['username']
                );
                this.router.navigate(['/home']);
              },
              (err) => {
                this.toastController.presentToast('primary', err.message);
              }
            );
          }
        },
        (err) => {
          this.toastController.presentToast('primary', err.message);
        }
      )
      .finally(() => {
        this.isloading = false;
      });
  }

  ngOnInit() {}
}
