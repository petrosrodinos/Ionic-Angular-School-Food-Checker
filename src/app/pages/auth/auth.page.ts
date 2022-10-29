import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { selectLoading } from 'src/app/ngrx/auth/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isloading = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(selectLoading)
      .subscribe((data) => (this.isloading = data));
  }
}
