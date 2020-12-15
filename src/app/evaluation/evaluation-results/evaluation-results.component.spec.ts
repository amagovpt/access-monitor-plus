import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EvaluationResultsPageComponent } from './evaluation-results.component';

describe('EvaluationResultsPageComponent', () => {
  let component: EvaluationResultsPageComponent;
  let fixture: ComponentFixture<EvaluationResultsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationResultsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
