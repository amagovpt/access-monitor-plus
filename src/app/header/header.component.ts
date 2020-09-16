import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  isHomePage: boolean;

  constructor(
    private readonly theme: ThemeService, 
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.isHomePage = !location.pathname.includes('/results');
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = !location.pathname.includes('/results');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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
