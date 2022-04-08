import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataFormComponent } from '../data-form/data-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Element } from '../Element';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { NewsService } from '../services/news.service';
import { min } from 'rxjs-compat/operator/min';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private firebaseService: FirebaseService, private authService: AuthService, public dialog: MatDialog, private newsService: NewsService) { }

  displayedColumns = ['date_posted', 'title', 'category', 'open', 'delete', 'edit'];
  postList: Element[] = [];
  articles: Article[] = [];
  currentUser;

  ngOnInit(): void {
    this.init();
  }
  
  init(){
    if(localStorage.getItem('email') && localStorage.getItem('password'))
    {
      this.authService.login(localStorage.getItem('email'), localStorage.getItem('password'))
      .then(() => {
        this.getCurrentUser();
      });
    }
    else
      this.getCurrentUser();
    this.getPostList();
  }

  getCurrentUser() {
    if(localStorage.getItem('email') && localStorage.getItem('password'))
    {
      console.log("LOGGIN IN");
      this.authService.login(localStorage.getItem('email'), localStorage.getItem('password'));
    }

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
    let count = 0;
    let snap = this.newsService.getArticlesList();
    snap.snapshotChanges().subscribe(data => {
      this.articles = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a["key"] = item.key;
        if (count < 3)
          this.articles.push(a as Article);
        count += 1;
      })
    });
  }

  trimText(text: string, length: number) {
    if (text.length < length)
      length = text.length;
    return text.substring(0, length);
  }

  printArticle(id: string) {
    console.log(id);
    let aux;
    let snap = this.newsService.getArticle(id);
    snap.snapshotChanges().subscribe(data => {
      let a = data.payload.toJSON();
      console.log(a);
      a['key'] = data.key
      aux = a as Article;
    });
    console.log(aux.title);
  }

  /**
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
  */
}
