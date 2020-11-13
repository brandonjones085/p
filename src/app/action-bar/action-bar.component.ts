import { Component, Input } from '@angular/core';


import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';

declare var android: any; 

@Component({
  selector: 'action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})
export class ActionBarComponent {

  @Input() title: string
  @Input() showBackButton = true; 

  constructor(
    private page: Page, private router: RouterExtensions
  ) {}

  get canGoBack(){
    return this.router.canGoBack() && this.showBackButton; 
  }



  onGoBack(){
    this.router.backToPreviousPage(); 
  }

  upload(){
    this.router.navigate(['/upload'])
  }

  list(){
    this.router.navigate(['/list'])
  }

}
