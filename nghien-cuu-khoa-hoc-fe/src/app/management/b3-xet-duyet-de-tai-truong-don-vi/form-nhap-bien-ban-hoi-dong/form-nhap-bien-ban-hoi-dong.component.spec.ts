import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNhapBienBanHoiDongComponent } from './form-nhap-bien-ban-hoi-dong.component';

describe('FormNhapBienBanHoiDongComponent', () => {
  let component: FormNhapBienBanHoiDongComponent;
  let fixture: ComponentFixture<FormNhapBienBanHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNhapBienBanHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNhapBienBanHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
