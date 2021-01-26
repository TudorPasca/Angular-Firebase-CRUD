import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, public dialog: MatDialog) { }

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
