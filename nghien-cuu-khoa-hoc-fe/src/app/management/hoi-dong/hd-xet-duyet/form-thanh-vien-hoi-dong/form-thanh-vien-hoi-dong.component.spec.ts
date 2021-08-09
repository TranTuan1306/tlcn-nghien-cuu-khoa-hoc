import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThanhVienHoiDongComponent } from './form-thanh-vien-hoi-dong.component';

describe('FormThanhVienHoiDongComponent', () => {
  let component: FormThanhVienHoiDongComponent;
  let fixture: ComponentFixture<FormThanhVienHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThanhVienHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThanhVienHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
