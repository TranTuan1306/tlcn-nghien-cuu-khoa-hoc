import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';
import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';

export class QT03DanhGiaThuyetMinh {
  thanhVienHoiDong: ThanhVien;
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  soHieuQuyetDinhThanhLapHoiDong: string;
  ngayHop: string;
  diaDiem: string;
  danhGia: DanhGia[];
  yKienKhac: string;
}

export class DanhGia {
  id: string;
  noiDung: string;
  diemToiThieu: number;
  diemToiDa: number;
  diemDanhGia: number;
}

export class SumDiemDanhGia {
  diemToiThieu: number;
  diemToiDa: number;
  diemDanhGia: number;
}
