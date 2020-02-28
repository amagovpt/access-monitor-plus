import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationResultsPageComponent } from './evaluation-results/evaluation-results.component';
import { WebpageCodePageComponent } from './webpage-code/webpage-code.component';
import { ElementResultPageComponent } from './element-result/element-result.component';

const routes: Routes = [
  { path: 'html', component: EvaluationResultsPageComponent, data: ['results', 'self'], pathMatch: 'full' },
  { path: ':url', component: EvaluationResultsPageComponent, data: ['results', 'self'], pathMatch: 'full' },
  { path: ':url/code', component: WebpageCodePageComponent, data: ['results', 'code'], pathMatch: 'full' },
  { path: ':url/:ele', component: ElementResultPageComponent, data: ['results', 'ele'], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
