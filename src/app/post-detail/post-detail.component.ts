import { Component, OnInit, Input } from '@angular/core';
import { Element } from '../Element';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private location: Location
  ) { }

  uid: string;
  id: string;
  post: Element;
  private sub: Subscription;

  ngOnInit(): void {
    console.log("GOT HERE!");
    this.sub = this.route.params.subscribe(params => {
      console.log(params['uid'] + ', ' + params['$key']);
      this.uid = params['uid'];
      this.id = params['$key'];
      this.getPost();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  getPost(): void {
    //const id = this.route.snapshot.paramMap.get('$key');
    //console.log(id);
    let snap = this.firebaseService.getPost(this.uid, this.id);
    snap.snapshotChanges().subscribe(data => {
      let a = data.payload.toJSON();
      console.log(a);
      a['$key'] = data.key
      this.post = a as Element;
      //console.log(this.post);
    })
  }
}
