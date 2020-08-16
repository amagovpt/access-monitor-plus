import { Component, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private readonly theme: ThemeService, private readonly cd: ChangeDetectorRef) {}

  toggleLightDarkTheme(): void {
    if (this.theme.isDarkTheme()) {
      this.theme.setLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      this.theme.setDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
    
    this.cd.detectChanges();
  }
}
