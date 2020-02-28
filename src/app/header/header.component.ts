import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() sideNav: ElementRef;

  toggleSideNav(): void {
    (<any>this.sideNav).toggle();
  }
}
