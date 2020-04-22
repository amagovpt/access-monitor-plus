import { OnInit, Component, Injectable, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @ViewChild('sideNav', { static: true }) sideNav: ElementRef;

  selectedLang: string;

  langs: any = {
    'pt': 'Portuguese',
    'en': 'English'
  };

  langCodes: any = {
    'English': 'en',
    'Portuguese': 'pt'
  };

  showGoToTop: boolean;

  url: string;

  constructor(
    private readonly el: ElementRef,
    public readonly translate: TranslateService,
    private readonly router: Router
  ) {
    this.translate.addLangs(Object.values(this.langs));
    this.translate.setDefaultLang('Portuguese');

    const lang = localStorage.getItem('language');

    if (!lang) {
      const browserLang = translate.getBrowserLang();
      const use = Object.keys(this.langs).includes(browserLang) ? this.langs[browserLang] : 'Portuguese';

      this.translate.use(use);
      localStorage.setItem('language', use);
    } else {
      this.translate.use(lang);
    }

    this.selectedLang = this.translate.currentLang;

    this.showGoToTop = false;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const path = location.pathname;
        const segments = path.split('/');
        this.url = null;

        if (segments.length > 2) {
          this.url = decodeURIComponent(segments[2]);
        }

        document.getElementById('main').scrollIntoView();
      }
    });
  }

  /**
   * Update the language in the lang attribute of the html element.
   */
  updateLanguage(): void {
    const lang = document.createAttribute('lang');
    lang.value = this.langCodes[this.translate.currentLang];
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('language', this.selectedLang);
    this.updateLanguage();
  }

  goToTop(): void {
    document.getElementById('main').scrollIntoView();
  }

  onScroll(e: any): void {
    if (e.srcElement.scrollTop > 300) {
      this.showGoToTop = true;
    } else {
      this.showGoToTop = false;
    }
  }
}
