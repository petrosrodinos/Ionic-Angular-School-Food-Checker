import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/ngrx/app.state';
import { logIn } from 'src/app/ngrx/auth/auth.actions';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public isloading = false;
  registerForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>,
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
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      username: this.username,
    });
  }

  onSubmit() {
    this.isloading = true;
    this.fireService
      .signup({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .then(
        (res) => {
          if (res.user.uid) {
            this.analyticsService.setUser(res.user.uid);
            this.analyticsService.logEvent('sign_up', { user: res.user.uid });
            let data = {
              email: this.registerForm.value.email,
              username: this.registerForm.value.username,
              uid: res.user.uid,
            };
            this.fireService.saveDetails(data).then(
              (res) => {
                this.store.dispatch(logIn());
                this.toastController.presentToast(
                  'success',
                  'User created successfully'
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

  ngOnDestroy() {
    this.registerForm.reset();
  }
}
