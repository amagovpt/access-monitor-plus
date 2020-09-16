import { Component, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { ThemeService } from "../theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  isHomePage: boolean;
  selectedLang: string;

  constructor(
    private readonly theme: ThemeService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    public readonly translate: TranslateService
  ) {
    this.isHomePage = !location.pathname.startsWith("/results");

    this.selectedLang = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = !location.pathname.startsWith("/results");
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeLanguage(): void {
    if (this.selectedLang === "Portuguese") {
      this.selectedLang = "English";
    } else {
      this.selectedLang = "Portuguese";
    }

    this.translate.use(this.selectedLang);
    localStorage.setItem("language", this.selectedLang);
  }

  toggleLightDarkTheme(): void {
    if (this.theme.isDarkTheme()) {
      this.theme.setLightTheme();
      localStorage.setItem("theme", "light");
    } else {
      this.theme.setDarkTheme();
      localStorage.setItem("theme", "dark");
    }

    this.cd.detectChanges();
  }
}
