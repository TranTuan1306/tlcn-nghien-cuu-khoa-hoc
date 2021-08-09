import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditHoiDongNghiemThuComponent } from './form-edit-hoi-dong-nghiem-thu.component';

describe('FormEditHoiDongNghiemThuComponent', () => {
  let component: FormEditHoiDongNghiemThuComponent;
  let fixture: ComponentFixture<FormEditHoiDongNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditHoiDongNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditHoiDongNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
