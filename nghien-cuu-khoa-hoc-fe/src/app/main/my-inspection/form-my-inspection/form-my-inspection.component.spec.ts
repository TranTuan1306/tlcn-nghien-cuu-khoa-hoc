import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMyInspectionComponent } from './form-my-inspection.component';

describe('FormMyInspectionComponent', () => {
  let component: FormMyInspectionComponent;
  let fixture: ComponentFixture<FormMyInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMyInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
