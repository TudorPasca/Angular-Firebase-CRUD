import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Article } from '../article';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor(private newsService: NewsService, public authService: AuthService) { }

  displayedColumns = ['title', 'author'];
  articles: Array<Article>;

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    let snap = this.newsService.getArticlesList();
    snap.snapshotChanges().subscribe(data => {
      this.articles = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a["key"] = item.key;
        this.articles.push(a as Article);
      })
    });
    this.articles.forEach(i => {
      console.log(i);
    })
  }

  pushFavourite(article: Article) {
    this.newsService.pushFavourite(article);
  }
}
