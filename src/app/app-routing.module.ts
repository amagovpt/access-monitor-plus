import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'insert-url', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'insert-html', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'upload-html', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'results', loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
