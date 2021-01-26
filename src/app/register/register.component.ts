import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/app';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  error = '';
  checked = false;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  setSessionPersistance(){
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return this.authService.signup(this.credentials.email, this.credentials.password);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  async onSubmit(): Promise<void> {
    const result = await this.setSessionPersistance()
      .then((data) => {
        console.log(data);
        //this.credentials.email = this.credentials.password = '';
        return data;
      }).catch((err) => {
        console.log(err.message);
      })

    if(typeof result == "string" && result.length)
    {
      console.log("FAILURE");
      this.error = result;
    }
    else
    {
      if(this.checked)
      {
          console.log("CHECKED");
          localStorage.setItem("email", this.credentials.email as string);
          localStorage.setItem("password", this.credentials.password as string);
      }
      console.log("SUCCESS");
      window.location.replace("/home");
    }
  }

  isValid(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return (this.credentials.email != '' && this.credentials.password != '' && regex.test(this.credentials.email));
  }
}
