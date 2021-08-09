import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThanhVienHoiDongComponent } from './view-thanh-vien-hoi-dong.component';

describe('ViewThanhVienHoiDongComponent', () => {
  let component: ViewThanhVienHoiDongComponent;
  let fixture: ComponentFixture<ViewThanhVienHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewThanhVienHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewThanhVienHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
