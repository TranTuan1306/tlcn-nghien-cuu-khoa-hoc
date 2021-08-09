import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuggestionComponent } from './form-suggestion.component';

describe('FormSuggestionComponent', () => {
  let component: FormSuggestionComponent;
  let fixture: ComponentFixture<FormSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
