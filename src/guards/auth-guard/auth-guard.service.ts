import { FireserviceService } from '../../app/services/auth/fireservice.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppStateInterface } from 'src/app/ngrx/app.state';
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/ngrx/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  public user$ = this.store.select(userSelector);
  constructor(
    public auth: FireserviceService,
    public router: Router,
    public store: Store<AppStateInterface>
  ) {}

  canActivate(): boolean {
    this.user$
      .subscribe((user) => {
        if (user.isLoggedIn) {
          this.router.navigate(['home']);
          return false;
        } else {
          return true;
        }
      })
      .unsubscribe();
    return true;
  }
}
