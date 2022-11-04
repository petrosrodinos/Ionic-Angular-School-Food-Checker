import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { auth } from 'src/app/types/auth';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { StorageService } from '../storage/storage.service';
import { Store } from '@ngrx/store';
import { logOut, setUserState } from 'src/app/ngrx/auth/auth.actions';
import { AnalyticsService } from '../analytics/analytics.service';
import { AppStateInterface } from 'src/app/ngrx/app.state';

@Injectable({
  providedIn: 'root',
})
export class FireserviceService {
  authState = getAuth();

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: StorageService,
    private store: Store<AppStateInterface>,
    private analyticsService: AnalyticsService
  ) {
    onAuthStateChanged(this.authState, (user) => {
      if (!user) {
        this.clearUser();
      }
    });
  }

  loginWithEmail(data: auth) {
    try {
      return this.auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {}
  }

  signup(data: auth) {
    try {
      return this.auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
    } catch (error) {}
  }

  logout(): void {
    if (this.getUser()) {
      this.analyticsService.logEvent('sign_out', { user: this.getUser().uid });
    }
    signOut(this.authState);
  }

  clearUser() {
    this.store.dispatch(logOut());
    this.storage.clear();
  }

  getUser() {
    const user = this.authState.currentUser;
    return user;
  }

  saveDetails(data: any) {
    // this.storage.set('user', data);
    this.store.dispatch(setUserState({ user: data }));
    return this.firestore.collection('users').doc(data.uid).set(data);
  }

  getDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }
}
