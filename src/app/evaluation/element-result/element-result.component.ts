import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
export class ElementResultPageComponent implements OnInit, AfterViewInit, OnDestroy {

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

  ngAfterViewInit(): void {
    const images = document.querySelectorAll('.img img');
    
    for (let i = 0 ; i < images.length ; i++) {
      const img = images.item(i);
      
      if (img['width'] > 500 || img['height'] > 200) {
        if (img['width'] > img['height']) {
          img['width'] = '500';
        } else {
          img['height'] = '200';
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  tabChanged(event: any): void {
    if (event.index === 1) {
      const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
      doc.open();
      doc.write(this.data.page);
      doc.close();
    }
  }
}
