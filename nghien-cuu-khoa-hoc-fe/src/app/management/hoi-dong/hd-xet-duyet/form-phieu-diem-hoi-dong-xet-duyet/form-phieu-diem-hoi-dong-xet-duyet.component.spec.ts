import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPhieuDiemHoiDongXetDuyetComponent } from './form-phieu-diem-hoi-dong-xet-duyet.component';

describe('FormPhieuDiemHoiDongXetDuyetComponent', () => {
  let component: FormPhieuDiemHoiDongXetDuyetComponent;
  let fixture: ComponentFixture<FormPhieuDiemHoiDongXetDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPhieuDiemHoiDongXetDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhieuDiemHoiDongXetDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
