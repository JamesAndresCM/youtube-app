import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  @Output() clicked = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onClick(video:string){
    this.clicked.emit(video);
  }
}
