import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdditionalExplanationComponent } from './list-additional-explanation.component';

describe('ListAdditionalExplanationComponent', () => {
  let component: ListAdditionalExplanationComponent;
  let fixture: ComponentFixture<ListAdditionalExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdditionalExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdditionalExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
