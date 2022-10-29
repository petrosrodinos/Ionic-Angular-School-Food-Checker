import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { authAction, logIn } from 'src/app/ngrx/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  public phone: string = '';
  public password: string = '';

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>,
    private storage: StorageService
  ) {}

  onSubmit(form: any) {
    this.store.dispatch(authAction());
    this.fireService
      .loginWithEmail({ email: this.phone, password: this.password })
      .then(
        (res) => {
          if (res.user.uid) {
            this.fireService.getDetails({ uid: res.user.uid }).subscribe(
              (res) => {
                if (this.fireService.getUser()) {
                  this.store.dispatch(logIn());
                  this.storage.set('user', res);
                  this.toastController.presentToast(
                    'success',
                    'Welcome ' + res['username']
                  );
                  this.router.navigate(['/home']);
                }
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
      );
    this.store.dispatch(authAction());
  }

  ngOnInit() {}
}
