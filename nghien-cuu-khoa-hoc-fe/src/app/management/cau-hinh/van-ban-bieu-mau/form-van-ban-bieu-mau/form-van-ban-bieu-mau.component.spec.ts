import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVanBanBieuMauComponent } from './form-van-ban-bieu-mau.component';

describe('FormVanBanBieuMauComponent', () => {
  let component: FormVanBanBieuMauComponent;
  let fixture: ComponentFixture<FormVanBanBieuMauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVanBanBieuMauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVanBanBieuMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
