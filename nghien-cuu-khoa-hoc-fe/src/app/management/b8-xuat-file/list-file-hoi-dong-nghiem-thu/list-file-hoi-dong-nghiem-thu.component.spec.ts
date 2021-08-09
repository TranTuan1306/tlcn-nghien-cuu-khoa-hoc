import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileHoiDongNghiemThuComponent } from './list-file-hoi-dong-nghiem-thu.component';

describe('ListFileHoiDongNghiemThuComponent', () => {
  let component: ListFileHoiDongNghiemThuComponent;
  let fixture: ComponentFixture<ListFileHoiDongNghiemThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFileHoiDongNghiemThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFileHoiDongNghiemThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
