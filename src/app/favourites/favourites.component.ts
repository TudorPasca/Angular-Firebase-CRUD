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

  displayedColumns = ['title', 'author'];
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
        a["key"] = item.key;
        this.articles.push(a as Article);
      })
    });
    this.articles.forEach(i => {
      console.log(i);
    })
  }

  deleteFavourite(key: string) {
    this.newsService.deleteFavourite(key);
  }
}
