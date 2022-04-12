import { Component, OnInit, Input } from '@angular/core';
import { Element } from '../Element';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription } from 'rxjs';
import { NewsService } from '../services/news.service';
import { Article } from '../article';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private newsService: NewsService
  ) { }

  uid: string;
  id: string;
  article: Article;
  private sub: Subscription;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getArticle();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  getArticle(): void {
    let snap = this.newsService.getArticle(this.id);
    snap.snapshotChanges().subscribe(data => {
      let a = data.payload.toJSON();
      a['key'] = data.key;
      this.article = a as Article;
    });
  }
}
