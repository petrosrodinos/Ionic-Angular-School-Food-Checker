import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { NgTemplateOutlet } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public isloading = false;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  public loginSub: Subscription;

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>,
    private storage: StorageService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*'),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    this.isloading = true;
    this.fireService
      .loginWithEmail({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .then(
        (res) => {
          if (res.user.uid) {
            this.analyticsService.setUser(res.user.uid);
            this.analyticsService.logEvent('login', {
              user: res.user.uid,
            });

            this.loginSub = this.fireService
              .getDetails({ uid: res.user.uid })
              .subscribe(
                (res) => {
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
        this.loginForm.reset();
      });
  }

  ngOnDestroy() {
    this.loginForm.reset();
    this.loginSub.unsubscribe();
  }
}
