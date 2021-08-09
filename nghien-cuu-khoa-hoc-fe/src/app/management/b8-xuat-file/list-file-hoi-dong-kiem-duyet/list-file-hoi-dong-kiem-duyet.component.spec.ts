import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileHoiDongKiemDuyetComponent } from './list-file-hoi-dong-kiem-duyet.component';

describe('ListFileHoiDongKiemDuyetComponent', () => {
  let component: ListFileHoiDongKiemDuyetComponent;
  let fixture: ComponentFixture<ListFileHoiDongKiemDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFileHoiDongKiemDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFileHoiDongKiemDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
