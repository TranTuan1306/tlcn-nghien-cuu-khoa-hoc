import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiemThanhVienHoiDongComponent } from './list-diem-thanh-vien-hoi-dong.component';

describe('ListDiemThanhVienHoiDongComponent', () => {
  let component: ListDiemThanhVienHoiDongComponent;
  let fixture: ComponentFixture<ListDiemThanhVienHoiDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDiemThanhVienHoiDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiemThanhVienHoiDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
