import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdditionalExplanationComponent } from './form-additional-explanation.component';

describe('FormAdditionalExplanationComponent', () => {
  let component: FormAdditionalExplanationComponent;
  let fixture: ComponentFixture<FormAdditionalExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAdditionalExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdditionalExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
