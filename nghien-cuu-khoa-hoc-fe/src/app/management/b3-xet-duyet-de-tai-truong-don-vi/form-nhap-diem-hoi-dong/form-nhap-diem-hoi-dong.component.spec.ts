import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNhapDiemHoiDongComponent } from './form-nhap-diem-hoi-dong.component';

describe('FormNhapDiemHoiDongComponent', () => {
  let component: FormNhapDiemHoiDongComponent;
  let fixture: ComponentFixture<FormNhapDiemHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhapDiemHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhapDiemHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
