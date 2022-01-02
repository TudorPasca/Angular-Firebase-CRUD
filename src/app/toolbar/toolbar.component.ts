import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  email: string;
  password: string;

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}
