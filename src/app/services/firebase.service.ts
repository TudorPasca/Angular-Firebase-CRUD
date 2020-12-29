import { Injectable } from '@angular/core';
import { Element } from '../Element';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }
  
  postsRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;
  
  getPostsList() {
    this.postsRef = this.db.list('post');
    return this.postsRef;
  }

  addPost(post: Element) {
    JSON.parse( JSON.stringify(post) );
    this.postsRef.push({
      title: post.title,
      category: post.category,
      date_posted: post.date_posted,
      body: post.body
    })
  }

  getPost(id: string) {
    this.postRef = this.db.object('post/' + id);
    return this.postRef;
  }

  updatePost(post: Element, id: string) {
    this.getPost(id);
    this.postRef.update({
      title: post.title,
      category: post.category,
      date_posted: post.date_posted,
      body: post.body
    })
  }  

  deletePost(id: string) { 
    this.postRef = this.db.object('post/' + id);
    this.postRef.remove();
  }
}
