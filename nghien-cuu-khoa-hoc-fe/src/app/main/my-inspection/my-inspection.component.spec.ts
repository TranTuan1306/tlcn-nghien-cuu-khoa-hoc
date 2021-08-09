import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInspectionComponent } from './my-inspection.component';

describe('MyInspectionComponent', () => {
  let component: MyInspectionComponent;
  let fixture: ComponentFixture<MyInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
