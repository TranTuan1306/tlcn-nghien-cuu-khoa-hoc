import { TestBed } from '@angular/core/testing';

import { HoiDongNghiemThuService } from './hoi-dong-nghiem-thu.service';

describe('HoiDongNghiemThuService', () => {
  let service: HoiDongNghiemThuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoiDongNghiemThuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
