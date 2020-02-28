import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageCodePageComponent } from './webpage-code.component';

describe('WebpageCodePageComponent', () => {
  let component: WebpageCodePageComponent;
  let fixture: ComponentFixture<WebpageCodePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageCodePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
