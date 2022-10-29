import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { auth } from 'src/app/types/auth';
import { getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FireserviceService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
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
    const { password, ...final } = data;
    return this.firestore.collection('users').doc(data.uid).set(final);
  }

  getDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }
}
