import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private newsService: NewsService, public authService: AuthService) { }

  articles: Array<Article>;

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    let snap = this.newsService.getFavouritesList();
    snap.snapshotChanges().subscribe(data => {
      this.articles = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a["source"] = item.key;
        this.articles.push(a as Article);
      })
    });
  }

  deleteFavourite(key: string) {
    this.newsService.deleteFavourite(key);
  }

  trimText(text: string, length: number) {
    if (text.length < length)
      length = text.length;
    return text.substring(0, length);
  }
}
