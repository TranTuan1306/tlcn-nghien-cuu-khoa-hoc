import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeXuatHoiDongNghiemThuComponent } from './list-de-xuat-hoi-dong-nghiem-thu.component';

describe('ListDeXuatHoiDongNghiemThuComponent', () => {
  let component: ListDeXuatHoiDongNghiemThuComponent;
  let fixture: ComponentFixture<ListDeXuatHoiDongNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeXuatHoiDongNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeXuatHoiDongNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
