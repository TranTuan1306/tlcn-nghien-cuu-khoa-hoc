import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeNghiThanhToanComponent } from './form-de-nghi-thanh-toan.component';

describe('FormDeNghiThanhToanComponent', () => {
  let component: FormDeNghiThanhToanComponent;
  let fixture: ComponentFixture<FormDeNghiThanhToanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeNghiThanhToanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeNghiThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
