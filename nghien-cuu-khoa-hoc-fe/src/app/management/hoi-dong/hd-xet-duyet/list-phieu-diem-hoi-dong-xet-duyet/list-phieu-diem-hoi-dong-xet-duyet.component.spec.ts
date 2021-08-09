import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuDiemHoiDongXetDuyetComponent } from './list-phieu-diem-hoi-dong-xet-duyet.component';

describe('ListPhieuDiemHoiDongXetDuyetComponent', () => {
  let component: ListPhieuDiemHoiDongXetDuyetComponent;
  let fixture: ComponentFixture<ListPhieuDiemHoiDongXetDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPhieuDiemHoiDongXetDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuDiemHoiDongXetDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
