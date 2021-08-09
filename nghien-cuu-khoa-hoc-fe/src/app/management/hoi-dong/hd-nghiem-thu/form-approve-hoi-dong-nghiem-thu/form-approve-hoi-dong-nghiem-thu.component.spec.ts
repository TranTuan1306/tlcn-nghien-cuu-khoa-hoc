import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApproveHoiDongNghiemThuComponent } from './form-approve-hoi-dong-nghiem-thu.component';

describe('FormApproveHoiDongNghiemThuComponent', () => {
  let component: FormApproveHoiDongNghiemThuComponent;
  let fixture: ComponentFixture<FormApproveHoiDongNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormApproveHoiDongNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApproveHoiDongNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
