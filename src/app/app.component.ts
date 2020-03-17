import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gxclient';
  isHide:boolean = false;
  hideNav():void{
    this.isHide = !this.isHide;
  }
}
