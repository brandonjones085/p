import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ViewChild } from '@angular/core'
import { Page } from '@nativescript/core';
import {PupService} from '../pup.service'
import {Post} from '../pup.model'
import {Subscription} from 'rxjs'; 


@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
  moduleId: module.id
})
export class RateComponent implements OnInit {
  public direction: number;
  isCreating = true;
  posts: Post[] = []
  private postsSub: Subscription; 

  private id: String
  name: String
  breed:string
  quote: string
  rates: number
  imagePath: string

  constructor(
    private active: ActivatedRoute,

    private page: Page, 
    public pupsService: PupService,
   

  ) {}

  @ViewChild("yes") yes: ElementRef;
  @ViewChild("no") no: ElementRef;
  ngOnInit() {

      
    this.pupsService.getP()
    this.postsSub = this.pupsService.getPostUpdateListener().subscribe((pups:Post[]) =>{
    this.posts = pups; 
      console.log(this.posts)
    }

 )}




 rateRPup(args: GestureEventData){

   console.log("right clicked")
   
   this.ngOnInit(); 

 }

rateLPup(args: GestureEventData){
 
   console.log("left clicked")
   
   this.ngOnInit(); 
   
} 
  

}
