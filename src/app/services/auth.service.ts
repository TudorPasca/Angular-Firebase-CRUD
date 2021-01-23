import { EventEmitter, Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app'
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userState: Observable<firebase.User>;

  constructor(public firebaseAuth: AngularFireAuth, private firebaseService: FirebaseService){
    this.userState = firebaseAuth.authState;
  }

  getUserState(): Observable<any>
  {
    const result = this.firebaseAuth.authState;
    return result as Observable<any>;
  }

  async signup(email: string, password: string): Promise<string>{
    const result = await this.firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Nice, it worked!');
      return Promise.resolve('');
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
      return Promise.resolve(err.message);
    });;

    console.log(result);
    return Promise.resolve(result);
  }

  async login(email: string, password: string): Promise<string>{
    const result = await this.firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Nice, it worked!');
      return Promise.resolve('');
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
      return Promise.resolve(err.message);
    });;

    console.log(result);
    return Promise.resolve(result);
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}