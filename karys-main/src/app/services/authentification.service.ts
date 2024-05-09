import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { Observable, catchError, from, of, throwError } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  
  constructor(){
    onAuthStateChanged(this.auth, user => {
      if (user) {
        // User is signed in, you can store their details in local storage
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // User is signed out, clear local storage
        localStorage.removeItem('user');
      }
    });
   }

  //sign in with email and password
  signIn(params: SignIn) {
    return signInWithEmailAndPassword(this.auth, params.email, params.password).then(userCredential => {
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      return userCredential;
    });

  }
  //recover password
  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email) 
  }

  //sign in with google
  googleSignIn(){
    return signInWithPopup(this.auth,new GoogleAuthProvider()).then(userCredential => {
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      return userCredential;
    });
  }
  
  //sign in with facebook
  facebookSignIn(){
    return signInWithPopup(this.auth,new FacebookAuthProvider()).then(userCredential => {
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      return userCredential;
    });
  }


  //sign up
  signUp(params: SignIn) {
    return createUserWithEmailAndPassword(this.auth, params.email, params.password).then(userCredential => {
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      return userCredential;
    });
  }

  
 
}

type SignIn = { email: string, password: string }