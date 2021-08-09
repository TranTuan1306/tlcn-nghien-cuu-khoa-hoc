import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHdNghiemThuComponent } from './form-hd-nghiem-thu.component';

describe('FormHdNghiemThuComponent', () => {
  let component: FormHdNghiemThuComponent;
  let fixture: ComponentFixture<FormHdNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHdNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHdNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
