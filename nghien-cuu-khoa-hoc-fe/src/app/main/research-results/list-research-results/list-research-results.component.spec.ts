import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResearchResultsComponent } from './list-research-results.component';

describe('ListResearchResultsComponent', () => {
  let component: ListResearchResultsComponent;
  let fixture: ComponentFixture<ListResearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
