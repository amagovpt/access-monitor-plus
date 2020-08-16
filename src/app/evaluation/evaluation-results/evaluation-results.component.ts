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

            window.onclick = function(event) {
              console.log(event.target)
              if (!event.target.matches('#see_page_dropdown')) {
                var dropdown = document.getElementById("see_page");
                console.log(dropdown.classList)
                if (dropdown.classList.contains('show_see_page')) {
                  dropdown.classList.remove('show_see_page');
                }
              }
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

        window.onclick = function(event) {
          if (!event.target.matches('.see_page_button, .see_page_button *')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0 ; i < dropdowns.length ; i++) {
              if (dropdowns[i].classList.contains('show_dropdown')) {
                dropdowns[i].classList.remove('show_dropdown');
              }
            }

            if (event.target.matches('.download_data_button, .download_data_button *')) {
              openDownloadData();
            }
          }

          if (!event.target.matches('.download_data_button, .download_data_button *')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0 ; i < dropdowns.length ; i++) {
              if (dropdowns[i].classList.contains('show_dropdown')) {
                dropdowns[i].classList.remove('show_dropdown');
              }
            }

            if (event.target.matches('.see_page_button, .see_page_button *')) {
              openSeePage();
            }
          }
        }

        this.loading = false;
        this.cd.detectChanges();
      });
  }

  openSeePage(): void {
    document.querySelector('.see_page_button + .dropdown-content').classList.toggle("show_dropdown");
  }

  openDownloadData(): void {
    document.querySelector('.download_data_button + .dropdown-content').classList.toggle("show_dropdown");
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

function openSeePage(): void {
  document.querySelector('.see_page_button + .dropdown-content').classList.toggle("show_dropdown");
}

function openDownloadData(): void {
  document.querySelector('.download_data_button + .dropdown-content').classList.toggle("show_dropdown");
}