import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';
import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';

export class QT12DanhSachGioiThieuThanhVienHoiDongDanhGia {
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  hoiDongDanhGia: HoiDongDanhGia[];
}

export class HoiDongDanhGia {
  thongTinCaNhan: ThanhVien;
  chucVuTrongHoiDong: ChucVuTrongHoiDong;
}

export class ChucVuTrongHoiDong {
  id: string;
  tenChucVu: string;
}
