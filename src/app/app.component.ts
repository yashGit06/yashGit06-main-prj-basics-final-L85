import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipesView : boolean = true;
  shoppingView : boolean = false;

  changeValue(booleanValue:{r:boolean;s:boolean;}){
    this.recipesView=booleanValue.r;
    this.shoppingView=booleanValue.s;
  }
}
