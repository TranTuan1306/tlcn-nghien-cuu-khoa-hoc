import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienBanHoiDongComponent } from './bien-ban-hoi-dong.component';

describe('BienBanHoiDongComponent', () => {
  let component: BienBanHoiDongComponent;
  let fixture: ComponentFixture<BienBanHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienBanHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienBanHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
