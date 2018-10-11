import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private url:string;
  private nextPageToken:string;
  private apiKey:string = "YOUR_APIKEY"
  constructor(private http: Http) {
    this.url = GLOBAL.url; 
  }

  searchYT(q:string){
    let url = `${this.url}/search`;
    let params = new URLSearchParams();

    params.set('part','snippet');
    params.set('maxResults','12');
    params.set('key', this.apiKey);
    params.set('order','date');
    params.set('q',q);


    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }

    console.log(this.nextPageToken);
    return this.http.get(`${url}`, {search: params}).pipe(map(
          res => { 
            
             this.nextPageToken = res.json().nextPageToken;
             
             let videos:any[] = [];
             for(let video of res.json().items){
                 let snippet = video.snippet;
                 let videoId = video.id.videoId;
                 snippet['videoId'] = videoId
                 videos.push(snippet);
             }

             return videos;
          }
    ));
  }

  mostPopular(){
    let url = `${this.url}/videos`;
    let params = new URLSearchParams();

    params.set('part','snippet');
    params.set('maxResults','50');
    params.set('regionCode','CL');
    params.set('key', this.apiKey);
    params.set('chart','mostPopular');

    return this.http.get(`${url}`,{ params }).pipe(map(
        res => {
            let videos:any[] = [];
            for(let video of res.json().items){
              let snippet = video.snippet;
              let videoId = video.id;
              snippet['videoId'] = videoId
              videos.push(snippet);

            }

            return videos;
        }
      ));
  }

}
