import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.css']
})
export class EvaluationResultsPageComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  evaluationSub: Subscription;

  loading: boolean;
  error: boolean;

  eval: any;
  url: string;

  thresholdConfig: any;

  constructor(
    private evaluation: EvaluationService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.thresholdConfig = {
      '0': {color: 'red'},
      '2.5': {color: 'orange'},
      '5': {color: 'yellow'},
      '7.5': {color: 'green'}
    };

    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params.url) {
        this.url = params.url;
        this.evaluate(false);
      } else {
        this.evaluationSub = this.evaluation.evaluateHtml(sessionStorage.getItem('html-validate'))
          .subscribe(async data => {
            if (!data) {
              this.error = true;
            } else {
              this.eval = data;
            }

            this.loading = false;
            this.cd.detectChanges();
          });
      }
    });
  }

  evaluate(force: boolean): void {
    this.loading = true;

    if (this.evaluationSub && !this.evaluationSub.closed) {
      this.evaluationSub.unsubscribe();
    }

    this.evaluationSub = this.evaluation.evaluateUrl(this.url, force)
      .subscribe(data => {
        if (!data) {
          this.error = true;
        } else {
          this.eval = data;
        }

        this.loading = false;
        this.cd.detectChanges();
      });
  }

  downloadCSV(): void {
    this.evaluation.downloadCSV();
  }

  downloadEARL(): void {
    this.evaluation.downloadEARL();
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.evaluationSub.unsubscribe();
  }
}
