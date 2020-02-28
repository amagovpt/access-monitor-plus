import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    LoadingComponent,
    ErrorComponent
  ]
})
export class GlobalModule { }
