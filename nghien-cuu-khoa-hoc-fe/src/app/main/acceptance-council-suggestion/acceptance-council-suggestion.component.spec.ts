import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCouncilSuggestionComponent } from './acceptance-council-suggestion.component';

describe('AcceptanceCouncilSuggestionComponent', () => {
  let component: AcceptanceCouncilSuggestionComponent;
  let fixture: ComponentFixture<AcceptanceCouncilSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceCouncilSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCouncilSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
