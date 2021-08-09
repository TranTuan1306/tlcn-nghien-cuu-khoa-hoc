import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResearchResultsComponent } from './form-research-results.component';

describe('FormResearchResultsComponent', () => {
  let component: FormResearchResultsComponent;
  let fixture: ComponentFixture<FormResearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
