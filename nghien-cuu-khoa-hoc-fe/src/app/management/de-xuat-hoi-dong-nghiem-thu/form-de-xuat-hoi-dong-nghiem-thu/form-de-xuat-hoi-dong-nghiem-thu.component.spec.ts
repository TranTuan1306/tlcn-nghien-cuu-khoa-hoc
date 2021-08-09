import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeXuatHoiDongNghiemThuComponent } from './form-de-xuat-hoi-dong-nghiem-thu.component';

describe('FormDeXuatHoiDongNghiemThuComponent', () => {
  let component: FormDeXuatHoiDongNghiemThuComponent;
  let fixture: ComponentFixture<FormDeXuatHoiDongNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeXuatHoiDongNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeXuatHoiDongNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
