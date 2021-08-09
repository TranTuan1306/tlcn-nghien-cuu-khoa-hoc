import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBienBanHoiDongXetDuyetComponent } from './form-bien-ban-hoi-dong-xet-duyet.component';

describe('FormBienBanHoiDongXetDuyetComponent', () => {
  let component: FormBienBanHoiDongXetDuyetComponent;
  let fixture: ComponentFixture<FormBienBanHoiDongXetDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBienBanHoiDongXetDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBienBanHoiDongXetDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
