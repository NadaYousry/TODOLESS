import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
@Input () starId;
@Input () rating;
@Output() starEnter: EventEmitter<number> =new EventEmitter() ;
@Output() starLeave: EventEmitter<number> =new EventEmitter() ;
@Output() starClicked: EventEmitter<number> =new EventEmitter() ;
  constructor() { }
  starClassName = "star-rating-blank";

  ngOnInit() {
    

    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
  }
  onStarEnter(){
    this.starEnter.emit(this.starId);

    
  }
  onStarLeave(){
    this.starLeave.emit();
  }
  onStarClicked(){
    console.log(this.rating);
    this.starClicked.emit(this.starId);
    
  }
  
}
