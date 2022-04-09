import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private newsService: NewsService, private sanitizer: DomSanitizer) { }

  videos = [
    {
      title: "Elon Musk: SpaceX, Mars, Tesla Autopilot, Self-Driving, Robotics, and AI | Lex Fridman Podcast #252",
      description: "Elon Musk is CEO of SpaceX, Tesla, Neuralink, and The Boring Company.",
      source: "https://www.youtube.com/embed/DxREm3s1scA"
    },
    {
      title: "PODCAST DE ACASĂ #14-(white)hacking, opotunități IT și cum să-ți protejezi contul cu Ramon Năstase",
      description: "PodcastDeAcasă este o serie de podcast-uri cu diferiți invitați din diferite domenii de activitate. În acest episod am avut plăcerea să îl am invitat pe specialsitul  în securitate cibernetică Ramon Năstase și am vorbit despre whitehacking, concursuri IT și cum să-ți protejezi conturile de social-media.",
      source: "https://www.youtube.com/embed/oqVQoEnNAmo"
    }
  ];

  ngOnInit(): void {
    //this.getVideos();
  }

  /*
  getVideos() {
    let snap = this.newsService.getVideosList();
    snap.snapshotChanges().subscribe(data => {
      this.videos = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        this.videos.push(a);
      });
    });
  }
  */
}
