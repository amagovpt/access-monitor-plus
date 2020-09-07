import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import { html } from 'js-beautify';

@Component({
  selector: 'app-webpage-code',
  templateUrl: './webpage-code.component.html',
  styleUrls: ['./webpage-code.component.scss']
})
export class WebpageCodePageComponent implements OnInit, OnDestroy {

  sub: Subscription;

  url: string;
  encodedUrl: string;

  pagecode: string;
  downloadHTML: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params.url !== 'html') {
        this.url = params.url;
      }
      this.pagecode = html(JSON.parse(sessionStorage.getItem('evaluation')).pagecode, { indent_size: 2 });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  downloadCode(): void {
    const blob = new Blob([this.pagecode], { type: 'text/html' });
    saveAs(blob, this.url + '.html');
  }
}
