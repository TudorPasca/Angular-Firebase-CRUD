import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';  

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

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    const result = await this.authService.signup(this.credentials.email, this.credentials.password)
      .then((data) => {
        console.log(data);
        return data;
        this.credentials.email = this.credentials.password = '';
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
      console.log("SUCCESS");
      window.location.replace("/home");
    }
  }

  isValid(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return (this.credentials.email != '' && this.credentials.password != '' && regex.test(this.credentials.email));
  }
}
