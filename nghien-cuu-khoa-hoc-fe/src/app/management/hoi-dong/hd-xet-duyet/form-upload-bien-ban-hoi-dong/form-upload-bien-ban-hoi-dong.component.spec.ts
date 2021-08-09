import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadBienBanHoiDongComponent } from './form-upload-bien-ban-hoi-dong.component';

describe('FormUploadBienBanHoiDongComponent', () => {
  let component: FormUploadBienBanHoiDongComponent;
  let fixture: ComponentFixture<FormUploadBienBanHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUploadBienBanHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadBienBanHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
