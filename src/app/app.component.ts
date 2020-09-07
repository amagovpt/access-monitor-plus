import { OnInit, Component, Injectable, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './theme.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly langs: any = {
    'pt': 'Portuguese',
    'en': 'English',
    'nk': 'Norwegian'
  };

  private readonly langCodes: any = {
    'English': 'en',
    'Portuguese': 'pt',
    'Norwegian': 'nk'
  };

  constructor(
    private readonly el: ElementRef<Element>,
    private readonly translate: TranslateService,
    private readonly theme: ThemeService
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

    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme !== 'dark') {
      this.theme.setLightTheme();
    } else {
      this.theme.setDarkTheme();
    }
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      const lang = document.createAttribute('lang');
      lang.value = this.langCodes[this.translate.currentLang];
      this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
    });
  }

  goToTop(): void {
    document.getElementById('top').scrollIntoView();
  }
}
