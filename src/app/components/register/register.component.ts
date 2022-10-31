import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/ngrx/app.state';
import { authAction, logIn } from 'src/app/ngrx/auth/auth.actions';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public register: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  public username: string = '';
  public password: string = '';
  public email: string = '';
  public isloading = false;

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>,
    private analyticsService: AnalyticsService
  ) {}

  onSubmit(form: any) {
    this.isloading = true;
    this.fireService
      .signup({ email: this.email, password: this.password })
      .then(
        (res) => {
          if (res.user.uid) {
            this.analyticsService.setUser(res.user.uid);
            this.analyticsService.logEvent('sign_up', { user: res.user.uid });
            let data = {
              email: this.email,
              username: this.username,
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

  ngOnInit() {}
}
