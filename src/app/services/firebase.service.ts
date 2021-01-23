import { Injectable } from '@angular/core';
import { Element } from '../Element';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }
  
  postsRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;
  
  getPostsList(uid: string) {
    return this.db.list('users/' + uid + '/post');
  }

  getPost(uid: string, id: string){
    return this.db.object('users/' + uid + '/post/' + id);
  }

  addPost(uid: string, post: Element) {
    JSON.parse( JSON.stringify(post) );
    this.postsRef = this.getPostsList(uid);
    this.postsRef.push({
      title: post.title,
      category: post.category,
      date_posted: post.date_posted,
      body: post.body
    })
  }

  updatePost(uid: string, post: Element, id: string) {
    this.postRef = this.getPost(uid, id)
    this.postRef.update({
      title: post.title,
      category: post.category,
      date_posted: post.date_posted,
      body: post.body
    })
  }  

  deletePost(uid: string, id: string) { 
    this.postRef = this.getPost(uid, id);
    this.postRef.remove();
  }
}
