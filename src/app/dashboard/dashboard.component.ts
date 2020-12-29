import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataFormComponent } from '../data-form/data-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Element } from '../Element';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  displayedColumns = ['date_posted', 'title', 'category', 'delete', 'edit'];
  postList: Element[];

  openDialog(): void {
    let dialogRef = this.dialog.open(DataFormComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.firebaseService.addPost(result.data);
      this.getPostList();
    });
  }

  getPostList() {
    let snap = this.firebaseService.getPostsList();
    snap.snapshotChanges().subscribe(data => {
      this.postList = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.postList.push(a as Element);
      })
    })
  }

  ngOnInit(): void {
    this.getPostList();
  }

  deletePost(id) {
    this.firebaseService.deletePost(id);
    this.getPostList();
  }

  editPost(id) {
    let dialogRef = this.dialog.open(DataFormComponent, {
      width: '600px',
      data: 'Edit Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.firebaseService.updatePost(result.data, id);
      this.getPostList();
    });
  }

}
