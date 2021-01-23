import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataFormComponent } from '../data-form/data-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Element } from '../Element';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private firebaseService: FirebaseService, private authService: AuthService, public dialog: MatDialog) { }

  displayedColumns = ['date_posted', 'title', 'category', 'open', 'delete', 'edit'];
  postList: Element[] = [];
  currentUser;
  
  ngOnInit(): void {
    this.getCurrentUser();
    this.getPostList();
  }
  
  getCurrentUser() {
    this.authService.getUserState().subscribe((user) => {
      console.log("ACCOUNT STATE CHANGE", user);
      if(user)
        this.currentUser = user;
      else
        this.currentUser = null;

      this.getPostList();
    });
  }
  
  getPostList() {
    let snap = this.firebaseService.getPostsList(this.currentUser.uid);
    snap.snapshotChanges().subscribe(data => {
      this.postList = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.postList.push(a as Element);
      })
    })
  }

  addPost(): void {
    let dialogRef = this.dialog.open(DataFormComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.firebaseService.addPost(this.currentUser.uid, result.data);
      //this.getPostList();
    });
  }

  deletePost(id) {
    //console.log("DELETE");
    this.firebaseService.deletePost(this.currentUser.uid, id);
    this.getPostList();
  }

  editPost(id) {
    let dialogRef = this.dialog.open(DataFormComponent, {
      width: '600px',
      data: 'Edit Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.firebaseService.updatePost(this.currentUser.uid, result.data, id);
      this.getPostList();
    });
  }


}
