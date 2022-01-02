import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../article';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private db: AngularFireDatabase) {
   }

   getArticlesList() {
    return this.db.list('articles');
  }

  getArticle(id: string){
    return this.db.object('articles/' + id);
  }
}
