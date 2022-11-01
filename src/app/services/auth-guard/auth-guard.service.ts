import { FireserviceService } from './../auth/fireservice.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: FireserviceService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.getUser()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
