import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import clone from 'lodash.clone';

import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-element-result',
  templateUrl: './element-result.component.html',
  styleUrls: ['./element-result.component.css']
})
export class ElementResultPageComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') iframe: ElementRef;

  sub: Subscription;

  url: string;
  finalUrl: any;

  data: any;
  ele: string;

  constructor(
    private router: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private evaluation: EvaluationService
  ) {
    this.data = {};
  }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      this.url = params.url;
      this.ele = params.ele;

      this.data = this.evaluation.getTestResults(this.ele);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  tabChanged(event: any): void {
    if (event.index === 1) {
      const parser = new DOMParser();
      const evalDoc = parser.parseFromString(this.data.page, 'text/html');
      const imgNodes = evalDoc.evaluate('//img', evalDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      let i = 0;
      let n = imgNodes.snapshotItem(i);
      const protocol = this.data.finalUrl.startsWith('https://') ? 'https://' : 'http://';
      const www = this.data.finalUrl.includes('www.') ? 'www.' : '';

      let fixSrcUrl = clone(this.url.replace('http://', '').replace('https://', '').split('/')[0]);
      if (fixSrcUrl[fixSrcUrl.length - 1] === '/') {
        fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
      }

      while (n) {
        if (n['attributes']['src'] && !n['attributes']['src'].value.startsWith('http') && !n['attributes']['src'].value.startsWith('https')) {
          n['attributes']['src'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['src'].value}`;
        }

        if (n['attributes']['srcset'] && !n['attributes']['srcset'].value.startsWith('http') && !n['attributes']['srcset'].value.startsWith('https')) {
          n['attributes']['srcset'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['srcset'].value}`;
        }

        i++;
        n = imgNodes.snapshotItem(i);
      }

      i = 0;
      const cssNodes = evalDoc.evaluate('//link', evalDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      n = cssNodes.snapshotItem(i);

      while (n) {
        if (n['attributes']['href'] && !n['attributes']['href'].value.startsWith('http') && !n['attributes']['href'].value.startsWith('https')) {
          if (n['attributes']['href'].value.startsWith('/')) {
            n['attributes']['href'].value = `${protocol}${www}${fixSrcUrl}${n['attributes']['href'].value}`;
          } else {
            n['attributes']['href'].value = `${protocol}${www}${fixSrcUrl}/${n['attributes']['href'].value}`;
          }
        }

        i++;
        n = cssNodes.snapshotItem(i);
      }

      const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      doc.open();
      doc.write(evalDoc.getElementsByTagName('html')[0]['outerHTML']);
      doc.close();
    }
  }
}
