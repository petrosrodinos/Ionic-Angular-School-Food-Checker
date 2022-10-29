import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserviceService } from 'src/app/services/auth/fireservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/ngrx/app.state';
import { authAction, logIn } from 'src/app/ngrx/auth/auth.actions';
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
  public phone: string = '';
  public isLoading = false;

  constructor(
    public fireService: FireserviceService,
    private toastController: ToastService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  onSubmit(form: any) {
    this.store.dispatch(authAction());
    this.fireService
      .signup({ email: this.phone, password: this.password })
      .then(
        (res) => {
          if (res.user.uid) {
            let data = {
              email: this.phone,
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
                this.isLoading = false;
                this.router.navigate(['/home']);
              },
              (err) => {
                this.toastController.presentToast('primary', err.message);
                this.isLoading = false;
              }
            );
          }
        },
        (err) => {
          this.toastController.presentToast('primary', err.message);
          this.isLoading = false;
        }
      );
    this.store.dispatch(authAction());
  }

  ngOnInit() {}
}
