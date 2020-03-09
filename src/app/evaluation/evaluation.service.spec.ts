import { TestBed, inject } from '@angular/core/testing';

import { EvaluationService } from './evaluation.service';

describe('ServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluationService]
    });
  });

  it('should be created', inject([EvaluationService], (service: EvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
