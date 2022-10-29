import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { auth } from 'src/app/types/auth';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { StorageService } from '../storage/storage.service';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/ngrx/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class FireserviceService {
  authState = getAuth();

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: StorageService,
    public store: Store
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

  // onAuthStateChanged(authState:any, (user:any) => {
  //   if (user) {
  //   } else {
  //   }
  // });

  signup(data: auth) {
    try {
      return this.auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
    } catch (error) {}
  }

  logout(): void {
    signOut(this.authState);
  }

  clearUser() {
    console.log('clearing user');
    this.store.dispatch(logOut());
    this.storage.clear();
  }

  getUser() {
    const user = this.authState.currentUser;
    if (user) {
      return user;
    } else {
      return false;
    }
  }

  saveDetails(data: any) {
    this.storage.set('user', data);
    return this.firestore.collection('users').doc(data.uid).set(data);
  }

  getDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }
}
