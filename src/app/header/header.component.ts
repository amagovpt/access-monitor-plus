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
    this.selectedLang = this.translate.currentLang;
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
    const themeSwitchLabel = document.getElementById("mode_switch");

    if (this.theme.isDarkTheme()) {
      this.theme.setLightTheme();
      localStorage.setItem("theme", "light");
      this.translate.get("HEADER.dark_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    } else {
      this.theme.setDarkTheme();
      localStorage.setItem("theme", "dark");
      this.translate.get("HEADER.light_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    }

    this.cd.detectChanges();
  }
}
