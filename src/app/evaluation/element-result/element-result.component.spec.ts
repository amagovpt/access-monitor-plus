import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementResultPageComponent } from './element-result.component';

describe('ElementResultPageComponent', () => {
  let component: ElementResultPageComponent;
  let fixture: ComponentFixture<ElementResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
