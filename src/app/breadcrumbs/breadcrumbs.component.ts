import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  bc: any;

  page: string;
  encodedPage: string;

  elementName: string;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.bc = {
      results: {
        self: false,
        code: false,
        ele: false
      }
    };
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.bc = {
          results: {
            self: false,
            code: false,
            ele: false
          },
        };

        const path = location.pathname;
        const segments = path.split('/');

        let data = null;

        if (this.activatedRoute.root.firstChild.snapshot.firstChild) {
          data = Object.values(this.activatedRoute.root.firstChild.snapshot.firstChild.data);
        } else {
          data = Object.values(this.activatedRoute.root.firstChild.snapshot.data);
        }

        if (data) {
          this.createNavbarItems(this.bc, data, 0);

          if (this.bc.results.self) {
            this.encodedPage = segments[2];
            this.page = decodeURIComponent(this.encodedPage);
          }

          if (this.bc.results.ele) {
            this.elementName = segments[3];
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private createNavbarItems(bc: any, data: Array<string>, n: number): void {
    const keys = Object.keys(bc);
    for (let i = 0 ; i < keys.length ; i++) {
      if (keys[i] === 'self' && data[n] !== 'self') {
        bc[keys[i]] = true;
        continue;
      }
      if (keys[i] === data[n]) {
        if (bc[keys[i]] instanceof Object) {
          this.createNavbarItems(bc[keys[i]], data, n + 1);
        } else {
          bc[keys[i]] = true;
        }
        break;
      }
    }
  }
}
