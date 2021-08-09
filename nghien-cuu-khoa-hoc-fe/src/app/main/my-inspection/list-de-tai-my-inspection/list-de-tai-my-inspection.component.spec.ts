import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeTaiMyInspectionComponent } from './list-de-tai-my-inspection.component';

describe('ListDeTaiMyInspectionComponent', () => {
  let component: ListDeTaiMyInspectionComponent;
  let fixture: ComponentFixture<ListDeTaiMyInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeTaiMyInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeTaiMyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
