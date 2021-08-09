import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';
import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';

export class QT18DeNghiThanhToan {
  chuNhiemDeTai: ThanhVien;
  deTai: DeTaiNCKH;
  thoiGianBatDauHopDong: string;
  thoiGianKetThucHopDong: string;
  tongKinhPhi: number;
  kinhPhiDaThanhToan: number;
  chiTietThanhToan: ChiTietThanhToan[];
  kinhPhiDaTamUng: number;
  kinhPhiDeNghiBoSung: number;
}

export class ChiTietThanhToan {
  noiDung: string;
  soTien: number;
  ghiChu: string;
}
