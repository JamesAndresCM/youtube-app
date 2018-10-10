import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  videos:any[] = [];
  chooseVideo:any;
  search:any;
  constructor(private youtube: YoutubeService) { 
    this.getVideos();
  }

  getVideos(){
    this.youtube.mostPopular().subscribe(
      data => {
        this.videos = data;
        }
    )
  }

  onClicked(char: string){
    if(char){
      this.youtube.searchYT(char).subscribe(
          data => {
            this.search = char;
            this.videos = data;
      });
    }
  }

  playVideo(video:string){
    this.chooseVideo = video;
    $("#myModal").modal();
  }

  onScroll() {
        if(this.search){
        this.youtube.searchYT(this.search).subscribe(
          data => {
            this.videos.push.apply( this.videos, data);
          });
        }
    }

   closeModal(){
     this.chooseVideo = null;
     $("#myModal").modal('hide');
   }
}
