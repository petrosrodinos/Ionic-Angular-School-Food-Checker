import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { auth } from 'src/app/types/auth';
import { getAuth, signOut } from 'firebase/auth';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FireserviceService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: StorageService
  ) {}

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

  logout(): any {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  getUser() {
    const auth = getAuth();
    const user = auth.currentUser;
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
