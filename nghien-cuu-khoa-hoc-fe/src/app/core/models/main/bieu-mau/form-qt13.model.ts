import { ThanhVien as ThanhVien } from '../bieu-mau-common/thanh-vien.model';
import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';

export class QT13DanhGiaDeTai {
  thanhVienHoiDong: ThanhVien;
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  ngayHop: string;
  diaDiem: string;
  quyetDinhThanhLapHoiDong: string;
  danhGiaCuaHoiDong: DanhGia[];
  yKienKhac: string;
}

export class DanhGia {
  id: string;
  noiDungDanhGia: string;
  diemToiDa: number;
  diemDanhGia: number;
}

export class SumDanhGia {
  diemToiDa: number;
  diemDanhGia: number;
}
