import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBienBanHoiDongComponent } from './form-bien-ban-hoi-dong.component';

describe('FormBienBanHoiDongComponent', () => {
  let component: FormBienBanHoiDongComponent;
  let fixture: ComponentFixture<FormBienBanHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBienBanHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBienBanHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
